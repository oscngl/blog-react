import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";

export default function Navi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((userState) => userState.userReducer);

  const Logout = () => {
    navigate("/");
    dispatch(logout()).then(
      alertify.error("You have successfully logged out.")
    );
  };

  return (
    <div>
      <header className="pt-3 mb-4">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li className="px-2" style={{ fontSize: "20px" }}>
                <NavLink to={"/"} className="nav-link px-2 text-dark">
                  Blog
                </NavLink>
              </li>

              <li className="px-2" style={{ fontSize: "20px" }}>
                <NavLink to={"/articles"} className="nav-link px-2 text-dark ">
                  Articles
                </NavLink>
              </li>

              {userState?.state?.role === "ROLE_USER" ? (
                <li className="px-2" style={{ fontSize: "20px" }}>
                  <NavLink to={"/create"} className="nav-link px-2 text-dark">
                    Create
                  </NavLink>
                </li>
              ) : null}
            </ul>

            <div className="text-end">
              {userState === null || userState?.state === null ? (
                <div>
                  <NavLink
                    to={"/login"}
                    className="btn me-2 btn-md btn-outline-dark"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className="btn btn-md btn-outline-dark"
                  >
                    Register
                  </NavLink>
                </div>
              ) : (
                <div>
                  <NavLink
                    to={`/${userState?.state?.user?.usrname}`}
                    className="btn btn-md btn-outline-dark me-2"
                  >
                    Profile
                  </NavLink>
                  <div
                    className="btn btn-md btn-outline-dark"
                    role="button"
                    onClick={() => Logout()}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
      </header>
    </div>
  );
}
