var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

/* GET User Listing */
router.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://lankareadsproject-frontend.vercel.app');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = process.env.BACKEND_URL ? process.env.BACKEND_URL + '/oauth' : 'https://lankareads-backend-cyan.vercel.app/oauth';

    const oAuth2Client = new OAuth2Client (
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        // scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid'
        ],
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})

});

module.exports = router;