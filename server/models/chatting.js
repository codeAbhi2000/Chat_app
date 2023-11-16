const db = require("../utils/database");

class Chatting {
    static createChat(userId1, userId2, callback) {
        const chatInsertSQL = "INSERT INTO chats () VALUES ()";
        const participantsInsertSQL =
          "INSERT INTO participants (chat_id, user_id) VALUES (LAST_INSERT_ID(), ?), (LAST_INSERT_ID(), ?)";
    
        const getUserInfoSQL = `
          SELECT c.id AS chat_id, u2.name AS user2_name, u2.status AS user2_status, u2.avatar AS user2_avatar 
          FROM chats c
          JOIN participants p ON c.id = p.chat_id
          JOIN users u2 ON p.user_id = ? 
          WHERE c.id = LAST_INSERT_ID()
          `
        // Execute the queries
        db.query(chatInsertSQL, (chatInsertError, results) => {
          if (chatInsertError) {
            callback(chatInsertError, null);
          } else {
            db.query(participantsInsertSQL, [userId1, userId2], (participantsInsertError) => {
              if (participantsInsertError) {
                callback(participantsInsertError, null);
              } else {
                // Retrieve chat ID and user2 details
                db.query(getUserInfoSQL, [userId2], (userInfoError, userInfoResults) => {
                  if (userInfoError) {
                    callback(userInfoError, null);
                  } else {
                    const chatId = results.insertId;
                    const user2Details = userInfoResults[0];
                    callback(null, { chatId, user2Details });
                  }
                });
              }
            });
          }
        });
    }

  static getChatParticipants(userId, callback) {
    const query = `
    SELECT p.chat_id,u._id, u.name, u.status, u.about,u.avatar, m.text AS last_message, m.created_at AS last_message_time,
    SUM(CASE WHEN m.read = 0 THEN 1 ELSE 0 END) AS unread_message_count
    FROM users u
    JOIN participants p ON u._id = p.user_id
    LEFT JOIN (
    SELECT chat_id, MAX(created_at) AS max_created_at
    FROM messages
    GROUP BY chat_id
    ) latest_message ON p.chat_id = latest_message.chat_id
    LEFT JOIN messages m ON latest_message.chat_id = m.chat_id AND latest_message.max_created_at = m.created_at
    WHERE p.chat_id IN (
    SELECT chat_id FROM participants WHERE user_id = ?
    ) AND u._id <> ?
    GROUP BY p.chat_id, u._id, u.name, u.status, u.avatar, m.text, m.created_at;
    `;
    db.query(query, [userId, userId], callback);
  }

  static sendMessage(chatId, senderUserId,recipientUserId,msgType, messageText, callback) {
    const messageInsertSQL = `INSERT INTO messages (chat_id, from_user_id ,to_user_id,type ,created_at, text) VALUES (?, ?, ?, ?, NOW(),?)`;
    db.query(messageInsertSQL, [chatId, senderUserId,recipientUserId,msgType, messageText], callback);
  }

  static getConversation(userId,chat_id,callback){
    const sql = `
    SELECT DISTINCT m.id AS message_id, m.chat_id, m.from_user_id, m.to_user_id ,m.text, m.created_at AS message_time,
    u._id AS user_id, u.name AS username,
    CASE WHEN m.from_user_id = ? THEN 'Sent' ELSE 'Received' END AS message_type
    FROM messages m
    JOIN participants p ON m.chat_id = p.chat_id
    JOIN users u ON m.from_user_id = u._id
    WHERE p.chat_id = ? 
    ORDER BY m.created_at
    `
    db.query(sql,[userId,chat_id],callback)
  }

  static checkForExistingChat(fromId,toId,callback){
    const sql = `
    SELECT p.chat_id,u._id, u.name, u.status, u.avatar, m.text AS last_message, m.created_at AS last_message_time,
    SUM(CASE WHEN m.read = 0 THEN 1 ELSE 0 END) AS unread_message_count
    FROM users u
    JOIN participants p ON u._id = p.user_id
    LEFT JOIN (
    SELECT chat_id, MAX(created_at) AS max_created_at
    FROM messages
    GROUP BY chat_id
    ) latest_message ON p.chat_id = latest_message.chat_id
    LEFT JOIN messages m ON latest_message.chat_id = m.chat_id AND latest_message.max_created_at = m.created_at
    WHERE p.chat_id IN (
    SELECT chat_id FROM participants WHERE user_id = ? AND chat_id IN (
      SELECT chat_id FROM participants WHERE user_id = ?
    )
    ) AND u._id = ?;
    `
    db.query(sql,[fromId,toId,toId],callback)
  }
}

module.exports = Chatting;
