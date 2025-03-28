import mdItCustomAttrs from "markdown-it-custom-attrs";
import markdownItKatex from "markdown-it-katex";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// Markdown 插件配置
const markdownConfig = (md: any) => {
  md.use(mdItCustomAttrs, "image", {
    "data-fancybox": "gallery",
  });
  md.use(markdownItKatex); // 启用 KaTeX 插件
};

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
    // Markdown 配置
    markdown: {
      config: markdownConfig,
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
