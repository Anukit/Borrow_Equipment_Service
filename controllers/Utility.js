const GetData = require("../models/GetData");

exports.getDataEquipRemain = (indexPage, equipID, total_data) => {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipRemain(
        indexPage,
        equipID,
        total_data,
        (err, rows) => {
          if (rows != null) {
            resolve(rows);
          } else {
            resolve(null);
          }
        }
      );
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
};

exports.getDataReverting = (indexPage, total_data) => {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataReverting(indexPage, total_data, (err, rows) => {
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
