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
router.get("/DataMemberAll/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let dataMemberCount = await getDataMemberAll(indexPage, true);
  let dataMemberAll = await getDataMemberAll(indexPage, false);
  if (dataMemberAll != null) {
    if (dataMemberAll.length > 0 && dataMemberCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          totalCount: dataMemberCount.length,
          dataMember: dataMemberAll,
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
router.get("/DataEquipAll/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let dataEquipCount = await getDataEquipAll(indexPage, true);
  let dataEquipAll = await getDataEquipAll(indexPage, false);
  if (dataEquipAll != null) {
    if (dataEquipAll.length > 0 && dataEquipCount.length) {
      res.json({
        status: "Succeed",
        data: {
          totalCount: dataEquipCount.length,
          dataMember: dataEquipAll,
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
router.get("/DataEquipRemain/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let listIDEquip = [];
  let listDataEquip = [];
  let revertData = await Utility.getDataReverting(indexPage, true);
  let equipdata = await getDataEquipAll(indexPage, true);

  if (revertData != null && equipdata != null) {
    for (let i = 0; i < equipdata.length; i++) {
      for (let y = 0; y < revertData.length; y++) {
        if (equipdata[i]["equip_id"] != revertData[y]["equip_id"]) {
          listIDEquip.push(equipdata[i]["equip_id"]);
        }
      }
    }
    for (let index = 0; index < listIDEquip.length; index++) {
      let dataEquipRemain = await Utility.getDataEquipRemain(
        indexPage,
        listIDEquip[index],
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
router.get("/DataBorrowing/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let dataBorrowCount = await getDataBorrowing(indexPage, true);
  let dataBorrowing = await getDataBorrowing(indexPage, false);
  if (dataBorrowing != null) {
    if (dataBorrowing.length > 0 && dataBorrowCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          totalCount: dataBorrowCount.length,
          dataMember: dataBorrowing,
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
router.get("/DataReverting/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let dataRevertCount = await Utility.getDataReverting(indexPage, true);
  let dataReverting = await Utility.getDataReverting(indexPage, false);
  if (dataReverting != null) {
    if (dataReverting.length > 0 && dataRevertCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          totalCount: dataRevertCount.length,
          dataMember: dataReverting,
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
router.get("/DataReport/:indexPage", async function (req, res) {
  let indexPage = req.params.indexPage;
  let dataReportCount = await getDataReport(indexPage, true);
  let dataDataReport = await getDataReport(indexPage, false);
  if (dataDataReport != null) {
    if (dataDataReport.length > 0 && dataReportCount.length > 0) {
      res.json({
        status: "Succeed",
        data: {
          totalCount: dataReportCount.length,
          dataMember: dataDataReport,
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

async function getDataMemberAll(indexPage, total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataMemberAll(indexPage, total_data, (err, rows) => {
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

async function getDataEquipAll(indexPage, total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataEquipAll(indexPage, total_data, (err, rows) => {
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

async function getDataBorrowing(indexPage, total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataBorrowing(indexPage, total_data, (err, rows) => {
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

async function getDataReport(indexPage, total_data) {
  return new Promise((resolve, reject) => {
    try {
      GetData.getDataReport(indexPage, total_data, (err, rows) => {
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
