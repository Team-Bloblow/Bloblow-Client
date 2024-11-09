import asyncGetUserGroup from "../../../api/group/asyncGetUserGroup";
import useBoundStore from "../../../store/client/useBoundStore";
import UserGroupCard from "./UserGroupCard";
import { useQuery } from "@tanstack/react-query";

const UserGroupCardList = () => {
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserId = !!userUid;

  const { data: userGroupList } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserId,
  });

  return (
    <section className="flex flex-col justify-start gap-10 bg-white border-4 border-pink-100 rounded-[10px] py-25 px-30 w-full h-full overflow-y-scroll">
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
