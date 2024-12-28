import useObserver from "./useObserver";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteData = ({
  queryKey,
  queryFn,
  options,
  initialPageParam,
  getNextPageParam,
  ref,
}) => {
  const { data, status, fetchNextPage, isPending, isFetchingNextPage, isError, ...rest } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => queryFn(pageParam, options),
      initialPageParam,
      getNextPageParam,
    });

  const onIntersect = (entries) => {
    if (isPending) return;
    if (!data?.pages[data?.pages.length - 1].hasNext) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
  };

  useObserver({ target: ref, threshold: 1.0, onIntersect });

  return { data, status, fetchNextPage, isPending, isError, isFetchingNextPage, ...rest };
};

export default useInfiniteData;
