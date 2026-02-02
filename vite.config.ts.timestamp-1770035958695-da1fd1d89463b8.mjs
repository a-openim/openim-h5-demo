// vite.config.ts
import { defineConfig } from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/vite@4.5.14_@types+node@16.18.126_sass@1.97.3/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.14_@types+node@16.18.126_sass@1.97.3__vue@3.5.27_typescript@4.9.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import Components from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/unplugin-vue-components@0.22.12_@babel+parser@7.29.0_rollup@3.29.5_vue@3.5.27_typescript@4.9.5_/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/unplugin-vue-components@0.22.12_@babel+parser@7.29.0_rollup@3.29.5_vue@3.5.27_typescript@4.9.5_/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/unplugin-auto-import@0.11.5_@vueuse+core@9.13.0_vue@3.5.27_typescript@4.9.5___rollup@3.29.5/node_modules/unplugin-auto-import/dist/vite.js";
import VueSetupExtend from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.5.14_@types+node@16.18.126_sass@1.97.3_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import vueJsx from "file:///Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@4.5.14_@types+node@16.18.126_sass@1.97.3__vue@3.5.27_typescript@4.9.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// config/prod.env.ts
var CHAT_URL = `https://api-chat-openim.36x9.com`;
var API_URL = `https://api-openim.36x9.com`;
var WS_URL = `wss://msggateway-openim.36x9.com`;
var prod_env_default = {
  NODE_ENV: "production",
  CHAT_URL,
  API_URL,
  WS_URL,
  LOG_LEVEL: 5,
  VERSION: "H5-Demo"
};

// config/dev.env.ts
var CHAT_URL2 = `https://api-chat-openim.36x9.com`;
var API_URL2 = `https://api-openim.36x9.com`;
var WS_URL2 = `wss://msggateway-openim.36x9.com`;
var dev_env_default = {
  NODE_ENV: "development",
  CHAT_URL: CHAT_URL2,
  API_URL: API_URL2,
  WS_URL: WS_URL2,
  LOG_LEVEL: 5,
  VERSION: "H5-Demo"
};

