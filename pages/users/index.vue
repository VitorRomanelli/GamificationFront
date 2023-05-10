<template>
  <div>
    <v-dialog v-model="dialog" max-width="800" persistent>
      <UsersManage
        :key="data.id"
        :user-id="data.id"
        @close="dialog = false"
        @saved="$fetch(), (dialog = false)"
      />
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="400" persistent>
      <UsersRemove
        :data="data"
        @close="removeDialog = false"
        @removed="remove(data.id)"
      />
    </v-dialog>

    <Header
      title="Usuários"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img src="office-work-amico.svg" max-height="350" contain></v-img>
      </v-col>
    </Header>

    <v-row>
      <v-col>
        <v-card class="pa-2 card text-center" style="border-radius: 10px">
          <p class="bold my-0">Total de usuários</p>
          <h1 class="t3 my-0">{{ total }}</h1>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2 card text-center" style="border-radius: 10px">
          <p class="bold my-0">Usuários ativos</p>
          <h1 class="t3 my-0">{{ active }}</h1>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2 card text-center" style="border-radius: 10px">
          <p class="bold my-0">Usuários inativos</p>
          <h1 class="t3 my-0">{{ inactive }}</h1>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="card my-4 px-4" style="border-radius: 10px">
      <div class="pa-4 d-flex align-center">
        <span class="bold"> Usuários </span>
        <v-divider vertical class="ml-6"></v-divider>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" @click=";(data = {}), (dialog = true)">
          Adicionar
        </v-btn>
      </div>

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
        <template #[`item.points`]="{ item }">
          <v-chip color="secondary">{{ item.points }}</v-chip>
        </template>

        <template #[`item.statusString`]="{ item }">
          <v-btn
            depressed
            :color="item.status == 0 ? 'success' : 'error'"
            @click="changeStatus(item)"
          >
            {{ item.statusString }}
          </v-btn>
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
              <v-btn icon :disabled="pager.currentPage == 1" @click="page--">
                <v-icon size="20">mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                icon
                :disabled="pager.currentPage == pager.totalPages"
                @click="page++"
              >
                <v-icon size="20">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="js">
export default {
  name: 'HomePage',

  data() {
    return {
      removeDialog: false,
      data: {},
      dialog: false,
      total: 0,
      active: 0,
      inactive: 0,
      loading: false,
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
      },
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        {
          text: 'E-mail',
          align: 'start',
          value: 'email',
        },
        {
          text: 'Pontuação',
          align: 'start',
          value: 'points',
        },
        {
          text: 'Tipo',
          align: 'start',
          value: 'typeString',
        },
        {
          text: 'Status',
          align: 'start',
          value: 'statusString',
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
        items: [],
        filter: {
          page: 1,
          pageSize: 10,
        }
      }
  },

  fetch() {
    const payload = this.$convertToQueryString(this.filter);

    this.$axios.$get(`user/metrics?${payload}`).then(response => {
      this.total = response.total;
      this.active = response.active;
      this.inactive = response.inactive;
    })

    this.$axios.$get(`user/list/paginate?${payload}`).then(response => {
      this.items = response.data
      this.pager = response.pager
    })
  },

  head() {
    return {
      title: 'Usuários',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sector description',
        },
      ],
    }
  },

  methods: {
    changeStatus(item) {
      const status = item.status === 1 ? 0 : 1

      this.$axios.$post(`user/change-status`, {id: item.id, status}).then(() => {
        this.removeDialog = false
        this.$toast.success('Status do usuário atualizado!')
        this.$fetch()
      })
    },

    remove(id) {
      this.$axios.$delete(`user/${id}`).then(() => {
        this.removeDialog = false
        this.$toast('Usuário removido com sucesso!')
        this.$fetch()
      })
    }
  }
}
</script>

<style></style>
