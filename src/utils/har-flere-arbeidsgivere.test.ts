import { expect } from '@jest/globals'

import { vedtakMed40Grad } from '../data/mock/data/rs-vedtak'
import { harFlereArbeidsgivere } from './har-flere-arbeidsgivere'
import { jsonDeepCopy } from './json-deep-copy'


describe('Tester estimering av sluttdato', () => {
    const testVedtak = vedtakMed40Grad

    it('Har en arbeidsgiver', () => {
        expect(harFlereArbeidsgivere(testVedtak)).toEqual('nei')
    })

    it('Har ikke data', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        kopiertVedtak.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver = undefined
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('vet_ikke')
    })

    it('Har tomt grunnlag', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        kopiertVedtak.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver = {}
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('vet_ikke')
    })

    it('Har flere arbeidsgivere grunnlag', () => {
        const kopiertVedtak = jsonDeepCopy(testVedtak)
        kopiertVedtak.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver = {
            '1234': 12,
            '1235': 12,
        }
        expect(harFlereArbeidsgivere(kopiertVedtak)).toEqual('ja')
    })
})
