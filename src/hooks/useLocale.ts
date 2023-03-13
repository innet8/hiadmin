import { unref } from 'vue'

import { i18n } from '../locales/index'
import { setLanguage } from '../utils'
import { LanguageEnum } from '../enums/appEnums'

// 设置语言
export function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
}
// 切换语言
export async function changeLocale(locale: LocaleType) {
  //
  const globalI18n = i18n.global
  // 语言未变化
  if (unref(globalI18n.locale) === locale) return
  // 动态加载语言包
  if (!globalI18n.availableLocales?.includes(locale)) {
    try {
      // 获取语言包
      const defaultLocal = await import(`../locales/lang/${locale}.ts`)
      const message = defaultLocal?.default ?? {}
      // 重新设置语言包
      globalI18n.setLocaleMessage(locale, message)
    } catch (error) {
      console.log(`${locale}.ts的语言包不存在`)
    }
  }
  // 设置语言
  setI18nLanguage(locale)
  // 设置本地用户语言
  setLanguage(locale)
}

// 语言类型
export type LocaleType = keyof typeof LanguageEnum

// 获取语言列表
export const localeList = () => {
  let arr: { lang: LocaleType; text: string }[] = []
  let key: LocaleType
  for (key in LanguageEnum) {
    arr.push({
      lang: key,
      text: LanguageEnum[key]
    })
  }
  //
  return arr
}

//
export const localeKeyList = () => {
  let arr: LocaleType[] = []
  let key: LocaleType
  for (key in LanguageEnum) {
    arr.push(key)
  }
  //
  return arr
}
