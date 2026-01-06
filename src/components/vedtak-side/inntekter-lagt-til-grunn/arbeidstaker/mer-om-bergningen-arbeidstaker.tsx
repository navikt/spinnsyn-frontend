import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSVedtakWrapperUtvidet } from '../../../../types/rs-types/rs-vedtak-felles'
import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../../utils/tekster'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { logEvent } from '../../../umami/umami'
import { useAccordionHashNavigasjon } from '../../../../hooks/useAccordionHashNavigasjon'

export interface BeregningInfoProps {
    vedtak: RSVedtakWrapperUtvidet
    setParentApne?: (apne: boolean) => void
}

export const MerOmBergningenArbeidstaker = ({ vedtak, setParentApne }: BeregningInfoProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)
    useAccordionHashNavigasjon('mer-om-beregningen', visBeregning, setVisBeregning, setParentApne)

    const harMinstEnForLavInntektDagerArbeidsgiver =
        vedtak.dagerArbeidsgiver.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0 && !arkivering
    const harMinstEnForLavInntektDagerPerson =
        vedtak.dagerPerson.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0 && !arkivering
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const erBegge = erDirekteutbetaling && erRefusjon
    const heltAvvist = !erDirekteutbetaling && !erRefusjon
    const erIkke6GBegrenset = vedtak.vedtak.begrensning === 'ER_IKKE_6G_BEGRENSET'

    const totalbelopInnhold = () => {
        const tilSluttTekst = 'Til slutt summerer vi alle dagene.'
        const direkteTekst =
            'Når du får utbetalt sykepenger fra Nav viser totalbeløp beregnet sykepenger før skatt og eventuelle andre påleggstrekk.'
        const refusjonTekst =
            'Når du får utbetalt sykepenger fra arbeidsgiveren din, er det trukket skatt og eventuelt andre faste trekk fra dette beløpet.'
        if (erBegge) {
            return `${tilSluttTekst} ${direkteTekst} ${refusjonTekst}`
        }
        if (erDirekteutbetaling) {
            return `${tilSluttTekst} ${direkteTekst}`
        }
        return `${tilSluttTekst} ${refusjonTekst}`
    }

    return (
        <Accordion.Item
            id="mer-om-beregningen"
            data-testid="mer-om-beregningen"
            defaultOpen={arkivering}
            open={visBeregning}
            onOpenChange={(isOpen) => {
                logEvent(isOpen ? 'accordion åpnet' : 'accordion lukket', {
                    tittel: 'Mer om beregningen (arbeidstaker)',
                    component: 'InntekterLagtTilGrunnArbeidstaker',
                })
                setVisBeregning(isOpen)
            }}
        >
            <Accordion.Header>Mer om beregningen</Accordion.Header>
            <Accordion.Content className="mt-4">
                <Heading spacing size="xsmall" level="3" tabIndex={-1}>
                    {tekst('utbetaling.mndlonn.tittel')}
                </Heading>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.mndlonn.innhold.del1'))}</BodyLong>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.mndlonn.innhold.del2'))}</BodyLong>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.mndlonn.innhold.del3'))}</BodyLong>

                <Heading spacing size="xsmall" level="3">
                    {tekst('utbetaling.arslonn.tittel')}
                </Heading>
                <BodyLong spacing>
                    {parserWithReplace(tekst('utbetaling.arslonn.innhold.del1'))}
                    {harFlereArbeidsgivere(vedtak) == 'ja' && (
                        <>{parserWithReplace(tekst('utbetaling.arslonn.innhold.del2'))}</>
                    )}
                </BodyLong>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.arslonn.innhold.del3'))}</BodyLong>

                <Heading spacing size="xsmall" level="3">
                    {tekst('utbetaling.sykepengegrunnlag.tittel')}
                </Heading>
                {erIkke6GBegrenset ? (
                    <BodyLong spacing>
                        {parserWithReplace(tekst('utbetaling.sykepengegrunnlag.under6g.innhold'))}
                    </BodyLong>
                ) : (
                    <>
                        <BodyLong spacing>
                            {parserWithReplace(tekst('utbetaling.sykepengegrunnlag.over6g.innhold.del1'))}
                        </BodyLong>
                        <BodyLong spacing>
                            {parserWithReplace(tekst('utbetaling.sykepengegrunnlag.over6g.innhold.del2'))}
                        </BodyLong>
                    </>
                )}

                {(!heltAvvist || !(harMinstEnForLavInntektDagerArbeidsgiver || harMinstEnForLavInntektDagerPerson)) && (
                    <>
                        <Heading spacing size="xsmall" level="3">
                            {tekst('utbetaling.dagligbelop.tittel')}
                        </Heading>
                        <BodyLong spacing>{tekst('utbetaling.dagligbelop.innhold')}</BodyLong>
                        <Heading spacing size="xsmall" level="3">
                            {tekst('utbetaling.totalbelop.tittel')}
                        </Heading>
                        <BodyLong spacing>{totalbelopInnhold()}</BodyLong>

                        {harFlereArbeidsgivere(vedtak) == 'ja' && (
                            <>
                                <Heading spacing size="xsmall" level="3">
                                    {tekst('utbetaling.flere-arbeidsforhold.tittel')}
                                </Heading>
                                <BodyLong spacing>{tekst('utbetaling.flere-arbeidsforhold.innhold')}</BodyLong>
                            </>
                        )}

                        <Heading id="utbetalingsdager" spacing size="xsmall" level="3" tabIndex={-1}>
                            Utbetalingsdager
                        </Heading>
                        <BodyLong spacing>
                            Nav betaler sykepenger for dager mandag til fredag og helligdager. Er du sykmeldt i en
                            periode som inkluderer lørdag og søndag, får du sykepenger for disse dagene også, men de
                            blir fordelt på ukedagene i utregningen. Hvis du kun har vært sykmeldt en lørdag og/eller
                            søndag, får du ikke sykepenger for disse dagene.
                        </BodyLong>
                        <BodyLong spacing>
                            Du kan lese mer om hvordan sykepengene beregnes i{' '}
                            <Link href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                                {tekst('utbetaling.beregning.lenke.tekst')}
                            </Link>
                        </BodyLong>
                        {erDirekteutbetaling && (
                            <>
                                <Heading spacing size="xsmall" level="3">
                                    {tekst('utbetaling.info.tittel')}
                                </Heading>
                                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.info.innhold'))}</BodyLong>
                            </>
                        )}
                    </>
                )}
            </Accordion.Content>
        </Accordion.Item>
    )
}
