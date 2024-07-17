import type { Onair as OnairProps } from "~/types/microcms";
import type { MicroCMSListResponse } from "microcms-js-sdk";

export default defineSitemapEventHandler(async () => {  
  let allContents: OnairProps[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await $fetch<MicroCMSListResponse<OnairProps>>(`/api/onairs`, {
      method: "GET",
      query: {
        limit,
        offset,
      },
    }).catch((err) => {
      console.log(err);
      return { contents: [] };
    });

    if (response.contents.length > 0) {
      allContents = allContents.concat(response.contents);
      offset += limit;
      hasMore = response.contents.length === limit;
    } else {
      hasMore = false;
    }
  }

  const sitemapUrls = allContents.map(p => asSitemapUrl({
    loc: `/onair/${p.id}`,
  }));

  return sitemapUrls;
});