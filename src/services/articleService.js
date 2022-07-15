import axios from "axios";
import FormData from "form-data";

export default class articleService {
  saveWithoutPhoto(article, accessToken) {
    var data = new FormData();
    data.append("title", article.title);
    data.append("text", article.text);
    data.append("user", article.userId);
    data.append("topic", article.topicId);

    return axios({
      method: "post",
      url: "https://blog-osc.herokuapp.com/api/v1/articles/save",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: data,
    });
  }

  saveWithPhoto(article, accessToken) {
    var data = new FormData();
    data.append("title", article.title);
    data.append("text", article.text);
    data.append("user", article.userId);
    data.append("topic", article.topicId);
    data.append("photo", article.photo);

    return axios({
      method: "post",
      url: "https://blog-osc.herokuapp.com/api/v1/articles/save",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: data,
    });
  }

  getAll(pageNumber, pageSize) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllByUserId(userId, pageNumber, pageSize) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getAllByUserId?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllByUsername(username, pageNumber, pageSize) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getAllByUsername?username=${username}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllByTopicId(topicId, pageNumber, pageSize) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getAllByTopicId?topicId=${topicId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllByKeywords(keywords, pageNumber, pageSize) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getAllByKeywords?keywords=${keywords}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getById(id) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/getById?id=${id}`
    );
  }

  disable(id, accessToken) {
    return axios({
      method: "put",
      url: `https://blog-osc.herokuapp.com/api/v1/articles/setEnabledFalse?id=${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }

  update(article, accessToken) {
    return axios({
      method: "put",
      url: "https://blog-osc.herokuapp.com/api/v1/articles/update",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: article,
    });
  }

  countAll() {
    return axios.get("https://blog-osc.herokuapp.com/api/v1/articles/countAll");
  }

  countAllByUserId(userId) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/countAllByUserId?userId=${userId}`
    );
  }

  countAllByTopicId(topicId) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/countAllByTopicId?topicId=${topicId}`
    );
  }

  countAllByUsername(username) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/countAllByUsername?username=${username}`
    );
  }

  countAllByKeywords(keywords) {
    return axios.get(
      `https://blog-osc.herokuapp.com/api/v1/articles/countAllByKeywords?keywords=${keywords}`
    );
  }
}
