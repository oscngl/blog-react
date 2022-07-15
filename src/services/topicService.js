import axios from "axios";

export default class topicService {
  getAll() {
    return axios.get("http://localhost:8080/api/v1/topics/getAll");
  }
}
