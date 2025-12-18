import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { logger } from '@navikt/next-logger'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { RSVedtakFelles } from '../../../types/rs-types/rs-vedtak-felles'

type BehandlingProps = {
    vedtak: Pick<
        RSVedtakFelles,
        'utbetaling' | 'vedtakFattetTidspunkt' | 'yrkesaktivitetstype' | 'tags' | 'saksbehandler' | 'beslutter'
    >
}

export const Behandling = ({ vedtak }: BehandlingProps) => {
    const erAutomatiskBehandlet = vedtak.utbetaling.automatiskBehandling
    const vedtaksDato = vedtak.vedtakFattetTidspunkt
    const aordningDataErBrukt = vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

    const hentTittel = () => {
        if (erAutomatiskBehandlet) {
            return 'Søknaden ble behandlet automatisk'
        } else {
            return 'Søknaden ble behandlet manuelt'
        }
    }

    const getOpplysningText = () => {
        switch (vedtak.yrkesaktivitetstype) {
            case 'SELVSTENDIG':
                return 'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din og offentlige registre. '
            case 'ARBEIDSTAKER':
                if (aordningDataErBrukt) {
                    return 'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din og offentlige registre. '
                } else {
                    return 'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. '
                }
        }
    }

    const formattedDate = vedtaksDato ? tilLesbarDatoMedArstall(dayjs(vedtaksDato).toDate()) : null

    const behandlereTekst = () => {
        if (erAutomatiskBehandlet) {
            return '.'
        } else if (vedtak.beslutter && vedtak.saksbehandler) {
            return ` av ${vedtak.saksbehandler.navn} og ${vedtak.beslutter.navn}`
        } else if (vedtak.saksbehandler) {
            return ` av ${vedtak.saksbehandler.navn}`
        } else {
            logger.warn('Manuelt behandlet vedtak mangler saksbehandler/beslutter informasjon')
        }
    }

    return (
        <div className="mt-16">
            <Heading data-testid="behandling-header" size="small" level="2" spacing>
                {hentTittel()}
            </Heading>
            <BodyLong data-testid="behandling-body" spacing>
                {getOpplysningText()} {formattedDate && `Søknaden ble behandlet ${formattedDate}`}
                {behandlereTekst()} (Nav arbeid og ytelser – sykepenger).
            </BodyLong>
        </div>
    )
}
