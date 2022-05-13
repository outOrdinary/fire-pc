import defaultSettings from '@/settings'

const title = defaultSettings.title || '中国消防'

export default function getPageTitle (pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  return `${title}`
}