// config/index.ts
var config_default = {
  buildEnv: prod_env_default,
  devEnv: dev_env_default
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/ken/Documents/github.com/a-openim/a-openim-all/openim-h5-demo";
var vite_config_default = defineConfig({
  server: {
    port: 3003,
    host: "0.0.0.0",
    hmr: true,
    proxy: {
      "/api": {
        target: "https://backend-openim.36x9.com",
        changeOrigin: true,
        secure: true
      },
      "/chat": {
        target: "https://backend-openim.36x9.com",
        changeOrigin: true,
        secure: true
      },
      "/msg_gateway": {
        target: "wss://backend-openim.36x9.com",
        changeOrigin: true,
        ws: true,
        secure: true
      }
    }
  },
  define: {
    "process.env": process.env.NODE_ENV === "production" ? config_default.buildEnv : config_default.devEnv
  },
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    Components({
      resolvers: [VantResolver()]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-import.d.ts"
    })
    // visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@pages": resolve(__vite_injected_original_dirname, "src/pages"),
      "@components": resolve(__vite_injected_original_dirname, "src/components"),
      "@layout": resolve(__vite_injected_original_dirname, "src/layout"),
      "@api": resolve(__vite_injected_original_dirname, "src/api"),
      "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
      "@store": resolve(__vite_injected_original_dirname, "src/store"),
      "@assets": resolve(__vite_injected_original_dirname, "src/assets"),
      "@i18n": resolve(__vite_injected_original_dirname, "src/i18n"),
      "@type": resolve(__vite_injected_original_dirname, "src/type")
    }
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules") && !id.includes("vant")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["vant"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnL3Byb2QuZW52LnRzIiwgImNvbmZpZy9kZXYuZW52LnRzIiwgImNvbmZpZy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rZW4vRG9jdW1lbnRzL2dpdGh1Yi5jb20vYS1vcGVuaW0vYS1vcGVuaW0tYWxsL29wZW5pbS1oNS1kZW1vXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgVnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB1c2VyQ29uZmlnIGZyb20gJy4vY29uZmlnJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMyxcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgaG1yOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9iYWNrZW5kLW9wZW5pbS4zNng5LmNvbScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICcvY2hhdCc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9iYWNrZW5kLW9wZW5pbS4zNng5LmNvbScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICcvbXNnX2dhdGV3YXknOiB7XG4gICAgICAgIHRhcmdldDogJ3dzczovL2JhY2tlbmQtb3BlbmltLjM2eDkuY29tJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/IHVzZXJDb25maWcuYnVpbGRFbnYgOiB1c2VyQ29uZmlnLmRldkVudixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIFZ1ZVNldHVwRXh0ZW5kKCksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3Z1ZS1pMThuJ10sXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnQuZC50cycsXG4gICAgfSksXG4gICAgLy8gdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgJ0BwYWdlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAnQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnQGxheW91dCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xheW91dCcpLFxuICAgICAgJ0BhcGknOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGknKSxcbiAgICAgICdAdXRpbHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgJ0BzdG9yZSc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlJyksXG4gICAgICAnQGFzc2V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgICAgJ0BpMThuJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaTE4bicpLFxuICAgICAgJ0B0eXBlJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZScpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpICYmICFpZC5pbmNsdWRlcygndmFudCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWyd2YW50J10sXG4gIH0sXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rZW4vRG9jdW1lbnRzL2dpdGh1Yi5jb20vYS1vcGVuaW0vYS1vcGVuaW0tYWxsL29wZW5pbS1oNS1kZW1vL2NvbmZpZy9wcm9kLmVudi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby9jb25maWcvcHJvZC5lbnYudHNcIjtjb25zdCBCQVNFX0RPTUFJTiA9ICdiYWNrZW5kLW9wZW5pbS4zNng5LmNvbSdcbi8vIFVzZSBmdWxsIFVSTHMgZm9yIE9wZW5JTSBTREsgKFdBU00gbW9kdWxlIG5lZWRzIGRpcmVjdCBjb25uZWN0aW9ucylcbmNvbnN0IENIQVRfVVJMID0gYGh0dHBzOi8vYXBpLWNoYXQtb3BlbmltLjM2eDkuY29tYFxuY29uc3QgQVBJX1VSTCA9IGBodHRwczovL2FwaS1vcGVuaW0uMzZ4OS5jb21gXG5jb25zdCBXU19VUkwgPSBgd3NzOi8vbXNnZ2F0ZXdheS1vcGVuaW0uMzZ4OS5jb21gXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTk9ERV9FTlY6ICdwcm9kdWN0aW9uJyxcbiAgQ0hBVF9VUkwsXG4gIEFQSV9VUkwsXG4gIFdTX1VSTCxcbiAgTE9HX0xFVkVMOiA1LFxuICBWRVJTSU9OOiAnSDUtRGVtbycsXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rZW4vRG9jdW1lbnRzL2dpdGh1Yi5jb20vYS1vcGVuaW0vYS1vcGVuaW0tYWxsL29wZW5pbS1oNS1kZW1vL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tlbi9Eb2N1bWVudHMvZ2l0aHViLmNvbS9hLW9wZW5pbS9hLW9wZW5pbS1hbGwvb3BlbmltLWg1LWRlbW8vY29uZmlnL2Rldi5lbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tlbi9Eb2N1bWVudHMvZ2l0aHViLmNvbS9hLW9wZW5pbS9hLW9wZW5pbS1hbGwvb3BlbmltLWg1LWRlbW8vY29uZmlnL2Rldi5lbnYudHNcIjtjb25zdCBCQVNFX0RPTUFJTiA9ICdiYWNrZW5kLW9wZW5pbS4zNng5LmNvbSdcbi8vIFVzZSBmdWxsIFVSTHMgZm9yIE9wZW5JTSBTREsgKFdBU00gbW9kdWxlIG5lZWRzIGRpcmVjdCBjb25uZWN0aW9ucylcbmNvbnN0IENIQVRfVVJMID0gYGh0dHBzOi8vYXBpLWNoYXQtb3BlbmltLjM2eDkuY29tYFxuY29uc3QgQVBJX1VSTCA9IGBodHRwczovL2FwaS1vcGVuaW0uMzZ4OS5jb21gXG5jb25zdCBXU19VUkwgPSBgd3NzOi8vbXNnZ2F0ZXdheS1vcGVuaW0uMzZ4OS5jb21gXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTk9ERV9FTlY6ICdkZXZlbG9wbWVudCcsXG4gIENIQVRfVVJMLFxuICBBUElfVVJMLFxuICBXU19VUkwsXG4gIExPR19MRVZFTDogNSxcbiAgVkVSU0lPTjogJ0g1LURlbW8nLFxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rZW4vRG9jdW1lbnRzL2dpdGh1Yi5jb20vYS1vcGVuaW0vYS1vcGVuaW0tYWxsL29wZW5pbS1oNS1kZW1vL2NvbmZpZy9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva2VuL0RvY3VtZW50cy9naXRodWIuY29tL2Etb3BlbmltL2Etb3BlbmltLWFsbC9vcGVuaW0taDUtZGVtby9jb25maWcvaW5kZXgudHNcIjtpbXBvcnQgYnVpbGRFbnYgZnJvbSAnLi9wcm9kLmVudidcbmltcG9ydCBkZXZFbnYgZnJvbSAnLi9kZXYuZW52J1xuZXhwb3J0IGRlZmF1bHQge1xuICBidWlsZEVudixcbiAgZGV2RW52LFxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WCxTQUFTLG9CQUFvQjtBQUMzWixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sWUFBWTs7O0FDTG5CLElBQU0sV0FBVztBQUNqQixJQUFNLFVBQVU7QUFDaEIsSUFBTSxTQUFTO0FBRWYsSUFBTyxtQkFBUTtBQUFBLEVBQ2IsVUFBVTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUNYOzs7QUNYQSxJQUFNQSxZQUFXO0FBQ2pCLElBQU1DLFdBQVU7QUFDaEIsSUFBTUMsVUFBUztBQUVmLElBQU8sa0JBQVE7QUFBQSxFQUNiLFVBQVU7QUFBQSxFQUNW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
