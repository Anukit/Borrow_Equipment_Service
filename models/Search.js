const db = require("../dbconnection");

var Search = {
  getDataEquipAll: function (data, callback) {
    return db.query(
      `SELECT id AS equip_id FROM equipment WHERE active = 1 AND (equipment_name = ? OR brand = ? OR model = ?) ORDER BY update_at DESC`,
      [data.search_value, data.search_value, data.search_value],
      callback
    );
  },

  SearchDataReport: function (data, callback) {
    let typeSearch = data.typeSearch;
    return db.query(
      typeSearch == 1
        ? ////////////////////////////////////////////////////ทั้งหมด////////////////////////////////////////////////////////////////////////////////////
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.borrow_date DESC, a.return_date DESC`
        : /////////////////////////////////////////////////////ยืม/////////////////////////////////////////////////////////////////////////////////////////
        typeSearch == 2
        ? `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 0 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.borrow_date DESC, a.return_date DESC`
        : //////////////////////////////////////////////////////คืน///////////////////////////////////////////////////////////////////////////////////////////
          `SELECT a.id, b.username, b.firstname, b.lastname, c.equipment_name, c.equipment_number, a.return_date, a.borrow_date, d.department_name, a.status
      FROM reports as a 
      JOIN member as b ON a.member_id = b.id
      JOIN equipment as c ON a.equipment_id = c.id
			LEFT JOIN department as d ON a.used_department_id = d.id
      WHERE a.active = 1 AND b.active = 1 AND c.active = 1 AND  a.status = 1 AND borrow_date BETWEEN ? AND ? OR return_date BETWEEN ? AND ?
			ORDER BY a.borrow_date DESC, a.return_date DESC`,
      [data.firstDate, data.untilDate, data.firstDate, data.untilDate],
      callback
    );
  },

  SearchDataMember: function (data, callback) {
    return db.query(
      `SELECT id, rfid, username, firstname, lastname, telephone, gender, image_file, create_by, create_at, update_by, update_at,
      active FROM member WHERE active = 1 AND (firstname = ? OR lastname = ? OR username = ? OR telephone = ?)
      ORDER BY update_at DESC`,
      [
        data.search_value,
        data.search_value,
        data.search_value,
        data.search_value,
      ],
      callback
    );
  },

  SearchDataEquip: function (data, callback) {
    return db.query(
      `SELECT id, rfid, equipment_name, brand, model, equipment_number, serial_number, description, create_by, 
      create_at, update_by, update_at, active FROM equipment 
			WHERE active = 1 AND (equipment_name = ? OR equipment_number = ? OR brand = ?) ORDER BY update_at DESC`,
      [data.search_value, data.search_value, data.search_value],
      callback
    );
  },
};
module.exports = Search;
