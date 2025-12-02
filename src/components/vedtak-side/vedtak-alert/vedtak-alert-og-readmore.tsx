import { Alert, BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

import { JulesoknadWarning } from '../julesoknad/julesoknad-warning'
import { tekst } from '../../../utils/tekster'

import AnnullertInfo from './annullert-info'
import { RevurdertInfo } from './revurdert-info'

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
            {nyesteRevurdering && (
                <Alert variant="info" className="mt-4">
                    <BodyShort>{tekst('revurdert.alert.revurdert.nybeslutningtekst')}</BodyShort>
                    <Link href={tekst('revurdert.alert.link.url')}>
                        {tekst('revurdert.alert.revurdert.nybeslutninglenketekst')}
                    </Link>
                </Alert>
            )}
        </div>
    )
}
