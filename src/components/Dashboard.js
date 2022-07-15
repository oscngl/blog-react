import React from "react";
import RightBar from "./sidebar/RightBar";

export default function Dashboard(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-9" style={{ marginLeft: "1em" }}>
          {props.page}
        </div>
        <div className="col-1">
          <div className="d-flex h-100">
            <div className="vr" style={{ marginLeft: "1em" }} />
          </div>
        </div>
        <div className="col-2" style={{ marginLeft: "-2em" }}>
          <RightBar
            articles={props.articles}
            userInfo={props.userInfo}
            topicList={props.topicList}
            userArticles={props.userArticles}
          />
        </div>
      </div>
    </div>
  );
}
