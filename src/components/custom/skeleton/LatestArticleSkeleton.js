import Skeleton from "react-loading-skeleton";
import "../../../style/Skeleton.css";

const LatestArticleSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_) => (
      <div className="card-skeleton">
        <div className="left-col">
          <Skeleton circle width={24} height={24} />
        </div>
        <div className="right-col">
          <Skeleton
            style={{ width: "50px", height: "10px", marginTop: "0.7em" }}
          />
          <Skeleton
            count={2}
            style={{ width: "100px", height: "15px", marginTop: ".3rem" }}
          />
        </div>
      </div>
    ));
};

export default LatestArticleSkeleton;
