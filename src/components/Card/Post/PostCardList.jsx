import { useRef } from "react";

import asyncGetPosts from "../../../api/post/asyncGetPosts";
import { ERROR_MESSAGE, POST_LISTS } from "../../../config/constants";
import useInfiniteData from "../../../hooks/useInfiniteData";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import PostCard from "./PostCard";
import PostListFilter from "./PostListFilter";
import PropTypes from "prop-types";

const PostCardList = ({ keywordId, filterList, setFilterList, resetFilterList }) => {
  const observeRef = useRef(null);

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
  };

  const {
    data: postResponse,
    isPending,
    isFetchingNextPage,
    isError,
  } = useInfiniteData(infiniteDataArgument);
  const hasNotPostResponseForFirstRequest =
    filterList === POST_LISTS.DEFAULT_FILTER_LIST && postResponse?.pages[0]?.items?.length === 0;
  const hasPostResponse = postResponse?.pages[0]?.items?.length > 0;

  if (isError || postResponse?.pages[0]?.message?.includes("Error occured")) {
    return <Error errorMessage={ERROR_MESSAGE.FETCH_POSTS} />;
  }

  if (hasNotPostResponseForFirstRequest) {
    return (
      <article className="flex-center bg-white p-10 w-full min-h-730">
        {isPending ? (
          <Loading width={100} height={100} text={""} />
        ) : (
          <p className="flex-col-center text-22">확인할 수 있는 게시물이 없어요</p>
        )}
      </article>
    );
  }

  return (
    <article className={`flex flex-col gap-12 bg-white p-10 w-full min-h-730 overflow-y-scroll`}>
      <PostListFilter
        keywordId={keywordId}
        filterList={filterList}
        setFilterList={setFilterList}
        resetFilterList={resetFilterList}
      />
      <div
        className={`${hasPostResponse ? "flex flex-col w-full h-full gap-10" : "flex-col-center w-full h-full flex-grow"}`}
      >
        {hasPostResponse ? (
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
        ) : (
          <p className="text-22">확인할 수 있는 게시물이 없어요</p>
        )}
        {isFetchingNextPage && <Loading width={50} height={50} text={""} />}
      </div>
      <div ref={observeRef} className="h-1" />
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
  setFilterList: PropTypes.func.isRequired,
  resetFilterList: PropTypes.func.isRequired,
};
