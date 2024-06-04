//! This file sets up the signup route and connects it to the corresponding controller and model.
//! The '/signup' route receives a POST request, which is handled by the 'signup' function located in the 'authController' file.
//! The 'signup' function is then exported by the 'authController' module.
//! The exported 'signup' function is then used as the handler for the '/signup' route.
//! This file is exported as the 'router' module and can be used to define other routes.
//!this file will take the signup route and send it to the controller, and controller will send it to the model.

const { signup } = require('../controller/authController')

const router = require('express').Router()

router.route(`/signup`).post(signup)

module.exports = router

