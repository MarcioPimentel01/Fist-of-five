//! Signup function

const signup = (req, res, next) => {

    res.json(
        {
            status: 'success',
            message: 'Signup route is on'
        }
    )
}
module.exports = { signup }; //? The curly braces are not necessary when exporting only one function, I just want to create a good practice.