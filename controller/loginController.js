// including json web token package
const jwt = require("jsonwebtoken");

const getUser = async (username) => {
    return { userId: 123, password: "123456", username };
};
// grab user name and password that came over the payload
module.exports = async (req, res) => {
    const { username, password } = req.body;
//    check database
    const user = await getUser(username);
// check to see if password stored in the database matches login entry
    if (user.password !== password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    delete user.password;
// signs user object by creating hash and putting at as a signature at the end of the jwt
    const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });
// set cookie on response header
    res.cookie("token", token, {
        httpOnly: true
    });

    return res.redirect("/welcome");
};