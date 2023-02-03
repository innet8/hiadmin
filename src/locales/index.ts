import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

//
async function createI18nOptions(): Promise<I18nOptions> {
  const locale = localStorage.getItem('language') || 'en'
  const defaultLocal = await import(`./lang/${locale}.json`)
  const message = defaultLocal?.default ?? {}
  // 
  return {
    // locale: 'en', // 语言标识 locale.value => 通过切换locale的值来实现语言切换
    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
    fallbackLocale: 'zh-CN', // 没有英文的时候默认中文语言
    globalInjection: true, // 全局注入 $t 函数
    // silentFallbackWarn: true, // 设置为true后，在组件内使用时在浏览器不会报警告
    messages: {
      [locale]: message as { [key: string]: string }
    }
  }
}

//
export let i18n: ReturnType<typeof createI18n>
export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
