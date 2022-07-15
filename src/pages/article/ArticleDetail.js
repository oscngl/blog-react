import React, { useEffect, useState } from "react";
import ArticleService from "../../services/articleService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";

export default function ArticleDetail() {
  const [article, setArticle] = useState({});
  const { articleId } = useParams();
  const navigate = useNavigate();

  const userState = useSelector((userState) => userState.userReducer);

  let articleService = new ArticleService();

  useEffect(() => {
    articleService
      .getById(articleId)
      .then((response) => setArticle(response.data.data));
  }, []);

  const disable = (id) => {
    articleService
      .disable(id, userState?.state?.accessToken)
      .then((response) =>
        response.data.success
          ? alertify
              .success("Article disabled successfully.", 3)
              .then(navigate(`/${userState?.state?.user?.usrname}`))
          : alertify.error(response.data.message, 3)
      );
  };

  const navigateToUserDetail = (username) => {
    navigate(`/${username}`);
  };

  return (
    <div className="container mt-3">
      <div>
        <img
          className="rounded-circle mx-1"
          src={
            article?.user?.photoUrl !== null
              ? article?.user?.photoUrl
              : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
          }
          width={48}
          height={48}
          onClick={() => navigateToUserDetail(article.user.usrname)}
        />
        <label
          style={{ marginLeft: "5px" }}
          onClick={() => navigateToUserDetail(article.user.usrname)}
        >
          {article?.user?.firstName} {article?.user?.lastName}{" "}
        </label>
        <div className="mt-3" style={{ float: "right" }}>
          <div
            className="d-inline badge rounded-pill alert-dark"
            style={{ marginLeft: "1em" }}
          >
            {article?.topic?.name}
          </div>
          <div
            className="d-inline badge rounded-pill alert-dark"
            style={{ marginLeft: "1em" }}
          >
            {article?.createdDate?.substring(8, 10)}/
            {article?.createdDate?.substring(5, 7)}/
            {article?.createdDate?.substring(0, 4)}
          </div>
        </div>
      </div>
      <div className="my-3">
        <h2>{article?.title}</h2>
      </div>
      {article?.photoUrl ? (
        <img
          className="mx-1 rounded"
          src={article?.photoUrl}
          style={{ width: "100%", height: "500px" }}
        />
      ) : null}

      <div className="my-3">
        <p style={{ textAlign: "justify" }}>{article?.text}</p>
      </div>

      {userState?.state?.user &&
      article?.user?.usrname === userState?.state?.user?.usrname ? (
        <div className="text-center my-5">
          <NavLink
            to={`/${article.user.usrname}/edit/${article.title}-${article.id}`}
            className="btn me-2 btn-md btn-outline-dark"
            style={{ marginLeft: "5em" }}
          >
            Edit
          </NavLink>
          <button
            className="btn me-2 btn-md btn-outline-danger"
            style={{ float: "right" }}
            onClick={() => disable(article.id)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
