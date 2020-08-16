const router = require("express").Router();
const Word = require("../models/word");

const axios = require("axios");

//Post

router.post("/words", async (req, res) => {
  try {
    const word = new Word();
    word.song = req.body.song;

    await word.save();

    res.json({
      success: true,
      message: "Successfully category create!!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Get
router.get("/words", async (req, res) => {
  try {
    const words = await Word.find();
    res.json({
      success: true,
      words: words,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/words/:id", async (req, res) => {
  try {
    const word = await Word.findOne({
      _id: req.params.id,
    });
    res.json({
      success: true,
      word: word,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Put

router.put("/words/:id", async (req, res) => {
  try {
    const word = await Word.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          song: req.body.song,
        },
      },
      {
        upsert: true,
      }
    );
    res.json({
      success: true,
      updatedWord: word,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete

router.delete("/words/:id", async (req, res) => {
  try {
    const deletedWord = await Word.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedWord) {
      res.json({
        success: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
