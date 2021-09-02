const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class AuthController {
  // Check if user is logged in
  // GET /
  async checkUserLogin(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res.status(400).json({ success: false, msg: "User not found!" });
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // GET /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json({ success: true, users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /idusers
  async postID(req, res) {
    const { listID } = req.body;
    try {
      // const users = await User.find({ _id: { $in: listID } });
      const users = await User.find().where("_id").in(listID).exec();
      res.json({ success: true, users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // DELETE /users/:id
  async deleteUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      const users = await User.find({});
      res.json({ success: true, users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /register
  async register(req, res) {
    const { username, password } = req.body;

    // Simple validate username & password
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, msg: "Missing username and/or password" });

    try {
      // Check exiting username
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ success: false, msg: "Username already taken" });

      // Username doesn't register
      const hashedPassword = await argon2.hash(password);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Return token
      // const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN);
      res.json({ success: true, msg: "Register successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }

  // POST /login
  async login(req, res) {
    const { username, password } = req.body;

    // Simple validate username & password
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, msg: "Missing username and/or password" });

    try {
      // Check exiting user
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect username and/or password" });

      // Username found
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword)
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect username and/or password" });

      // Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN
      );
      res.json({
        success: true,
        msg: "Login successfully!",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Interal server error" });
    }
  }
}

module.exports = new AuthController();
