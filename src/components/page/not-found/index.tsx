import { Helmet } from "react-helmet-async";

import { CONFIG_HELMET } from "../../../configs/helmet.config";
import NotFoundView from "../../organisms/not-found-view";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{CONFIG_HELMET.notFound.title}</title>
        {CONFIG_HELMET.notFound.meta.map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
      </Helmet>
      <NotFoundView />
    </>
  );
}
