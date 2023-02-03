import type { App } from 'vue'
import { createPinia } from 'pinia'
//
export const store = createPinia()
//
export async function setupStore(app: App<Element>) {
  await app.use(store)
}
