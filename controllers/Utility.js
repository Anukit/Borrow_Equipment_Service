const GetData = require("../models/GetData");

exports.getDataEquipRemain = (equipID, total_data) => {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipRemain(equipID, total_data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
};

exports.getDataReverting = (total_data) => {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataReverting(total_data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
};
