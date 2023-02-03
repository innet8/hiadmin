import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

// 语言
export enum LOCALE {
  'en' = '英文',
  'zh-CN' = '简体中文',
  'zh-TC' = '繁体中文'
}

// 循环枚举
interface localeType<T> {
  text?: keyof T
  event?: string
}
function localeLoop<T>(data: T): localeType<T>[] {
  const arr: localeType<T>[] = []
  for (const key in data) {
    arr.push({
      text: data[key] as any,
      event: key
    })
  }
  return arr
}
// 语言列表
export function localeList() {
  return localeLoop(LOCALE)
}
// 语言key列表
export function localeListKey() {
  const arr = []
  for (const key in LOCALE) {
    arr.push(key)
  }
  return arr
}

//
async function createI18nOptions(): Promise<I18nOptions> {
  // 设置默认语言
  let locale: string = 'zh-CN'
  // 本地用户设置语言
  const localLang = localStorage.getItem('language') || ''
  // 浏览器默认语言
  const navigatorLang = window.navigator?.language || ''
  // 判断
  if (localeListKey().includes(localLang)) {
    locale = localLang
  } else if (localeListKey().includes(navigatorLang)) {
    locale = navigatorLang
  }
  // 获取语言包
  const defaultLocal = await import(`./lang/${locale}.json`)
  const message = defaultLocal?.default ?? {}
  //
  return {
    locale, // 语言标识 locale.value => 通过切换locale的值来实现语言切换
    legacy: false, // 使用 Composition API 模式，则需要将其设置为false
    fallbackLocale: locale, // 没有设置locale的时候，默认用这个设置的语言
    globalInjection: true, // 全局注入 $t 函数
    availableLocales: localeListKey(), // 语言列表 ['en', 'zh-CN']
    // sync: true, // 如果不想从全局范围继承语言环境，则需要将i18n组件选项的sync设置为false
    // silentTranslationWarn: true, // 关闭warn
    // missingWarn: false, // 关闭warn
    // silentFallbackWarn: true, // 关闭warn
    messages: {
      [locale]: message
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
