import { ProfileCard } from "@/components/site/ProfileCard";
import { PostCard } from "@/components/ui/PostCard";
import { useGetUser } from "@/hooks";
import { IPost } from "@/interfaces/post";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { username } = useParams();
  const { data, isLoading } = useGetUser(username!);

  return (
    <div>
      <ProfileCard />
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-1">
          {data.posts?.reverse().map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
