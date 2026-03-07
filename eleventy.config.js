const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.png");

  // Enable the i18n plugin
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
    errorMode: "allow-fallback"
  });

  // Translation filter: {{ "hero.title" | t(locales, page.lang) }}
  eleventyConfig.addFilter("t", function(key, locales, lang = 'en') {
    const translations = locales[lang] || locales['en'];
    if (!translations) return key;
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations) || key;
  });

  // URL switcher filter
  eleventyConfig.addFilter("langUrl", function(url, newLang) {
    if (!url) return `/${newLang}/`;
    return url.replace(/^\/[a-z]{2}\//, `/${newLang}/`);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
