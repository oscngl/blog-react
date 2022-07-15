import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArticleWithPhoto(props) {
  const navigate = useNavigate();

  const navigateToArticleDetail = (article) => {
    let articleTitle = article.title;
    articleTitle = articleTitle.replace(/\s+/g, "-");
    navigate(`/${article.user.usrname}/${articleTitle}-${article.id}`);
  };

  const navigateToUserDetail = (username) => {
    navigate(`/${username}`);
  };

  return (
    <div key={props.article.id} className="d-flex flex-wrap">
      <div style={{ flex: "2" }}>
        <div onClick={() => navigateToUserDetail(props.article.user.usrname)}>
          <img
            className="rounded-circle"
            src={
              props.article.user.photoUrl !== null
                ? props.article.user.photoUrl
                : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
            }
            width={24}
            height={24}
            style={{ marginRight: "5px" }}
          />
          <label className="mb-3">
            {" "}
            {props.article.user.firstName} {props.article.user.lastName}{" "}
          </label>
        </div>
        <h4 onClick={() => navigateToArticleDetail(props.article)}>
          {props.article.title.length > props.titleLength
            ? props.article.title.substring(0, props.titleLength) + "..."
            : props.article.title}
        </h4>
        <p
          style={{
            textAlign: "justify",
            marginRight: "1em",
          }}
          onClick={() => navigateToArticleDetail(props.article)}
        >
          {props.article.text.length > props.textLength
            ? props.article.text.substring(0, props.textLength) + "..."
            : props.article.text}
        </p>
        <div>
          <div className="d-inline badge rounded-pill alert-dark">
            {props.article.createdDate.substring(8, 10)}/
            {props.article.createdDate.substring(5, 7)}/
            {props.article.createdDate.substring(0, 4)}
          </div>
          <div
            className="d-inline badge rounded-pill alert-dark"
            style={{ marginLeft: "1em" }}
          >
            {props.article.topic.name}
          </div>
        </div>
      </div>
      <div
        style={{
          flex: "1",
          overflow: "hidden",
          position: "relative",
          marginBottom: "-8em",
        }}
      >
        <img
          className="w-100 rounded"
          style={{
            marginLeft: "50%",
            transform: "translateX(-50%)",
            height: "190px",
          }}
          src={props.article.photoUrl}
          alt="Card image cap"
          onClick={() => navigateToArticleDetail(props.article)}
        />
      </div>
      <hr className="w-100 mt-3" />
    </div>
  );
}
