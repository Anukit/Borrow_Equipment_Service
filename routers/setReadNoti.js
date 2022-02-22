var express = require("express");
var router = express.Router();
var Notification = require("../models/Notification");

//อัปเดตดูแจ้งเตือน
router.get("/:reportID", async function (req, res) {
  let reportID = req.params.reportID;
  let statusReadNoti = await setReadNoti(reportID);
  if (statusReadNoti != null) {
    res.json({ status: "Succeed", data: "Set read noti succeed" });
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

module.exports = router;
