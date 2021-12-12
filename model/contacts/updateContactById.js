const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const updateContactById = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findeIndex((item) => item.id === Number(contactId));
    if (index === -1) {
        return null;
    }

    const updateContact = { ...contacts[index], ...body };
    contacts[index] = updateContact;
    await updateContacts(contacts);
    return updateContact;
};

module.exports = updateContactById;