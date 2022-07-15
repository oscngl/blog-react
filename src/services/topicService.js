import axios from "axios";

export default class topicService {
  getAll() {
    return axios.get("https://blog-osc.herokuapp.com/api/v1/topics/getAll");
  }
}
