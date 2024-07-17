import type { Onair as OnairProps } from "~/types/microcms";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
type depthNumber = 0 | 1 | 2 | 3;

export default defineSitemapEventHandler(async (event) => {  
  const config = useRuntimeConfig(event);
  const client = createClient({
    serviceDomain: config.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });
  
  const query = getQuery(event);
  const limit:number = Number(query.limit) || 20;
  const offset:number = Number(query.offset) || 0;
  const orders:string = query.orders || "-airdate";
  const q: string = query.q || "";
  const fields:string = query.fields || "";
  const ids: string = query.ids || "";
  const filters:string = query.filters || "";
  const depth:depthNumber = (Number(query.depth) > 3 ? 3 : Number(query.depth) < 0 ? 0 : parseInt(query.depth) || 1) as depthNumber;
  const draftKey:string = query.draftKey || "";
  const richEditorFormat:('html' | 'object') = query.richEditorFormat || "html";

  const queries: MicroCMSQueries = {
    fields: fields,
    q: q,
    ids: ids,
    limit: limit,
    offset: offset,
    filters: filters,
    orders: orders,
    depth: depth,
    draftKey: draftKey,
    richEditorFormat: richEditorFormat,
  };
  const response = await client.getList<OnairProps>({
    endpoint: "onairs",
    queries: queries,
  }).then((data) => data.contents.map(p => asSitemapUrl({
    loc: p.id,
  }))).catch((err) => {
    console.log(err)
    return { contents:[] };
  });
  return response;
});