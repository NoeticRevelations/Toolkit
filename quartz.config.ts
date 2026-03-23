import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { CustomTasks } from "./quartz/plugins/transformers/customtasks"
/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ToolKit",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "noeticrevelations.github.io/Toolkit/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
        fontOrigin: "googleFonts",
        typography: {
        header: "Instrument Serif", // Updates the headings
        body: "Inter",              // Updates the body
        code: "IBM Plex Mono",      // (You can leave your existing code font)
      },
 colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#383a42",
          dark: "#2c2d32",
          secondary: "#f5bb1aff",
          tertiary: "#db4338ff",
          highlight: "rgba(241, 255, 45, 0.99)",
          textHighlight: "rgba(255, 236, 131, 0.61)",
        },
        darkMode: {
          light: "#1e1e1e",
          lightgray: "#393939",
          gray: "#646464",
          darkgray: "#abb2bf",
          dark: "#ececec",
          secondary: "#f5bb1aff",
          tertiary: "#db4338ff",
          highlight: "rgba(132, 219, 82, 0.66)",
          textHighlight: "rgba(196, 180, 94, 0.4)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      CustomTasks(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
