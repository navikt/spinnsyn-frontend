import { RSVedtakWrapper } from '../../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../../utils/json-deep-copy'

import { medForsikring } from './medForsikring'

export const medForsikring80FraDag1: RSVedtakWrapper = jsonDeepCopy(medForsikring)

medForsikring80FraDag1.id = 'tilfeldig-uuid-med-forsikring-80-fra-dag-1'

if (!medForsikring80FraDag1.vedtak.forsikringsvurdering?.dekning) {
    throw new Error('Mangler forsikringsvurdering')
}

medForsikring80FraDag1.vedtak.forsikringsvurdering.individuellForsikringNavn =
    'Selvstendig næringsdrivende 80 % fra 1. dag'
medForsikring80FraDag1.vedtak.forsikringsvurdering.dekning.grad = 80
medForsikring80FraDag1.vedtak.forsikringsvurdering.dekning.fraDag = 1
