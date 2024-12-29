import GroupSummary from "./GroupSummary";

const MyPageSidebar = () => {
  return (
    <aside className="flex gap-20 w-full md:w-1/3 md:flex-col">
      <div className="flex lg:flex-col items-center gap-25 w-full md:w-full md:h-fit rounded-[8px] bg-white border-2 border-slate-200/80 flex-grow md:flex-grow-0 shadow-sm">
        <GroupSummary />
      </div>
    </aside>
  );
};

export default MyPageSidebar;
