const express = require('express'),
    router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.post("/gl", function (req, res) {
    var data = require('../model/Database/sprites')['visual'].getDrawObject(req.body);
    res.send(data);
});

module.exports = router;