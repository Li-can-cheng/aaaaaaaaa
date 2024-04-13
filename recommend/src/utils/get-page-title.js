import defaultSettings from '@/settings'

const title = defaultSettings.title || '职位推荐系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
