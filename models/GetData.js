const db = require("../dbconnection");

var GetData = {
  getDataMember: function (rfid, callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, 
    create_at, update_by, update_at, active FROM member WHERE rfid = ? AND active = 1`,
      [rfid],
      callback
    );
  },

  getDataMemberAll: function (total_data, callback) {
    return !total_data
      ? db.query(
          `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
       active FROM member WHERE active = 1`,
          callback
        )
      : db.query(
          `SELECT id AS member_id FROM member WHERE active = 1 ORDER BY update_at DESC`,
          callback
        );
  },

  getDataEquip: function (rfid, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE rfid = ? AND active = 1`,
      [rfid],
      callback
    );
  },

  getDataEquipAll: function (total_data, callback) {
    return !total_data
      ? db.query(
          `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE active = 1 ORDER BY update_at DESC`,
          callback
        )
      : db.query(
          `SELECT id AS equip_id FROM equipment WHERE active = 1 ORDER BY update_at DESC`,
          callback
        );
  },

  getDataEquipRemain: function (equipID, total_data, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE id = ? AND active = 1`,
      [equipID],
      callback
    );
  },

  getDataBorrowing: function (total_data, callback) {
    return !total_data
      ? db.query(
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.borrow_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 0 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC`,
          callback
        )
      : db.query(
          `SELECT a.id AS report_id, c.id AS equip_id, b.id AS depart_id FROM reports as a 
          JOIN member as b ON a.member_id = b.id
          JOIN equipment as c ON a.equipment_id = c.id
          WHERE a.status = 0 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC`,
          callback
        );
  },

  getDataReverting: function (total_data, callback) {
    return !total_data
      ? db.query(
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.return_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 1 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.return_date DESC`,
          callback
        )
      : db.query(
          `SELECT a.id AS report_id, b.id AS member_id, c.id AS equip_id FROM reports as a 
          JOIN member as b ON a.member_id = b.id
          JOIN equipment as c ON a.equipment_id = c.id
          WHERE a.status = 1 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.return_date DESC`,
          callback
        );
  },

  getDataReport: function (total_data, callback) {
    return !total_data
      ? db.query(
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC, a.return_date DESC`,
          callback
        )
      : db.query(
          `SELECT a.id AS report_id, b.id AS member_id, c.id AS equip_id FROM reports as a 
          JOIN member as b ON a.member_id = b.id
          JOIN equipment as c ON a.equipment_id = c.id
          LEFT JOIN department as d ON a.used_department_id = d.id
          WHERE a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC, a.return_date DESC `,
          callback
        );
  },
};
module.exports = GetData;
