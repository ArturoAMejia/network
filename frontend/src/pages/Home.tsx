import { CreatePostForm } from "@/components/forms/CreatePostForm";
import { PostCard } from "@/components/ui/PostCard";
import { useGetPosts } from "@/hooks";
import { IPost } from "@/interfaces/post";
import { Loader } from "lucide-react";

export const Home = () => {
  const { data, isLoading } = useGetPosts();

  return (
    <div>
      <CreatePostForm />

      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-1">
          {data?.map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
