const db = require('../utils/database')


class FriendRequests {

    static create(sender,recipient,callback){
        const sql = 'INSERT INTO friendrequest (sender, recipient, sent_on) VALUES (? , ? NOW())';
        db.query(sql,[sender,recipient],callback)
    }
    static getRequests(uid,callback){
        const sql = 'SELECT u.name, u._id, u.email, u.avatar FROM users u INNER JOIN friendrequest f ON u._id = f.recipient WHERE f.recipient = ?';
        db.query(sql ,[uid], callback)
    }

    static findById(id,callback){
        const sql = "SELECT * FROM friendrequest WHERE id = ?";
        db.query(sql,[id],callback)
    }

    static deleteRequest(id,callback){
        const sql = "DELETE FROM friendrequest WHERE id = ?";
        db.query(sql,[id],callback)
    }
}


module.exports = FriendRequests