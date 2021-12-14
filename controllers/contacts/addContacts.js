const {Contact} = require('../../models');

const addContact = async (req, res, next) => {
    try {
        const result = await Contact.create(rec.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {result}
        });
    } catch (err) {
        next(err);
    }
}
 
module.exports = addContact;