import { describe, it, expect } from 'vitest'
import { TZDate } from '@date-fns/tz'

import {
    tilLesbarDatoUtenAarstall,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    erHelg,
    erWeekendPeriode,
    fullDatoKlokkeslett,
    antallDager,
    toDate,
} from './dato-utils'

describe('toDate', () => {
    it('gir TZDate for dato-streng uten tidssone', () => {
        expect(toDate('2020-01-01')).toBeInstanceOf(TZDate)
    })
    it('gir TZDate for timestamp uten tidssone', () => {
        expect(toDate('2020-01-01T00:00:00')).toBeInstanceOf(TZDate)
    })
    it('gir ikke TZDate for timestamp med Z', () => {
        expect(toDate('2020-01-01T00:00:00Z')).not.toBeInstanceOf(TZDate)
    })
    it('gir ikke TZDate for timestamp med +HH:MM', () => {
        expect(toDate('2020-01-01T00:00:00+01:00')).not.toBeInstanceOf(TZDate)
    })
    it('bruker Europe/Oslo som standard tidssone', () => {
        const date = toDate('2020-01-01') as TZDate
        expect(date.timeZone).toBe('Europe/Oslo')
    })
    it('bruker spesifisert tidssone', () => {
        const date = toDate('2020-01-01', 'America/New_York') as TZDate
        expect(date.timeZone).toBe('America/New_York')
    })
})

describe('tilLesbarDatoUtenAarstall', () => {
    it('returnerer riktig format for gyldig dato', () => {
        expect(tilLesbarDatoUtenAarstall('2025-12-02')).toBe('2. desember')
        expect(tilLesbarDatoUtenAarstall('2025-01-01')).toBe('1. januar')
    })
    it('returnerer tom streng for ugyldig dato', () => {
        expect(tilLesbarDatoUtenAarstall(undefined)).toBe('')
        expect(tilLesbarDatoUtenAarstall(null)).toBe('')
    })
})

describe('tilLesbarDatoMedArstall', () => {
    it('returnerer riktig format for gyldig dato', () => {
        expect(tilLesbarDatoMedArstall('2025-12-02')).toBe('2. desember 2025')
    })
    it('returnerer undefined for ugyldig dato', () => {
        expect(tilLesbarDatoMedArstall(undefined)).toBeUndefined()
    })
})

describe('tilLesbarPeriodeMedArstall', () => {
    it('returnerer riktig format for samme måned og år', () => {
        expect(tilLesbarPeriodeMedArstall('2025-12-01', '2025-12-02')).toBe('1. – 2. desember 2025')
    })
    it('returnerer riktig format for samme år, ulik måned', () => {
        expect(tilLesbarPeriodeMedArstall('2025-11-30', '2025-12-02')).toBe('30. november – 2. desember 2025')
    })
    it('returnerer riktig format for ulikt år', () => {
        expect(tilLesbarPeriodeMedArstall('2024-12-31', '2025-01-01')).toBe('31. desember 2024 – 1. januar 2025')
    })
})

describe('erHelg', () => {
    it('returnerer true for lørdag', () => {
        expect(erHelg(new Date(2025, 11, 6))).toBe(true)
    })
    it('returnerer true for søndag', () => {
        expect(erHelg(new Date(2025, 11, 7))).toBe(true)
    })
    it('returnerer false for hverdag', () => {
        expect(erHelg(new Date(2025, 11, 2))).toBe(false)
    })
})

describe('erWeekendPeriode', () => {
    it('returnerer true for periode kun med helgedager', () => {
        expect(erWeekendPeriode('2025-12-06', '2025-12-07')).toBe(true)
    })
    it('returnerer false for periode med hverdag', () => {
        expect(erWeekendPeriode('2025-12-05', '2025-12-07')).toBe(false)
    })
})

describe('fullDatoKlokkeslett', () => {
    it('returnerer riktig format', () => {
        expect(fullDatoKlokkeslett('2025-12-02T14:30:00')).toBe('2. desember 2025 kl. 14.30')
    })
})

describe('antallDager', () => {
    it('returnerer 1 for samme dag', () => {
        expect(antallDager('2025-12-02', '2025-12-02')).toBe(1)
    })

    it('teller antall dager inklusivt over flere dager', () => {
        expect(antallDager('2025-12-02', '2025-12-05')).toBe(4)
    })

    it('teller riktig over månedsskifte', () => {
        expect(antallDager('2025-01-30', '2025-02-02')).toBe(4)
    })
})
