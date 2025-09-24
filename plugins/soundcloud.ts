export default defineNuxtPlugin(() => {
  return {
    provide: {
      extractSoundcloudIdFromEmbedcode(embedcode: string): number | undefined {
        // 新しい形式: soundcloud%253Atracks%253A数字
        const newFormatRegex = /soundcloud%253Atracks%253A(\d+)/;
        const newMatch = embedcode.match(newFormatRegex);
        if (newMatch) {
          return Number(newMatch[1]);
        }

        // 古い形式: /tracks/数字（後方互換性のため）
        const oldFormatRegex = /\/tracks\/(\d+)/;
        const oldMatch = embedcode.match(oldFormatRegex);
        return oldMatch ? Number(oldMatch[1]) : undefined;
      },
    },
  };
});
