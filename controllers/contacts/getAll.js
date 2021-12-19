const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const data = await Contact.find({ owner: _id }, '', {skip, limit: Number(limit)})
            .populate('owner', '_id name email subscription');
        
        res.json({
            status: 'success',
            code: 200,
            data,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getAll;