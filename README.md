# unplugin-generate-version

[![NPM version](https://img.shields.io/npm/v/unplugin-generate-version?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-generate-version)

### 使用说明
在打包时向public目录生成一个包含当前时间戳的文件,在浏览器端通过fetch轮询获取版本号,与旧的版本号进行比较,来判断是否系统进行了更新, 避免浏览器端缓存造成用户体验问题。代码 examples/openUpdateVersionNotify.tsx 可参考。

## Use

```bash
npm i unplugin-generate-version
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import GenerateVersion from 'unplugin-generate-version/vite'

export default defineConfig({
  plugins: [
    GenerateVersion({ /* options */ }),
  ],
})
```

``` tsx

```