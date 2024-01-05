import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "@/hooks";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters long" }),
});

type FormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutate, isError, error } = useLogin();
  const onLoginUser = async ({ email, password }: FormData) => {
    mutate({ username: email, password });

    if (isError) {
      console.log(error);
    }
    console.log('a');
    navigate("/home");
    toast.success("Logged in successfully!");
    console.log('b')

  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginUser)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="text-black" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Log In
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-6 text-center ">
        <Link
          to="/auth/register"
          className="text-sm text-blue-500 hover:underline dark:text-blue-400"
        >
          Don't have an account? Register!
        </Link>
      </div>
    </>
  );
};
