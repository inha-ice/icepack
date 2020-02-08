import Level from '@/constants/Level'
import { getToken } from '@/utils/token'

const { AUTH_URL } = process.env

export default async function ({ $axios, redirect }) {
  $axios.setToken(getToken(), 'Bearer')
  const { user } = await $axios.$get(`${AUTH_URL}/auth/me`)
  if (!(user.level & (Level.ADMIN | Level.OWNER))) {
    alert('접근 권한이 없습니다.')
    redirect('/me')
  }
}
