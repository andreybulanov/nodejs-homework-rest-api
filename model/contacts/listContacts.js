const fs = require('fs/promises');
const contactsPath = require('../../helpers/contactsPath');

const listContacts = async () => {
    const contactsData = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contactsData);
};

module.exports = listContacts;