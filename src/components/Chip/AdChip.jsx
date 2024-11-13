import ExclamationMarkIcon from "../Icon/ExclamationMarkIcon";

const AdChip = () => {
  return (
    <div className="flex items-center flex-shrink-0 gap-5 px-10 py-3 bg-green-500/10 rounded-[5px]">
      <ExclamationMarkIcon className="size-20 fill-red-400" />
      <span className="font-semibold">광고</span>
    </div>
  );
};

export default AdChip;
