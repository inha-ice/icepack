import { hasToken } from '@/utils/token'

const { WEB_URL } = process.env

export default function ({ redirect }) {
  if (!hasToken()) {
    return redirect(`https://inha-ice.github.io/authorice/?redirect_url=${WEB_URL}`)
  }
}
