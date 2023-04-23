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
            <v-btn text>Dashboard</v-btn>
          </div>

          <v-spacer></v-spacer>

          <v-btn v-if="$vuetify.breakpoint.mdAndUp" text icon class="mr-2">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>

          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </template>
            <v-list>
              <v-list-item @click="logout">
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
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
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
      drawer: false,
      selectedItem: 0,
      items: [
        {
          text: 'Dashboard',
          icon: 'mdi-hexagon-multiple-outline',
          link: 'dash',
        },
        { text: 'Usuários', icon: 'mdi-account-outline', link: 'users' },
        {
          text: 'Setores',
          icon: 'mdi-account-group',
          link: 'sectors',
        },
        {
          text: 'Pedidos',
          icon: 'mdi-folder-multiple-outline',
          link: 'orders',
        },
        {
          text: 'Conquistas',
          icon: 'mdi-trophy-outline',
          link: 'conquests',
        },
      ],
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
