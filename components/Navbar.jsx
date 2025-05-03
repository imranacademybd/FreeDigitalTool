
import { axiosClient } from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const res = await axiosClient.get("/api/admin/getCategory");
  const categories = res?.data?.data;

  const navlinks = [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blogs" },
    { title: "Our Services", url: "/our-services" },
  ];

  const hoverLinks = [
    { title: "About Us", url: "/about-us" },
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Disclaimer", url: "/disclaimer" },
    { title: "Terms Of Services", url: "/terms-of-services" },
    { title: "Contact Us", url: "/contact" },
  ];

  return (
    <div className="navbar bg-base-100 font-roboto container mx-auto ">
      <div className="navbar-start container mx-auto">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks.map((link) => (
              <li
                className="hover:bg-seo-primary active:bg-seo-primary active:text-white transition-all 5s ease-in-out rounded-md"
                key={link.url}
              >
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}

            {/* Guide Dropdown (Mobile) */}
            <li className="dropdown dropdown-hover text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out">
              <span tabIndex={0} role="button" className="hover:text-white">
                Guide
              </span>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {hoverLinks?.map((link) => (
                  <li
                    className="text-xl hover:text-white hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out"
                    key={link.url}
                  >
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Added All Tools Categories (Mobile) */}
            <li className="dropdown dropdown-hover text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out">
              <span tabIndex={0} role="button" className="hover:text-white">
                All Tools Categories
              </span>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box z-1 w-full p-2 shadow-sm"
              >
                {categories?.length ? (
                  categories.map((cat, index) => {
                    const catName = cat?.name.replace(/\s+/g, "-");
                    return (
                      <li
                        className="text-lg hover:bg-seo-first-color hover:text-white rounded-md p-2 transition-all duration-200 ease-in-out"
                        key={index}
                      >
                        <Link
                          href={`/categories/${catName}`}
                          className="block w-full"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-gray-500 p-2">No categories found</li>
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <Link
          href={"/"}
          className="md:px-3 text-xl h-auto bg-none border-none bg-white border-white"
        >
          <img
            src={"/free-dg-tools-more-resized.png"}
            alt="free digital tools"
            className="w-40"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex justify-center items-center gap-x-10 px-1">
          {navlinks?.map((link) => (
            <li
              className="text-xl hover:text-white hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out"
              key={link.url}
            >
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}

          <li className="dropdown dropdown-hover text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out">
            <span tabIndex={0} role="button" className="hover:text-white">
              Guide
            </span>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li className="text-xl hover:text-white hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out"></li>
              {hoverLinks?.map((link) => (
                <li
                  className="text-xl hover:text-white hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out"
                  key={link.url}
                >
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Modified All Tools Categories Section */}
          <li className="dropdown dropdown-hover relative text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out">
            <span tabIndex={0} role="button" className="hover:text-white">
              All Tools Categories
            </span>
            <div
              tabIndex={0}
              className="dropdown-content bg-base-100 z-30 absolute left-7 xl:left-24 -translate-x-8/12 right-0  w-screen mt-2 shadow-xl"
            >
              <div className="max-w-7xl mx-auto p-6">
                <div className="mb-4 pb-2 border-b">
                  <h3 className="text-2xl font-bold text-seo-first-color">
                    All Tool Categories
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories?.length ? (
                    categories.map((cat, index) => {
                      const catName = cat?.name.replace(/\s+/g, "-");
                      return (
                        <div
                          className="text-lg hover:bg-seo-first-color hover:text-white rounded-md p-3 transition-all duration-200 ease-in-out"
                          key={index}
                        >
                          <Link
                            href={`/categories/${catName}`}
                            className="block w-full"
                          >
                            {cat.name}
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-500 p-4 col-span-full">
                      No categories found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link
          href={"/login"}
          className="btn px-5 py-6 border-white bg-white text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md transition-all duration-200 ease-in-out hover:text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
