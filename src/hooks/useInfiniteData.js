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

    entries.forEach((element) => {
      if (element.isIntersecting) {
        fetchNextPage();
      }
    });
  };

  useObserver({ ref, root: root, threshold: 0.6, onIntersect });

  return { data, status, fetchNextPage, isPending, isError, ...rest };
};

export default useInfiniteData;
