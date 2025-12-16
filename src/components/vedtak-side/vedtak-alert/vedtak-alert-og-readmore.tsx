import React from 'react'

import { JulesoknadWarning } from '../julesoknad/julesoknad-warning'
import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak-felles'

import AnnullertInfo from './annullert-info'
import { RevurdertInfo } from './revurdert-info'
import { RevurderingInfo } from './revurdering-info'

enum VedtakAlertType {
    ANNULLERT = 'ANNULLERT',
    REVURDERT = 'REVURDERT',
    NYESTE_REVURDERING = 'NYESTE_REVURDERING',
    JULESOKNAD = 'JULESOKNAD',
}

export function getVedtakAlertTyper(
    julesoknad: boolean,
    revurdert: boolean,
    annullert: boolean,
    nyesteRevurdering: boolean,
): VedtakAlertType[] | null {
    const vedtakAlertTyper: VedtakAlertType[] = []

    if (julesoknad) {
        vedtakAlertTyper.push(VedtakAlertType.JULESOKNAD)
    }
    if (annullert) {
        vedtakAlertTyper.push(VedtakAlertType.ANNULLERT)
    } else if (revurdert) {
        vedtakAlertTyper.push(VedtakAlertType.REVURDERT)
    } else if (nyesteRevurdering) {
        vedtakAlertTyper.push(VedtakAlertType.NYESTE_REVURDERING)
    }

    return vedtakAlertTyper.length > 0 ? vedtakAlertTyper : null
}

type VedtakAlertOgReadmoreProps = {
    vedtakAlertTyper: VedtakAlertType[]
    alleVedtak: RSVedtakWrapperUtvidet[]
    vedtak: RSVedtakWrapperUtvidet
}

export const VedtakAlertOgReadmore = ({ vedtakAlertTyper, alleVedtak, vedtak }: VedtakAlertOgReadmoreProps) => {
    return (
        <>
            {vedtakAlertTyper.includes(VedtakAlertType.JULESOKNAD) && <JulesoknadWarning />}
            {vedtakAlertTyper.includes(VedtakAlertType.ANNULLERT) && <AnnullertInfo />}
            {vedtakAlertTyper.includes(VedtakAlertType.REVURDERT) && <RevurdertInfo />}
            {vedtakAlertTyper.includes(VedtakAlertType.NYESTE_REVURDERING) && (
                <RevurderingInfo vedtak={vedtak} alleVedtak={alleVedtak} />
            )}
        </>
    )
}
