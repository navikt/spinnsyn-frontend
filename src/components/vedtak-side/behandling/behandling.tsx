import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { RSVedtakFelles } from '../../../types/rs-types/rs-vedtak-felles'

type BehandlingProps = {
    vedtak: Pick<RSVedtakFelles, 'utbetaling' | 'vedtakFattetTidspunkt' | 'yrkesaktivitetstype' | 'tags'>
}

export const Behandling = ({ vedtak }: BehandlingProps) => {
    const erAutomatiskBehandlet = vedtak.utbetaling.automatiskBehandling
    const vedtaksDato = vedtak.vedtakFattetTidspunkt
    const aordningDataErBrukt = vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

    const hentTittel = () => {
        if (erAutomatiskBehandlet) {
            return 'Søknaden ble behandlet automatisk'
        } else {
            return 'Søknaden ble behandlet av en saksbehandler'
        }
    }

    const getOpplysningText = () => {
        switch (vedtak.yrkesaktivitetstype) {
            case 'SELVSTENDIG':
                return 'Opplysningene ble hentet fra søknaden din og offentlige registre. '
            case 'ARBEIDSTAKER':
                if (aordningDataErBrukt) {
                    return 'Opplysningene ble hentet fra søknaden din og offentlige registre. '
                } else {
                    return 'Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. '
                }
        }
    }

    const formattedDate = vedtaksDato ? tilLesbarDatoMedArstall(dayjs(vedtaksDato).toDate()) : null

    return (
        <>
            <Heading data-testid="behandling-header" size="small" level="2" className="mt-4">
                {hentTittel()}
            </Heading>
            <BodyLong data-testid="behandling-body" spacing>
                {formattedDate && `Vi fattet vedtaket ${formattedDate}. `}
                {getOpplysningText()}{' '}
                <LenkeMedAmplitude url="https://innboks.nav.no/s/skriv-til-oss?category=Helse" tekst="Kontakt oss" /> om
                du ønsker å se opplysningene.
            </BodyLong>
        </>
    )
}
