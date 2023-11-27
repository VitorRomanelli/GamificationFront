<template>
  <div class="d-flex flex-column align-center">
    <v-file-input
      id="image-input"
      class="d-none"
      accept="image/png, image/jpeg, image/bmp"
      @change="setImage"
    ></v-file-input>

    <v-hover v-slot="{ hover }">
      <v-avatar class="avatar mt-4" size="220">
        <v-img
          v-if="localUser.picture"
          :src="
            localUser.picture.includes('Uploads')
              ? env + localUser.picture
              : localUser.picture
          "
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex justify-center align-center transition-fast-in-fast-out v-card--reveal text-h2 white--text"
              style="
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                cursor: pointer;
              "
              @click="openPicker"
            >
              <v-icon large>mdi-camera-image</v-icon>
            </div>
          </v-expand-transition>
        </v-img>

        <div v-else style="width: 100%; height: 100%" class="grey lighten-1">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex justify-center align-center transition-fast-in-fast-out v-card--reveal text-h2 white--text"
              style="
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                cursor: pointer;
              "
              @click="openPicker"
            >
              <v-icon large>mdi-camera-image</v-icon>
            </div>
          </v-expand-transition>
          <v-icon v-if="!hover" x-large>mdi-account-outline</v-icon>
        </div>
      </v-avatar>
    </v-hover>

    <v-card class="pa-4 pt-8 card text-center" style="margin-top: -15px">
      <div class="grey lighten-3" style="border-radius: 8px">
        <strong class="t4">Nível: {{ $getLevel(user.points) }}</strong>
        <br />
        <v-icon color="primary">{{ getIconByLevel(user.points) }}</v-icon>
        <br />
        <span class="t4 accent--text">{{ user.points }}pts</span>
        <br />
        <span class="t4 accent--text">
          Serviços concluídos: {{ user.concludedOrders }}
        </span>
      </div>

      <v-form ref="form">
        <v-row class="ma-0 mt-4" dense>
          <v-col>
            <v-text-field
              v-model="localUser.name"
              label="Nome"
              placeholder="Seu nome no sistema"
              hide-details
              outlined
              :rules="[(v) => !!v || 'Digite seu e-mail']"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="localUser.email"
              label="E-mail"
              hide-details
              disabled
              placeholder="example@mail.com"
              outlined
              :rules="[(v) => !!v || 'Digite seu e-mail']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              color="primary"
              depressed
              :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
              @click="save"
            >
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',

  data() {
    return {
      localUser: {
        picture: '',
      },
      env: process.env.API_KEY,
    }
  },

  head() {
    return {
      title: 'Perfil',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Profile description',
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

  created() {
    this.localUser = { ...this.user }
  },

  methods: {
    openPicker() {
      document.getElementById('image-input').click()
    },

    setImage(image) {
      if (image) {
        this.localUser.extension = image.name.split('.')[1]

        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => {
          this.localUser.picture = reader.result
        }
      }
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

    save() {
      if (this.$refs.form.validate()) {
        this.$axios
          .$put('user', {
            ...this.localUser,
            picture: this.localUser.picture.split(',')[1],
          })
          .then((response) => {
            this.$store.commit('auth/setUser', response)
            this.$toast.success('Usuário atualizado com sucesso!')
          })
      }
    },
  },
}
</script>

<style scoped>
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
