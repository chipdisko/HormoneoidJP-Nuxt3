export default defineNuxtPlugin(() => {
  return {
    provide: {
      // linkTypeをurlから判断する
      linkType: (url: string): "mailto" | "tel" | "pdf" | "external" | "anchor" | "internal" => {
        if (url.includes("mailto:")) {
          return "mailto";
        } else if (url.includes("tel:")) {
          return "tel";
        } else if (url.includes(".pdf")) {
          return "pdf";
        } else if (url.includes("http://") || url.includes("https://")) {
          return "external";
        } else if (url.includes("#")) {
          return "anchor";
        } else {
          return "internal";
        }
      },
    },
  };
});
