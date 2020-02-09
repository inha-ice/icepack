<template>
  <main>
    <table class="table">
      <thead>
        <tr class="table__row">
          <th class="table__head">
            물품명
          </th>
          <th class="table__head">
            대여자
          </th>
          <th class="table__head">
            비고
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(resource, index) in resources"
          :key="resource.id"
          class="table__row"
          @click="showDetail(index)"
        >
          <td class="table__cell">
            {{ resource.name }}
          </td>
          <td class="table__cell">
            {{ resource.userId || '-' }}
          </td>
          <td class="table__cell">
            {{ resource.note || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { getToken } from '@/utils/token'

export default {
  middleware: ['auth', 'manager'],
  async asyncData ({ $axios, redirect }) {
    $axios.setToken(getToken(), 'Bearer')
    try {
      const { resources } = await $axios.$get('/resources')
      return {
        resources: resources.map(resource => ({
          id: String(resource.id),
          name: resource.name,
          userId: resource.userId || null,
          note: resource.note || null,
          rentedAt: resource.rentedAt || null,
          returnedAt: resource.returnedAt || null
        }))
      }
    } catch (e) {
      redirect('/')
    }
  },
  data () {
    return {
      focusIndex: -1
    }
  },
  methods: {
    isRented (index) {
      const { resources } = this
      return resources[index].userId !== null
    },
    showDetail (index) {
      this.focusIndex = index
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table__row {
  text-align: center;
  background-color: #fff;
}

.table__row:hover {
  text-align: center;
  background-color: #fafcff;
}

.table__head {
  padding: 1rem;
  font-weight: bold;
  color: #181924;
}

.table__cell {
  padding: 1rem;
  font-weight: normal;
  color: #181924;
  border-top: 1px #eee solid;
}
</style>
