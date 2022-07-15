import Skeleton from "react-loading-skeleton";

const UserInfoSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_) => (
      <div className="text-center">
        <Skeleton circle width={60} height={60} />
        <Skeleton style={{ marginTop: "1em", width: "100px" }} />
        <Skeleton count={3} style={{ width: "200px" }} />
      </div>
    ));
};

export default UserInfoSkeleton;
