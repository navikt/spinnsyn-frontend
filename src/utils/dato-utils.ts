import { addDays, differenceInDays, format, getDate, getDay, isSameMonth, isSameYear, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale/nb'
import { TZDate } from '@date-fns/tz'

const SKILLETEGN_PERIODE = '–'

// Parser dato-streng til Date med riktig tidssone.
// Strenger uten tidssone-info tolkes som Europe/Oslo for å unngå
// at UTC-midnatt forskyver datoen for brukere vest for UTC.
export function toDate(date: string, defaultTimezone = 'Europe/Oslo'): Date {
    if (isoTimestampHasTimeZone(date)) {
        return parseISO(date)
    }
    return new TZDate(date, defaultTimezone)
}

function toOsloDate(date: string | Date): Date {
    const datoObj = typeof date === 'string' ? toDate(date) : date
    return new TZDate(datoObj, 'Europe/Oslo')
}

function isoTimestampHasTimeZone(iso: string): boolean {
    return /([Zz]|[+-]\d{2}:\d{2})$/.test(iso)
}

export const tilLesbarDatoUtenAarstall = (datoArg: Date | string | undefined | null): string => {
    if (!datoArg) return ''
    return format(toOsloDate(datoArg), 'd. MMMM', { locale: nb })
}

export const tilLesbarDatoMedArstall = (datoArg: Date | string | undefined | null): string | undefined => {
    if (!datoArg) return undefined
    return format(toOsloDate(datoArg), 'd. MMMM yyyy', { locale: nb })
}

export const tilLesbarPeriodeMedArstall = (fomArg: Date | string, tomArg: Date | string): string => {
    const fom = toOsloDate(fomArg)
    const tom = toOsloDate(tomArg)
    if (isSameMonth(fom, tom)) {
        return `${getDate(fom)}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
    } else if (isSameYear(fom, tom)) {
        return `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
    }
    return `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
}

export const erHelg = (dato: Date): boolean => {
    const day = getDay(dato)
    return day === 6 || day === 0
}

export function erWeekendPeriode(fom: string, tom: string): boolean {
    const startDate = toDate(fom)
    const endDate = toDate(tom)
    const days = differenceInDays(endDate, startDate) + 1

    for (let i = 0; i < days; i++) {
        if (!erHelg(addDays(startDate, i))) return false
    }
    return true
}

export function fullDatoKlokkeslett(timestamp: string): string {
    return format(toOsloDate(timestamp), "d. MMMM yyyy 'kl.' HH.mm", { locale: nb })
}

export function antallDager(fom: string, tom: string): number {
    return differenceInDays(toDate(tom), toDate(fom)) + 1
}
