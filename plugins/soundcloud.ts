
export default defineNuxtPlugin(() => {
  return {
    provide: {
      extractSoundcloudIdFromEmbedcode(embedcode: string):(number | undefined)  {
        const regex = /\/tracks\/(\d+)/;
        const match = embedcode.match(regex);
        return match ? Number(match[1]) : undefined;
      }
    }
  }
})
