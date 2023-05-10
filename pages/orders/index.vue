<template>
  <div>
    <v-dialog v-model="updateDialog" max-width="500">
      <OrdersStatusUpdate
        :data="updatePayload"
        @close="updateDialog = false"
        @updated="update"
      />
    </v-dialog>

    <v-dialog v-model="removeDialog" max-width="500">
      <OrdersRemove
        :data="order"
        @close="removeDialog = false"
        @removed="remove(order.id)"
      />
    </v-dialog>

    <Header
      title="Pedidos"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img
          src="customer-relationship-management-rafiki.svg"
          max-height="380"
          contain
        ></v-img>
      </v-col>
    </Header>

    <div v-if="user.type < 2" class="d-flex px-3">
      <v-btn
        width="49%"
        class="card"
        :color="tab == 0 ? 'primary' : 'white'"
        height="70"
        @click="tab = 0"
      >
        Listagem
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        width="49%"
        class="card"
        :color="tab == 1 ? 'primary' : 'white'"
        height="70"
        @click=";(order = { step: 0 }), (tab = 1)"
      >
        Cadastro
      </v-btn>
    </div>

    <div v-if="tab === 0">
      <v-row class="ma-0">
        <v-col
          v-for="ord in orders"
          :key="ord.id"
          cols="12"
          class="d-flex justify-center"
        >
          <v-card
            class="card-with-border pa-4 d-flex flex-column flex-sm-row align-center"
            width="90%"
          >
            <div class="text-center">
              <v-progress-circular
                class="mr-4"
                :value="ord.step == 0 ? 10 : ord.step * 50"
                :size="150"
                :width="15"
                :color="getColor(ord.step * 50)"
              ></v-progress-circular>
            </div>

            <div style="width: 100%" class="d-flex flex-wrap">
              <div>
                <div class="d-flex">
                  <div>
                    <h1 class="t4 mr-2">{{ ord.title }}</h1>
                    <span class="bold mr-2">ID: {{ ord.id }}</span>
                  </div>
                </div>
                <div>
                  <v-subheader class="pl-0 my-3 my-sm-0">
                    {{ ord.description }}
                  </v-subheader>
                  <div>
                    <v-chip color="secondary white--text" class="bold" label>
                      {{ ord.sector ? ord.sector.name : 'Sem registro' }}
                    </v-chip>
                  </div>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-end">
                <v-menu v-if="user.type == 0" offset-y open-on-hover>
                  <template #activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click=";(order = ord), (tab = 1)">
                      <v-icon class="mr-2">mdi-pencil-outline</v-icon>
                      <v-list-item-title>Editar</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click=";(order = ord), (removeDialog = true)">
                      <v-icon class="mr-2">mdi-trash-can-outline</v-icon>
                      <v-list-item-title>Remover</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="ord.step < 2"
                  color="success"
                  depressed
                  @click="openUpdate(ord, ord.step + 1)"
                >
                  Avançar status
                </v-btn>
                <v-spacer></v-spacer>
                <div class="d-flex justify-end align-end mt-2">
                  <v-menu open-on-hover offset-y>
                    <template #activator="{ on, attrs }">
                      <v-chip
                        outlined
                        :color="getColor(ord.step * 50)"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ ord.stepString }}
                      </v-chip>
                    </template>

                    <v-list nav dense>
                      <div
                        v-for="(step, i) in [
                          'Agendado',
                          'Em progresso',
                          'Feito',
                        ]"
                        :key="step"
                      >
                        <v-list-item
                          v-if="i > ord.step"
                          link
                          :class="`bold d-flex justify-center ${getColor(
                            i * 50
                          )}--text`"
                          @click="openUpdate(ord, i)"
                        >
                          {{ step }}
                        </v-list-item>
                      </div>

                      <v-list-item
                        v-if="ord.step == 2"
                        :class="`bold d-flex justify-center`"
                      >
                        Serviço concluído
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <span class="t4 accent--text ml-4" style="line-height: unset">
                    {{ ord.rewardPoints }}
                  </span>
                  <span class="bold">pts</span>
                </div>
              </div>
            </div>
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
            @click="filter.page--"
          >
            <v-icon size="20">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            color="white"
            icon
            :disabled="pager.currentPage == pager.totalPages"
            @click="filter.page++"
          >
            <v-icon size="20">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div v-else class="pa-4">
      <br />

      <v-row class="ma-0" no-gutters align="center">
        <v-col class="d-flex flex-column align-center">
          <h2 class="t4">Progresso:</h2>
          <v-progress-circular
            size="250"
            width="23"
            :value="order.step == 0 ? 10 : order.step * 50"
            :color="getColor(order.step * 50)"
          ></v-progress-circular
        ></v-col>
        <v-col>
          <v-form ref="form">
            <div v-if="order.id">
              <h2 class="t4">* Atualizando cadastro</h2>
              <span class="bold mr-2">ID: {{ order.id }}</span>
            </div>
            <v-row class="ma-0">
              <v-col cols="12">
                <v-subheader class="pl-0"> Status da ordem </v-subheader>
                <v-slider
                  v-model="order.step"
                  :disabled="!!order.id"
                  :tick-labels="
                    $vuetify.breakpoint.mdAndUp
                      ? ['Agendado', 'Em progresso', 'Feito']
                      : ['Agend.', 'Em progres.', 'Feito']
                  "
                  :max="2"
                  step="1"
                  ticks="always"
                  tick-size="6"
                  thumb-label
                >
                  <template #thumb-label="{ value }">
                    {{ `${value * 50}%` }}
                  </template></v-slider
                >
              </v-col>

              <v-col cols="12" sm="7">
                <v-text-field
                  v-model="order.title"
                  hide-details="auto"
                  label="Nome"
                  outlined
                  :rules="[(v) => !!v || 'Digite um título para o pedido']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5">
                <v-select
                  v-model="order.sectorId"
                  :items="sectors"
                  hide-details="auto"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  label="Setor"
                  menu-props="auto"
                  single-line
                  outlined
                  :rules="[(v) => !!v || 'Selecione o setor']"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="order.description"
                  hide-details="auto"
                  rows="3"
                  label="Descrição"
                  outlined
                  :rules="[(v) => !!v || 'Digite uma descrição para o pedido']"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="order.rewardPoints"
                  :disabled="!!order.id && order.step > 0"
                  type="number"
                  hide-details="auto"
                  label="Pontos de recompensa"
                  outlined
                  suffix="pts"
                  :rules="[(v) => !!v || 'Insira os pontos de recompensa']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="primary"
                  depressed
                  :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
                  @click="submit"
                >
                  Salvar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage',

  data() {
    return {
      removeDialog: false,
      updateDialog: false,
      updatePayload: {},
      tab: 0,
      order: {
        step: 0,
      },
      sectors: [],
      filter: {
        page: 1,
        pageSize: 10,
      },
      pager: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
      orders: [],
    }
  },

  fetch() {
    if (this.user.sectorId) this.filter.sectorId = this.user.sectorId

    const payload = this.$convertToQueryString(this.filter)
    this.$axios.$get('order/list/paginate?' + payload).then((response) => {
      this.orders = response.data
      this.pager = response.pager
    })

    this.$axios.$get(`sector/list`).then((response) => {
      this.sectors = response
    })
  },

  head() {
    return {
      title: 'Pedidos',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Order description',
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

  watch: {
    'filter.page': {
      deep: true,
      handler() {
        this.$fetch()
      },
    },
  },

  methods: {
    openUpdate(order, step) {
      this.updatePayload = {
        id: order.id,
        title: order.title,
        step,
        stepString: ['Agendado', 'Em progresso', 'Feito'][step],
      }

      this.updateDialog = true
    },

    update() {
      this.$axios
        .$put('order/update-step', {
          id: this.updatePayload.id,
          step: this.updatePayload.step,
        })
        .then(() => {
          this.updateDialog = false
          this.$toast.success('Pedido atualizado com sucesso!')
          this.$fetch()
        })
    },

    getColor(value) {
      if (value <= 30) {
        return 'error'
      }

      if (value <= 60) {
        return 'accent'
      }

      return 'success'
    },

    remove(id) {
      this.$axios.$delete(`order/${id}`).then(() => {
        this.removeDialog = false
        this.$toast('Pedido removido com sucesso!')
        this.$fetch()
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        if (this.order.id) {
          this.$axios.$put('order', this.order).then(() => {
            this.$toast.success('Pedido atualizado com sucesso!')
            this.$refs.form.reset()
            this.$fetch()
            this.tab = 0
          })
        } else {
          this.$axios.$post('order', this.order).then(() => {
            this.$toast.success('Pedido cadastrado com sucesso!')
            this.$refs.form.reset()
            this.$fetch()
            this.tab = 0
          })
        }
      }
    },
  },
}
</script>

<style></style>
