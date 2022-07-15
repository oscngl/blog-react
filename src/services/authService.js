import axios from "axios";

export default class authService {
  login(email, password) {
    return axios({
      method: "get",
      url: `https://blog-osc.herokuapp.com/api/auth/login?email=${email}&password=${password}`,
    });
  }

  register(user) {
    return axios({
      method: "post",
      url: "https://blog-osc.herokuapp.com/api/v1/auth/register",
      headers: {},
      data: user,
    });
  }

  confirmUser(token) {
    return axios({
      method: "get",
      url: `https://blog-osc.herokuapp.com/api/v1/auth/confirmUser?token=${token}`,
    });
  }
}
