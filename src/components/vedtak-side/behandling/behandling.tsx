import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst,tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const tittelNokkel = () => {
        if (annullertEllerRevurdert) {
            if (automatisk) {
                return 'behandling.automatisk.tittel.preteritum'
            }
            return 'behandling.manuell.tittel.preteritum'
        } else {
            if (automatisk) {
                return 'behandling.automatisk.tittel.presens'
            }
            return 'behandling.manuell.tittel.presens'
        }
    }

    return (
        <div className="behandling tekstinfo">
            <Heading size="small" level="2">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong spacing>
                {getLedetekst(tekst(annullertEllerRevurdert
                    ? 'behandling.opplysningene.preteritum'
                    : 'behandling.opplysningene.presens'
                ), {
                    '%DATO%': tilLesbarDatoMedArstall(dayjs(vedtak.vedtak.vedtakFattetTidspunkt).toDate())
                })}
                <LenkeMedAmplitude url={tekst('behandling.lenke.url')} tekst={tekst('behandling.lenke')} />
                {tekst('behandling.se-opplysningene')}
            </BodyLong>
        </div>
    )
}
