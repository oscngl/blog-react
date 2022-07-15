import Skeleton from "react-loading-skeleton";

const TopicListSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_) => (
      <div style={{ display: "flex", marginTop: "1em" }}>
        <Skeleton style={{ width: "70px" }} />
        <Skeleton style={{ width: "70px", marginLeft: "1em" }} />
      </div>
    ));
};

export default TopicListSkeleton;
