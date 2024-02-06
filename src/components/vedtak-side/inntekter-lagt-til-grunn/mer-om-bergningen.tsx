import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../utils/tekster'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

export interface BeregningInfoProps {
    vedtak: RSVedtakWrapper
}

export const MerOmBergningen = ({ vedtak }: BeregningInfoProps) => {
    const isServer = useContext(ArkiveringContext)

    const harMinstEnForLavInntektDag =
        vedtak.dagerArbeidsgiver.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const erBegge = erDirekteutbetaling && erRefusjon
    const heltAvvist = !erDirekteutbetaling && !erRefusjon
    const sykepengegrunnlagInnholdKey = () => {
        if (vedtak.vedtak.begrensning === 'ER_IKKE_6G_BEGRENSET') {
            return 'utbetaling.sykepengegrunnlag.under6g.innhold'
        }
        return 'utbetaling.sykepengegrunnlag.over6g.innhold'
    }

    const totalbelopInnhold = () => {
        const tilSluttTekst = 'Til slutt summerer vi alle dagene.'
        const direkteTekst =
            'Når du får utbetalt sykepenger fra NAV viser totalbeløp beregnet sykepenger før skatt og eventuelle andre påleggstrekk.'
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
        <Accordion.Item data-cy="mer-om-beregningen" defaultOpen={isServer}>
            <Accordion.Header>Mer om beregningen</Accordion.Header>
            <Accordion.Content className="mt-4">
                <Heading spacing size="xsmall" level="3">
                    {tekst('utbetaling.mndlonn.tittel')}
                </Heading>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.mndlonn.innhold'))}</BodyLong>

                <Heading spacing size="xsmall" level="3">
                    {tekst('utbetaling.arslonn.tittel')}
                </Heading>
                <BodyLong spacing>
                    {parserWithReplace(tekst('utbetaling.arslonn.innhold.del1'))}
                    {harFlereArbeidsgivere(vedtak) == 'ja' && (
                        <>{parserWithReplace(tekst('utbetaling.arslonn.innhold.del2'))}</>
                    )}
                    {parserWithReplace(tekst('utbetaling.arslonn.innhold.del3'))}
                </BodyLong>

                <Heading spacing size="xsmall" level="3">
                    {tekst('utbetaling.sykepengegrunnlag.tittel')}
                </Heading>
                <BodyLong spacing>{parserWithReplace(tekst(sykepengegrunnlagInnholdKey()))}</BodyLong>

                {(!heltAvvist || !harMinstEnForLavInntektDag) && (
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
                        <Heading spacing size="xsmall" level="3">
                            {tekst('utbetaling.utbetalingsdager.tittel')}
                        </Heading>
                        <BodyLong spacing>{tekst('utbetaling.utbetalingsdager.innhold')}</BodyLong>
                        <BodyLong spacing>
                            {tekst('utbetaling.beregning.les.mer')}
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
