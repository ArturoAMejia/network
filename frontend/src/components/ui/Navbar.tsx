import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-zinc-950">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-32">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center ">
                <div className="hidden md:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      className="text-white hover:text-gray-200  py-2 rounded-md text-sm font-medium"
                      to="/"
                    >

                      Network
                    </Link>
                    <Link
                      className="text-white hover:bg-[#b15e55] hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      className="text-white hover:bg-[#b15e55] hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      to="/artists"
                    >
                      All Posts
                    </Link>
                    <Link
                      className="text-white hover:bg-[#b15e55] hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      to="/gallery"
                    >
                      Following
                    </Link>
                    <Link to="/cart" className="flex items-center">
                      <LogOut className="h-6 w-6 text-white" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#b15e55] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile View */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 text-center">
              <Disclosure.Button
                as={Link}
                to="/"
                className="text-white hover:bg-[#b15e55] hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Inicio
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/artists"
                className="text-white hover:bg-[#b15e55] hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Artistas
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/gallery"
                className="text-white hover:bg-[#b15e55] hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Obras
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/contact"
                className="text-white hover:bg-[#b15e55] hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Contacto
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/cart"
                className="text-white flex justify-center hover:bg-[#b15e55] hover:text-gray-200  px-3 py-2 rounded-md text-base font-medium"
              >
                <ShoppingCartIcon className="h-6 w-6 text-white" />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}