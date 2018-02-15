const fs = require('fs');
const Sprite = require('../Classes/Sprite');

var sprites = {
    init : function () {
        var dirPath = global.__basedir + "\\resources";

        var dir = fs.readdirSync(dirPath);
        for (var i = 0; i < dir.length; i++) {
            if (dir[i].substring(dir[i].length - 4, dir[i].length) === ".png") {
                const name = dir[i].substring(0, dir[i].length - 4);

                sprites[name] = new Sprite(dirPath + "\\" + dir[i]);
                console.log("[Sprites] " + name + " loaded");
            }
        }
    }
};

module.exports = sprites;