const models = require('../models');
const appConfig = require('../app-config');
const utilities = require('../utilities');

module.exports = {
    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;
            models.user.create({ username, password})
                .then((createdUser) => res.send(createdUser))
                .catch(next);
        },
        login: (req, res, next) => {
            const { username, password } = req.body;
            models.user.findOne({ username })
                .then((user) => Promise.all([ user, user.matchPassword(password)]))
                .then(([ user, match ]) => {
                if(!match) {
                    res.status(401).send('Invalid username or password');
                    return;
                }
                const token = utilities.jwt.createToken({ id: user._id });
                res.cookie(config.authCookieName, token).send(user);
            })
            .catch(next);
        },
        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            models.tokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName);
                })
                .catch(next);
        }
    }
}