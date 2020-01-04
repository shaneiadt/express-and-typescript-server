"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <div>\n      <form method=\"post\">\n        <div>\n          <label for=\"email\">Email</label>\n          <input name=\"email\" type=\"text\" />\n          </div>\n          <div>\n          <label for=\"password\">Password</label>\n          <input name=\"password\" type=\"password\" />\n        </div>\n        <button type=\"submit\">Submit</button>\n      </form>\n    </div>\n  ");
});
