const express=require('express');
const router=express.Router();
const User=require('../models/user');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const { addPerson } = require('../controllers/addPerson');
const { userLogin } = require('../controllers/userLogin');
const { getProfile, updatePassword } = require('../controllers/userProfile');

// POST route to add a person
router.post('/signup', addPerson);

// Login Route
router.post('/login', userLogin);

// Profile route
router.get('/profile', jwtAuthMiddleware, getProfile)
router.put('/profile/password', jwtAuthMiddleware, updatePassword);

module.exports = router;