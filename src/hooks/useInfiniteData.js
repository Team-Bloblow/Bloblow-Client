import useObserver from "./useObserver";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteData = ({
  queryKey,
  queryFn,
  options,
  initialPageParam,
  getNextPageParam,
  ref,
  root,
}) => {
  const { data, status, fetchNextPage, isPending, isError, ...rest } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam, options),
    initialPageParam,
    getNextPageParam,
    staleTime: 10 * 1000,
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

  useObserver({ target: ref, root, threshold: 0.5, onIntersect });

  return { data, status, fetchNextPage, isPending, isError, ...rest };
};

export default useInfiniteData;
