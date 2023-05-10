<template>
  <v-row class="ma-0" align="center">
    <v-col>
      <v-img max-height="90vh" contain src="virtual-reality-pana.svg"></v-img>
    </v-col>
    <v-col cols="12" md="5" style="position: relative">
      <v-img
        src="style-arrow.svg"
        style="
          transform: rotateZ(100deg);
          position: absolute;
          right: 0;
          top: -100px;
        "
        max-height="100"
        contain
      ></v-img>

      <h1 class="t1">Log in</h1>

      <br />

      <v-form ref="form">
        <v-text-field
          v-model="user.email"
          label="E-mail"
          placeholder="example@mail.com"
          outlined
          :rules="[(v) => !!v || 'Digite seu e-mail']"
          @keyup.enter="login"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Senha"
          placeholder="********"
          outlined
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[(v) => !!v || 'Digite sua senha']"
          @click:append="show = !show"
          @keyup.enter="login"
        ></v-text-field>
      </v-form>

      <!-- <v-btn text class="bold">Esqueceu a senha?</v-btn> -->

      <br />
      <br />

      <v-btn
        class="btn-1"
        block
        x-large
        :loading="$nuxt.$loading ? $nuxt.$loading.loading : false"
        @click="login"
      >
        Log in
        <v-spacer></v-spacer>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',

  layout: 'external',

  data() {
    return {
      user: {},
      show: false,
    }
  },

  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('auth/login', this.user)
      }
    },
  },
}
</script>
