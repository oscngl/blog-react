import React, { useEffect, useState } from "react";
import TopicService from "../../services/topicService";
import ArticleService from "../../services/articleService";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";

export default function ArticleCreate() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const userState = useSelector((userState) => userState.userReducer);

  let topicService = new TopicService();
  let articleService = new ArticleService();

  useEffect(() => {
    userState === null ||
    userState?.state === null ||
    userState?.state?.role !== "ROLE_USER"
      ? navigate("/login")
      : topicService.getAll().then((response) => setTopics(response.data.data));
  }, []);

  const publish = (e) => {
    e.preventDefault();

    if (topic == null) {
      alertify.error("Select a topic!", 3);
    } else if (image === null) {
      articleService
        .saveWithoutPhoto(
          {
            title: title,
            text: text,
            userId: userState?.state?.user?.id,
            topicId: parseInt(topic),
          },
          userState?.state?.accessToken
        )
        .then((response) =>
          response.data.success
            ? alertify
                .success("Article saved successfully.", 3)
                .then(navigate(`/${userState?.state?.user?.usrname}`))
            : alertify.error(response.data.message, 3)
        );
    } else {
      articleService
        .saveWithPhoto(
          {
            title: title,
            text: text,
            userId: userState?.state?.user?.id,
            topicId: parseInt(topic),
            photo: image,
          },
          userState?.state?.accessToken
        )
        .then((response) =>
          response.data.success
            ? alertify
                .success("Article saved successfully.", 3)
                .then(navigate(`/${userState?.state?.user?.usrname}`))
            : alertify.error(response.data.message, 3)
        );
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={publish}>
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            className="form-control rounded mb-4"
            id="customFile"
            style={{ marginRight: "1em" }}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg"
          ></input>
          <select
            className="form-select mb-4"
            required
            style={{ marginLeft: "1em" }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option disabled selected>
              Topic
            </option>
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
          <button className="btn btn-outline-secondary rounded">Publish</button>
        </div>
      </form>
    </div>
  );
}
