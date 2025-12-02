import { describe, it, expect } from 'vitest'

import {
    tilLesbarDatoUtenAarstall,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    erHelg,
    erWeekendPeriode,
    fullDatoKlokkeslett,
} from './dato-utils'

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
        expect(erHelg(new Date('2025-12-06'))).toBe(true)
    })
    it('returnerer true for søndag', () => {
        expect(erHelg(new Date('2025-12-07'))).toBe(true)
    })
    it('returnerer false for hverdag', () => {
        expect(erHelg(new Date('2025-12-02'))).toBe(false)
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
