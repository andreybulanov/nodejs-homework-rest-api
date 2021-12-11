const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
    const contactsData = await listContacts();
    return contactsData.find(contakt => contakt.id === Number(contactId))
};

module.exports = getContactById;