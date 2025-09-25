// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const { google } = require('googleapis');
// const axios = require('axios');

// // Load Google credentials
// const credentials = JSON.parse(fs.readFileSync('credentials.json'));
// const { client_id, client_secret } = credentials.web;

// const oauth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   'http://localhost:4000/photos/oauth2callback'
// );

// const SCOPES = ['https://www.googleapis.com/auth/photoslibrary.readonly'];
// let globalTokens = null;
// let fetchedPhotos = [];

// // Route: GET /photos/login
// router.get('/login', (req, res) => {
//  const authUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   prompt: 'consent',
//   include_granted_scopes: false,
//   scope: ['https://www.googleapis.com/auth/photoslibrary.readonly'],
//   redirect_uri: 'http://localhost:4000/photos/oauth2callback',
// });

//   res.redirect(authUrl);
// });

// // Route: GET /photos/oauth2callback
// router.get('/oauth2callback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);
//     globalTokens = tokens;

//     console.log('✅ Granted scopes:', tokens.scope);

//     // Fetch photos immediately
//     const response = await axios.post(
//       'https://photoslibrary.googleapis.com/v1/mediaItems:search',
//       { pageSize: 10 },
//       {
//         headers: {
//           Authorization: `Bearer ${globalTokens.access_token}`,
//         },
//       }
//     );

//     fetchedPhotos = response.data.mediaItems || [];

//     res.redirect('/photos/gallery'); // 🔁 Redirect to backend gallery
//   } catch (err) {
//     console.error('❌ Token or fetch error:', err.response?.data || err.message);
//     res.status(500).send('❌ Failed to authenticate or fetch photos.');
//   }
// });

// // Route: GET /photos/gallery
// router.get('/gallery', (req, res) => {
//   if (!fetchedPhotos.length) {
//     return res.send('<h2>No photos to display. <a href="/photos/login">Try login again</a></h2>');
//   }

//   const html = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Your Google Photos</title>
//         <style>
//           body { font-family: sans-serif; text-align: center; padding: 20px; }
//           h2 { color: #333; }
//           .grid { display: flex; flex-wrap: wrap; justify-content: center; }
//           .grid img { width: 200px; margin: 10px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
//         </style>
//       </head>
//       <body>
//         <h2>✅ Your Google Photos</h2>
//         <div class="grid">
//           ${fetchedPhotos.map(photo => `
//             <img src="${photo.baseUrl}" alt="${photo.filename}" />
//           `).join('')}
//         </div>
//       </body>
//     </html>
//   `;

//   res.send(html);
// });

// module.exports = router;
