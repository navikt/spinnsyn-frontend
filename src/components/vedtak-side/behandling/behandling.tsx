import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const vedtaksDato = vedtak.vedtak.vedtakFattetTidspunkt
    const inntektFraAOrdningLagtTilGrunn = vedtak.vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

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

    const behandlingOpplysningstekst = () => {
        if (inntektFraAOrdningLagtTilGrunn) {
            return annullertEllerRevurdert
                ? 'behandling.opplysningene.aordning.preteritum'
                : 'behandling.opplysningene.aordning.presens'
        } else {
            return annullertEllerRevurdert ? 'behandling.opplysningene.preteritum' : 'behandling.opplysningene.presens'
        }
    }

    const behandlingInfoTekst = () => {
        return (
            <>
                {vedtaksDato && (
                    <>
                        {getLedetekst(tekst('behandling.dato-fattet'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(vedtaksDato).toDate()),
                        })}
                    </>
                )}
                {tekst(behandlingOpplysningstekst())}
            </>
        )
    }

    return (
        <>
            <Heading data-testid="behandling-header" size="small" level="2" className="mt-4">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong data-testid="behandling-body" spacing>
                {behandlingInfoTekst()}
            </BodyLong>
        </>
    )
}
