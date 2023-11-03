import type { MicroCMSListContent, MicroCMSImage } from "microcms-js-sdk";

type Run = {
  title: string;
  url?: string;
}

type Link = {
  type: 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'spotify' | 'apple' | 'amazon' | 'soundcloud' | 'bandcamp' | 'homepage';
  type_id: string;
}

export type Guest = {
  name: string;
  biography?: string;
  links?: Link[];
  runs?: Run[];
} & MicroCMSListContent;

export type Onair = {
  title: string;
  date: string; // ISO8601
  jacket?: MicroCMSImage;
  feat?: (Guest & MicroCMSListContent);
  host?: ('KA4U' | 'Ascalypso')[];
  description?: string;
  tracklist?: string;
  tracklists?: {
    artist: string;
    tracklist: string;
  }
  soundcloud_embedcode?: string;
} & MicroCMSListContent;
