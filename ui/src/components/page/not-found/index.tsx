import NotFoundView from "../../organisms/not-found-view";
import CustomHelmet from "../../molecules/custom-helmet";

export default function NotFoundPage() {
  return (
    <>
      <CustomHelmet page="NOT_FOUND" />
      <NotFoundView />
    </>
  );
}
