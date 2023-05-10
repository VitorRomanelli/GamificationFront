<template>
  <div>
    <Header
      title="Dashboard"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img src="darkanalytics-bro.svg" max-height="380" contain></v-img>
      </v-col>
    </Header>

    <v-container>
      <div class="d-flex justify-center my-4">
        <div
          class="d-flex justify-center"
          style="max-width: 800px; width: 100%"
        >
          <v-btn
            large
            class="card-with-border"
            :color="tab == 0 ? 'primary' : ''"
            width="49%"
            @click="tab = 0"
          >
            Usuários
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            large
            class="card-with-border"
            :color="tab == 1 ? 'primary' : ''"
            width="49%"
            @click="tab = 1"
          >
            Setores
          </v-btn>
        </div>
      </div>

      <div v-if="tab == 0" class="d-flex justify-center mt-4">
        <v-row class="ma-0" justify="center" style="max-width: 800px" dense>
          <v-col
            v-if="items[1]"
            class="d-flex flex-column align-center justify-end"
            style="position: relative"
          >
            <div
              class="position"
              style="
                background: linear-gradient(180deg, #f79e81 0%, #c24967 100%);
              "
            >
              <div class="position-text">2</div>
            </div>
            <v-avatar
              class="avatar d-flex justify-center align-center"
              size="180"
              style="border: 5px solid var(--v-tertiary-base)"
            >
              <img
                v-if="items[1].picture"
                :src="env + items[1].picture"
                alt="John"
                style="object-fit: cover"
              />
              <v-icon v-else x-large>mdi-account-outline</v-icon>
            </v-avatar>

            <v-card
              class="pa-4 pt-8 card text-center"
              min-width="200"
              style="margin-top: -15px"
            >
              <strong class="bold">{{ items[1].name }}</strong>
              <br />
              <v-icon color="primary">{{
                getIconByLevel(items[1].points)
              }}</v-icon>
              <br />
              <strong class="t5"
                >Nível: {{ $getLevel(items[1].points) }}</strong
              >
              <br />
              <span class="t4 accent--text">{{ items[1].points }}pts</span>
            </v-card>
          </v-col>
          <v-col
            v-if="items[0]"
            class="d-flex flex-column align-center"
            style="position: relative"
          >
            <div
              class="position"
              style="
                background: linear-gradient(180deg, #6a68f7 0%, #dc93e8 100%);
              "
            >
              <div class="position-text">1</div>
            </div>

            <v-icon
              style="
                position: absolute;
                top: 0;
                left: 60px;
                transform: rotate(-25deg);
              "
              color="#FFA500"
              size="40"
            >
              mdi-crown-outline
            </v-icon>
            <v-avatar
              class="avatar mt-4"
              size="220"
              style="border: 5px solid var(--v-secondary-base)"
            >
              <img
                v-if="items[0].picture"
                :src="env + items[0].picture"
                alt="John"
                style="object-fit: cover"
              />
              <v-icon v-else x-large>mdi-account-outline</v-icon>
            </v-avatar>

            <v-card
              class="pa-4 pt-8 card text-center"
              min-width="200"
              min-height="150"
              style="margin-top: -15px"
            >
              <strong class="bold">{{ items[0].name }}</strong>
              <br />
              <v-icon color="primary">{{
                getIconByLevel(items[0].points)
              }}</v-icon>
              <br />
              <strong class="t5"
                >Nível: {{ $getLevel(items[0].points) }}</strong
              >
              <br />
              <span class="t4 accent--text">{{ items[0].points }}pts</span>
            </v-card>
          </v-col>
          <v-col
            v-if="items[2]"
            class="d-flex flex-column align-center justify-end"
            style="position: relative"
          >
            <div
              class="position"
              style="
                background: linear-gradient(180deg, #faaf58 0%, #e55d24 100%);
              "
            >
              <div class="position-text">3</div>
            </div>
            <v-avatar
              class="avatar"
              size="180"
              style="border: 5px solid var(--v-accent-base); position: relative"
            >
              <img
                v-if="items[2].picture"
                :src="env + items[2].picture"
                alt="John"
                style="object-fit: cover"
              />
              <v-icon v-else x-large>mdi-account-outline</v-icon>
            </v-avatar>

            <v-card
              class="pa-4 pt-8 card text-center"
              min-width="200"
              style="margin-top: -15px"
            >
              <strong class="bold">{{ items[2].name }}</strong>
              <br />
              <v-icon color="primary">{{
                getIconByLevel(items[2].points)
              }}</v-icon>
              <br />
              <strong class="t5">
                Nível: {{ $getLevel(items[2].points) }}
              </strong>
              <br />
              <span class="t4 accent--text">{{ items[2].points }}pts</span>
            </v-card>
          </v-col>
          <v-col v-for="(usr, i) in items" :key="usr.id" cols="12">
            <v-card
              v-if="usr.id != user.id"
              class="card-with-border pa-4 d-flex align-center"
            >
              <v-avatar size="80" class="mr-2">
                <img
                  v-if="usr.picture"
                  :src="env + usr.picture"
                  alt="John"
                  style="object-fit: cover"
                />
                <v-icon v-else large>mdi-account-outline</v-icon>
              </v-avatar>

              <div>
                <p class="t5 mb-0" style="line-height: unset !important">
                  {{ usr.name }}
                </p>
                <strong class="t5 accent--text">{{ usr.points }}pts</strong>
              </div>

              <v-spacer></v-spacer>

              <div class="level">{{ i + 1 }}</div>
            </v-card>

            <div v-if="usr.id == user.id" class="mb-6">
              <strong class="t4"> Sua posição: </strong>
              <v-card
                class="card pa-4 d-flex align-center"
                style="
                  background: linear-gradient(180deg, #ce9ffc 0%, #7367f0 100%);
                "
                dark
              >
                <v-avatar size="80" class="mr-2">
                  <img
                    v-if="usr.picture"
                    :src="env + usr.picture"
                    alt="John"
                    style="object-fit: cover"
                  />
                  <v-icon v-else x-large>mdi-account-outline</v-icon>
                </v-avatar>

                <div>
                  <p
                    class="t5 mb-0 white--text"
                    style="line-height: unset !important"
                  >
                    {{ usr.name }}
                  </p>
                  <strong class="t5 accent--text"> {{ usr.points }}pts </strong>
                </div>

                <v-spacer></v-spacer>

                <div class="level">{{ i + 1 }}</div>
              </v-card>
            </div>
          </v-col>

          <v-col cols="12" class="d-flex">
            <v-btn
              v-if="filter.page > 1"
              class="card-with-border"
              @click="filter.page--"
            >
              Anterior
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="filter.page <= pager.totalPages"
              :disabled="pager.totalPages == 1"
              class="card-with-border"
              @click="filter.page++"
            >
              Próximo
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-if="tab == 1" class="d-flex justify-center mt-8">
        <div style="max-width: 800px; flex-grow: 1">
          <div class="d-flex justify-center">
            <div
              v-if="sectors[1]"
              class="d-flex flex-column align-center justify-end"
              style="position: relative; margin-right: -40px"
            >
              <v-card
                class="pa-4 pt-8 card-with-border text-center"
                min-width="200"
              >
                <strong class="t3">2</strong>
                <br />
                <strong class="t4">{{ sectors[1].name }}</strong>
                <br />
                <strong class="bold">{{ sectors[1].supervisor.name }}</strong>
                <br />
                <v-icon color="primary">
                  {{ getIconByLevel(sectors[1].points) }}
                </v-icon>
                <br />
                <strong class="t5">
                  Nível: {{ $getLevel(sectors[1].points) }}
                </strong>
                <br />
                <span class="t4 accent--text">{{ sectors[1].points }}pts</span>
              </v-card>
            </div>
            <div
              v-if="sectors[0]"
              class="d-flex flex-column align-center mb-8"
              style="position: relative; z-index: 4"
            >
              <v-icon
                style="
                  position: absolute;
                  top: 3px;
                  left: 50px;
                  z-index: 6;
                  transform: rotate(-25deg);
                "
                color="#FFA500"
                size="40"
              >
                mdi-crown-outline
              </v-icon>
              <v-card
                class="pa-4 pt-8 card-with-border text-center"
                min-width="200"
                min-height="150"
              >
                <strong class="t3">1</strong>
                <br />
                <strong class="t4">{{ sectors[0].name }}</strong>
                <br />
                <strong class="bold">{{ sectors[0].supervisor.name }}</strong>
                <br />
                <v-icon color="primary">
                  {{ getIconByLevel(sectors[0].points) }}
                </v-icon>
                <br />
                <strong class="t5">
                  Nível: {{ $getLevel(sectors[0].points) }}
                </strong>
                <br />
                <span class="t4 accent--text">{{ sectors[0].points }}pts</span>
              </v-card>
            </div>
            <div
              v-if="sectors[2]"
              class="d-flex flex-column align-center justify-end"
              style="position: relative; margin-left: -40px"
            >
              <v-card
                class="pa-4 pt-8 card-with-border text-center"
                min-width="200"
              >
                <strong class="t3">3</strong>
                <br />
                <strong class="t4">{{ sectors[2].name }}</strong>
                <br />
                <strong class="bold">{{ sectors[2].supervisor.name }}</strong>
                <br />
                <v-icon color="primary">{{
                  getIconByLevel(sectors[2].points)
                }}</v-icon>
                <br />
                <strong class="t5"
                  >Nível: {{ $getLevel(sectors[2].points) }}</strong
                >
                <br />
                <span class="t4 accent--text">{{ sectors[2].points }}pts</span>
              </v-card>
            </div>
          </div>

          <div v-for="(sector, i) in sectors" :key="sector.id">
            <v-card
              v-if="sector.id != user.sectorId"
              class="card-with-border pa-4 d-flex align-center ma-2"
            >
              <div class="mr-4">
                Nível:
                <span class="t5 accent--text">{{
                  $getLevel(sector.points)
                }}</span>

                <div class="level text-center">
                  <v-icon color="accent">{{
                    getIconByLevel(sector.points)
                  }}</v-icon>
                </div>
              </div>

              <div>
                <p class="t5 mb-0" style="line-height: unset !important">
                  {{ sector.supervisor.name }}
                </p>
                <p class="t5 mb-0" style="line-height: unset !important">
                  {{ sector.name }}
                </p>
                <strong class="t5 accent--text">{{ sector.points }}pts</strong>
              </div>

              <v-spacer></v-spacer>

              <div class="level">{{ i + 1 }}</div>
            </v-card>

            <div v-if="sector.id == user.sectorId" class="ma-2 mb-8">
              <strong class="t4"> Posição do seu setor: </strong>
              <v-card
                class="card pa-4 d-flex align-center"
                style="
                  background: linear-gradient(180deg, #ce9ffc 0%, #7367f0 100%);
                "
                dark
              >
                <div class="mr-4">
                  Nível:
                  <span class="t5 accent--text">{{
                    $getLevel(sector.points)
                  }}</span>

                  <div class="level text-center">
                    <v-icon color="accent">{{
                      getIconByLevel(sector.points)
                    }}</v-icon>
                  </div>
                </div>

                <div>
                  <p
                    class="t5 mb-0 white--text"
                    style="line-height: unset !important"
                  >
                    {{ sector.supervisor.name }}
                  </p>
                  <p
                    class="t5 mb-0 white--text"
                    style="line-height: unset !important"
                  >
                    {{ sector.name }}
                  </p>
                  <strong class="t5 accent--text"
                    >{{ sector.points }}pts</strong
                  >
                </div>

                <v-spacer></v-spacer>

                <div class="level">{{ i + 1 }}</div>
              </v-card>
            </div>
          </div>

          <div cols="12" class="d-flex">
            <v-btn
              v-if="filter.page > 1"
              class="card-with-border"
              @click="filter.page--"
            >
              Anterior
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="filter.page <= pager.totalPages"
              :disabled="pager.totalPages == 1"
              class="card-with-border"
              @click="filter.page++"
            >
              Próximo
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DashPage',

  data() {
    return {
      filter: {
        page: 1,
      },
      env: process.env.API_KEY,
      items: [],
      sectors: [],
      pager: {},
      tab: 0,
      chartData: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: 'Horas por projeto',
            borderColor: 'black',
            borderWidth: 0.5,
            data: [100, 200, 300, 400, 500, 600],
            backgroundColor: ['#9592E3', '#43546f', '#ffc727'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },

  fetch() {
    this.getUsers()
    this.getSectors()
  },

  head() {
    return {
      title: 'Dash',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dash description',
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
    getSectors() {
      const payload = this.$convertToQueryString(this.filter)
      this.$axios.$get(`sector/list/paginate?${payload}`).then((response) => {
        this.sectors = response.data
      })
    },

    getUsers() {
      const payload = this.$convertToQueryString(this.filter)
      this.$axios.$get(`user/list/paginate?${payload}`).then((response) => {
        this.items = response.data
        this.pager = response.pager
      })
    },

    getIconByLevel(points) {
      const level = this.$getLevel(points)

      if (level >= 4 && level < 7) {
        return 'mdi-trophy-outline'
      }

      if (level >= 7 && level < 11) {
        return 'mdi-trophy-award'
      }

      return 'mdi-medal-outline'
    },
  },
}
</script>

<style scoped>
.position-text {
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 12px;
  color: #ffffff;
  transform: rotate(-45deg);
}

.position {
  position: absolute;
  width: 28px;
  height: 28px;
  top: 225px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 4;
  border-radius: 6.27778px;
  transform: rotate(45deg);
}

.avatar {
  z-index: 3;
}

.level {
  width: 50px;
  height: 50px;
  border: 2px solid var(--v-accent-base);
  border-radius: 100%;
  background: transparent;

  border-top-left-radius: 100% !important;
  border-top-right-radius: 100% !important;
  border-bottom-left-radius: 100% !important;
  border-bottom-right-radius: 100% !important;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
