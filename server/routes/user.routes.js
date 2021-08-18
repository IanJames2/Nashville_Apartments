const UserController = require('../controllers/user.controller'),
    {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/register", UserController.Register)
    app.post("/api/login", UserController.Login)
    app.get("/api/users", authenticate, UserController.FindUser)
    app.get("/api/logout", authenticate, UserController.Logout)
}