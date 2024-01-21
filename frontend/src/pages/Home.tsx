import { CreatePostForm } from "@/components/forms/CreatePostForm";
import { PostCard } from "@/components/ui/PostCard";
import { useGetPosts } from "@/hooks";
import { IPost } from "@/interfaces/post";
import { Loader } from "lucide-react";
import { useContext } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AuthContext } from "@/context";

export const Home = () => {
  const { page, setPage } = useContext(AuthContext);

  const { data, isLoading, refetch } = useGetPosts(page);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    refetch();
  };

  const handlePreviousPage = () => {
    setPage((prev) => prev - 1);
    refetch();
  };

  return (
    <div>
      <CreatePostForm />

      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-1">
          {data.posts?.map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousPage} />
              </PaginationItem>
              {data.numberOfPages > 1
                ? Array.from(
                    { length: data.numberOfPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem>
                      <PaginationLink>{page}</PaginationLink>
                    </PaginationItem>
                  ))
                : null}
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
