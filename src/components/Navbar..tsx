import { Icon } from "./Icon";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import {cookies} from 'next/headers'
import UserAccNav from "./UserAccNav";
import MobileNav from './MobileNav'

const Navbar = async () => {
  const nextCookies = cookies();
  const {user} = await getServerSideUser(nextCookies);


  return (
    <div className="bg-grey-50 sticky top-0 z-50 insert-x-0 h-16 ">
      <header className="bg-grey-50 relative">
        <MaxWidthWrapper>
          <div className="border-b border-grey-200">
            <div className="flex h-16 items-center">
              {/* // todo: Add Mobile Viewpoint */}
              <MobileNav />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icon.logo className="w-10 h-10" fill="#354d23" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Signin
                    </Link>
                  )}
                  {user ? null : (
                    <span aria-hidden="true" className="h-6 w-px bg-grey-200" />
                  )}

                  {user ? (
                    <UserAccNav user={user}/>
                  ) : (
                    <Link
                      href={"sign-up"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Signup
                    </Link>
                  )}
                  {user ? (
                    <span aria-hidden="true" className="h-6 w-px bg-grey-200" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-grey-200"
                      />
                    </div>
                  )}
                  
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                    <Cart/>
                  </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
