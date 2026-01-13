import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kunDirekte } from './kunDirekte'

export const revurderingVedtak = jsonDeepCopy(kunDirekte)
revurderingVedtak.id = '348a5462-456a-4bfc-9b54-11cd77a9937g'
revurderingVedtak.vedtak.utbetaling.utbetalingType = 'REVURDERING'
revurderingVedtak.vedtak.dokumenter = [
    {
        dokumentId: 'soknad-som-ikke-finnes',
        type: 'Søknad',
    },
    {
        dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
        type: 'Sykmelding',
    },
    {
        dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
        type: 'Søknad',
    },
]
