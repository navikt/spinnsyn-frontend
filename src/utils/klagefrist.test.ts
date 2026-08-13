import { describe, it, expect } from 'vitest'

import { klagefrist } from './klagefrist'

describe('Tester klagefrister', () => {
    it('Torsdag 16 juni før kl 14 blir tordag om 6 uker', () => {
        expect(klagefrist('2022-06-16T11:58:00.00Z')).toEqual('28. juli 2022')
        expect(klagefrist('2022-06-16T13:58:00.000+02:00')).toEqual('28. juli 2022')
    })

    it('Torsdag 16 juni etter kl 14 blir fredag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-16T12:02:00.00Z')).toEqual('29. juli 2022')
        expect(klagefrist('2022-06-16T14:02:00.000+02:00')).toEqual('29. juli 2022')
    })

    it('Fredag 17 juni før kl 14 blir fredag om 6 uker', () => {
        expect(klagefrist('2022-06-17T11:58:00.00Z')).toEqual('29. juli 2022')
        expect(klagefrist('2022-06-17T13:58:00.000+02:00')).toEqual('29. juli 2022')
    })

    it('Fredag 17 juni etter kl 14 blir mandag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-17T12:02:00.00Z')).toEqual('1. august 2022')
        expect(klagefrist('2022-06-17T14:02:00.000+02:00')).toEqual('1. august 2022')
    })

    it('Lørdag 18 juni før kl 14 blir mandag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-18T11:58:00.00Z')).toEqual('1. august 2022')
        expect(klagefrist('2022-06-18T13:58:00.000+02:00')).toEqual('1. august 2022')
    })

    it('Lørdag 18 juni etter kl 14 blir mandag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-18T12:02:00.00Z')).toEqual('1. august 2022')
        expect(klagefrist('2022-06-18T14:02:00.000+02:00')).toEqual('1. august 2022')
    })

    it('Søndag 19 juni før kl 14 blir mandag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-19T11:58:00.00Z')).toEqual('1. august 2022')
        expect(klagefrist('2022-06-19T13:58:00.000+02:00')).toEqual('1. august 2022')
    })

    it('Søndag 19 juni etter kl 14 blir mandag om litt mer enn 6 uker', () => {
        expect(klagefrist('2022-06-19T12:02:00.00Z')).toEqual('1. august 2022')
        expect(klagefrist('2022-06-19T14:02:00.000+02:00')).toEqual('1. august 2022')
    })
})

describe('UTC i input kan endre frist', () => {
    it('setter frist til 27. mai 2026 når opprettet er 2026-04-15T11:08:00Z (13:08 i Oslo)', () => {
        expect(klagefrist('2026-04-15T11:08:00.000Z')).toEqual('27. mai 2026')
    })

    it('setter frist til 28. mai 2026 når opprettet er 2026-04-15T12:30:00Z (14:30 i Oslo)', () => {
        expect(klagefrist('2026-04-15T12:30:00.000Z')).toEqual('28. mai 2026')
    })

    it('setter frist til 27. mai 2026 når samme klokkeslett er 2026-04-15T12:30:00+02:00 (12:30 i Oslo)', () => {
        expect(klagefrist('2026-04-15T12:30:00.000+02:00')).toEqual('27. mai 2026')
    })
})
