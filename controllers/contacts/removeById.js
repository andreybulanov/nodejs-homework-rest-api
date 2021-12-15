const { NotFound } = require('http-errors');
const {Contact} = require('../../models');

const removeById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw new NotFound(`not found ${contactId}`);
        };
        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'contact deleted',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = removeById;