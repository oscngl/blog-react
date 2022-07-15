import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AuthService from "../services/authService";

export default function ConfirmUser() {
  const [response, setResponse] = useState({});
  const { token } = useParams();

  let authService = new AuthService();

  useEffect(() => {
    authService
      .confirmUser(token)
      .then((response) => setResponse(response.data));
  }, []);

  return (
    <div>
      <div
        className="text-center"
        style={{ height: "100vh", marginTop: "20em" }}
      >
        <div className="shadow p-5">
          {response.success ? (
            <div>
              <h3> Your account has been successfully confirmed. </h3>
              <br />
              <NavLink to={"/login"} className="btn btn-dark btn-md text-white">
                Click to Login
              </NavLink>
            </div>
          ) : (
            <div>
              <h3> {response.message} </h3>
              <h3> Please re-register.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
