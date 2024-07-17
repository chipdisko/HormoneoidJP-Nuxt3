import type { Onair as OnairProps } from "~~/types/microcms";
import { createClient } from "microcms-js-sdk";

export default defineEventHandler(async (event) => {
  const slug = event.context.params?._;
  if (!slug) {
    return { contents:[] };
  }
  const config = useRuntimeConfig(event);
  const client = createClient({
    serviceDomain: config.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  const response = await client.get<OnairProps>({
    endpoint: "onairs",
    contentId: slug,
  }).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return { contents:[] };
  });
  return response;

});