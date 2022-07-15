import React, { useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const authService = new AuthService();
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alertify.error("Password must be at least 8 characters!", 3);
    } else if (password !== password2) {
      alertify.error("Passwords don't match!", 3);
    } else {
      authService
        .register({
          firstName: firstName,
          lastName: lastName,
          usrname: username,
          email: email,
          password: password,
          roleName: "ROLE_USER",
        })
        .then((response) =>
          response.data.success === true
            ? alertify
                .success(
                  "You have successfully registered. Please verify your account with the link sent to your email address.",
                  3
                )
                .then(navigate("/login"))
            : alertify.error(response.data.message, 3)
        );
    }
  };

  return (
    <div className="container mt-5 pt-5" style={{ paddingBottom: "9.45em" }}>
      <div className="row">
        <div className="col-12 col-sm-7 col-md-6 m-auto">
          <div className="card border-0 shadow" style={{ marginTop: "5em" }}>
            <div className="card-body">
              <h1 className="text-center text-dark">Register</h1>
              <form onSubmit={register}>
                <input
                  type="text"
                  id="inputFirstName"
                  className="form-control my-4 py-2"
                  placeholder="First Name"
                  aria-describedby="firstNameHelp"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  id="inputLastName"
                  className="form-control my-4 py-2"
                  placeholder="Last Name"
                  aria-describedby="lastNameHelp"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  id="inputUsername"
                  className="form-control my-4 py-2"
                  placeholder="Username"
                  aria-describedby="usernameHelp"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                <input
                  type="password"
                  id="inputPassword2"
                  className="form-control my-4 py-2"
                  placeholder="Password Again"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <div className="text-center my-3">
                  <button className="btn btn-dark my-3">Register</button>
                  <a href="/login" className="nav-link text-dark">
                    Already have an account ?
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
