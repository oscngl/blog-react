import React, { useEffect, useState } from "react";
import TopicService from "../../services/topicService";
import ArticleService from "../../services/articleService";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ArticleEdit() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [article, setArticle] = useState();
  const { username } = useParams();
  const { articleId } = useParams();
  const navigate = useNavigate();

  const userState = useSelector((userState) => userState.userReducer);

  let topicService = new TopicService();
  let articleService = new ArticleService();

  const setValues = (response) => {
    setArticle(response.data.data);
    setTitle(response.data.data.title);
    setText(response.data.data.text);
    setTopic(response.data.data.topic.id);
  };

  useEffect(() => {
    userState === null ||
    userState?.state === null ||
    userState?.state?.user === null ||
    userState?.state?.user?.usrname !== username
      ? navigate("/login")
      : articleService
          .getById(articleId)
          .then((response) => setValues(response));
  }, []);

  useEffect(() => {
    topicService.getAll().then((response) => setTopics(response.data.data));
  }, []);

  const update = (e) => {
    e.preventDefault();

    article.title = title;
    article.text = text;
    article.topic = { id: parseInt(topic) };
    articleService
      .update(article, userState?.state?.accessToken)
      .then((response) =>
        response.data.success
          ? alertify
              .success("Article updated successfully.", 3)
              .then(
                navigate(
                  `/${userState?.state?.user?.usrname}/${article.title}-${article.id}`
                )
              )
          : alertify.error(response.data.message, 3)
      );
  };

  return (
    <div className="container my-5">
      <form onSubmit={update}>
        <div>
          <input
            className="form-control rounded my-4"
            type="text"
            placeholder="Title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <select
            className="form-select mb-4"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic.id} id={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            className="form-control rounded"
            placeholder="Tell us your story..."
            rows={25}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center my-4">
          <button className="btn btn-outline-secondary rounded">Update</button>
        </div>
      </form>
    </div>
  );
}
