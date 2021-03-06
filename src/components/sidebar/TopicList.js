import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicService from "../../services/topicService";
import { selectTopic, deselectTopic } from "../../redux/actions/topicActions";
import { removeSearchKeywords } from "../../redux/actions/searchActions";
import { useDispatch, useSelector } from "react-redux";
import TopicListSkeleton from "../custom/skeleton/TopicListSkeleton";

export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let topicService = new TopicService();

  useEffect(() => {
    setLoading(true);
    topicService.getAll().then((response) => setTopics(response.data.data));
    setLoading(false);
  }, []);

  const topicState = useSelector((topicState) => topicState.topicReducer);

  const removeSearch = () => {
    dispatch(removeSearchKeywords());
  };

  const select = (topic) => {
    removeSearch();
    dispatch(selectTopic(topic));
    window.scrollTo(0, 0);
  };

  const deselect = () => {
    dispatch(deselectTopic());
    navigate("/articles");
    window.scrollTo(0, 0);
  };

  const buttonClick = (id) => {
    topicState?.state === id ? deselect() : select(id);
    navigate("/articles");
  };

  return (
    <div style={{ marginLeft: "4px" }}>
      {isLoading ? (
        <TopicListSkeleton cards={8} />
      ) : (
        <>
          <button
            key={"all"}
            className="badge rounded-pill alert-dark m-1"
            style={{ fontSize: "13px", textDecoration: "none" }}
            onClick={() => deselect()}
          >
            All
          </button>
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="badge rounded-pill alert-dark m-1"
              style={{ fontSize: "13px", textDecoration: "none" }}
              onClick={() => buttonClick(topic.id)}
            >
              {topic.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
