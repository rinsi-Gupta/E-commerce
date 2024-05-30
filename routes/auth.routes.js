const express = require('express');
const UserModel = require('../models/User.model');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    const user = new UserModel({ username, email, role })
    await UserModel.register(user, password);
  
    req.flash('success', 'User registered successfully!!'); 
    res.redirect('/login');
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
   }),
   (req,res)=> {
        req.flash('success', 'Logged In successfully!');
        res.redirect('/products');
   })


router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/products');
    });
});

module.exports = router;



