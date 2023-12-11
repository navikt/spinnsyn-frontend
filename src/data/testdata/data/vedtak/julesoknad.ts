import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kunDirekte } from './rs-vedtak'

export const julesoknadVedtak = jsonDeepCopy(kunDirekte)
julesoknadVedtak.opprettetTimestamp = '2023-12-10T12:00:00.000000'
julesoknadVedtak.vedtak.fom = '2023-12-01'
julesoknadVedtak.vedtak.tom = '2023-12-24'
