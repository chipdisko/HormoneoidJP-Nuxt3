export default defineNuxtPlugin(() => {
  return {
    provide: {
      extractSoundcloudIdFromEmbedcode(embedcode: string): number | undefined {
        // 通常の形式: /tracks/123456789
        let regex = /\/tracks\/(\d+)/;
        let match = embedcode.match(regex);

        if (match) {
          return Number(match[1]);
        }

        // SoundCloud埋め込み形式: /tracks/soundcloud:tracks:123456789
        regex = /\/tracks\/soundcloud:tracks:(\d+)/;
        match = embedcode.match(regex);

        return match ? Number(match[1]) : undefined;
      },
    },
  };
});
