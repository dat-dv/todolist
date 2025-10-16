import CustomHelmet from "../../molecules/custom-helmet";
import HomepageView from "../../organisms/homepage-view";

export default function HomePage() {
  return (
    <>
      <CustomHelmet page="HOME" />
      <HomepageView />
    </>
  );
}
