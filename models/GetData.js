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

  getDataMemberAll: function (callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
       active FROM member WHERE active = 1 ORDER BY update_at DESC`,
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

  getDataEquipAll: function (callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment WHERE active = 1 ORDER BY update_at DESC`,
      callback
    );
  },

  getDataEquipRemainAll: function (callback) {
    return db.query(
      `SELECT DISTINCT equipment.equipment_name, equipment.brand, equipment.model, COUNT(*) as total FROM equipment
      LEFT JOIN reports ON equipment.id = reports.equipment_id
      WHERE (reports.status = 1 OR
      NOT EXISTS
      (
      SELECT * FROM reports
      WHERE equipment.id = reports.equipment_id
      )) 
			GROUP BY equipment.equipment_name, equipment.brand, equipment.model`,
      callback
    );
  },

  // getDataEquipRemain: function (equipID, callback) {
  //   return db.query(
  //     `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by,
  //     create_at, update_by, update_at, active FROM equipment WHERE id = ? AND active = 1`,
  //     [equipID],
  //     callback
  //   );
  // },

  getDataBorrowing: function (callback) {
    return db.query(
      `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.borrow_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 0 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.borrow_date DESC`,
      callback
    );
  },

  getDataReverting: function (callback) {
    return db.query(
      `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, c.brand, c.model, a.return_date 
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      WHERE a.status = 1 AND a.active = 1 AND b.active = 1 AND c.active = 1 ORDER BY a.return_date DESC`,
      callback
    );
  },

  searchDataEquipRemain: function (search_value, callback) {
    return db.query(
      `SELECT DISTINCT equipment.equipment_name, equipment.brand, equipment.model, COUNT(*) as total FROM equipment
      LEFT JOIN reports ON equipment.id = reports.equipment_id
      WHERE (reports.status = 1 OR
      NOT EXISTS
      (
      SELECT * FROM reports
      WHERE equipment.id = reports.equipment_id
      )) AND (equipment.equipment_name = ? OR equipment.brand = ? OR equipment.model = ?)
			GROUP BY equipment.equipment_name, equipment.brand, equipment.model`,
      [search_value, search_value, search_value],
      callback
    );
  },

  SearchDataReport: function (data, callback) {
    let typeSearch = data.typeSearch;
    return db.query(
      ///////////////////////////////////////////////////////////ทั้งหมด////////////////////////////////////////////////////////////////////////////////////
      typeSearch == 0
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
      LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 
      ORDER BY a.update_at DESC`
        : ////////////////////////////////////////////////////ทั้งหมด Search////////////////////////////////////////////////////////////////////////////////////
        typeSearch == 1
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.update_at DESC`
        : /////////////////////////////////////////////////////ยืม/////////////////////////////////////////////////////////////////////////////////////////
        typeSearch == 2
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 0 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.borrow_date DESC`
        : //////////////////////////////////////////////////////คืน///////////////////////////////////////////////////////////////////////////////////////////
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, a.update_at, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 1 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.return_date DESC`,
      [data.firstDate, data.untilDate, data.firstDate, data.untilDate],
      callback
    );
  },

  searchDataMember: function (search_value, callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
      active FROM member WHERE active = 1 AND (firstname = ? OR lastname = ? OR username = ? OR telephone = ?)
      ORDER BY update_at DESC`,
      [search_value, search_value, search_value, search_value],
      callback
    );
  },

  searchDataEquip: function (search_value, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment 
			WHERE active = 1 AND (equipment_name = ? OR equipment_number = ? OR brand = ?) ORDER BY update_at DESC`,
      [search_value, search_value, search_value],
      callback
    );
  },
};
module.exports = GetData;
