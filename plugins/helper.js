import 'moment/locale/pt-br'

export default ({ app }, inject) => {
  inject('convertToQueryString', (obj) => {
    const str = []
    for (const p in obj)
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    return str.join('&')
  })

  app.$moment.updateLocale('pt-BR', {
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  })
  inject('randomIntFromInterval', (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)
  )
  inject('formatDate', (date) =>
    date
      ? app.$moment(date).locale('pt-BR').format('DD/MM/YYYY hh:mm:ss')
      : date
  )
  inject('formatDateWithoutHour', (date) =>
    date ? app.$moment(date).locale('pt-BR').format('DD/MM/YYYY') : date
  )
  inject('formatMonth', (date) =>
    date ? app.$moment(date).locale('pt-BR').format('MMMM / YYYY') : date
  )
  inject('formatCurrency', (value) =>
    value
      ? 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : 0
  )
  inject('formatHour', (hour) => {
    if (hour != null) {
      if (hour.toString().split('.')[0].length === 1) {
        return '0' + hour.toFixed(2).toString().replace('.', ':')
      } else {
        return hour.toFixed(2).toString().replace('.', ':')
      }
    }
    return '00:00'
  })
}
