import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import UserService from "../services/userService";
import ArticleService from "../services/articleService";
import ArticleWithPhoto from "../components/custom/article/ArticleWithPhoto";
import ArticleWithoutPhoto from "../components/custom/article/ArticleWithoutPhoto";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../style/Paginate.css";

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const { username } = useParams();
  let [currentPage, setCurrentPage] = useState(0);
  const [countArticles, setCountArticles] = useState();
  const articlesPerPage = 4;

  const userState = useSelector((userState) => userState.userReducer);

  let userService = new UserService();
  let articleService = new ArticleService();

  useEffect(() => {
    userService
      .getByUsername(username)
      .then((response) => setUser(response.data.data));
  }, []);

  useEffect(() => {
    articleService
      .countAllByUsername(username)
      .then((response) => setCountArticles(response.data.data));
    articleService
      .getAllByUsername(username, currentPage, articlesPerPage)
      .then((response) => setArticles(response.data.data));
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-1" />
        <div className="col-4 text-center">
          <img
            className="rounded-circle"
            src={
              user?.photoUrl !== null
                ? user?.photoUrl
                : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
            }
            width={256}
            height={256}
          />
        </div>
        <div className="col-1">
          <div className="d-flex h-100">
            <div className="vr" style={{ marginLeft: "1em" }} />
          </div>
        </div>
        <div className="col-5 mt-5">
          <div>
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
            <div>
              <p>{user?.coverLetter}</p>
            </div>
          </div>
        </div>
        {userState?.state?.user &&
        username === userState?.state?.user?.usrname ? (
          <NavLink
            to={`/${username}/edit`}
            className="btn me-2 btn-sm btn-outline-secondary"
            style={{ width: "50px", height: "30px", marginTop: "16em" }}
          >
            Edit
          </NavLink>
        ) : null}

        <div className="col-1" />
        <hr className="mb-4 mt-4" />
      </div>

      <div className="container px-5">
        {articles.map((article) =>
          article.photoUrl !== null ? (
            <ArticleWithPhoto
              article={article}
              titleLength={135}
              textLength={300}
            />
          ) : (
            <ArticleWithoutPhoto
              article={article}
              titleLength={190}
              textLength={475}
            />
          )
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(countArticles / articlesPerPage)}
        previousLabel="<-"
        renderOnZeroPageCount={null}
        containerClassName={"paginationBttns"}
        activeLinkClassName={"paginatioActive"}
        disabledClassName={"paginationDisabled"}
      />
    </div>
  );
}
