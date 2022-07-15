import React, { useEffect, useReducer, useState } from "react";
import ArticleService from "../../services/articleService";
import ArticleWithPhoto from "../../components/custom/article/ArticleWithPhoto";
import ArticleWithoutPhoto from "../../components/custom/article/ArticleWithoutPhoto";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../style/Paginate.css";
import ArticleSkeleton from "../../components/custom/skeleton/ArticleSkeleton";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(0);
  const [countArticles, setCountArticles] = useState();
  const articlesPerPage = 8;

  const topicState = useSelector((topicState) => topicState.topicReducer);
  const searchState = useSelector((searchState) => searchState.searchReducer);

  let articleService = new ArticleService();

  useEffect(() => {
    setLoading(true);
    if (searchState !== null && searchState?.state !== null) {
      articleService
        .countAllByKeywords(searchState?.state)
        .then((response) => setCountArticles(response.data.data));
      articleService
        .getAllByKeywords(searchState?.state, currentPage, articlesPerPage)
        .then((response) => setArticles(response.data.data));
    } else if (topicState !== null && topicState?.state !== null) {
      articleService
        .countAllByTopicId(topicState?.state)
        .then((response) => setCountArticles(response.data.data));
      articleService
        .getAllByTopicId(topicState?.state, currentPage, articlesPerPage)
        .then((response) => setArticles(response.data.data));
    } else {
      articleService
        .countAll()
        .then((response) => setCountArticles(response.data.data));
      articleService
        .getAll(currentPage, articlesPerPage)
        .then((response) => setArticles(response.data.data));
    }
    setLoading(false);
  }, [topicState, searchState, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mt-1">
      {isLoading ? (
        <ArticleSkeleton cards={10} />
      ) : (
        <>
          {articles.length === 0 ? (
            <h3
              className="text-center"
              style={{ marginTop: "13em", marginBottom: "16.5em" }}
            >
              There are no results...
            </h3>
          ) : (
            articles.map((article) =>
              article.photoUrl !== null ? (
                <ArticleWithPhoto
                  article={article}
                  titleLength={95}
                  textLength={210}
                />
              ) : (
                <ArticleWithoutPhoto
                  article={article}
                  titleLength={145}
                  textLength={335}
                />
              )
            )
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="->"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(countArticles / articlesPerPage)}
            previousLabel="<-"
            renderOnZeroPageCount={null}
            // containerClassName={"pagination"}
            // pageLinkClassName={"page-num"}
            // previousLinkClassName={"page-num"}
            // nextLinkClassName={"page-num"}
            // activeLinkClassName={"active"}
            containerClassName={"paginationBttns"}
            // previousLinkClassName={"previousBttn"}
            // nextLinkClassName={"nextBttn"}
            activeLinkClassName={"paginatioActive"}
            disabledClassName={"paginationDisabled"}
          />
        </>
      )}
    </div>
  );
}
