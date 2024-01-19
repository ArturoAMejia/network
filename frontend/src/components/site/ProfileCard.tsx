import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { IFollowing } from "@/interfaces/post";
import { Loader, PlusCircle } from "lucide-react";

import { useFollowUser, useGetUser } from "@/hooks";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
// import { IUser } from "@/interfaces/user";

export const ProfileCard = () => {
  const { username } = useParams();
  const { data, isLoading } = useGetUser(username!);
  const userCookies = JSON.parse(Cookies.get("user")!);
  const { mutate } = useFollowUser(username!);

  const onFollowUser = async () => {
    mutate({ user: userCookies?.id, followed_user: data?.id });
  };

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <Card className="bg-black text-white border-gray-800 rounded-none mb-4">
          <CardHeader>
            <CardTitle className="flex gap-2 justify-between">
              {/* <Link to={post.user.username}>{post.user.username}</Link> */}
              <p>{data?.username}</p>
              {data?.id !== userCookies?.id ? (
                data?.followers.filter(
                  (following: IFollowing) => following.user === userCookies?.id
                )?.length > 0 ? (
                  <button
                    className="text-sm font-bold p-2 bg-white text-black rounded-md"
                    onClick={onFollowUser}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button onClick={onFollowUser}>
                    <PlusCircle />
                  </button>
                )
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <p>Followers: {data?.count_followers}</p>
            <p>Following: {data?.count_following}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
