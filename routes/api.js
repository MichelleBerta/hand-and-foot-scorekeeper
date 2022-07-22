const router = require("express").Router();
const Score = require("../models/score.js");

router.post("/api/score", ({ body }, res) => {
  Score.create(body)
    .then((dbScore) => {
      res.json(dbScore);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/api/score/bulk", ({ body }, res) => {
  Score.insertMany(body)
    .then((dbScore) => {
      res.json(dbScore);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/api/score", (req, res) => {
  Score.find({})
    .sort({ date: -1 })
    .then((dbScore) => {
      res.json(dbScore);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
