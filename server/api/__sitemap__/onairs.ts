import type { Onair as OnairProps } from "~/types/microcms";
import type { MicroCMSListResponse } from "microcms-js-sdk";

export default defineSitemapEventHandler(async () => {  
  const response = await $fetch<MicroCMSListResponse<OnairProps>>(`/api/onairs`)
  .then((data) => data.contents.map(p => asSitemapUrl({
    loc: `/onair/${p.id}`,
  }))).catch((err) => {
    console.log(err)
    return { contents:[] };
  });
  return response;
});