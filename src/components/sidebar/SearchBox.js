import React, { useState } from "react";
import {
  setSearchKeywords,
  removeSearchKeywords,
} from "../../redux/actions/searchActions";
import { deselectTopic } from "../../redux/actions/topicActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [inputKeywords, setInputKeywords] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const set = (payload) => {
    dispatch(setSearchKeywords(payload));
  };

  const deselect = () => {
    dispatch(deselectTopic());
  };

  const remove = () => {
    dispatch(removeSearchKeywords());
  };

  const search = (keywords) => {
    deselect();
    keywords !== null ? set(keywords) : remove();
    navigate("/articles");
  };

  return (
    <div className="w-100" style={{ marginLeft: "4px" }}>
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          required
          value={inputKeywords}
          onChange={(e) => setInputKeywords(e.target.value)}
        />
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            onClick={() => search(inputKeywords)}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
