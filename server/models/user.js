const db = require('../utils/database')


class User {
    static findByEmail(email, callback) {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.query(sql, [email], callback);
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
}
  
  module.exports = User;