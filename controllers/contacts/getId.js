const { Contact } = require('../../models');
const { NotFound } = require('http-errors');
const mongoose = require('mongoose');

const getId = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(contactId);
        if (!isValidId) 
             throw new NotFound(`not found ${contactId}`);
            const result = await Contact.findById(contactId);
        
        res.json({
            status: 'success',
            code: 200,
            data: { result }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getId;