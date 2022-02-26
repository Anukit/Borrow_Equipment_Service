const express = require("express");
const router = express.Router();
const GetData = require("../models/GetData");
const Utility = require("../controllers/Utility");

//แสดงข้อมูล Member ตาม RFID
router.get("/DataMember/:rfid", async function (req, res) {
  let rfid = req.params.rfid;
  let dataMember = await getDataMember(rfid);
  if (dataMember != null) {
    if (dataMember.length > 0) {
      res.json({ status: "Succeed", data: dataMember });
    } else {
      res.json({ status: "Failed", data: "No user information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Member ทั้งหมดในตาราง
router.get("/DataMemberAll", async function (req, res) {
  let dataMemberCount = await getDataMemberAll(true);
  let dataMemberAll = await getDataMemberAll(false);
  if (dataMemberAll != null) {
    if (dataMemberAll.length > 0 && dataMemberCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          iTotalRecords: dataMemberCount.length,
          aaData: dataMemberAll,
        },
      });
    } else {
      res.json({ status: "Succeed", data: "No user information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Equipment ตาม RFID
router.get("/DataEquip/:rfid", async function (req, res) {
  let rfid = req.params.rfid;
  let dataEquip = await getDataEquip(rfid);
  if (dataEquip != null) {
    if (dataEquip.length > 0) {
      res.json({ status: "Succeed", data: dataEquip });
    } else {
      res.json({ status: "Failed", data: "No Equip information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Equipment ทั้งหมดในตาราง
router.get("/DataEquipAll", async function (req, res) {
  let dataEquipCount = await getDataEquipAll(true);
  let dataEquipAll = await getDataEquipAll(false);
  if (dataEquipAll != null) {
    if (dataEquipAll.length > 0 && dataEquipCount.length) {
      res.json({
        status: "Succeed",
        data: {
          iTotalRecords: dataEquipCount.length,
          aaData: dataEquipAll,
        },
      });
    } else {
      res.json({ status: "Succeed", data: "No Equip information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูล Equipment ที่คงเหลือในตาราง
router.get("/DataEquipRemain", async function (req, res) {
  let listIDEquip = [];
  let listDataEquip = [];
  let borrowData = await getDataBorrowing(true);
  let equipdata = await getDataEquipAll(true);

  if (borrowData != null && equipdata != null) {
    let listIDEquip = equipdata;
    let listBorrow = [];

    for (let i = 0; i < equipdata.length; i++) {
      for (let y = 0; y < borrowData.length; y++) {
        if (equipdata[i]["equip_id"] == borrowData[y]["equip_id"]) {
          listBorrow.push(equipdata[i]["equip_id"]);
        }
      }
    }

    for (let index = 0; index < equipdata.length; index++) {
      for (let x = 0; x < listBorrow.length; x++) {
        if (equipdata[index]["equip_id"] == listBorrow[x]) {
          listIDEquip.splice(index, 1);
        }
      }
    }
    for (let index = 0; index < listIDEquip.length; index++) {
      let dataEquipRemain = await Utility.getDataEquipRemain(
        listIDEquip[index]["equip_id"],
        false
      );
      if (dataEquipRemain != null) {
        listDataEquip.push(dataEquipRemain[0]);
      } else {
        res.json({ status: "Failed", data: "Error" });
      }
    }

    if (listDataEquip.length > 0) {
      res.json({ status: "Succeed", data: listDataEquip });
    } else {
      res.json({ status: "Failed", data: "No Equip information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลการยืม
router.get("/DataBorrowing", async function (req, res) {
  let dataBorrowCount = await getDataBorrowing(true);
  let dataBorrowing = await getDataBorrowing(false);
  if (dataBorrowing != null) {
    if (dataBorrowing.length > 0 && dataBorrowCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          iTotalRecords: dataBorrowCount.length,
          aaData: dataBorrowing,
        },
      });
    } else {
      res.json({ status: "Succeed", data: "No Borrowing information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลการคืน
router.get("/DataReverting", async function (req, res) {
  let dataRevertCount = await Utility.getDataReverting(true);
  let dataReverting = await Utility.getDataReverting(false);
  if (dataReverting != null) {
    if (dataReverting.length > 0 && dataRevertCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          iTotalRecords: dataRevertCount.length,
          aaData: dataReverting,
        },
      });
    } else {
      res.json({ status: "Succeed", data: "No Reverting information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//แสดงข้อมูลรายงาน
router.get("/DataReport", async function (req, res) {
  let dataReportCount = await getDataReport(true);
  let dataDataReport = await getDataReport(false);
  if (dataDataReport != null) {
    if (dataDataReport.length > 0 && dataReportCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          iTotalRecords: dataReportCount.length,
          aaData: dataDataReport,
        },
      });
    } else {
      res.json({ status: "Succeed", data: "No DataReport information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

async function getDataMember(rfid) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataMember(rfid, (err, rows) => {
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
}

async function getDataMemberAll(total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataMemberAll(total_data, (err, rows) => {
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
}

async function getDataEquip(rfid) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquip(rfid, (err, rows) => {
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
}

async function getDataEquipAll(total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipAll(total_data, (err, rows) => {
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
}

// async function getDataEquipRemain(indexPage, equipID, total_data) {
//   return new Promise((resolve, reject) => {
//     try {
//       GetData.getDataEquipRemain(
//         indexPage,
//         equipID,
//         total_data,
//         (err, rows) => {
//           if (rows != null) {
//             resolve(rows);
//           } else {
//             resolve(null);
//           }
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       resolve(null);
//     }
//   });
// }

async function getDataBorrowing(total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataBorrowing(total_data, (err, rows) => {
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
}

// async function getDataReverting(indexPage, total_data) {
//   return new Promise((resolve, reject) => {
//     try {
//       GetData.getDataReverting(indexPage, total_data, (err, rows) => {
//         if (rows != null) {
//           resolve(rows);
//         } else {
//           resolve(null);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       resolve(null);
//     }
//   });
// }

async function getDataReport(total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataReport(total_data, (err, rows) => {
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
}

module.exports = router;
