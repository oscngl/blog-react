import Skeleton from "react-loading-skeleton";
import "../../../style/Skeleton.css";

const UserArticleSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_) => (
      <div className="card-skeleton">
        <Skeleton
          count={3}
          style={{
            width: "150px",
            height: "15px",
            marginTop: ".3rem",
            marginLeft: "1em",
          }}
        />
      </div>
    ));
};

export default UserArticleSkeleton;
