import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { useCreatePost } from "@/hooks";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  content: z.string(),
});

type FormData = z.infer<typeof postSchema>;

export const CreatePostForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const { mutate, isError, error } = useCreatePost();

  const onCreatePost = async ({ content }: FormData) => {
    mutate({ content, user: 2 });
    if (isError) {
      console.log(error);
    }
    form.reset();
    toast.success("Post created successfully!");
  };
  return (
    <Card className="bg-black border-none mb-4">
      <div className="flex w-full">
        <CardHeader className="space-y-0 p-0 pt-4">
          <CardTitle>
            <User className="h-8 w-8 text-white" />
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-0 pl-4 ">
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
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-24 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </Card>
  );
};
