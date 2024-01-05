import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPost } from "@/interfaces/post";
import { FC } from "react";

type Props = {
  post: IPost;
};

export const PostCard: FC<Props> = ({ post }) => {
  return (
    <Card className="bg-black text-white border-gray-800 rounded-none">
      <CardHeader>
        <CardTitle>{JSON.stringify(post.user)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-words">{post.content}</p>
      </CardContent>

      <CardFooter className="flex gap-4">
        {/* <p>{post.created_at!.toDateString()}</p> */}
        <p>Likes</p>
      </CardFooter>
    </Card>
  );
};
