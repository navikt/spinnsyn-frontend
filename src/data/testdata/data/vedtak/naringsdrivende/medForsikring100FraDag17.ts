import { RSVedtakWrapper } from '../../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../../utils/json-deep-copy'

import { medForsikring } from './medForsikring'

export const medForsikring100FraDag17: RSVedtakWrapper = jsonDeepCopy(medForsikring)

medForsikring100FraDag17.id = 'tilfeldig-uuid-med-forsikring-100-fra-dag-17'

if (!medForsikring100FraDag17.vedtak.forsikringsvurdering?.dekning) {
    throw new Error('Mangler forsikringsvurdering')
}

medForsikring100FraDag17.vedtak.forsikringsvurdering.individuellForsikringNavn =
    'Selvstendig næringsdrivende 100 % fra 17. dag'
medForsikring100FraDag17.vedtak.forsikringsvurdering.dekning.grad = 100
medForsikring100FraDag17.vedtak.forsikringsvurdering.dekning.fraDag = 17
