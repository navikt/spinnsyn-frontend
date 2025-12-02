import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kunDirekte } from './kunDirekte'

export const revurderingVedtak = jsonDeepCopy(kunDirekte)
revurderingVedtak.id = '348a5462-456a-4bfc-9b54-11cd77a9937g'
revurderingVedtak.vedtak.utbetaling.utbetalingType = 'REVURDERING'
