import { Helmet } from "react-helmet-async";

import { CONFIG_HELMET } from "../../../configs/helmet.config";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{CONFIG_HELMET.notFound.title}</title>
        {CONFIG_HELMET.notFound.meta.map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
      </Helmet>
      <div>not found</div>
    </>
  );
}
