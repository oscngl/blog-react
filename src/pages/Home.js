import React, { useEffect, useState } from "react";
import RightBar from "../components/sidebar/RightBar";
import ArticleService from "../services/articleService";
import ArticleWithPhoto from "../components/custom/article/ArticleWithPhoto";
import ArticleWithoutPhoto from "../components/custom/article/ArticleWithoutPhoto";
import ArticleSkeleton from "../components/custom/skeleton/ArticleSkeleton";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  let articleService = new ArticleService();

  useEffect(() => {
    setLoading(true);
    articleService
      .getAll(0, 4)
      .then((response) => setArticles(response.data.data));
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="hero my-3">
        <div className="card bg-dark text-white border-0 ">
          <img
            src="https://res.cloudinary.com/dfl3sbjog/image/upload/v1657889044/6170856_m3qt9b.webp"
            className="card-img"
            alt="Background"
            height="350px"
          />
          <div className="card-img-overlay d-flex hero-header flex-column ">
            <div className="container">
              <h5 className="card-title display-3 fw-bolder mb-0 text-dark">
                WELCOME TO MY BLOG WEBSITE
              </h5>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-9" style={{ marginLeft: "1em" }}>
            <h1 className="mb-3">
              <i>What's New Today</i>
            </h1>
            {isLoading ? (
              <ArticleSkeleton cards={4} />
            ) : (
              <>
                {articles.map((article) =>
                  article.photoUrl !== null ? (
                    <ArticleWithPhoto
                      article={article}
                      titleLength={105}
                      textLength={240}
                    />
                  ) : (
                    <ArticleWithoutPhoto
                      article={article}
                      titleLength={160}
                      textLength={385}
                    />
                  )
                )}

                <div className="text-center my-4">
                  <a
                    className="btn me-2 btn-md btn-outline-dark"
                    role="button"
                    href="/articles"
                  >
                    See More
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="col-1">
            <div className="d-flex h-100">
              <div className="vr" style={{ marginLeft: "1em" }} />
            </div>
          </div>
          <div className="col-2" style={{ marginLeft: "-2em" }}>
            <RightBar articles={false} topicList={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
