import { useRef } from "react";

import asyncGetPosts from "../../../api/post/asyncGetPosts";
import { ERROR_MESSAGE } from "../../../config/constants";
import useInfiniteData from "../../../hooks/useInfiniteData";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import PostCard from "./PostCard";
import PropTypes from "prop-types";

const PostCardList = ({ keywordId, filterList }) => {
  const observeRef = useRef(null);
  const observeRootRef = useRef(null);

  const infiniteDataArgument = {
    queryKey: ["posts", keywordId, filterList],
    queryFn: asyncGetPosts,
    options: {
      keywordId,
      order: filterList.order,
      includedKeyword: filterList.includedKeyword,
      excludedKeyword: filterList.excludedKeyword,
      isAd: filterList.isAd,
      limit: 5,
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursorId : undefined),
    ref: observeRef,
    root: observeRootRef.current,
  };

  const { data: postResponse, isPending, isError } = useInfiniteData(infiniteDataArgument);

  if (isError || postResponse?.pages[0]?.message?.includes("Error occured")) {
    return <Error errorMessage={ERROR_MESSAGE.FETCH_POSTS} />;
  }

  return (
    <article
      ref={observeRootRef}
      className="flex flex-col justify-start gap-12 bg-white rounded-[10px] p-10 w-full h-full flex-grow overflow-y-scroll"
    >
      {isPending ? (
        <Loading width={100} height={100} text={""} />
      ) : postResponse?.pages[0]?.items?.length === 0 ? (
        <p className="w-full h-full flex-center text-22">확인할 수 있는 게시물이 없어요</p>
      ) : (
        postResponse?.pages?.map((page) => {
          return page.items?.map((postInfo) => {
            return (
              <PostCard
                key={postInfo?._id}
                postTitle={postInfo?.title}
                postDescription={postInfo?.description}
                likeCount={postInfo?.likeCount}
                commentCount={postInfo?.commentCount}
                link={postInfo?.link}
                createdAt={postInfo?.createdAt}
                isAd={postInfo?.isAd ?? false}
              />
            );
          });
        })
      )}
      <div className="w-full h-10 flex-shrink-0" ref={observeRef} />
    </article>
  );
};

export default PostCardList;

PostCardList.propTypes = {
  keywordId: PropTypes.string.isRequired,
  filterList: PropTypes.shape({
    order: PropTypes.string.isRequired,
    includedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    excludedKeyword: PropTypes.arrayOf(PropTypes.string.isRequired),
    isAd: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }),
};
