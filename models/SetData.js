const db = require("../dbconnection");

var SetData = {
  setDpmID: function (data, callback) {
    return db.query(
      `UPDATE reports SET used_department_id = ? WHERE equipment_id = (SELECT id FROM equipment WHERE rfid = ?) AND active = 1`,
      [data.dpmID, data.rfid],
      callback
    );
  },
};
module.exports = SetData;
