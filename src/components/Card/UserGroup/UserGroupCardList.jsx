import asyncGetUserGroup from "../../../api/group/asyncGetUserGroup";
import useBoundStore from "../../../store/client/useBoundStore";
import UserGroupCard from "./UserGroupCard";
import { useQuery } from "@tanstack/react-query";

const UserGroupCardList = () => {
  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });

  if (userGroupList?.groupListLength === 0) {
    return <div className="flex flex-center w-full h-full">생성한 그룹이 없습니다</div>;
  }

  if (hasUserUid && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  return (
    <section className="flex flex-col justify-start gap-15 bg-white rounded-[10px] px-30 w-full h-full overflow-y-scroll">
      {userGroupList?.groupListResult?.map((groupInfo) => (
        <UserGroupCard
          key={groupInfo?._id}
          groupId={groupInfo?._id}
          groupName={groupInfo?.name}
          keywordList={groupInfo?.keywordIdList}
          updatedAt={groupInfo?.updatedAt}
        />
      ))}
    </section>
  );
};

export default UserGroupCardList;
