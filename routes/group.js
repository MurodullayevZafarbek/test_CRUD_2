const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile(path.join(__dirname, "/data.json"), 'utf-8', (err, data) => {
    if (err) throw err
      (data);
    let DATA = JSON.parse(data)
    res.json({ title: "All data", DATA })
  })
});
router.post('/', function (req, res, next) {
  if (req.body.title) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)
      DATA.push({
        id: uuidv4(),
        title: req.body.title,
        users: []
      })
      fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(DATA), (err) => {
        if (err) throw err
        res.json({ title: "DATA ADDED", DATA })
      })
    })
  } else {
    res.json("nimadir xato")
  }

});
router.put('/:id', function (req, res, next) {
  if (req.body.title && req.params.id) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)
      let user = DATA.find(item => item.id == req.params.id)
      if (user) {
        user.title = req.body.title
        let newDATA = []
        DATA.forEach(item => {
          if (item.id == user.id) {
            newDATA.push(user)
          } else {
            newDATA.push(item)
          }
        });
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(newDATA), (err) => {
          if (err) throw err
          res.json({ title: "DATA Changed", DATA })
        })
      } else {
        res.json("user topilmadi")
      }
    })
  } else {
    res.json("nimadir xato")
  }

});
router.delete('/:id', function (req, res, next) {
  if (req.params.id) {
    fs.readFile(path.join(__dirname, "data.json"), 'utf-8', (err, data) => {
      if (err) throw err
      let DATA = JSON.parse(data)
      let user = DATA.find(item => item.id == req.params.id)
      if (user) {
        let newDATA = []
        DATA.forEach(item => {
          if (item.id == user.id) {
          } else {
            newDATA.push(item)
          }
        });
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(newDATA), (err) => {
          if (err) throw err
          res.json({ title: "DATA Deleted", DATA })
        })
      } else {
        res.json("Group topilmadi")
      }
    })
  } else {
    res.json("nimadir xato")
  }

});

module.exports = router;
