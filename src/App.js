import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Navi from "./components/Navi";
import ArticleCreate from "./pages/article/ArticleCreate";
import ArticleDetail from "./pages/article/ArticleDetail";
import Home from "./pages/Home";
import ArticleList from "./pages/article/ArticleList";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import UserDetail from "./pages/UserDetail";
import ConfirmUser from "./pages/ConfirmUser";
import ArticleEdit from "./pages/article/ArticleEdit";
import UserProfileEdit from "./pages/UserProfileEdit";

function App() {
  return (
    <div>
      <div className="container" style={{ height: "100%" }}>
        <Navi />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/articles"
            element={
              <Dashboard
                page={<ArticleList />}
                articles={true}
                userInfo={false}
                topicList={true}
                userArticles={false}
              />
            }
          />
          <Route exact path="/create" element={<ArticleCreate />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route exact path="/:username/edit" element={<UserProfileEdit />} />
          <Route exact path="/confirm/:token" element={<ConfirmUser />} />
          <Route exact path="/:username" element={<UserDetail />} />
          <Route
            exact
            path="/:username/:articleTitle-:articleId"
            element={
              <Dashboard
                page={<ArticleDetail />}
                articles={false}
                userInfo={true}
                topicList={false}
                userArticles={true}
              />
            }
          />
          <Route
            exact
            path="/:username/edit/:articleTitle-:articleId"
            element={<ArticleEdit />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
