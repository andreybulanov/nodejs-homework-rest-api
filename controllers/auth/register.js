const { Conflict } = require('http-errors');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers');
const { User } = require('../../models');
const gravatar = require('gravatar');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`this email: ${email} is already in use`)
    }

    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
        to: email,
        subject: 'Подтверждение email',
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    
    await sendEmail(mail);

    res.status(201).json({
        status: 'success',
        code: 201,
        user: {
            name, 
            email: email,
            subscription: newUser.subscription,
            avatarURL,
            verificationToken
        }
    })
}

module.exports = register;