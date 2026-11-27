import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'

import AnnullertInfo from './annullert-info'
import { RevurdertInfo } from './revurdert-info'
import { RevurderingInfo } from './revurdering-info'

enum VedtakAlertType {
    ANNULLERT = 'ANNULLERT',
    REVURDERT = 'REVURDERT',
    NYESTE_REVURDERING = 'NYESTE_REVURDERING',
}

export function getVedtakAlertTyper(
    revurdert: boolean,
    annullert: boolean,
    nyesteRevurdering: boolean,
): VedtakAlertType[] | null {
    const vedtakAlertTyper: VedtakAlertType[] = []

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
    alleVedtak: RSVedtakWrapper[]
    vedtak: RSVedtakWrapper
}

export const VedtakAlertOgReadmore = ({ vedtakAlertTyper, alleVedtak, vedtak }: VedtakAlertOgReadmoreProps) => {
    return (
        <>
            {vedtakAlertTyper.includes(VedtakAlertType.ANNULLERT) && <AnnullertInfo />}
            {vedtakAlertTyper.includes(VedtakAlertType.REVURDERT) && <RevurdertInfo />}
            {vedtakAlertTyper.includes(VedtakAlertType.NYESTE_REVURDERING) && (
                <RevurderingInfo vedtak={vedtak} alleVedtak={alleVedtak} />
            )}
        </>
    )
}
