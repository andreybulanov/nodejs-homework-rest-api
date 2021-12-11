const listContacts = require('./listContacts');
const contactsPath = require('../../helpers/contactsPath');
const fs = require('fs/promises');

const removeContact = async (conttactId) => {
    const contactsData = await listContacts();
    const idx = contactsData.findeIndex((item) => item.id === Number(contactId));
    if (idx === -1) {
        return null;
    }

    const dataUpdate = contactsData.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(dataUpdate));
    return listContacts();
};

module.exports = removeContact;