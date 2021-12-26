const { Conflict } = require('http-errors');
const { User } = require('../../models');
const gravatar = require('gravatar');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`this email: ${email} is already in use`)
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
        status: 'success',
        code: 201,
        user: {
            name, 
            email: email,
            subscription: newUser.subscription,
            avatarURL,
        }
    })
}

module.exports = register;