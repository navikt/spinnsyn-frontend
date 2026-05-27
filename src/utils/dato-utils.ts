import './init-dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/nb'
const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]
const SKILLETEGN_PERIODE = '–'

// new Date('YYYY-MM-DD') parses as UTC midnight, which shifts the date back by one day
// for users in timezones west of UTC. Parse date-only strings as local midnight instead.
function parseLocalDate(datoArg: Date | string): Date {
    if (datoArg instanceof Date) return datoArg
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(datoArg))
    if (match) {
        return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    }
    return new Date(String(datoArg))
}

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato = parseLocalDate(datoArg)
        const dag = dato.getDate()
        const manedIndex = dato.getMonth()
        const maned = maaneder[manedIndex]
        return `${dag}. ${maned}`
    }
    return ''
}

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    if (!datoArg) return undefined
    const dato = parseLocalDate(datoArg)
    return `${tilLesbarDatoUtenAarstall(dato)} ${dato.getFullYear()}`
}

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any) => {
    const fom = parseLocalDate(fomArg)
    const tom = parseLocalDate(tomArg)
    const erSammeAar = fom.getFullYear() === tom.getFullYear()
    const erSammeMaaned = fom.getMonth() === tom.getMonth()
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
          ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
          : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
}

export const erHelg = (dato: Date) => {
    return dato.getDay() === 6 || dato.getDay() === 0
}

export function erWeekendPeriode(fom: string, tom: string): boolean {
    const startDate = dayjs(fom)
    const endDate = dayjs(tom)

    const dates = []
    let currentDate = startDate

    while (currentDate.isSameOrBefore(endDate)) {
        dates.push(currentDate)
        currentDate = currentDate.add(1, 'day')
    }

    return dates.every((date) => {
        const dayOfWeek = date.day()
        return dayOfWeek === 0 || dayOfWeek === 6
    })
}

export function fullDatoKlokkeslett(timestamp: string): string {
    return dayjs(timestamp).format('D. MMMM YYYY [kl.] HH.mm')
}

export function antallDager(fom: string, tom: string): number {
    const startDate = dayjs(fom)
    const endDate = dayjs(tom)
    return endDate.diff(startDate, 'day') + 1
}
