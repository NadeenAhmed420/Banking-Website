import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-9">
        <div className="profile-banner" />
        {/* START OF PROFILE DETAILS */}
        <div className="profile">
          <div className="profile-img">
            <span className="font-bold text-5xl text-blue-500 ">
              {user.name[0]}
            </span>
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{user?.name || "Guest"}</h1>
            <p className="profile-email">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </div>
        {/* START OF BANKS DETAILS */}
        <section className="banks">
          <div className="flex justify-between w-full">
            <h2 className="header-2">Banks</h2>
            <Link href="/" className="flex gap-2">
              <Image
                src="/icons/plus.svg"
                alt="plus-icon"
                width={20}
                height={20}
              />
              <h2 className="font-semibold text-14 text-gray-600">Add bank</h2>
            </Link>
          </div>

          {banks?.length > 0 && (
            <div className="relative flex flex-1 flex-col justify-center items-center gap-5">
              <div className="relative z-10">
                <BankCard
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={user.name}
                  showBalance={false}
                />
              </div>
              {banks[1] && (
                <div className="absolute top-8 right-0 z-0 w-[90%]">
                  <BankCard
                    key={banks[1].$id}
                    account={banks[1]}
                    userName={user.name}
                    showBalance={false}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </section>
    </aside>
  );
};

export default RightSideBar;
