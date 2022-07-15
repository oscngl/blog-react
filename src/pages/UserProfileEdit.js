import React, { useEffect, useState } from "react";
import UserService from "../services/userService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

export default function UserProfileEdit() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const navigate = useNavigate();

  const userState = useSelector((userState) => userState.userReducer);

  let userService = new UserService();

  useEffect(() => {
    userState === null || userState?.state === null
      ? navigate("/login")
      : userService
          .getById(userState?.state?.user?.id)
          .then((response) => setUser(response.data.data));
  }, []);

  const update = (e) => {
    e.preventDefault();

    if (image !== null) {
      console.log(userState?.state?.accessToken);
      userService
        .setPhoto(user.id, image, userState?.state?.accessToken)
        .then((response) =>
          response.data.success === true
            ? alertify
                .success("Profile photo updated successfully.", 3)
                .then(navigate("/"))
            : alertify.error(response.data.message, 3)
        );
    }
    if (coverLetter !== null) {
      setUser(userState?.state?.user);
      user.coverLetter = coverLetter;
      userService
        .update(user, userState?.state?.accessToken)
        .then((response) =>
          response.data.success === true
            ? alertify
                .success("Profile updated successfully.", 3)
                .then(navigate("/"))
            : alertify.error(response.data.message, 3)
        );
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-1" />
        <div className="col-4 text-center">
          <img
            className="rounded-circle"
            src={
              user?.photoUrl !== null
                ? user?.photoUrl
                : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
            }
            width={256}
            height={256}
          />
        </div>
        <div className="col-1">
          <div className="d-flex h-100">
            <div className="vr" style={{ marginLeft: "1em" }} />
          </div>
        </div>
        <div className="col-5 mt-5">
          <div>
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
            <div>
              <p>{user?.coverLetter}</p>
            </div>
          </div>
        </div>
        <div className="col-1" />
        <hr className="mb-4 mt-4" />
      </div>
      <form onSubmit={update}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label
            className="form-control"
            style={{ width: "220px", marginRight: "1em" }}
          >
            Change Profile Photo
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="form-control rounded"
            id="customFile"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <hr className="" />
        <div className="my-4">
          <textarea
            className="form-control rounded"
            placeholder="Tell us about yourself..."
            rows={15}
            style={{ resize: "none" }}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center mt-4 mb-5">
          <button className="btn btn-outline-secondary rounded">Update</button>
        </div>
      </form>
    </div>
  );
}
