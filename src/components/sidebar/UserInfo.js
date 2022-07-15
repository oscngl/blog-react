import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import UserInfoSkeleton from "../custom/skeleton/UserInfoSkeleton";

export default function UserInfo() {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  let userService = new UserService();

  useEffect(() => {
    setLoading(true);
    userService
      .getByUsername(username)
      .then((response) => setUser(response.data.data));
    setLoading(false);
  }, []);

  const navigateToUserDetail = () => {
    navigate(`/${username}`);
  };

  return (
    <div>
      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <div onClick={() => navigateToUserDetail()}>
          <div className="text-center">
            <img
              className="rounded-circle"
              src={
                user?.photoUrl !== null
                  ? user?.photoUrl
                  : "https://res.cloudinary.com/dfl3sbjog/image/upload/v1656858805/blog.user.photo/User_font_dcj8o6.webp"
              }
              width={64}
              height={64}
            />
            <h6 className="mt-3">
              {user?.firstName} {user?.lastName}
            </h6>
            <p>{user?.coverLetter}</p>
          </div>
        </div>
      )}
    </div>
  );
}
