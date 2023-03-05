import express from "express";
import passport from "passport";
import { login } from "../controllers/auth.js";
const CLIENT_URL = "http://localhost:3000";

const router = express.Router();


router.post("/login", login);
router.get("login/success", (req, res)=> {
    if(req.user){
        res.status(200).json({
            success: true,
            message : "successfull",
            user : req.user
        });
    }
   
});

router.get("/logout", (req, res)=> {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("login/failled", (req, res)=> {
    res.status(401).json({
        success: false,
        message : "faillure"
    });
});
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "login/failled"
}));



export default router;