import 'moment/locale/pt-br'

export default ({ app }, inject) => {
  inject('getLevel', (points) => {
    if (points < 100) return 1

    if (points >= 100 && points < 200) return 2

    if (points >= 200 && points < 350) return 3

    if (points >= 350 && points < 550) return 4

    if (points >= 550 && points < 800) return 5

    if (points >= 800 && points < 1100) return 6

    if (points >= 1100 && points < 1450) return 7

    if (points >= 1450 && points < 1850) return 8

    if (points >= 1850 && points < 2300) return 9

    if (points >= 2300 && points < 2800) return 10

    return 10
  })

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
