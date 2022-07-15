import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import { login } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let authService = new AuthService();
  let userService = new UserService();

  const setUser = (user) => {
    dispatch(login(user));
  };

  const signin = async (e) => {
    e.preventDefault();

    const jwt = await authService.login(email, password);

    if (!jwt?.data?.success) {
      alertify.error("Email or password is incorrect!");
    } else {
      const response = await userService.getByEmail(email);
      if (response !== null && response.data.success) {
        setUser({
          user: response.data.data,
          role: response.data.data.roles[0].name,
          accessToken: jwt.data.data.access_token,
          refreshToken: jwt.data.data.refresh_token,
        });
        navigate("/");
        alertify.success("You have successfully logged in.");
      } else {
        alertify.error("Email or password is incorrect!");
      }
    }
  };

  return (
    <div className="container mt-5 pt-5" style={{ paddingBottom: "20.8em" }}>
      <div className="row">
        <div className="col-12 col-sm-7 col-md-6 m-auto">
          <div className="card border-0 shadow" style={{ marginTop: "10em" }}>
            <div className="card-body">
              <h1 className="text-center text-dark">Login</h1>
              <form onSubmit={signin}>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control my-4 py-2"
                  placeholder="Email"
                  aria-describedby="emailHelp"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control my-4 py-2"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center mt-3">
                  <button className="btn btn-dark my-3">Login</button>
                  <a href="/register" className="nav-link text-dark">
                    Don't have an account?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
