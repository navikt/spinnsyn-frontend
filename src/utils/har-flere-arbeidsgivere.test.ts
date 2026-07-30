import { describe, it, expect } from 'vitest'

import { vedtakMed40Grad } from '../data/testdata/data/vedtak/gradert40'
import { RSVedtakArbeidstaker } from '../types/rs-types/rs-vedtak-felles'

import { harFlereArbeidsgivere } from './har-flere-arbeidsgivere'
import { jsonDeepCopy } from './json-deep-copy'

describe('Tester har flere arbeidsgivere', () => {
    const testVedtak = vedtakMed40Grad

    it('Har en arbeidsgiver', () => {
        expect(harFlereArbeidsgivere(testVedtak)).toEqual('nei')
    })

    it('Har ikke data', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        const vedtak = kopiertVedtak.vedtak as RSVedtakArbeidstaker
        delete vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('vet_ikke')
    })

    it('Har tomt grunnlag', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        const vedtak = kopiertVedtak.vedtak as RSVedtakArbeidstaker
        vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver = {}
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('vet_ikke')
    })

    it('Har flere arbeidsgivere grunnlag', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        const vedtak = kopiertVedtak.vedtak as RSVedtakArbeidstaker
        vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver = {
            '1234': 12,
            '1235': 12,
        }
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('ja')
    })
})
