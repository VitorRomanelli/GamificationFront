<template>
  <v-app>
    <v-app-bar
      clipped-left
      color="background"
      flat
      app
      :height="$vuetify.breakpoint.mdAndUp ? 120 : 80"
    >
      <div class="d-flex justify-center align-center" style="width: 100%">
        <v-card
          class="pa-4 mt-2 d-flex align-center shadow"
          style="border-radius: 12px"
          width="95%"
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <strong class="bold ml-2">Gamificação</strong>

          <v-spacer></v-spacer>

          <div v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn text to="/dash">Dashboard</v-btn>
          </div>

          <v-spacer></v-spacer>

          <v-chip label color="grey lighten-3 mr-3" class="level-icon">
            <v-icon color="primary">{{ getIconByLevel }}</v-icon>
            <strong class="t5 mx-2">Nível:</strong>
            <strong class="t5 accent--text">{{
              $getLevel(user.points)
            }}</strong>
          </v-chip>

          <v-badge
            v-if="notifs"
            color="green"
            :content="notifs"
            offset-x="30"
            offset-y="20"
          >
            <v-menu offset-y left>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-if="$vuetify.breakpoint.mdAndUp"
                  text
                  icon
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
              </template>
              <v-list nav>
                <v-list-item
                  v-for="conq in conquests"
                  :key="conq.id"
                  link
                  class="d-block grey lighten-3 px-3 py-1"
                  to="/conquests"
                  @click="
                    notifs--,
                      (conquests = conquests.filter((x) => x.id != conq.id))
                  "
                >
                  <p class="t5 mb-1">Parábens!</p>
                  <p v-if="conq.to == 0" class="label mb-1">
                    Você desbloqueou uma nova conquista!
                  </p>

                  <p v-if="conq.to == 1" class="label mb-1">
                    Seu setor desbloqueou uma nova conquista!
                  </p>

                  <p class="mb-1">
                    Conquista: <span class="bold">{{ conq.title }}</span>
                  </p>
                </v-list-item>
                <v-list-item v-if="conquests.length == 0">
                  <p class="bold text-center mb-0">
                    Nenhuma notificação <br />
                    encontrada!
                  </p>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-badge>

          <v-menu v-else offset-y left>
            <template #activator="{ on, attrs }">
              <v-btn
                v-if="$vuetify.breakpoint.mdAndUp"
                text
                icon
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </template>
            <v-list nav>
              <v-list-item
                v-for="conq in conquests"
                :key="conq.id"
                to="/conquests"
                @click="notifs--"
              >
                <p class="t5 mb-1">Parábens!</p>
                <p v-if="conq.to == 0" class="label mb-1">
                  Você desbloqueou uma nova conquista!
                </p>
                <p v-else class="label mb-1">
                  Seu setor desbloqueou uma nova conquista!
                </p>
                <p>
                  Conquista: <span class="bold">{{ conq.title }}</span>
                </p>
              </v-list-item>
              <v-list-item v-if="conquests.length == 0">
                <p class="bold text-center mb-0">
                  Nenhuma notificação <br />
                  encontrada!
                </p>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y left>
            <template #activator="{ on, attrs }">
              <v-avatar
                v-if="user.picture"
                style="border: 1px solid #373737"
                v-bind="attrs"
                v-on="on"
              >
                <img
                  :src="env + user.picture"
                  alt="você"
                  style="object-fit: cover"
                />
              </v-avatar>

              <v-avatar
                v-else
                style="border: 1px solid #373737"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="black">mdi-account-outline</v-icon>
              </v-avatar>
            </template>
            <v-list nav>
              <v-list-item class="text-center grey lighten-3 pa-2">
                <v-list-item-title>
                  <span class="bold">
                    {{ user.name }}
                  </span>
                  <br />
                  {{ user.email }}
                  <br />
                  Tipo:
                  <span class="bold">
                    {{ user.typeString }}
                  </span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="text-center" to="/profile">
                <v-list-item-title>Perfil</v-list-item-title>
              </v-list-item>

              <v-list-item class="text-center" @click="logout">
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      floating
      style="box-shadow: none !important"
      color="transparent"
    >
      <div class="d-flex flex-column justify-start pa-4" style="height: 100%">
        <v-card class="pa-2 mt-2 shadow" style="border-radius: 12px">
          <v-btn text small block @click="drawer = false">
            <v-icon small class="mr-2">mdi-chevron-left</v-icon>
            Fechar
          </v-btn>
        </v-card>

        <v-card
          class="pa-4 mt-2 d-flex align-center shadow"
          style="border-radius: 12px"
          max-height="85%"
        >
          <v-list nav dense style="width: 100%">
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                v-show="!item.block.includes(user.type)"
                :key="i"
                :to="item.link"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list></v-card
        >
      </div>
    </v-navigation-drawer>

    <v-main class="background">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      env: process.env.API_KEY,
      conquests: [],
      notifs: null,
      drawer: false,
      selectedItem: 0,
      items: [
        {
          text: 'Dashboard',
          icon: 'mdi-hexagon-multiple-outline',
          link: 'dash',
          block: [],
        },
        {
          text: 'Usuários',
          icon: 'mdi-account-outline',
          link: 'users',
          block: [1, 2],
        },
        {
          text: 'Setores',
          icon: 'mdi-account-group-outline',
          link: 'sectors',
          block: [],
        },
        {
          text: 'Pedidos',
          icon: 'mdi-folder-multiple-outline',
          link: 'orders',
          block: [],
        },
        {
          text: 'Conquistas',
          icon: 'mdi-trophy-outline',
          link: 'conquests',
          block: [],
        },
      ],
      socketUserInstance: null,
    }
  },

  fetch() {
    if (this.socketUserInstance) {
      this.socketUserInstance.close()
    }

    this.socketUserInstance = new WebSocket(
      `${process.env.API_KEY_SOCKET}?chatId=${this.user.id}&userId=${this.user.id}`
    )

    const context = this
    this.socketUserInstance.onmessage = async function (e) {
      const socketMessage = await JSON.parse(e.data)
      context.conquests = socketMessage.conquests
      context.notifs += socketMessage.conquests.length
    }

    if (this.user.sectorId) {
      this.$axios
        .$get(`order/not-concluded/${this.user.sectorId}`)
        .then((response) => {
          if (response.count) {
            this.$toast(
              `Existem ${response.count} pedidos não concluidos, você pode adquirir ${response.points} pontos`
            )
          }
        })
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },

    getIconByLevel() {
      const level = this.$getLevel(this.user.points)

      if (level >= 4 && level < 7) {
        return 'mdi-trophy-outline'
      }

      if (level >= 7 && level < 11) {
        return 'mdi-trophy-award'
      }

      return 'mdi-medal-outline'
    },
  },

  beforeDestroy() {
    if (this.socketUserInstance) this.socketUserInstance.close()
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style scoped>
.level-icon {
  animation: pulse 1.5s ease-in-out;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
