import { hasToken } from '@/utils/token'

export default function ({ redirect }) {
  if (!hasToken()) {
    return redirect('/')
  }
}
