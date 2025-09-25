const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route.js');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const passport = require('passport');
const session = require('express-session')
require('./auth/google.js')



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,

}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());
app.use('/users', userRoutes);
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('<a href = "/auth/google">Continue With Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: [ 
      'profile',
      'email',
      'https://www.googleapis.com/auth/photoslibrary.readonly'
    ],
    accessType: 'offline',   
    prompt: 'consent'            
  })
);

app.get('/gtoken',
  passport.authenticate('google',
    {
      failureRedirect: '/',
      successRedirect: '/profile',
      
    }
  ),
); 

app.get('/profile', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  const accessToken = req.user.accessToken;
  console.log('Access Token:', req.user.accessToken);
  console.log('Refresh Token:', req.user.refreshToken);

  try {
  await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=10', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/json'
  }
});

    const mediaItems = photosResponse.data.mediaItems || [];
    const photoUrls = mediaItems.map(item => item.baseUrl);

    console.log('mediaItems', mediaItems)

    res.send(`
      <h1>Welcome ${req.user.displayName}</h1>
      <p>Email: ${req.user.emails[0].value}</p>
      <a href='/logout'>Logout</a>
      <h2>Your Google Photos</h2>
      ${photoUrls.map(url => `<img src="${url}=w200-h200" />`).join('')}
    `);
  } catch (error) {
    console.error('Error fetching photos:', error.response?.data || error.message);
    res.send('<h1>Failed to load photos</h1>');
  }
});


app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});