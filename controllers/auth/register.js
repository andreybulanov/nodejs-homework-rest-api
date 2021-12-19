const { Conflict } = require('http-errors');
const { User } = require('../../models');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`this email: ${email} is already in use`)
    }

    const newUser = new User({ name, email });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
        status: 'success',
        code: 201,
        user: {
            name,
            email: email,
            subscription: newUser.subscription,
        }
    })
}

module.exports = register;