// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },

  app: {
    head: {
      title: "Food manager",
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "nuxt-mongoose",
    "nuxt-auth-utils",
    "@vueuse/nuxt",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      authRequired: false,
    },
    oauth: {
      oidc: {
        clientId: "",
        clientSecret: "",
        openidConfig: "",
      },
    },
    apiKeyManagerUrl: "",
    openaiApiKey: "",
    s3: {
      bucket: "food-manager",
      accessKeyId: "",
      secretAccessKey: "",
      endpoint: "localhost",
      port: "443",
      region: "us-east-1",
      useSsl: "",
    },
  },
});
