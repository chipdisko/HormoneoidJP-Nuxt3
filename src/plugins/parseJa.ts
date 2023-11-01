// https://github.com/google/budoux

import { loadDefaultJapaneseParser } from "budoux";
const parser = loadDefaultJapaneseParser();

export default defineNuxtPlugin(() => {
  return {
    provide: {
      /* 改行を勝手に調整 */
      parseJa: (inputDate: string):string[] => {
        return parser.parse(inputDate);
      },
      parseJaHtml: (inputDate: string):string => {
        return parser.translateHTMLString(inputDate);
      }
    }
  }
})
