const fs = require('fs');
const v4 = require('uuid');

// https://www.uuidtools.com/what-is-uuid
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-' +
             '[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

/**
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
    } else {
      files.forEach((file) => {
        let f = require('../data/' + file);
        const name = file.match(/.+(?=\.)/);
        f = f.map(({content, ...cont}) => cont);
        arr.push({name: String(name), mail: f});
      });
      return res.status(200).json(arr);
    }
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
 * @param {req} req
 * @param {res} res
 */
exports.post = async (req, res) => {
  const date = new Date();
  id = v4.v4();
  if (id.match(uuid)) {
    req.body.id = id;
    req.body.fromName = 'CSE183 Student',
    req.body.fromEmail = 'cse183-student@ucsc.edu',
    req.body.received = date.toISOString();
    fs.readFile('data/sent.json', (err, data) => {
      if (err) {
        res.status().send();
      }
      const json = JSON.parse(data);
      json.push(req.body);
      fs.writeFile('data/sent.json', JSON.stringify(json), (err) => {
        if (err) {
          res.status().send();
        }
      });
    });
    res.status(201).send(req.body);
  } else {
    return res.status(400).send();
  }
};

/**
 *
 * @param {req} req
 * @param {res} res
 */
exports.put = async (req, res) => {
  fs.readdir('./data/', (err, files) => {
    if (err) {
      return res.status().send();
    }

    files.forEach((file) => {
      const f = require('../data/' + file);
      if (req.params.id.match(uuid)) {
        const mail = f.find((mail) => mail.id == req.params.id);
        const mailIndex = f.find((mail) => mail.id == req.params.id);
        if (mail) {
          const name = file.match(/.+(?=\.)/);
          let flag = 0;
          if (req.query.mailbox == 'sent' && name != 'sent') {
            return res.status(409).send();
          }
          fs.readFile('data/' + file,
            (err, data) => {
              if (err) {
                return res.status().send();
              }
              const json = JSON.parse(data);
              json.splice(mailIndex, 1);
              fs.writeFile('data/' + file,
                JSON.stringify(json), (err) => {
                  if (err) {
                    return res.status().send();
                  }
                });
            });
          files.forEach((file) => {
            const name = file.match(/.+(?=\.)/);
            if (name == req.query.mailbox) {
              fs.readFile('data/' + req.query.mailbox + '.json',
                (err, data) => {
                  if (err) {
                    return res.status().send();
                  }
                  const json = JSON.parse(data);
                  json.push(mail);
                  fs.writeFile('data/' + req.query.mailbox + '.json',
                    JSON.stringify(json), (err) => {
                      if (err) {
                        return res.status().send();
                      }
                    });
                });
              flag = 1;
              return res.status(204).send();
            }
          });
          if (flag === 0) {
            fs.writeFile('data/' + req.query.mailbox + '.json',
              '[' + JSON.stringify(mail) + ']', (err) => {
                if (err) {
                  return res.status().send();
                }
              });
            return res.status(204).send();
          }
        }
      } else {
        return res.status(400).send();
      }
    });
    return res.status(404).send();
  });
};
