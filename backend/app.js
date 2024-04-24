import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import { CronJob } from 'cron';
import multer from 'multer'; 
import { v4 as uuidv4 } from 'uuid';


const app = express();

app.use("/rent_car_images",express.static('images'))

// PostgreSQL connection pool
const pool = new pg.Pool({
    host:'localhost',
    user: 'postgres',
    password: 'Aa@12345678',
    port: 5432,
    database:'VMS'
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images/'); // Destination folder for storing images
  },
  filename: (req, file, cb) => {
      const filename = uuidv4(); // Generate unique filename
      cb(null, filename + '-' + file.originalname); // Filename format
  }
});

const upload = multer({ storage: storage });



// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'; // Replace with a secure key

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Basic home route for the API
app.get('/', (_req, res) => {
  res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication');
});


app.post('/registerUser', upload.single('profile_image'), async (req, res) => {
  try {
    const { customer_name, customer_email, customer_password, customer_mobile_number, customer_date_of_birth, role } = req.body;
    let profile_image = req.file ? `http://localhost:3080/rent_car_images/${req.file.filename}` : null; 

    const hash = await bcrypt.hash(customer_password, 10);

    if (role === 'agent') {
      const insertQuery = 'INSERT INTO agent (agent_name, agent_email, agent_password, agent_mobile_number, agent_date_of_birth, agent_profile_image) VALUES ($1, $2, $3, $4, $5, $6)';
      await pool.query(insertQuery, [customer_name, customer_email, hash, customer_mobile_number, customer_date_of_birth, profile_image]);
    } else if (role === 'customer') {
      const insertQuery = 'INSERT INTO customer (customer_name, customer_email, customer_password, customer_mobile_number, customer_date_of_birth, customer_profile_image) VALUES ($1, $2, $3, $4, $5, $6)';
      await pool.query(insertQuery, [customer_name, customer_email, hash, customer_mobile_number, customer_date_of_birth, profile_image]);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    let loginData = {
      customer_email,
      signInTime: Date.now(),
    };

    const token = jwt.sign(loginData, jwtSecretKey);
    res.status(200).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});




// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let query, idColumn, nameColumn, emailColumn, mobileNumberColumn, profileImageColumn;

    if (role === 'customer') {
      query = 'SELECT customer_id, customer_name, customer_email, customer_mobile_number, customer_password, customer_profile_image FROM customer WHERE customer_email = $1';
      idColumn = 'customer_id';
      nameColumn = 'customer_name';
      emailColumn = 'customer_email';
      mobileNumberColumn = 'customer_mobile_number';
      profileImageColumn = 'customer_profile_image';
    } else if (role === 'agent') {
      query = 'SELECT agent_id, agent_name, agent_email, agent_mobile_number, agent_password, agent_profile_image FROM agent WHERE agent_email = $1';
      idColumn = 'agent_id';
      nameColumn = 'agent_name';
      emailColumn = 'agent_email';
      mobileNumberColumn = 'agent_mobile_number';
      profileImageColumn = 'agent_profile_image';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const { rows } = await pool.query(query, [email]);
    const user = rows[0];

    if (user) {
      bcrypt.compare(password, user[`${role}_password`], function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: 'Invalid password' });
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          };
          const token = jwt.sign(loginData, jwtSecretKey);
          res.status(200).json({
            message: 'success',
            token,
            userDetails: {
              user_id: user[idColumn],
              user_name: user[nameColumn],
              user_email: user[emailColumn],
              user_mobile_number: user[mobileNumberColumn],
              user_image: user[profileImageColumn]
            },
          });
        }
      });
    } else {
      return res.status(401).json({ message: 'No user found' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[tokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' });
    } else {
      // Access Denied
      return res.status(401).json({ status: 'invalid auth', message: 'error' });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' });
  }
});





// An endpoint to see if there's an existing account for a given email address
app.post('/check-account', async (req, res) => {
  const { email, role } = req.body;

  try {
    let query;

    if (role === 'customer') {
      query = 'SELECT customer_email FROM customer WHERE customer_email = $1';
    } else if (role === 'agent') {
      query = 'SELECT agent_email FROM agent WHERE agent_email = $1';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const { rows } = await pool.query(query, [email]);
    
    const userExists = rows.length === 1;
   
    res.status(200).json({
      status: userExists ? 'User exists' : 'User does not exist',
      userExists,
    });
  } catch (error) {
    console.error('Error checking account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// API endpoint to GET all vehicles
app.post('/api/vehicles', async (req, res) => {
  const { Location, bookingStartTimeStamp, bookingEndTimeStamp } = req.body;
  try {
    const { rows: vehicles } = await pool.query(
      `SELECT * 
       FROM vehicles 
       WHERE vehicle_location = $1 
       AND NOT EXISTS (
         SELECT 1 
         FROM bookings
         WHERE bookings.vehicle_id = vehicles.vehicle_id 
         AND ((starting_time <= $2 AND end_time >= $2) 
         OR (starting_time <= $3 AND end_time >= $3))
       )`,
      [Location, bookingStartTimeStamp, bookingEndTimeStamp]
    );
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching vehicles');
  }
});


app.post('/api/agentvehicles', async (req, res) => {
  try {
    const { agent_email } = req.body;

    const query = 'SELECT * FROM vehicles WHERE agent_email = $1';

    const { rows } = await pool.query(query, [agent_email]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/api/bookingDetails', async (req, res) => {
  const userEmail = req.body.email;
  
  if (!userEmail) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const query = `
      SELECT 
        b.*, 
        v.*
      FROM 
        bookings b
      LEFT JOIN 
        vehicles v ON b.vehicle_id = v.vehicle_id
      WHERE 
        b.customer_email = $1
    `;

    const { rows } = await pool.query(query, [userEmail]); 

    if (!rows.length) {
      return res.status(404).json({ message: 'No bookings found for the provided email' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// API endpoint to update booking details
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      vehicle_id,
      customer_email,
      booking_start_date,
      booking_end_date,
      booking_date,
      booking_status,
      total_price,
      payment_status,
      payment_method,
      created_at,
      booking_start_time,
      booking_end_time,
      booking_location,
      starting_time,
      end_time
    } = req.body;

    console.log('Received Data:', req.body); // Log received data for debugging

    
    const query = `
      INSERT INTO bookings (
        vehicle_id,
        customer_email,
        booking_start_date,
        booking_end_date,
        booking_date,
        booking_status,
        total_price,
        payment_status,
        payment_method,
        created_at,
        booking_start_time,
        booking_end_time,
        booking_location,
        starting_time, 
        end_time
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )
    `;

    const values = [
      vehicle_id,
      customer_email,
      booking_start_date,
      booking_end_date,
      booking_date,
      booking_status,
      total_price,
      payment_status,
      payment_method,
      created_at,
      booking_start_time,
      booking_end_time,
      booking_location,
      starting_time,
      end_time
    ];

    await pool.query(query, values);

    res.status(200).json({ message: 'Booking stored successfully' });
  } catch (error) {
    console.error('Error storing booking:', error);
    res.status(500).json({ message: 'Error storing booking' });
  }
});



const updateBookingStatus = async () => {
  const client = await pool.connect();
  try {
    // SQL query to update booking_status
    const updateQuery = `  UPDATE bookings SET booking_status = CASE
                            WHEN starting_time > CURRENT_TIMESTAMP THEN 'upcoming'
                            WHEN starting_time <= CURRENT_TIMESTAMP AND end_time >= CURRENT_TIMESTAMP THEN 'on going'
                            ELSE 'completed'
                            END;`;

    await client.query(updateQuery);
    console.log(`${new Date().toISOString()} - Booking status updated successfully!`);
  } catch (error) {
    console.error(`Error updating booking status: ${error}`);
  } finally {
    client.release();
  }
};

// Cron job to run every 5 minutes
const job = new CronJob('*/5 * * * *', updateBookingStatus);

// Start the cron job
job.start();

app.listen(3080, () => {
  console.log('Server listening on port 3080');
});
