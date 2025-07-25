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
  const inntektFraAOrdningLagtTilGrunn =
    vedtak.vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

  const erFortid = annullertEllerRevurdert
  const erAutomatiskBehandlet = automatisk
  const aordningDataErBrukt = inntektFraAOrdningLagtTilGrunn

  const hentTittel = () => {
      if (erAutomatiskBehandlet) {
        return 'Søknaden ble behandlet automatisk'
      } else {
        return 'Søknaden ble behandlet av en saksbehandler'
      }
  }

  const getOpplysningText = () => {
    if (aordningDataErBrukt) {
        return 'Opplysningene ble hentet fra søknaden din og offentlige registre. '
    } else {
        return 'Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. '
      }
    }
  

  const formattedDate = vedtaksDato
    ? tilLesbarDatoMedArstall(dayjs(vedtaksDato).toDate())
    : null

  return (
    <>
      <Heading
        data-testid="behandling-header"
        size="small"
        level="2"
        className="mt-4"
      >
        {hentTittel()}
      </Heading>
      <BodyLong data-testid="behandling-body" spacing>
        {formattedDate && `Vi fattet vedtaket ${formattedDate}. `}
        {getOpplysningText()}
      </BodyLong>
    </>
  )
}