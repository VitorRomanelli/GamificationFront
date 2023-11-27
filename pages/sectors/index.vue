<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="800"
      overlay-opacity=".8"
      style="box-shadow: none !important"
    >
      <div class="d-flex justify-end">
        <v-img
          src="people-talking-pana.svg"
          max-width="350"
          contain
          style="margin-bottom: -25px"
        ></v-img>
      </div>
      <SectorsManage
        :id="data.id"
        :key="dialogKey"
        @close="dialog = false"
        @saved="$fetch(), (dialog = false)"
      />
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="400" persistent>
      <SectorsRemove
        :data="data"
        @close="removeDialog = false"
        @removed="remove(data.id)"
      />
    </v-dialog>

    <Header
      title="Setores"
      description="Cadastre, atualize e remova os setores do sistema"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img src="team-work-bro.svg" max-height="400" contain></v-img>
      </v-col>
    </Header>

    <div v-if="user.type == 0" class="pa-4 d-flex justify-end">
      <v-btn
        color="primary"
        depressed
        @click=";(data = {}), (dialogKey = !dialogKey), (dialog = true)"
      >
        Adicionar setor
      </v-btn>
    </div>

    <v-row class="ma-0">
      <v-col
        v-for="sector in sectors"
        :key="sector.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-card class="pa-4 card">
          <div class="d-flex justify-end"></div>

          <div class="background card px-4 py-2">
            <div class="d-flex align-center">
              <h1 class="t4 d-flex">{{ sector.name }}</h1>
              <v-spacer></v-spacer>
              <span class="t5 d-flex accent--text mr-1">
                {{ sector.points }}
              </span>
              <span class="bold d-flex">pts</span>
            </div>
            <p class="bold mb-0">
              {{
                sector.supervisor
                  ? `${sector.supervisor.name} - ${sector.supervisor.email}`
                  : 'Sem registros'
              }}
            </p>

            <div
              v-if="user.type == 0"
              class="d-flex"
              style="margin-bottom: -17px"
            >
              <v-spacer></v-spacer>
              <v-btn
                small
                color="primary"
                class="shadow2 mr-2"
                @click="
                  ;(data = sector), (dialogKey = !dialogKey), (dialog = true)
                "
              >
                <v-icon small>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                small
                color="primary"
                class="shadow2"
                @click=";(data = sector), (removeDialog = true)"
              >
                <v-icon small>mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
          </div>

          <v-divider class="mx-4 mb-4 mt-5"></v-divider>

          <p>
            {{ sector.description }}
          </p>

          <v-row class="ma-0" dense>
            <v-col
              v-for="user in sector.users"
              :key="user.id"
              class="d-flex flex-column align-center"
            >
              <v-avatar color="secondary" class="mb-2">
                <v-icon color="white">mdi-account-outline</v-icon>
                <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" /> -->
              </v-avatar>
              <span class="bold">{{ user.name }}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <div class="footer primary mx-4">
      <div class="bold white--text">
        {{ (pager.currentPage - 1) * pager.pageSize }} -
        {{ filter.pageSize }} de
        {{ pager.totalItems }}
      </div>
      <div>
        <v-btn
          color="white"
          icon
          :disabled="pager.currentPage == 1"
          @click="page--"
        >
          <v-icon size="20">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          color="white"
          icon
          :disabled="pager.currentPage == pager.totalPages"
          @click="page++"
        >
          <v-icon size="20">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectorsPage',

  data() {
    return {
      data: {},
      dialog: false,
      removeDialog: false,
      filter: {
        page: 1,
        pageSize: 10,
      },
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
      sectors: [],
      page: 1,
      dialogKey: false,
    }
  },

  fetch() {
    const payload = this.$convertToQueryString(this.filter)
    this.$axios.$get(`sector/list/paginate?${payload}`).then((response) => {
      this.sectors = response.data
    })
  },

  head() {
    return {
      title: 'Setores',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sector description',
        },
      ],
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  methods: {
    remove(id) {
      this.$axios.$delete(`sector/${id}`).then(() => {
        this.removeDialog = false
        this.$toast('Setor removido com sucesso!')
        this.$fetch()
      })
    },
  },
}
</script>

<style scoped></style>
