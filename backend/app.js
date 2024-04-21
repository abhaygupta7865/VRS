import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import pg from 'pg';
// import { DateTime } from 'luxon';


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
// pool.query('select * from users',(err,res)=>{
//   if(!err){
//       console.log(res.rows)
//   }
//   else{
//       console.log(err.message)
//   }
//   pool.end
// })

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


app.post('/register', async (req, res) => {
  try {
    const { customer_name, customer_email, customer_password, customer_mobile_number, customer_date_of_birth } = req.body;

    
      const hash = await bcrypt.hash(customer_password, 10);
      const insertQuery = 'INSERT INTO customer (customer_name, customer_email, customer_password, customer_mobile_number, customer_date_of_birth) VALUES ($1, $2, $3, $4, $5)';
      await pool.query(insertQuery,[customer_name,customer_email, hash, customer_mobile_number, customer_date_of_birth ]);

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
  const { email, password } = req.body;

  try {
    // Look up the user entry in the database
    const { rows } = await pool.query('SELECT customer_id, customer_name, customer_email, customer_mobile_number, customer_password FROM customer WHERE customer_email = $1', [email]);
    const user = rows[0];

    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
      bcrypt.compare(password, user.customer_password, function (_err, result) {
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
              customer_id: user.customer_id,
              customer_name: user.customer_name,
              customer_email: user.customer_email,
              customer_mobile_number: user.customer_mobile_number,
            },
          });
        }
      });
    } else {
      return res.status(401).json({ message: 'no user found' });
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
  const {email} = req.body;

  try {
    const { rows } = await pool.query('SELECT customer_email FROM customer WHERE customer_email = $1', [email]);
    
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
  const {Location}=req.body
  try {
    const { rows: vehicles } = await pool.query('SELECT * FROM vehicles WHERE vehicle_location = $1',[Location]);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching vehicles');
  }
})


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
    } = req.body;

    const addTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date(0, 0, 0, hours, minutes);
      date.setMinutes(date.getMinutes() + 330); // Adding 330 minutes (5 hours 30 minutes)
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const updatedBookingStartTime = addTime(booking_start_time);
    const updatedBookingEndTime = addTime(booking_end_time);

    const combineDateTime = (date, time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    const bookingStartTimeStamp = combineDateTime(booking_start_date, updatedBookingStartTime);
    const bookingEndTimeStamp = combineDateTime(booking_end_date, updatedBookingEndTime);
    
    
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
      updatedBookingStartTime,
      updatedBookingEndTime,
      booking_location,
      bookingStartTimeStamp,
      bookingEndTimeStamp
    ];

    await pool.query(query, values);

    res.status(200).json({ message: 'Booking stored successfully' });
  } catch (error) {
    console.error('Error storing booking:', error);
    res.status(500).json({ message: 'Error storing booking' });
  }
});



app.listen(3080, () => {
  console.log('Server listening on port 3080');
});
