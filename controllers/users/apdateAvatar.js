const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../../', 'pablic', 'avatars');

const updateAvatar = async (req, res) => {
    const { path: tmpUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const newAvatarName = `${id}_${originalname}`;

    try {
        const resultUpload = path.join(avatarsDir, newAvatarName);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.loin('pablic', 'avatars', newAvatarName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });
    } catch (err) {
        await fs.unlink(tmpUpload);
        throw err;
    }
};

module.exports = updateAvatar;