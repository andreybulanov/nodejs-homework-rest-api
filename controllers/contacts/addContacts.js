const {Contact} = require('../../models');

const addContact = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const result = await Contact.create({...rec.body, owner: _id});
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