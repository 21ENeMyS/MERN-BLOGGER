const User = require("../models/User");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../helpers/dbHandler");
const _ = require("lodash");
const { sendWithNodemailer } = require("../helpers/email");

exports.preSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailUser = await User.findOne({ email: email.toLowerCase() });
    if (emailUser) {
      return res.status(400).json({ error: `${email} is already registered` });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    const emailData = {
      from: `Blogger21 ${process.env.EMAIL_FROM}`,
      to: email,
      subject: `Account activation link`,
      html: `
              <h4>Please use the following link to activate your account</h4>
              <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
              <hr/>
              <p>This email may contain sensetive information</p>
              <p>https://blogger.com</p>
            `,
    };

    await sendWithNodemailer(req, res, emailData);
    return res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instructions to reset your password.expires in 10min`,
    });
  } catch (error) {
    return res.status(500).json({ error: errorHandler(error) });
  }
};

exports.signup = async (req, res) => {
  const { token } = req.body.token;
  if (!token) {
    res.status(500).json({ error: "Something went wrong. Try again" });
  }
  jwt.verify(token, process.env.ACCOUNT_ACTIVATION, (err, decode) => {
    if (err) {
      return res.status(500).json({ error: `expired link.signup again` });
    }
    const { name, email, password } = jwt.decode(token);
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const user = new User({ name, email, password, profile, username });
    user
      .save()
      .then((result) => {
        return res
          .status(200)
          .json({ meessage: `${email} successfully created` });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: `Your email does not exist please register` });
    }

    // const validated = await bcrypt.compare(password, user.password);
    // console.log(validated);
    // if (!validated) {
    //   return res
    //     .status(400)
    //     .json({ error: `Your password and email do not match` });
    // }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Email and password do not match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, role, name } = user;
    return res.json({
      token,
      user: {
        _id,
        username,
        name,
        role,
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: errorHandler(error) });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "signout Success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.authMiddleware = async (req, res, next) => {
  const authUserId = req.auth._id;

  try {
    const user = await User.findById({ _id: authUserId });
    if (!user) {
      return res.status(500).json({ error: `${user} not found` });
    }
    req.profile = user;
  } catch (error) {
    throw new Error(error);
  }
  next();
};

exports.adminMiddleware = async (req, res, next) => {
  const authUserId = req.auth._id;

  const user = await User.findById({ _id: authUserId });
  !user && res.status(400).json({ error: `${user} not found` });
  user.role !== 1 &&
    res.status(400).json({ error: `Admin resource. Access denied` });

  req.profile = user;
  next();
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: `${email} not found` });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    // const link = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

    const emailData = {
      from: `Blogger21 ${process.env.EMAIL_FROM}`,
      to: email,
      subject: `Password reset link`,
      html: `
              <h4>Please use the following link to reset your password:</h4>
              <p>${process.env.CLIENT_URL}/auth/reset/${token}</p>
              <hr/>
              <p>This email may contain sensetive information</p>
              <p>https://blogger.com</p>
            `,
    };

    await user.updateOne({ resetPasswordLink: token });
    await sendWithNodemailer(req, res, emailData);
    return res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instructions to reset your password.expires in 10min`,
    });
  } catch (error) {
    return res.status(500).json({ error: `error` || error });
  }
};

exports.resetPassword = (req, res, next) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (!resetPasswordLink) return;
  jwt.verify(
    resetPasswordLink,
    process.env.JWT_SECRET_RESET_PASSWORD,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Expired link. Try again" });
      }
      try {
        let user = await User.findOne({ resetPasswordLink });
        if (!user) {
          return res
            .status(500)
            .json({ error: "Something went wrong. Try later" });
        }
        const updateFilds = {
          password: newPassword,
          resetPasswordLink: "",
        };
        user = _.extend(user, updateFilds);
        await user.save();
        return res.json({
          message: "Great! Now you can login with your new password",
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  );
};
