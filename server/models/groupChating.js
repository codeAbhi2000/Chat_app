const db = require("../utils/database");

class Group {
  static create(grpDetails, fparticipants, callback) {
    const createGroupSQL =
      "INSERT INTO my_groups (group_name, tagline, icon, group_admin) VALUES (?, ?, ?, ?)";
    const addParticipantsSQL =
      "INSERT INTO group_participants (group_id, user_id) VALUES (?, ?)";

    const participants = fparticipants; // Adjust the array based on the number of participants

    console.log(grpDetails, fparticipants);
    // Execute the queries
    db.query(
      createGroupSQL,
      [
        grpDetails.grpName,
        grpDetails.tagline,
        grpDetails.iconBuffer,
        grpDetails.jadmin,
      ],
      (createGroupError, createGroupResults) => {
        if (createGroupError) {
          callback(createGroupError, null);
        } else {
          const groupId = createGroupResults.insertId;

          // Add participants to the group
          participants.forEach((participant) => {
            db.query(
              addParticipantsSQL,
              [groupId, participant],
              (addParticipantError) => {
                if (addParticipantError) {
                  callback(addParticipantError, null);
                }
              }
            );
          });

          callback(null, { groupId });
        }
      }
    );
  }

  static getGroupList(user_id, callback) {
    const sql = `
    SELECT g.*, m.text AS last_message, m.created_at AS last_message_time
    FROM my_groups g
    INNER JOIN group_participants gp ON g.group_id = gp.group_id
    LEFT JOIN (
        SELECT group_id, MAX(created_at) AS max_created_at
        FROM group_messages
        GROUP BY group_id
    ) latest_message ON g.group_id = latest_message.group_id
    LEFT JOIN group_messages m ON latest_message.group_id = m.group_id AND latest_message.max_created_at = m.created_at
    WHERE gp.user_id = ?;
    `;
    db.query(sql, [user_id], callback);
  }

  static getGroupMessages(groupId, callback) {
    const sql = `
    SELECT
    DISTINCT gm.message_id,
    gm.group_id,
    gm.type,
    gm.from_user_id,
    gm.text AS message,
    gm.created_at AS message_time,
    u.name AS from_user_name
    FROM group_messages gm
    JOIN group_participants gp ON gm.group_id = gp.group_id
    JOIN users u ON gm.from_user_id = u._id
    WHERE gm.group_id = ?
    ORDER BY gm.created_at
    `;
    db.query(sql, [groupId], callback);
  }

  static addGroupMessages(group_id, from_user_id, type, text, callback) {
    const sql =
      "INSERT INTO group_messages (group_id, from_user_id, type, text) VALUES (?, ?, ?, ?)";
    db.query(sql, [group_id, from_user_id, type, text], callback);
  }

  static getParticipants(group_id, callback) {
    const sql = "SELECT user_id FROM group_participants WHERE group_id = ? ";
    db.query(sql, [group_id], callback);
  }

  static getParticipantsDetails(group_id, callback) {
    const sql = `select u._id ,u.avatar,u.name from  users u left join group_participants g on u._id = g.user_id where g.group_id = ? `;
    db.query(sql, [group_id], callback);
  }

  static addParticipant(group_id, user_ids, callback) {
    const sql = "INSERT INTO group_participants (group_id,user_id)  VALUES(?,?) ";
     user_ids.forEach((user)=>{
       db.query(sql,[group_id,user],(err)=>{
        callback(err,null)
       })
     })
     callback(null,"success")
  }

  static removeParticipants(group_id, user_id, callback) {
    const sql =
      "DELETE FROM group_participants WHERE group_id = ? and user_id = ? ";
    db.query(sql, [group_id, user_id], callback);
  }

  static makeAdmin(group_id, user_id, callback) {
    db.query(
      "SELECT group_admin FROM my_groups WHERE group_id = ?",
      [group_id],
      (error, results) => {
        if (error) {
          // Handle the error
          callback(error, null);
        } else {
          // Parse the existing JSON array
          const existingAdminArray = results[0].group_admin;

          // Check if userId is not already in the array to avoid duplicates
          if (!existingAdminArray.includes(user_id.toString())) {
            // Insert the userId into the array
            existingAdminArray.push(user_id.toString());

            // Update the group_admin in the database
            db.query(
              "UPDATE my_groups SET group_admin = ? WHERE group_id = ?",
              [JSON.stringify(existingAdminArray), group_id],
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

  static removeFromAdmin(group_id,user_id,callback){
    db.query('SELECT group_admin FROM my_groups WHERE group_id = ?', [group_id], (error, results) => {
      if (error) {
        // Handle the error
        callback(error,null)
      } else {
        // Parse the existing JSON array
        const existingAdminArray = (results[0].group_admin);
    
        // Check if userId is in the array
        const userIdIndex = existingAdminArray.indexOf(user_id.toString());
    
        if (userIdIndex !== -1) {
          // Remove userId from the array
          existingAdminArray.splice(userIdIndex, 1);
    
          // Update the group_admin in the database
          db.query('UPDATE my_groups SET group_admin = ? WHERE group_id = ?', [JSON.stringify(existingAdminArray), group_id], (updateError,result) => {
            if (updateError) {
              // Handle the update error
              callback(updateError,null)
            } else {
              // The userId has been removed from the group_admin array
              callback(null,result)
            }
          });
        } else {
          // userId is not in the array, handle accordingly
          callback("error",null)
        }
      }
    });
  }
}

module.exports = Group;
