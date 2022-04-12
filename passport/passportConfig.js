const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./userModel");
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
    clientID: "979068446025-hrr0ml12fniuvbhi3ufm576ik9v82o40.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback : true
    },
    async (request, accessToken, refreshToken, profile, done) => {
    try {
    let existingUser = await User.findOne({ 'google.id': profile.id });
    // if user exists return the user 
    if (existingUser) {
    return done(null, existingUser);
    }
    // if user does not exist create a new user 
    console.log('Creating new user...');
    const newUser = new User({
    method: 'google',
    google: {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value
    }
    });
    await newUser.save();
    return done(null, newUser);
    } catch (error) {
    return done(error, false)
    }
    }
    ));
    passport.use(
        new JwtStrategy(
        {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: "secretKey",
        },
        async (jwtPayload, done) => {
        try {
        // Extract user 
        const user = jwtPayload.user;
        done(null, user); 
        } catch (error) {
        done(error, false);
        }
        }
        )
        );
   }