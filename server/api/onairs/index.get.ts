import type { Onair as OnairProps } from "~~/types/microcms";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
type depthNumber = 0 | 1 | 2 | 3;

export default defineEventHandler(async (event) => {  
  const config = useRuntimeConfig();
  const client = createClient({
    serviceDomain: config.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });
  
  const query = getQuery(event);
  const limit:number = Number(query.limit) || 20;
  const offset:number = Number(query.offset) || 0;
  const orders = query.orders || "-airdate";
  const q = query.q || "";
  const fields = query.fields || "";
  const ids = query.ids || "";
  const filters = query.filters || "";
  const depth:depthNumber = (Number(query.depth) > 3 ? 3 : Number(query.depth) < 0 ? 0 : parseInt(query.depth as string) ?? 1) as depthNumber;
  const draftKey = query.draftKey || "";
  const richEditorFormat = query.richEditorFormat || "html";

  const queries: MicroCMSQueries = {
    fields: fields as string,
    q: q as string,
    ids: ids as string,
    limit: limit,
    offset: offset,
    filters: filters as string,
    orders: orders as string,
    depth: depth,
    draftKey: draftKey as string,
    richEditorFormat: richEditorFormat as "object" | "html",
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