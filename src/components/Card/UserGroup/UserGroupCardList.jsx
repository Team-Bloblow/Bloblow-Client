import asyncGetUserGroup from "../../../api/group/asyncGetUserGroup";
import useBoundStore from "../../../store/client/useBoundStore";
import UserGroupCard from "./UserGroupCard";
import { useQuery } from "@tanstack/react-query";

const UserGroupCardList = () => {
  const userId = useBoundStore((state) => state.userInfo.id);
  // const hasUserId = !!userId;

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList", userId],
    queryFn: () => asyncGetUserGroup(userId),
    // enabled: hasUserId,
  });

  return (
    <section className="flex flex-col justify-start gap-10 bg-white border-4 border-pink-200 rounded-[10px] py-40 px-40 w-full h-430 overflow-y-scroll">
      {userGroupList?.map((groupInfo) => {
        <UserGroupCard
          key={groupInfo?.id}
          groupName={groupInfo?.groupName}
          keywordList={groupInfo?.keywordList}
          createdAt={groupInfo?.createdAt}
          updatedAt={groupInfo?.updatedAt}
        />;
      })}
    </section>
  );
};

export default UserGroupCardList;
