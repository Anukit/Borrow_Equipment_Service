const express = require("express");
const router = express.Router();
const Search = require("../models/Search");
const Utility = require("../controllers/Utility");

//เสิร์ชข้อมูล Equipment คงเหลือ
router.post("/EquipRemain", async function (req, res, next) {
  let listIDEquip = [];
  let listDataEquip = [];
  let revertData = await Utility.getDataReverting(true);
  let equipdata = await getDataEquipAll(req.body);

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

//เสิร์ชข้อมูลรายงาน
router.post("/DataReprot", async function (req, res, next) {
  let typeSearch = req.body.typeSearch;
  var typeSearchList = ["1", "2", "3"];

  if (typeSearchList.includes(typeSearch)) {
    let dataReport = await SearchDataReport(req.body);

    if (dataReport != null) {
      if (dataReport.length > 0) {
        res.json({ status: "Succeed", data: dataReport });
      } else {
        res.json({ status: "Failed", data: "No Report information" });
      }
    } else {
      res.json({ status: "Failed", data: "Error" });
    }
  } else {
    res.json({ status: "Failed", data: "กำหนด typeSearch ระหว่าง 1-3" });
  }
});

//เสิร์ชข้อมูล Member
router.post("/DataMember", async function (req, res, next) {
  let dataMember = await SearchDataMember(req.body);
  if (dataMember != null) {
    if (dataMember.length > 0) {
      res.json({ status: "Succeed", data: dataMember });
    } else {
      res.json({ status: "Failed", data: "No Member information" });
    }
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
});

//เสิร์ชข้อมูล Equipment
router.post("/DataEquip", async function (req, res, next) {
  let dataEquip = await SearchDataEquip(req.body);
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

async function getDataEquipAll(data) {
  return new Promise((resolve, reject) => {
    try {
      Search.getDataEquipAll(data, (err, rows) => {
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

async function SearchEquipRemain(data) {
  return new Promise((resolve, reject) => {
    try {
      Search.SearchEquipRemain(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function SearchDataReport(data) {
  return new Promise((resolve, reject) => {
    try {
      Search.SearchDataReport(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function SearchDataMember(data) {
  return new Promise((resolve, reject) => {
    try {
      Search.SearchDataMember(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

async function SearchDataEquip(data) {
  return new Promise((resolve, reject) => {
    try {
      Search.SearchDataEquip(data, (err, rows) => {
        if (rows != null) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
