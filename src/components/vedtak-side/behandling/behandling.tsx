import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const vedtaksDato = vedtak.vedtak.vedtakFattetTidspunkt

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

    const behandlingInfoTekst = () => {
        return (
            <>
                <Vis
                    hvis={vedtaksDato}
                    render={() => (
                        <>
                            {getLedetekst(tekst('behandling.dato-fattet'), {
                                '%DATO%': tilLesbarDatoMedArstall(
                                    dayjs(vedtaksDato).toDate()
                                ),
                            })}
                        </>
                    )}
                />
                {tekst(
                    annullertEllerRevurdert
                        ? 'behandling.opplysningene.preteritum'
                        : 'behandling.opplysningene.presens'
                )}
            </>
        )
    }

    return (
        <div className="behandling tekstinfo">
            <Heading size="small" level="2">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong spacing>
                {behandlingInfoTekst()}
                <LenkeMedAmplitude
                    url={tekst('behandling.lenke.url')}
                    tekst={tekst('behandling.lenke')}
                />
                {tekst('behandling.se-opplysningene')}
            </BodyLong>
        </div>
    )
}
