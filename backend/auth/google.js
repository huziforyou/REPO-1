const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config
const axios = require('axios')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    accessType: 'offline',
    prompt: 'consent',         
    includeGrantedScopes: true,
    passReqToCallback: true
},
    async function (req, accessToken, refreshToken, profile, cb) {
        try {
            const tokenInfo = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`);
            console.log("AccessToken:", accessToken);
            console.log("RefreshToken:", refreshToken);
            console.log("Token Scopes:", tokenInfo.data.scope);

            const user = {
                displayName: profile.displayName,
                emails: profile.emails,
                accessToken,
                refreshToken
            };

            return cb(null, user);
        } catch (error) {
            console.error('Error validating token scopes:', error.response?.data || error.message);
            return cb(error); 
        }
    }));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);

});