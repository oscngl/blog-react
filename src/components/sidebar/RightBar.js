import React from "react";
import LatestArticles from "./LatestArticles";
import SearchBox from "./SearchBox";
import TopicList from "./TopicList";
import UserArticles from "./UserArticles";
import UserInfo from "./UserInfo";

export default function RightBar(props) {
  return (
    <div className="position-sticky top-0">
      <br />
      <br />
      <SearchBox />
      <br />
      <hr />

      {props.articles ? (
        <div>
          <br />
          <LatestArticles />
          <br />
          <hr />
        </div>
      ) : props.userInfo ? (
        <div>
          <br />
          <UserInfo />
          <br />
          <hr />
        </div>
      ) : null}

      {props.topicList ? (
        <div>
          <br />
          <TopicList />
          <br />
        </div>
      ) : props.userArticles ? (
        <div>
          <br />
          <UserArticles />
          <br />
        </div>
      ) : null}
    </div>
  );
}
