import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { vedtakAnnullert } from './annullert'

export const revurdertOgAnnullertVedtak = jsonDeepCopy(vedtakAnnullert)
revurdertOgAnnullertVedtak.revurdert = true
revurdertOgAnnullertVedtak.annullert = true
