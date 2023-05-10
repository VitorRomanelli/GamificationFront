import { mixins, Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    chartData(val) {
      if (val !== this.chartData) {
        this.renderChart(val, this.options)
      }
    },
    options(val) {
      this.renderChart(this.chartData, val)
    },
  },
  computed: {},
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
