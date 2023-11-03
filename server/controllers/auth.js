const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const generatOtptmp = require("../utils/presets/otptemplate");
const mailSender = require("../utils/mailService");
const genResetMailTemp = require("../utils/presets/resetMailtemplate");
const secretKey = process.env.JWT_KEY;

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "error", msg: "Something went wrong" });
    } else if (results.length > 0) {
      // res.status(500).json({ error: "error", msg: "User Already Exists" });
      res.locals.uid = results[0]._id;
      next();
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({ error: "Password hashing failed" });
        } else {
          User.create(name, email, hash, (err, result) => {
            if (err) {
              res.status(500).json({ error: "User registration failed" });
            } else {
              console.log(result);
              const insertedId = result.insertId;
              console.log(insertedId);

              res.locals.uid = insertedId;
              next();
            }
          });
        }
      });
    }
  });
};

exports.sentOtp = (req, res, next) => {
  const id = res.locals.uid;
  console.log(id);
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const expiresAt = Date.now() + 10 * 60 * 1000;

  User.otpsettingforUser(id, otp, expiresAt, (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }

    //  console.log(result);
  });
  const template = generatOtptmp(otp); // Implement this function

  //   console.log(template);
  const mailOptions = {
    from: "abhishekvvet@gmail.com",
    to: "badigerabhi2000@gmail.com", // Make sure you have the 'email' variable defined
    subject: "Your OTP for Account Verification",
    html: template,
  };

  mailSender.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      status: "success",
      msg: "OTP sent successfully",
    });
    next();
  });
};

exports.verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(otp, email);
  User.findByEmail(email, (err, result) => {
    console.log(result);
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Some thing wert wrong",
      });
    } else if (Date.now() > result[0].otpexpiry) {
      res.status(401).json({
        status: "Error",
        msg: "OTP Expired",
      });
    } else if (otp === result[0].otp) {
      User.verifyUser(email, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            status: "error",
            msg: "Some thing wert wrong",
          });
        } else {
          res.status(200).json({
            status: "success",
            msg: "User verification successful",
          });
        }
        // console.log(result);
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error", msg: "spmething went wrong" });
    } else if (results.length === 0) {
      res.status(401).json({
        error: "Authentication failed",
        msg: "No user found with this eamil",
      });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          res.status(401).json({
            error: "Authentication failed",
            msg: "Invalid Credential",
          });
        } else {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            secretKey,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token, msg: "Logged in successfull",uid:user._id });
        }
      });
    }
  });
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  User.findByEmail(email, (err, user) => {
    console.log(user);
    if (user.length === 0) {
      res.status(404).json({
        msg: "Email does not exists",
      });
    } else {
      const payload = {
        email: user[0].email,
        userId: user[0]._id,
        exp: Math.floor(Date.now() / 1000) + 600,
      };
      const authToken = jwt.sign(payload, secretKey);
      const url = `http://localhost:3000/resetPassword/${user[0]._id}/${authToken}`;

      const template = genResetMailTemp(url);

      const mailOptions = {
        from: "abhishekvvet@gmail.com",
        to: email,
        subject: "Your Password Reset Link",
        html: template,
      };

      mailSender.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).json({
            status: "error",
            msg: "something went wrong",
          });
        }
        res.status(200).json({
          msg: "Password reset link is sent to Your email",
        });
      });
    }
  });
};

exports.resetPassword = async (req, res, next) => {
  const { uid, pass } = req.body

    console.log(uid, pass);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass, salt)

    User.resetPassowrd(uid,hashedPassword,(err,result)=>{
      if(err){
        res.status(500).json({
          status:'error',
          msg:'Somethinf went wrong'
        })
      }
      res.status(200).json({
        status:'success',
        msg:"Password reset successful"
      })
    })
    
};
