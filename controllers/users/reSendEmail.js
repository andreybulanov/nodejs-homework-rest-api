const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const reSendEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "missing required field email" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFound('User not found')
    }
    if (user.verify) {
        res.status(400).json({ message: "Verification has already been passed" })
    }
    const mail = {
        to: email,
        subject: 'Подтверждение email',
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    await sendEmail(mail);
    res.json({
        status: 'success',
        code: 200,
        massage: "Verification email sent"
    })
};

module.exports = reSendEmail;