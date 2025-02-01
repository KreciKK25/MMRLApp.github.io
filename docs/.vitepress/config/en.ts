import { createRequire } from "module";
import { defineConfig } from "vitepress";
import request from "sync-request";
import { repositories } from "../../data/repositories";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export default defineConfig({
  lang: "en-US",
  description: "Build your own modules repository",

  themeConfig: {
    nav: nav(),

    lastUpdatedText: "last Updated",

    sidebar: {
      "/guide/": sidebarGuide(),
      "/repository/": sidebarRepositories(),
      "/legal/": sidebarLegal(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MMRLApp/MMRL" },
      {
        icon: "googleplay",
        link: "https://play.google.com/store/apps/details?id=com.dergoogler.mmrl",
      },
    ],

    footer: {
      message: "Released under the GPL3 License.",
      copyright: "Copyright © 2022-present Der_Googler and its contributors",
    },

    editLink: {
      pattern:
        "https://github.com/MMRLApp/MMRLApp.github.io/edit/master/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function nav() {
  return [
    { text: "Guide", link: "/guide" },
    { text: "Repositories", link: "/repository" },
    { text: "Blacklist", link: "/blacklist" },
    { text: "Legal", link: "/legal/privacy" },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "Guide",
      items: [
        { text: "What is MMRL", link: "/guide/" },
        { text: "Anti-Features", link: "/guide/antifeatures" },
        { text: "Installer API", link: "/guide/installer" },
        {
          text: "WebUI",
          collapsed: true,
          items: [
            { text: "Getting Started in WebUI", link: "/guide/webui/" },
            {
              text: "API",
              collapsed: true,
              items: [
                { text: "FileSystem", link: "/guide/webui/api/filesystem" },
                {
                  text: "MMRLInterface",
                  link: "/guide/webui/api/mmrlinterface",
                },
                { text: "Toast", link: "/guide/webui/api/toast" },
                {
                  text: "VersionInterface",
                  link: "/guide/webui/api/versioninterface",
                },
              ],
            },
          ],
        },
        {
          text: "MMRL-Util",
          collapsed: true,
          items: [
            { text: "Getting Started", link: "/guide/mmrl-util/" },
            { text: "repo.json", link: "/guide/mmrl-util/repo-json" },
            { text: "track.json", link: "/guide/mmrl-util/track-json" },
            { text: "config.json", link: "/guide/mmrl-util/config-json" },
          ],
        },
        { text: "FAQ", link: "/guide/faq" },
      ],
    },
  ];
}

function sidebarLegal() {
  return [
    {
      text: "Legal",
      items: [
        { text: "Privacy Policy", link: "/legal/privacy" },
        { text: "Terms of Service", link: "/legal/terms" },
        { text: "Chat Rules", link: "/legal/chat-rules" },
      ],
    },
  ];
}

function repos() {
  return repositories.map((repo) => {
    const response = request("GET", `${repo.url}json/modules.json`);
    const rep = JSON.parse(response.getBody("utf8"));
    const modules = rep.modules.map((module) => {
      return {
        text: module.name,
        link: `/repository/${repo.id}/${module.id}`,
      };
    });

    return {
      text: repo.name,
      link: `/repository/${repo.id}`,
      collapsed: true,
      items: modules,
    };
  });
}

function sidebarRepositories() {
  return [
    {
      text: "Repositories",
      items: repos(),
    },
  ];
}
