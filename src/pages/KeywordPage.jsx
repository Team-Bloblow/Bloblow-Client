import PostCardList from "../components/Card/Post/PostCardList";
import useNoSignInRedirect from "../hooks/useNoSignInRedirect";

const KeywordPage = () => {
  useNoSignInRedirect();

  return (
    <main className="flex items-start gap-50 mx-auto mt-80 w-full max-w-1200 px-40 py-30">
      <PostCardList />
    </main>
  );
};

export default KeywordPage;
