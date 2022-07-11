const fs = require('fs');
const v4 = require('uuid');

// https://www.uuidtools.com/what-is-uuid
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-' +
             '[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

/**
 * todo:
 * @param {req} req
 * @param {res} res
 */
exports.getAll = async (req, res) => {
  fs.readdir('./data/', (err, files) => {
    if (err) {
      return res.status().send();
    }

    const arr = [];
    if (req.query.mailbox !== undefined) {
      files.forEach((file) => {
        let f = require('../data/' + file);
        const name = file.match(/.+(?=\.)/);
        f = f.map(({content, ...cont}) => cont);
        if (req.query.mailbox == name) {
          arr.push({name: String(name), mail: f});
          return res.status(200).json(arr);
        }
      });
      return res.status(404).send();
    }
    files.forEach((file) => {
      let f = require('../data/' + file);
      const name = file.match(/.+(?=\.)/);
      f = f.map(({content, ...cont}) => cont);
      arr.push({name: String(name), mail: f});
    });
    return res.status(200).json(arr);
  });
};

/**
 *
 * @param {req} req
 * @param {res} res
 */
exports.getByID = async (req, res) => {
  fs.readdir('./data/', (err, files) => {
    if (err) {
      return res.status().send();
    }

    files.forEach((file) => {
      const f = require('../data/' + file);
      if (req.params.id.match(uuid)) {
        const mail = f.find((mail) => mail.id == req.params.id);
        if (mail) {
          return res.status(200).json(mail);
        }
      } else {
        return res.status(400).send();
      }
    });
    return res.status(404).send();
  });
};

/**
 * todo:
 * save to file
 * @param {req} req
 * @param {res} res
 */
exports.post = async (req, res) => {
  const send = require('../data/sent.json');
  const date = new Date();
  id = v4.v4();
  if (id.match(uuid)) {
    req.body.id = id;
    req.body.fromName = 'CSE183 Student',
    req.body.fromEmail = 'cse183-student@ucsc.edu',
    req.body.received = date.toISOString();
    send.push(req.body);
    res.status(201).send(req.body);
  } else {
    return res.status(400).send();
  }
};

/**
 * todo:
 * move from old to new
 * create new mailbox and move from old to new
 * save to file
 * @param {req} req
 * @param {res} res
 */
exports.put = async (req, res) => {
  if (req.params.id.match(uuid)) {
    fs.readdir('./data/', (err, files) => {
      if (err) {
        return res.status().send();
      }

      files.forEach((file) => {
        const f = require('../data/' + file);
        const name = file.match(/.+(?=\.)/);
        const mail = f.find((mail) => mail.id == req.params.id);
        const mailIndex = f.findIndex((mail) => mail.id == req.params.id);
        if (mail) {
          if (name == 'sent' && req.query.mailbox !== 'sent') {
            return res.status(409).send();
          }
          files.forEach((file) => {
            const name = file.match(/.+(?=\.)/);
            if (name == req.query.mailbox) {
              let m = require('../data/' + req.query.mailbox);
              f.splice(mailIndex, 1)[0];
              return res.status(204).send();
            }
          });
          // make new mail
        }
      });
      return res.status(404).send();
    });
  } else {
    return res.status(400).send();
  }
};
