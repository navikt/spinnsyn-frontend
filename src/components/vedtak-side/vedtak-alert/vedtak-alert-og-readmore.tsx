import React from 'react'

import { JulesoknadWarning } from '../julesoknad/julesoknad-warning'

import AnnullertInfo from './annullert-info'
import { RevurdertInfo } from './revurdert-info'
import { RevurderingInfo } from './revurdering-info'

type VedtakAlertProps = {
    julesoknad: boolean
    revurdert: boolean
    annullert: boolean
    nyesteRevurdering: boolean
}

export const VedtakAlertOgReadmore = ({ julesoknad, nyesteRevurdering, revurdert, annullert }: VedtakAlertProps) => {
    return (
        <div className="my-4">
            {julesoknad && <JulesoknadWarning />}
            {annullert ? <AnnullertInfo /> : revurdert ? <RevurdertInfo /> : null}
            {nyesteRevurdering && <RevurderingInfo />}
        </div>
    )
}
