import { unref } from 'vue'
import { i18n } from '../locales/index'
import type { LocaleType } from '../types/config'

export const loadLocalePool: LocaleType[] = []

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
}

export async function changeLocale(locale: LocaleType) {
  // 设置本地用户语言
  localStorage.setItem('language', locale)
  //
  const globalI18n = i18n.global
  const currentLocale = unref(globalI18n.locale)
  // 语言未变化
  if (currentLocale === locale) {
    return locale
  }
  // 已经存在语言包
  if (globalI18n.availableLocales?.includes(locale)) {
    setI18nLanguage(locale)
    return locale
  }
  // 获取语言包
  const defaultLocal = await import(`../locales/lang/${locale}.json`)
  const message = defaultLocal?.default ?? {}
  // 重新设置语言包
  globalI18n.setLocaleMessage(locale, message)
  //
  setI18nLanguage(locale)
  return locale
}
