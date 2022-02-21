const db = require("../dbconnection");

var GetData = {
  insertDataBorrow: function (data, callback) {
    return db.query(
      `INSERT INTO reports(member_id, equipment_id, status, admin_approve_borrow, borrow_date, active) 
      VALUES (?, ?, '0', ?, ?, 1)`,
      [
        data.member_id,
        data.equipment_id,
        data.admin_approve_borrow,
        data.borrow_date,
      ],
      callback
    );
  },
};
module.exports = GetData;
