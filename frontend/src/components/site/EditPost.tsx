import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { z } from "zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useUpdatePost } from "@/hooks";
import { AuthContext } from "@/context";
import { FC, useContext } from "react";
import Cookies from "js-cookie";
import { Pencil } from "lucide-react";
import { IPost } from "@/interfaces/post";

const postSchema = z.object({
  content: z.string(),
});

type FormData = z.infer<typeof postSchema>;

type Props = {
  post: IPost;
};

const DialogClose = DialogPrimitive.Close;

export const EditPost: FC<Props> = ({ post }) => {
  const { page } = useContext(AuthContext);

  const { mutate, isError, error } = useUpdatePost(page);

  const u = Cookies.get("user");
  const user = JSON.parse(u!);

  const form = useForm<FormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      content: post.content,
    },
  });

  const onCreatePost = async ({ content }: FormData) => {
    mutate({ content, user: user.id, id: post.id });
    if (isError) {
      console.log(error);
    }
    form.reset();
    toast.success("Post updated successfully!");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className=" text-white"
            onSubmit={form.handleSubmit(onCreatePost)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormControl>
                    <Textarea
                      className="bg-black ring-0 focus:ring-0 h-48 text-md p-2 border-gray-800 resize-none w-full"
                      {...field}
                      placeholder="What's happening?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose className="flex justify-end">
              <Button
                type="submit"
                className="w-24 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Post
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
