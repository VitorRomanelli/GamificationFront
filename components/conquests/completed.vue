<template>
  <div>
    <Header
      title="Conquistas completas"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
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
  </div>
</template>

<script>
export default {
  name: 'ConquestsCompleted',

  data() {
    return {
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
          value: 'type',
        },
        {
          text: 'Para',
          align: 'start',
          value: 'to',
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
        page: 1,
        pageSize: 10,
      },
    }
  },
}
</script>

<style scoped></style>
