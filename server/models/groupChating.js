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
        parseInt(grpDetails.admin),
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
    gm.message_id,
    gm.group_id,
    gm.type,
    gm.from_user_id,
    gm.text AS message,
    gm.created_at AS message_time,
    u.name AS from_user_name
    FROM group_messages gm
    JOIN group_participants gp ON gm.group_id = gp.group_id
    JOIN users u ON gm.from_user_id = u._id
    WHERE gm.group_id = 1
    ORDER BY gm.created_at
    `;
    db.query(sql,[groupId],callback)
  }

  static addGroupMessages(group_id, from_user_id, type, text,callback){
    const sql = 'INSERT INTO group_messages (group_id, from_user_id, type, text) VALUES (?, ?, ?, ?)'
    db.query(sql,[group_id, from_user_id, type, text],callback)
  }
}

module.exports = Group;
