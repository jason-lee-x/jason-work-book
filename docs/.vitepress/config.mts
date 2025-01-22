import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "jason-work-book",
    description: "",
    // base: "/jason-work-book/",
    themeConfig: {
      nav: [{ text: "Home", link: "/" }],
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/jasonleeforonly",
        },
      ],
      logo: "https://avatars.githubusercontent.com/u/47520063?s=50&u=a4b7e56bf8cc4d8fd5be32eacb6ed56dc305e3a5",
    },
    head: [
      [
        // 接入图片灯箱
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
        },
      ],
      [
        "script",
        {
          src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
        },
      ],
    ],
    vite: {
      plugins: [
        AutoSidebar({
          ignoreList: ["images"],
          titleFromFileByYaml: true,
          collapsed: true,
          deletePrefix: ".",
          ignoreIndexItem: true,
        }),
      ],
    },
  })
);
