import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLikePost } from "@/hooks";
import { IPost } from "@/interfaces/post";
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import { FC } from "react";

type Props = {
  post: IPost;
};

export const PostCard: FC<Props> = ({ post }) => {
  const { mutate } = useLikePost();
  const user_id = Cookies.get("user_id");

  const onLikePost = async () => {
    mutate({ post: post.id!, user: Number(user_id) });
  };
  return (
    <Card className="bg-black text-white border-gray-800 rounded-none">
      <CardHeader>
        <CardTitle>{post.user.username}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-words">{post.content}</p>
      </CardContent>

      <CardFooter className="flex gap-4">
        <div className="flex gap-2">
          {post.likes?.filter((like) => like.user === Number(user_id))?.length >
          0 ? (
            <>
              <button onClick={onLikePost}>
                <Heart color="#22d3ee" />
              </button>
              <p>{post.count}</p>
            </>
          ) : (
            <>
              <button onClick={onLikePost}>
                <Heart />
              </button>
              <p>{post.count}</p>
            </>
          )}
        </div>
        <p>{post.created_at?.toString().split("T")[0]}</p>
      </CardFooter>
    </Card>
  );
};
