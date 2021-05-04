const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const User = require("../models/userModel");

router.route("/create").post((req, res) => {
  // const { title, message, selectedFile, creator, tags } = req.body;
  console.log("hey");
  const title = req.body.title;
  const content = req.body.content;
  console.log("content", content);
  const newArticle = new Article({
    title,
    content,
  });
  console.log(newArticle);
  newArticle.save();
});

router.route("/").get((req, res) => {
  Article.find().then((foundArticles) => res.json(foundArticles));
});

router.route("/login").get((req, res) => {
  res.send({
    token: "test123",
  });
});

//get particular article
router.route("/upvote").put((req, res) => {
  const articleFromQuery = req.body.article;
  const userId = req.body.userId;
  Article.findById(articleFromQuery._id).then((article) => {
    let updatedUpvotes = [];
    if (article.upvotes.indexOf(userId) > -1) {
      updatedUpvotes = article.upvotes.filter((upvote) => {
        return upvote !== userId;
      });

      const updatedArticle = { ...articleFromQuery, upvotes: updatedUpvotes };

      Article.findByIdAndUpdate(article._id, updatedArticle, { new: true })
        .then((err, response) => {
          console.log(response);
          res.json({ status: 200, ok: true });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      articleFromQuery.upvotes.push(userId);

      Article.findByIdAndUpdate(article._id, articleFromQuery, { new: true })
        .then((err, response) => {
          console.log(response);
          res.json({ status: 200, ok: true });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
