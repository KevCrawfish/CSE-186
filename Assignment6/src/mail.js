const fs = require('fs');
const v4 = require('uuid');

// https://www.uuidtools.com/what-is-uuid
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-' +
             '[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

/**
 * todo:
 * exclude content from return
 * @param {req} req
 * @param {res} res
 */
exports.getAll = async (req, res) => {
  fs.readdir('./data/', (err, files) => {
    if (err) {
      res.status().send();
    }

    const arr = [];
    if (req.query.mailbox !== undefined) {
      files.forEach((file) => {
        const f = require('../data/' + file);
        const name = file.match(/.+(?=\.)/);
        if (req.query.mailbox == name) {
          arr.push({name: String(name), mail: f});
          res.status(200).json(arr);
        }
      });
      res.status(404).send();
    }
    files.forEach((file) => {
      const f = require('../data/' + file);
      const name = file.match(/.+(?=\.)/);
      arr.push({name: String(name), mail: f});
    });
    res.status(200).json(arr);
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
      res.status().send();
    }

    files.forEach((file) => {
      const f = require('../data/' + file);
      if (req.params.id.match(uuid)) {
        const mail = f.find((mail) => mail.id == req.params.id);
        if (mail) {
          res.status(200).json(mail);
        }
      } else {
        res.status(400).send();
      }
    });
    res.status(404).send();
  });
};

/**
 * todo:
 * exclude id, received, from-name, from-email from submission
 * ensure that req.body has expected properties
 * @param {req} req
 * @param {res} res
 */
exports.post = async (req, res) => {
  const send = require('../data/sent.json');
  const date = new Date();
  req.body.id = v4.v4();
  if (req.body.id.match(uuid)) {
    const sent = send.find((sent) => sent.id == req.body.id);
    if (sent) {
      res.status(409).send();
    } else {
      req.body.fromName = 'CSE183 Student';
      req.body.fromEmail = 'cse183-student@ucsc.edu';
      req.body.received = date.toISOString();
      sent.push(req.body);
      res.status(201).send(req.body);
    }
  } else {
    res.status(400).send();
  }
};

/**
 * todo: deleting and appending
 * @param {req} req
 * @param {res} res
 */
exports.put = async (req, res) => {
  if (req.params.id.match(uuid)) {
    fs.readdir('./data/', (err, files) => {
      if (err) {
        res.status().send();
      }

      files.forEach((file) => {
        const f = require('../data/' + file);
        const mail = f.find((mail) => mail.id == req.params.id);
        if (mail) {
          files.forEach((file) => {
            const name = file.match(/.+(?=\.)/);
            if (name == req.query.mailbox) {
              // move from old to new
            }
          });
          // create new mailbox and move from old to new
        }
      });
      res.status(404).send();
    });
  } else {
    res.status(400).send();
  }
};
