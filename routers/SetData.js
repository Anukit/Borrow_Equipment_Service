var express = require("express");
var router = express.Router();
var Notification = require("../models/Notification");
var SetData = require("../models/SetData");

//อัปเดตดูแจ้งเตือน
router.post("/setReadNoti", async function (req, res) {
  let reportID = req.body.reportID;
  let statusReadNoti = await setReadNoti(reportID);
  if (statusReadNoti != null) {
    res.json({ status: "Succeed", data: "Set read noti succeed" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
  module.exports = router;
});

//อัปเดตอุปกรณ์ว่าอยู่ที่แผนกไหน ในหน้าแผนก
router.post("/setDpmID", async function (req, res) {
  let statusSetDpm = await setDpmID(req.body);
  if (statusSetDpm != null) {
    res.json({ status: "Succeed", data: "Set dpm to report succeed" });
  } else {
    res.json({ status: "Failed", data: "Error" });
  }
  module.exports = router;
});

async function setReadNoti(reportID) {
  return new Promise((resolve, reject) => {
    try {
      Notification.setReadNoti(reportID, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

async function setDpmID(data) {
  return new Promise((resolve, reject) => {
    try {
      SetData.setDpmID(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
}

module.exports = router;
