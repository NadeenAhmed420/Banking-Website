import HeaderBox from "@/components/ui/HeaderBox";
import RightSideBar from "@/components/ui/RightSideBar";
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  // const loggedIn = {
  //   firstName: "Nadeen",
  //   lastName: "AHHH",
  //   email: "nadeen.codeClouders.com",
  // };
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
      </div>
      <RightSideBar
        user={loggedIn || { name: "Guest", email: "guest@example.com" }}
        transactions={[]}
        banks={[{ currentBalance: 135.5 }, { currentBalance: 230.5 }]}
      />
    </section>
  );
};
export default Home;
