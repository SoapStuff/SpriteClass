const express = require('express'),
    router = express.Router();

var sprites = require('../model/Database/sprites');

router.get("/", function (req, res) {
    res.render("index");
});

router.post("/gl", function (req, res) {
    var imageName = req.body.imageName;
    if (!sprites[imageName]) {
        imageName = "testFull";
    }
    sprites[imageName].move(req.body.key);
    var data = sprites[imageName].getDrawObject(req.body);
    res.send(data);
});

module.exports = router;