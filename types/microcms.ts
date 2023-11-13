import type { MicroCMSListContent, MicroCMSImage, MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

type Run = {
  title: string;
  url?: string;
}

type Link = {
  type: 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'spotify' | 'apple' | 'amazon' | 'soundcloud' | 'bandcamp' | 'homepage';
  type_id: string;
}
export type Artist = {
  name: string;
  biography?: string;
  links?: Link[];
  runs?: Run[];
}

type Tracklist = {
  artist: ('guest' | 'host')[];
  tracklist: string;
  image: MicroCMSImage;
}

export type Onair = {
  title: string;
  airdate: string; // ISO8601
  theme?: string;
  jacket?: MicroCMSImage;
  feat?: (MicroCMSListContent & Artist);
  host?: ('KA4U' | 'Ascalypso')[];
  description?: string;
  tracklists?: Tracklist[];
  soundcloud_embedcode?: string;
  channel?:string;
} & MicroCMSContentId & MicroCMSDate
