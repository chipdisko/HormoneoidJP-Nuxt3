import type { Onair as OnairProps } from "~/types/microcms";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

export default defineEventHandler(async (event) => {  
  const config = useRuntimeConfig(event);
  const client = createClient({
    serviceDomain: config.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });
  
  const query = getQuery(event);
  const page:number = query.page || 1;
  const limit:number = Number(query.limit) || 20;
  const offset:number = (page - 1) * limit;
  const filters:string = query.filters || "";
  const fields:string = query.fields || "";

  const queries: MicroCMSQueries = {
    fields: fields,
    limit: limit,
    offset: offset,
    filters: filters,
  };

  const response = await client.getList<OnairProps>({
    endpoint: "onairs",
    queries: queries,
  }).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return { contents:[] };
  });
  return response;
});