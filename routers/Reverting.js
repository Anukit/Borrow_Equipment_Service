const express = require("express");
const router = express.Router();
const Reverting = require("../models/Reverting");

router.post("/UpdateData", async function (req, res, next) {
  let resReverting = await UpdateDataRevert(req.body);
  if (resReverting) {
    res.json({ status: "Succeed", data: "Reverting Pass" });
  } else {
    res.json({ status: "Failed", data: "Reverting Fail" });
  }
});

async function UpdateDataRevert(data) {
  return new Promise((resolve, reject) => {
    try {
      Reverting.UpdateDataRevert(data, (err, rows) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
}

module.exports = router;
