import Banner from "@/components/Banner";
import GetStarted from "@/components/HomePageSections/GettingStarted";
import RecentRequest from "@/components/HomePageSections/RecentRequest";

export default async function Home() {
  return (
    <div>
      <Banner />
      <RecentRequest />
      <GetStarted />
    </div>
  );
}
