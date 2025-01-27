import MobileNabBar from "@/components/ui/MobileNabBar";
import SideBar from "@/components/ui/sideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
// import "../globals.css"
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={loggedIn} />
      <div className="flex flex-col size-full ">
        <div className="root-layout">
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <div>
            <MobileNabBar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
