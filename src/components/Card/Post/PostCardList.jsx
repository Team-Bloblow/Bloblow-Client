import { useRef } from "react";
import { useParams } from "react-router-dom";

import asyncGetPosts from "../../../api/post/asyncGetPosts";
import useInfiniteData from "../../../hooks/useInfiniteData";
import PostCard from "./PostCard";

const PostCardList = () => {
  const { keywordId } = useParams();
  const observeRef = useRef(null);
  const observeRootRef = useRef(null);

  const infiniteDataArgument = {
    queryKey: ["allPosts", keywordId],
    queryFn: asyncGetPosts,
    options: {
      keywordId,
      includedKeyword: "",
      limit: 10,
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursorId : undefined),
    ref: observeRef,
    root: observeRootRef.current,
  };

  useInfiniteData(infiniteDataArgument);

  const postResponse = {
    items: [
      {
        id: "9625dbd0-66e3-42fe-8084-88fa6a180a25",
        link: "https://blog.naver.com/krystarline/223075913585",
        title: "무엇보다 '바닐라코딩'을 선택한 이유",
        content: "네이버 검색창에 바닐라코딩을 입력하니~~~!",
        commentCount: 5,
        likeCount: 10,
        score: 50,
        isAd: false,
        createdAt: "2024-11-01T04:33:01.579Z",
        updatedAt: "2024-11-01T04:33:01.579Z",
      },
      {
        id: "9625dbd0-66e3-42fe-8084-88fa6a180a26",
        link: "https://blog.naver.com/krystarline/223075913585",
        title: "무엇보다 '바닐라코딩'을 선택한 이유2",
        content: "네이버 검색창에 바닐라코딩을 입력하니2~~~!",
        commentCount: 1,
        likeCount: 9,
        score: 80,
        isAd: true,
        createdAt: "2024-11-01T04:33:01.579Z",
        updatedAt: "2024-11-01T04:33:01.579Z",
      },
    ],
    nextCursorId: "234f34wfj8934j0j40gj",
    hasNext: true,
  };

  return (
    <article
      ref={observeRootRef}
      className="flex flex-col justify-start gap-12 bg-white border-4 border-pink-100 rounded-[10px] pt-25 px-30 w-full h-full flex-grow overflow-y-scroll"
    >
      {postResponse?.items?.map((postInfo) => {
        return (
          <PostCard
            key={postInfo?.id}
            postTitle={postInfo?.title}
            postContent={postInfo?.content}
            likeCount={postInfo?.likeCount}
            commentCount={postInfo?.commentCount}
            link={postInfo?.link}
            createdAt={postInfo?.createdAt}
          />
        );
      })}
      <div className="w-full h-40" ref={observeRef}></div>
    </article>
  );
};

export default PostCardList;
