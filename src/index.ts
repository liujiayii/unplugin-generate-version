import fs from 'node:fs'
import path from 'node:path'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

function generateFile(path: string, content: string): void {
  fs.writeFileSync(path, content)
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = option => ({
  name: 'unplugin-generator-version',
  buildStart() {
    const options = {
      // json 版本文件名称
      versionFileName: 'update_version.json',
      // json key 值
      keyName: 'UPDATE_VERSION',
      ...option,
    }
    const version = `${Date.now()}`
    // console.log(options)
    // 生成的版本 json 文件建议放置在 public 文件夹下
    const filePath = path.resolve('public', options.versionFileName as string)
    // console.log(filePath)

    // 生成文件
    generateFile(filePath, `{"${options.keyName}": "${version}"}`)
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
