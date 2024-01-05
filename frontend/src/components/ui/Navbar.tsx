import { Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LogOut, Settings, Twitter, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="">
            <div className="flex justify-center h-auto">
              <div className="flex items-center ">
                <div className="hidden md:block sm:ml-6">
                  <div className="flex flex-col gap-4">
                    <Link
                      className="text-white text-xl px-3 py-2 rounded-md font-bold"
                      to="/"
                    >
                      <Twitter className="h-12 w-12 text-white" />
                    </Link>
                    <Link
                      className="text-white text-xl px-3 py-2 rounded-md font-bold"
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      className="text-white text-xl px-3 py-2 rounded-md font-bold"
                      to="/artists"
                    >
                      All Posts
                    </Link>
                    <Link
                      className="text-white text-xl px-3 py-2 rounded-md font-bold"
                      to="/gallery"
                    >
                      Following
                    </Link>
                    <Link
                      to="/cart"
                      className="text-white text-xl px-3 py-2 rounded-md font-bold"
                    >
                      <LogOut className="h-6 w-6 text-white" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex justify-between items-center w-full md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <User
                      className="block h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
                <Twitter className="h-6 w-6" />
                <Settings className="h-6 w-6" />
              </div>
            </div>
          </div>
          {/* Mobile View */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 text-center">
              <Disclosure.Button
                as={Link}
                to="/"
                className="text-white px-3 py-2 rounded-md font-bold"
              >
                Username
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/contact"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/artists"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Followers
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/gallery"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Following
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
