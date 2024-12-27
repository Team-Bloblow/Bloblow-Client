import GroupSummary from "./GroupSummary";

const MyPageSidebar = () => {
  return (
    <aside className="flex gap-20 w-full px-30 lg:px-0 lg:w-1/3 lg:flex-col">
      <div className="flex lg:flex-col items-center gap-25 w-full lg:w-full lg:h-fit rounded-[8px] bg-white border-2 border-slate-200/80 flex-grow lg:flex-grow-0 shadow-sm">
        <GroupSummary />
      </div>
    </aside>
  );
};

export default MyPageSidebar;
