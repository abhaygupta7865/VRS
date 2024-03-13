import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import pg from 'pg';


const app = express();

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




// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look up the user entry in the database
    const { rows } = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
    const user = rows[0];

    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user) {
      bcrypt.compare(password, user.password, function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: 'Invalid password' });
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          };

          const token = jwt.sign(loginData, jwtSecretKey);
          res.status(200).json({ message: 'success', token });
        }
      });}
    //  else {
    //   // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    //   bcrypt.hash(password, 10, async function (_err, hash) {
    //     const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    //     await pool.query(insertQuery, [email, hash]);

    //     let loginData = {
    //       email,
    //       signInTime: Date.now(),
    //     };

    //     const token = jwt.sign(loginData, jwtSecretKey);
    //     res.status(200).json({ message: 'success', token });
    //   });
    // }
    else{
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
  const { email } = req.body;

  try {
    const { rows } = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
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
    const { rows: vehicles } = await pool.query('SELECT * FROM vehicles WHERE location = $1',[Location]);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching vehicles');
  }
})



app.listen(3080, () => {
  console.log('Server listening on port 3080');
});
