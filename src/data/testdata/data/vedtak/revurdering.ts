import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kunDirekte } from './kunDirekte'

export const revurderingVedtak = jsonDeepCopy(kunDirekte)
revurderingVedtak.vedtak.utbetaling.utbetalingType = 'REVURDERING'
