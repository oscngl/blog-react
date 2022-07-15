import axios from "axios";

export default class authService {
  login(email, password) {
    return axios({
      method: "get",
      url: `http://localhost:8080/api/auth/login?email=${email}&password=${password}`,
    });
  }

  register(user) {
    return axios({
      method: "post",
      url: "http://localhost:8080/api/v1/auth/register",
      headers: {},
      data: user,
    });
  }

  confirmUser(token) {
    return axios({
      method: "get",
      url: `http://localhost:8080/api/v1/auth/confirmUser?token=${token}`,
    });
  }
}
