// vite.config.ts
import { defineConfig } from "file:///E:/code/vue/vue3_admin_template/project/node_modules/.pnpm/vite@5.2.7_@types+node@20.12.2_sass@1.72.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/code/vue/vue3_admin_template/project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.7_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///E:/code/vue/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.7/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///E:/code/vue/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.20.2_mockjs@1.1.0_vite@5.2.7/node_modules/vite-plugin-mock/dist/index.mjs";
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
        // 保证开发阶段可以使用mock接口
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置，使用@代替src
      }
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlXFxcXHZ1ZVxcXFx2dWUzX2FkbWluX3RlbXBsYXRlXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGVcXFxcdnVlXFxcXHZ1ZTNfYWRtaW5fdGVtcGxhdGVcXFxccHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kZS92dWUvdnVlM19hZG1pbl90ZW1wbGF0ZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vIFx1NUYxNVx1NTE2NXN2Z1x1OTcwMFx1ODk4MVx1NzUyOFx1NTIzMFx1NjNEMlx1NEVGNlxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuXG4vLyBtb2NrXHU2M0QyXHU0RUY2XHU2M0QwXHU0RjlCXHU2NUI5XHU2Q0Q1XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB2dWUoKSxcbiAgICAgICAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgICAgICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgICAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLCAvLyBcdTRGRERcdThCQzFcdTVGMDBcdTUzRDFcdTk2MzZcdTZCQjVcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1Mjhtb2NrXHU2M0E1XHU1M0UzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU5MTREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4QFx1NEVFM1x1NjZGRnNyY1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2Nzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVxuICAgICAgICBjc3M6IHtcbiAgICAgICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsU0FBUyxvQkFBb0I7QUFDOVUsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixTQUFTLDRCQUE0QjtBQUlyQyxTQUFTLHFCQUFxQjtBQUM5QixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUN6QyxTQUFPO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixxQkFBcUI7QUFBQSxRQUNqQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ2QsQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1YsY0FBYyxZQUFZO0FBQUE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0gsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBO0FBQUEsTUFDN0I7QUFBQSxJQUNKO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNELHFCQUFxQjtBQUFBLFFBQ2pCLE1BQU07QUFBQSxVQUNGLG1CQUFtQjtBQUFBLFVBQ25CLGdCQUFnQjtBQUFBLFFBQ3BCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
