import Skeleton from "react-loading-skeleton";
import "../../../style/Skeleton.css";

const ArticleSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_) => (
      <div className="card-skeleton mb-5">
        <div className="left-col">
          <Skeleton circle width={40} height={40} />
        </div>
        <div className="right-col">
          <Skeleton style={{ width: "200px", marginTop: "1em" }} />
          <Skeleton count={4} style={{ marginTop: ".6rem" }} />
        </div>
      </div>
    ));
};

export default ArticleSkeleton;
