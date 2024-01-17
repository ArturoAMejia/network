import { LoginForm } from "@/components/forms/LoginForm";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get("user");

    if (jwt) {

        return navigate("/")
    }  

  }, [navigate])
  return (
    <>
      <section className="bg-black text-white">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-screen">
          <div className="w-full md:mx-32 lg:mx-96">
            <Link className="block text-white text-4xl font-bold" to="/">
              <span className="sr-only">Home</span>
              {/* <Image alt="logo" src="/logo2.png" width={100} height={32} /> */}
              X
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to X
            </h1>
            <p className="mt-4 leading-relaxed text-white"></p>
            <LoginForm />
          </div>
        </main>
      </section>
    </>
  );
};
