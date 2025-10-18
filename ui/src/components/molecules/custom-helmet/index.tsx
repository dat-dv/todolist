import { Helmet } from "react-helmet-async";

import { CONFIG_HELMET } from "../../../configs/helmet.config";

export default function CustomHelmet({
  page,
}: {
  page: keyof typeof CONFIG_HELMET;
}) {
  return (
    <Helmet>
      <title>{CONFIG_HELMET[page].TITLE}</title>
      {CONFIG_HELMET[page].META.map((meta, index) => (
        <meta key={index} name={meta.name} content={meta.content} />
      ))}
    </Helmet>
  );
}
