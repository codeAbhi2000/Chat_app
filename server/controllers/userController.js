const User = require("../models/user");
const FriendRequests = require("../models/friendRequest");

exports.getAllVerifiedUsers = (req, res, next) => {
  const uid = req.params.id;
  User.getAllVerifiedUser(uid, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

exports.getAllOtherVerifiedUsers = (req, res, next) => {
  const uid = req.params.id;
  User.getAllOtherVerifiedUsers(uid, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

exports.getFriends = (req, res, next) => {
  const uid = req.params.id;
  User.getFriends(uid, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};

exports.getRequests = (req, res, next) => {
  const uid = req.params.id;
  FriendRequests.getRequests(uid, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};


exports.createRequest = (req,res,next)=>{
    const {sender,recipient} = req.body
    FriendRequests.create(sender,recipient,(err,result)=>{
        if (err) {
            res.status(500).json({
              status: "error",
              msg: "Something went wrong",
            });
          }

          res.status(200).json({
            status: "success",
            msg: 'Request sent successfully'
          });
    })
}
