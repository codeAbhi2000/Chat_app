const db = require("../utils/database");

class User {
  static findByEmail(email, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  }
  static findById(uid, callback) {
    console.log(uid);
    const sql = "SELECT * FROM users WHERE _id = ?";
    db.query(sql, [uid], callback);
  }

  static create(name, email, password, callback) {
    const sql = "INSERT INTO users (name, email, password,friends) VALUES (?, ?, ?,'[]')";
    db.query(sql, [name, email, password], callback);
  }

  static otpsettingforUser(uid, otp, expiry_time, callback) {
    // console.log(otp,uid);
    const sql = "UPDATE users SET otp = ? , otpexpiry = ? where _id = ?";
    db.query(sql, [otp, expiry_time, uid], callback);
  }

  static verifyUser(email, callback) {
    const sql = "UPDATE users SET verified = ? where email = ?";
    db.query(sql, [true, email], callback);
  }

  static resetPassowrd(uid, pass, callback) {
    const sql = "UPDATE users SET password = ? where _id = ?";
    db.query(sql, [pass, uid], callback);
  }

  static updateSocketIdAndStatus(uid, socket_id,status, callback) {
    const sql = "UPDATE users SET socket_id = ? , status = ? WHERE _id = ?";
    db.query(sql, [socket_id,status, uid], callback);
  }

  static updateStatus(uid,status,callback) {
    const sql = "UPDATE users SET  status = ? WHERE _id = ?";
    db.query(sql, [status, uid], callback);
  } 

  static getAllVerifiedUser(uid, callback) {
    const sql =
      "SELECT name , _id,avatar,status,email FROM users  WHERE verified = ? AND _id <> ? ";
    db.query(sql, [1, uid], callback);
  }

  static getAllOtherVerifiedUsers(uid, callback) {
    const sql =
      "SELECT _id, name FROM users WHERE verified = ? AND _id <> ? AND JSON_SEARCH(friends, 'one', ?) IS NULL";
    db.query(sql, [1, uid, uid], callback);
  }

  static getFriends(uid, callback) {
    const sql =
      "CALL GetFriendDetails(?)";
    db.query(sql, [uid], callback);
  }

  static updateFriendList(fid, uid, callback) {
    console.log(fid,uid);
    const sql =
      "UPDATE users SET friends = JSON_ARRAY_APPEND(friends, '$', ?) WHERE _id = ? ";
    db.query(sql, [fid, uid], callback);
  }

  static updateProfile(avatar,about,name,uid,callback){
    const sql = `UPDATE users SET avatar = ? ,about = ? ,name = ? WHERE _id = ?`
    db.query(sql,[avatar,about,name,uid],callback)
  }

  static addGroupsId(group_id,user_id,callback){
    db.query(
      "SELECT groupsIn FROM users WHERE _id = ?",
      [user_id],
      (error, results) => {
        if (error) {
          // Handle the error
          callback(error, null);
        } else {
          // Parse the existing JSON array
          const existingAdminArray = results[0].group_admin;

          // Check if userId is not already in the array to avoid duplicates
          if (!existingAdminArray?.includes(group_id.toString())) {
            // Insert the userId into the array
            existingAdminArray.push(group_id.toString());

            // Update the group_admin in the database
            db.query(
              "UPDATE users SET groupsIn = ? WHERE user_id = ?",
              [JSON.stringify(existingAdminArray), user_id],
              (updateError, result) => {
                if (updateError) {
                  // Handle the update error
                  callback(updateError, null);
                } else {
                  // The userId has been inserted into the group_admin array
                  callback(null, result);
                }
              }
            );
          } else {
            // The userId is already in the array, handle accordingly
            callback("error", null);
          }
        }
      }
    );
  }
}

module.exports = User;
