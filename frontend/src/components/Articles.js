import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Articles.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import UserContext from "./userContext";
import axios from "axios";

function Articles({ storage }) {
  const [articles, setArticles] = useState([
    {
      title: "",
      content: "",
      upvotes: 0,
    },
  ]);

  const { userData } = useContext(UserContext);

  async function handleClick(article) {
    const upvoteData = { article, userId: userData.user.id };
    const articlesResponse = await axios.put("/articles/upvote", upvoteData);

    if (articlesResponse.data.status === 200) {
      fetch("/articles")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => setArticles(jsonRes));
    }
  }
  useEffect(() => {
    fetch("/articles")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setArticles(jsonRes));
  }, []);

  return (
    <div>
      {storage !== null ? (
        <div>
          <h1>Articles</h1>
          {articles.map((article, key) => {
            const upvoteColor =
              article.upvotes && article.upvotes.indexOf(userData.user?.id) > -1
                ? "active"
                : "primary";
            return (
              <Link key={key} className="article-list-item">
                <h3>{article.title}</h3>
                <div className="likes">
                  {article.upvotes.length} <span>likes</span>
                  <ThumbUpAltIcon
                    className={`thumbs-up ${upvoteColor}`}
                    onClick={() => handleClick(article)}></ThumbUpAltIcon>
                </div>

                <p>{article.content}</p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          {" "}
          <h1>Please login</h1>{" "}
        </div>
      )}
    </div>
  );
}

export default Articles;
