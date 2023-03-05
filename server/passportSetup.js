const passportSetup = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const GOOGLE_CLIENT_ID = "54317362060-7ktje464nje38mi78jug65etoat3vhg4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
import User from "./models/User";



passportSetup.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID, 
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/redirect/google",
    scope: [ 'profile' ]
},
function(accessToken, refreshTOken, profile, done){
    const user =User.findOrCreate({googleId:profile.id, email : profile.emails[0].value }, function(err, user){
        return done(err, user);
    });
    
 //  done(null, profile);
 

}

));

passportSetup.serializeUser((user, done)=>{
    done(null, user)
})


passportSetup.deserializeUser((user, done)=>{
    done(null, user)
});

export default passportSetup;