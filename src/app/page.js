import Banner from "@/components/Banner";
import RecentRequest from "@/components/HomePageSections/RecentRequest";

export default async function Home() {
  return (
    <div>
      <Banner />
      <RecentRequest />
    </div>
  );
}
