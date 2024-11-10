import { useRef } from "react";
import { useParams } from "react-router-dom";

import asyncGetPosts from "../../../api/post/asyncGetPosts";
import { ERROR_MESSAGE } from "../../../config/constants";
import useInfiniteData from "../../../hooks/useInfiniteData";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import PostCard from "./PostCard";

const PostCardList = () => {
  const { keywordId } = useParams();
  const observeRef = useRef(null);
  const observeRootRef = useRef(null);

  const infiniteDataArgument = {
    queryKey: ["posts", keywordId],
    queryFn: asyncGetPosts,
    options: {
      keywordId,
      includedKeyword: "",
      limit: 5,
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursorId : undefined),
    ref: observeRef,
    root: observeRootRef.current,
  };

  const { data: postResponse, isPending } = useInfiniteData(infiniteDataArgument);

  if (postResponse?.pages[0]?.message?.includes("Error occured")) {
    return <Error errorMessage={ERROR_MESSAGE.FETCH_POSTS} />;
  }

  return (
    <article
      ref={observeRootRef}
      className="flex flex-col justify-start gap-12 bg-white rounded-[10px] pt-25 px-30 w-full h-full flex-grow overflow-y-scroll"
    >
      {isPending ? (
        <Loading width={100} height={100} text={""} />
      ) : postResponse?.pages[0]?.items?.length === 0 ? (
        <p>해당 키워드에 대한 블로그가 없습니다.</p>
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
