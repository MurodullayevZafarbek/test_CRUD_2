const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

/* GET home page. */
router.get('/:id', function (req, res, next) {
  fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
    if (err) throw err
    let DATA = JSON.parse(data)
    DATA = DATA.filter(item => item.id == req.params.id)[0]
    res.json({ title: "All data", DATA })
  })
});
router.post('/:id', function (req, res, next) {
  if (req.body.age && req.body.name && req.params.id) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)
      let group = DATA.find(item => item.id == req.params.id)
      if (group) {
        let users = group.users
        users.push({
          id: uuidv4(),
          name: req.body.name,
          age: req.body.age
        })
        DATA.users = users
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(DATA), (err) => {
          if (err) throw err
          res.json({ title: "DATA ADDED", DATA })
        })
      } else {
        res.json("guruh topilmadi")
      }
    })
  } else {
    res.json("nimadir xato")
  }

});
router.put('/:idGroup/:id', function (req, res, next) {
  if (req.params.id && req.params.idGroup) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)

      let groups = DATA.find(item => item.id == req.params.idGroup).users
      if (groups) {
        let user = groups.find(item => item.id == req.params.id)
        if (user) {
          user.name = req.body.name
          user.age = req.body.age
          let newDATA = []
          groups.map(item => {
            if (item.id == user.id) {
              newDATA.push(user)
            } else {
              newDATA.push(item)
            }
          });
          DATA[0].users = newDATA
          fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(DATA), (err) => {
            if (err) throw err
            res.json({ title: "DATA Deleted", DATA })
          })
        } else {
          res.json("User topilmadi")
        }
      } else {
        res.json("Group topilmadi")
      }
    })
  } else {
    res.json("nimadir xato")
  }
});
router.delete('/:idGroup/:id', function (req, res, next) {
  if (req.params.id && req.params.idGroup) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)

      let groups = DATA.find(item => item.id == req.params.idGroup).users
      if (groups) {
        let user = groups.find(item => item.id == req.params.id)
        if (user) {
          let newDATA = []
          groups.map(item => {
            if (item.id !== user.id) {
              newDATA.push(item)
            }
          });
          DATA[0].users = newDATA
          fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(DATA), (err) => {
            if (err) throw err
            res.json({ title: "DATA Deleted", DATA })
          })
        } else {
          res.json("User topilmadi")
        }
      } else {
        res.json("Group topilmadi")
      }
    })
  } else {
    res.json("nimadir xato")
  }

});

module.exports = router;
