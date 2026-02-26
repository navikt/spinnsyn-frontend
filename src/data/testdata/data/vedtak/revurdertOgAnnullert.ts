import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { vedtakAnnullert } from './annullert'

export const revurdertOgAnnullertVedtak = jsonDeepCopy(vedtakAnnullert)
revurdertOgAnnullertVedtak.id = '9ae82dd2-dcf1-4c16-9e12-35cb6d634326'
revurdertOgAnnullertVedtak.revurdert = true
revurdertOgAnnullertVedtak.annullert = true
revurdertOgAnnullertVedtak.sykepengebelopArbeidsgiver = 0
revurdertOgAnnullertVedtak.sykepengebelopSykmeldt = 0
