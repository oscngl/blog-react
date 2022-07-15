import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../../services/articleService";
import UserArticleSkeleton from "../custom/skeleton/UserArticleSkeleton";

export default function UserArticles() {
  const [articles, setArticles] = useState([]);
  const { username } = useParams();
  const [isLoading, setLoading] = useState(false);

  let articleService = new ArticleService();

  useEffect(() => {
    setLoading(true);
    articleService
      .getAllByUsername(username, 1, 3)
      .then((response) => setArticles(response.data.data));
    setLoading(false);
  }, []);

  const navigateToArticleDetail = (article) => {
    let articleTitle = article.title;
    articleTitle = articleTitle.replace(/\s+/g, "-");
    return `/${username}/${articleTitle}-${article.id}`;
  };

  return (
    <div className="text-center">
      {articles[0] ? (
        <h5 className="mb-3">
          <i>Read More From {articles[0]?.user?.firstName}</i>
        </h5>
      ) : null}
      {isLoading ? (
        <UserArticleSkeleton cards={3} />
      ) : (
        <>
          {articles.map((article) => (
            <a
              className="nav-link mt-1 mb-4 text-dark"
              href={navigateToArticleDetail(article)}
            >
              {article.title.length > 50
                ? article.title.substring(0, 50) + "..."
                : article.title}
            </a>
          ))}
        </>
      )}
    </div>
  );
}
