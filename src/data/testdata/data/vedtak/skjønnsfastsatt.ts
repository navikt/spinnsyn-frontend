import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kunDirekte } from './kunDirekte'
import { vedtakMedFlereArbeidsgivere } from './vedtakMedFlereArbeidsgivere'

export const skjønnsfastsattBrukerutbetaling = jsonDeepCopy(kunDirekte)
if (skjønnsfastsattBrukerutbetaling.vedtak.vedtakstype !== 'ARBEIDSTAKER') {
    throw new Error('Forventet at vedtakstype skulle være ARBEIDSTAKER')
}
skjønnsfastsattBrukerutbetaling.id = '6aa63aa6-a932-4ba4-b1b3-bc3722b0eb1e'
skjønnsfastsattBrukerutbetaling.vedtak.begrunnelser = [
    {
        begrunnelse:
            'Dette er en tekstlig begrunnelse fra saksbehandleren din. Jeg brukte skjønn og kom frem hva vi tror du ville tjent om et år gitt omstendigheter lorem ipsum hei og hå',
        type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
        perioder: [],
    },
    {
        begrunnelse:
            'Dette er en mal begrunnelse som kommer fra speil. Vi takler nye linjer.\n\n\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultrices ultrices, nunc nisl aliquam nunc, eget aliquet nis',
        type: 'SkjønnsfastsattSykepengegrunnlagMal',
        perioder: [],
    },
    {
        begrunnelse: 'Dette er konklusjonen fra speil. 200 000kr er et skjønnsfastsatt beløp.',
        type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
        perioder: [],
    },
]
const omregnetÅrsinntekt = skjønnsfastsattBrukerutbetaling.vedtak.inntekt! * 12
const skjønnsbelop = omregnetÅrsinntekt
const innrapportertÅrsinntekt = 350000

const diffInPercentage = (a: number, b: number) => {
    return Math.abs((a - b) / ((a + b) / 2)) * 100
}

skjønnsfastsattBrukerutbetaling.vedtak.sykepengegrunnlagsfakta = {
    fastsatt: 'EtterSkjønn',
    skjønnsfastsatt: skjønnsbelop,
    arbeidsgivere: [
        {
            arbeidsgiver: skjønnsfastsattBrukerutbetaling.vedtak.organisasjonsnummer!,
            omregnetÅrsinntekt: omregnetÅrsinntekt,
            skjønnsfastsatt: skjønnsbelop,
        },
    ],
    omregnetÅrsinntekt: omregnetÅrsinntekt,
    innrapportertÅrsinntekt: innrapportertÅrsinntekt,
    avviksprosent: diffInPercentage(omregnetÅrsinntekt, innrapportertÅrsinntekt),
    '6G': 668862.0,
    tags: ['6GBegrenset'],
}

export const skjønnsfastsattFlereArbeidsgivere = jsonDeepCopy(vedtakMedFlereArbeidsgivere)
skjønnsfastsattFlereArbeidsgivere.id = '6aa63aa6-a932-4ba4-b1b3-bc3722b0aaaa'
skjønnsfastsattFlereArbeidsgivere.vedtak.begrunnelser = jsonDeepCopy(
    skjønnsfastsattBrukerutbetaling.vedtak.begrunnelser,
)
skjønnsfastsattFlereArbeidsgivere.vedtak.sykepengegrunnlagsfakta =
    skjønnsfastsattBrukerutbetaling.vedtak.sykepengegrunnlagsfakta
skjønnsfastsattFlereArbeidsgivere.vedtak.begrunnelser[0].begrunnelse =
    'Begrunnelse fra saksbehandler ved flere arbeidsgivere'
