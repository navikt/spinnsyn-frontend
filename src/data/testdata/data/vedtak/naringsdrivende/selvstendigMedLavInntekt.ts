import { RSVedtakWrapper } from '../../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../../utils/json-deep-copy'

import { standardSelvstendig } from './standardSelvstendig'

export const selvstendigMedLavInntekt: RSVedtakWrapper = jsonDeepCopy(standardSelvstendig)

selvstendigMedLavInntekt.id = 'tilfeldig-uuid-selvstendig-lav-inntekt'
selvstendigMedLavInntekt.orgnavn = 'Wooley Socks ENK'
selvstendigMedLavInntekt.daglisteSykmeldt = jsonDeepCopy(standardSelvstendig.daglisteSykmeldt)
selvstendigMedLavInntekt.sykepengebelopSykmeldt = 14000

if (
    !selvstendigMedLavInntekt.vedtak.sykepengegrunnlagsfakta ||
    !('selvstendig' in selvstendigMedLavInntekt.vedtak.sykepengegrunnlagsfakta)
) {
    throw new Error('Mangler selvstendig grunnlagsfakta')
}

selvstendigMedLavInntekt.vedtak.sykepengegrunnlag = 240_000
selvstendigMedLavInntekt.vedtak.sykepengegrunnlagsfakta.selvstendig = {
    ...selvstendigMedLavInntekt.vedtak.sykepengegrunnlagsfakta.selvstendig,
    beregningsgrunnlag: 240_000,
    pensjonsgivendeInntekter: [
        { årstall: 2022, beløp: 260_000 },
        { årstall: 2021, beløp: 240_000 },
        { årstall: 2020, beløp: 220_000 },
    ],
}
