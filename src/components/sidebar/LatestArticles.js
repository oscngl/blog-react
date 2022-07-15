import React, { useEffect, useState } from "react";
import ArticleService from "../../services/articleService";
import { useNavigate } from "react-router-dom";
import LatestArticleSkeleton from "../../components/custom/skeleton/LatestArticleSkeleton";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  let articleService = new ArticleService();

  useEffect(() => {
    setLoading(true);
    articleService
      .getAll(1, 3)
      .then((response) => setArticles(response.data.data));
    setLoading(false);
  }, []);

  const navigateToArticleDetail = (article) => {
    let articleTitle = article.title;
    articleTitle = articleTitle.replace(/\s+/g, "-");
    navigate(`/${article.user.usrname}/${articleTitle}-${article.id}`);
  };

  const navigateToUserDetail = (username) => {
    navigate(`/${username}`);
  };

  return (
    <div style={{ marginLeft: "4px" }}>
      <h5 className="mb-4 text-center">
        <i>What's New Today</i>
      </h5>

      <div style={{ marginLeft: "4px" }}>
        {isLoading ? (
          <LatestArticleSkeleton cards={3} />
        ) : (
          <>
            {articles.map((article) => (
              <div id={article.id}>
                <div onClick={() => navigateToUserDetail(article.user.usrname)}>
                  <img
                    className="rounded-circle"
                    src={
                      article.user.photoUrl !== null
                        ? article.user.photoUrl
                        : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
                    }
                    width={24}
                    height={24}
                    style={{ marginRight: "5px" }}
                  />
                  <label style={{ fontSize: "12px" }}>
                    {article.user.firstName} {article.user.lastName}
                  </label>
                </div>
                <label
                  className="mt-1 mb-4"
                  onClick={() => navigateToArticleDetail(article)}
                >
                  {" "}
                  <b>
                    {" "}
                    {article.title.length > 35
                      ? article.title.substring(0, 35) + "..."
                      : article.title}
                  </b>
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
