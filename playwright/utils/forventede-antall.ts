import { arbeidstakerPerson } from '../../src/data/testdata/data/personas/personas'

const arbeidstakerVedtak = arbeidstakerPerson.vedtak

export const FORVENTET_ANTALL_SYKMELDT_LENKER = arbeidstakerVedtak.length
export const FORVENTET_ANTALL_LESTE_VEDTAK = arbeidstakerVedtak.filter((vedtak) => vedtak.lest === true).length
export const FORVENTET_ANTALL_ULESTE_VEDTAK = FORVENTET_ANTALL_SYKMELDT_LENKER - FORVENTET_ANTALL_LESTE_VEDTAK
