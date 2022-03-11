const db = require("../dbconnection");

var SetData = {
  setDpmID: function (data, callback) {
    return db.query(
      `UPDATE reports SET used_department_id = ?, update_at = ? WHERE equipment_id = (SELECT id FROM equipment WHERE rfid = ? AND active = 1) AND active = 1`,
      [data.dpmID, data.datetime, data.rfid],
      callback
    );
  },

  getEquipDepart: function (data, callback) {
    return db.query(
      `SELECT c.id, c.rfid, c.serial_number, c.equipment_number, c.equipment_name, c.brand, c.model, a.update_at, a.create_at, a.active, a.borrow_date, a.return_date 
      FROM reports as a 
      JOIN department as b ON a.used_department_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.used_department_id = ? ORDER BY a.update_at DESC`,
      [data.dpmID],
      callback
    );
  },
};
module.exports = SetData;
