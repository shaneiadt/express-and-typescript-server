"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <div>\n      <form method=\"post\">\n        <div>\n          <label for=\"email\">Email</label>\n          <input name=\"email\" type=\"text\" />\n          </div>\n          <div>\n          <label for=\"password\">Password</label>\n          <input name=\"password\" type=\"password\" />\n        </div>\n        <button type=\"submit\">Submit</button>\n      </form>\n    </div>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'test@test.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send("Invalid email or password");
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You're logged in!</div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n      <div>You're <strong>NOT</strong> logged in!</div>\n        <a href=\"/login\">Login</a>\n      </div>\n      ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
