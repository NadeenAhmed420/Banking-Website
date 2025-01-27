"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const MobileNavBar = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="menu-icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="cursor-pointer items-center flex gap-2">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={34}
              height={34}
              className="size-[24px] max-xl:size-14"
            />
            <h2 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h2>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="h-full flex flex-col gap-6 pt-16">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        key={item.label}
                        href={item.route}
                        className={cn("mobilenav-sheet_close", {
                          "bg-bankGradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white ": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                user
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;
