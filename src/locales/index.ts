import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import type { LocaleType } from '../types/config'
// 语言列表
export const localeList: LocaleType[] = ['en', 'zh-CN', 'zh-TC']
//
async function createI18nOptions(): Promise<I18nOptions> {
  // 设置默认语言
  let locale: LocaleType = 'zh-CN'
  // 本地用户设置语言
  const localLang = localStorage.getItem('language') as LocaleType
  // 浏览器默认语言
  const navigatorLang = window.navigator?.language as LocaleType
  // 判断
  if (localeList.includes(localLang)) {
    locale = localLang
  } else if (localeList.includes(navigatorLang)) {
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
    availableLocales: localeList, // 语言列表 ['en', 'zh-CN']
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
