const db = require('../utils/database')

class User {
    static findByEmail(email, callback) {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.query(sql, [email], callback);
    }
    static findById(uid, callback) {
      const sql = 'SELECT * FROM users WHERE _id = ?';
      db.query(sql, [uid], callback);
    }
  
    static create(name, email, password, callback) {
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, password], callback);
    }

    static otpsettingforUser(uid,otp,expiry_time,callback){
        // console.log(otp,uid);
        const sql = 'UPDATE users SET otp = ? , otpexpiry = ? where _id = ?';
        db.query(sql,[otp,expiry_time,uid] , callback);
    }

    static verifyUser(email,callback){
        const sql = 'UPDATE users SET verified = ? where email = ?';
        db.query(sql,[true,email],callback)
    }

    static resetPassowrd(uid,pass,callback){
      const sql = 'UPDATE users SET password = ? where _id = ?';
      db.query(sql,[pass,uid],callback)
    }

    static updateSocketId(uid,socket_id,callback){
       const sql = 'UPDATE users SET socket_id = ? WHERE _id = ?'
       db.query(sql,[socket_id,uid],callback)
    }

    static getAllVerifiedUser(uid, callback){
      const sql = "SELECT name , _id FROM users  WHERE verified = ? AND _id <> ? ";
      db.query(sql,[1,uid], callback)
    }

    static getAllOtherVerifiedUsers(uid,callback){
      const sql = "SELECT _id, name FROM users WHERE verified = ? AND _id <> ? AND JSON_SEARCH(friends, 'one', ?) IS NULL";
      db.query(sql,[1,uid,uid] ,callback)
    }

    static getFriends(uid,callback){
      const sql = "SELECT u._id AS friend_id, u.name AS friend_name FROM users u JOIN (SELECT DISTINCT JSON_UNQUOTE(JSON_EXTRACT(friends, '$[*]')) AS friend_id FROM users WHERE _id = ? ) f ON u._id = f.friend_id";
      db.query(sql ,[uid] , callback)
    }

    static updateFriendList(fid,uid){
      const sql = "UPDATE users SET friends = JSON_ARRAY_APPEND(friends, '$', ?) WHERE _id = ? ";
      db.query(sql ,[fid,uid],callback) 
    }
}
  
  module.exports = User;