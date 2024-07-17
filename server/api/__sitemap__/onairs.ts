import type { Onair as OnairProps } from "~/types/microcms";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

export default defineSitemapEventHandler(async () => {  
  const config = useRuntimeConfig();
  const client = createClient({
    serviceDomain: config.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  const response = await client.getList<OnairProps>({
    endpoint: "onairs",
  }).then((data) => data.contents.map(p => asSitemapUrl({
    loc: p.id,
  }))).catch((err) => {
    console.log(err)
    return { contents:[] };
  });
  return response;
});