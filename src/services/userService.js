import axios from "axios";

export default class userService {
  getById(id) {
    return axios.get(
      `http://localhost:8080/api/v1/users/getById?id=${id}`
    );
  }

  getByEmail(email) {
    return axios.get(
      `http://localhost:8080/api/v1/users/getByEmail?email=${email}`
    );
  }

  getByUsername(username) {
    return axios.get(
      `http://localhost:8080/api/v1/users/getByUsername?username=${username}`
    );
  }

  setPhoto(id, photo, accessToken) {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("photo", photo);
    return axios({
      method: "put",
      url: "http://localhost:8080/api/v1/users/setPhotoUrl",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      data: formData,
    });
  }

  update(user, accessToken) {
    return axios({
      method: "put",
      url: "http://localhost:8080/api/v1/users/update",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      data: user,
    });
  }
}
