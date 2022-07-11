const fs = require('fs');

// https://www.uuidtools.com/what-is-uuid
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

exports.getAll = async (req, res) => {
    fs.readdir('./data/', (err, files) => {
        if (err) {
            return console.log('err');
        } 

        files.forEach(file => {
        });
    });
}

exports.getByID = async (req, res) => {
    fs.readdir('./data/', (err, files) => {
        if (err) {
            return console.log('err');
        } 

        files.forEach(file => {
            const f = require('../data/' + file);
            if (req.params.id.match(uuid)) {
                const mail = f.find(mail => mail.id == req.params.id);
                if (mail) {
                    return res.status(200).json(mail);
                }
            } else {
                return res.status(400).send();
            }
        });
        res.status(404).send();
    });
}