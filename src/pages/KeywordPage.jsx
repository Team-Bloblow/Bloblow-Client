import PostCardList from "../components/Card/Post/PostCardList";

const KeywordPage = () => {
  // useNoSignInRedirect();

  return (
    <main className="flex flex-col justify-start mx-auto pl-250 pt-80 h-screen w-full max-w-1200 pr-40 pb-30">
      <PostCardList />
    </main>
  );
};

export default KeywordPage;
