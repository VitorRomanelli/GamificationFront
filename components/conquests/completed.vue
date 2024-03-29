<template>
  <div>
    <v-dialog v-model="dialog" max-width="650" persistent>
      <ConquestsManage
        :key="data.id"
        :conquest-id="data.id"
        @close="dialog = false"
        @saved="$fetch(), (dialog = false)"
      />
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="500">
      <ConquestsRemove
        :data="data"
        @close="removeDialog = false"
        @removed="remove(data.id)"
      />
    </v-dialog>

    <Header
      title="Conquistas completas"
      description="Visualize as conquistas concluídas"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img src="completed-bro.svg" max-height="380" contain></v-img>
      </v-col>
    </Header>

    <v-data-table
      hide-default-footer
      :header-props="headerProps"
      :headers="headers"
      :items="items"
      :items-per-page="filter.pageSize"
      :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
      loading-text="Buscando..."
      no-data-text="Nenhum dado encontrado"
      no-results-text="Nenhum dado encontrado"
    >
      <template #[`item.computedType`]="{ item }">
        {{ item.computedType }}
        :
        <span class="bold">
          {{
            item.type == 0 ? item.points + 'pts' : item.servicesConcludedCount
          }}
        </span>
      </template>

      <template #[`item.endDate`]="{ item }">
        {{
          item.endDate
            ? $formatDateWithoutHour(item.endDate)
            : 'Sem data limite'
        }}
      </template>

      <template #[`item.acts`]="{ item }">
        <v-btn text icon @click=";(data = item), (dialog = true)">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>

        <v-btn text icon @click=";(data = item), (removeDialog = true)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>

      <template #footer>
        <div class="footer">
          <div class="bold">
            {{ (pager.currentPage - 1) * pager.pageSize }} -
            {{ filter.pageSize }} de
            {{ pager.totalItems }}
          </div>
          <div>
            <v-btn
              icon
              :disabled="pager.currentPage == 1"
              @click="filter.page--"
            >
              <v-icon size="20">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              icon
              :disabled="pager.currentPage == pager.totalPages"
              @click="filter.page++"
            >
              <v-icon size="20">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'ConquestsCompleted',

  data() {
    return {
      data: {},
      dialog: false,
      removeDialog: false,
      items: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
      headers: [
        {
          text: 'Título',
          align: 'start',
          value: 'title',
        },
        {
          text: 'Tipo',
          align: 'start',
          value: 'computedType',
        },
        {
          text: 'Para',
          align: 'start',
          value: 'computedTo',
        },
        {
          text: 'Data limite',
          align: 'start',
          value: 'endDate',
        },
        {
          text: '',
          align: 'start',
          value: 'acts',
          sortable: false,
        },
      ],
      headerProps: {
        sortByText: 'Ordenar por',
      },
      filter: {
        concluded: true,
        page: 1,
        pageSize: 10,
      },
    }
  },

  fetch() {
    if (this.user.type !== 0) {
      this.headers = this.headers.filter((x) => x.value !== 'acts')
    }

    this.filter.userId = this.user.id
    const payload = this.$convertToQueryString(this.filter)
    this.$axios
      .$get(`conquest/list/user/paginate?${payload}`)
      .then((response) => {
        console.log(response)
        this.items = response.data
        this.pager = response.pager
      })
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  watch: {
    'filter.page': {
      deep: true,
      handler() {
        this.$fetch()
      },
    },
  },

  methods: {
    remove(id) {
      this.$axios.$delete(`conquest/${id}`).then(() => {
        this.removeDialog = false
        this.$toast('Conquista removida com sucesso!')
        this.$fetch()
      })
    },
  },
}
</script>

<style scoped></style>
