import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

export interface BeregningInfoProps {
    vedtak: RSVedtakWrapper;
    mottaker: 'person' | 'refusjon'
}

const BeregningInfo = ({ vedtak, mottaker }: BeregningInfoProps) => {
    const [ open, setOpen ] = useState<boolean>(false)

    const sykepengegrunnlagInnholdKey = () => {
        if (vedtak.vedtak.begrensning === 'ER_IKKE_6G_BEGRENSET') {
            return 'utbetaling.sykepengegrunnlag.under6g.innhold'
        }
        return 'utbetaling.sykepengegrunnlag.over6g.innhold'
    }

    const totalbelopInnholdKey = () => {
        if (mottaker == 'person') {
            return 'utbetaling.person.totalbelop.innhold'
        }
        return 'utbetaling.totalbelop.innhold'
    }

    return (
        <Accordion.Item open={open} className="beregning">
            <Accordion.Header onClick={() => setOpen(!open)}>
                {tekst('utbetaling.beregning.tittel')}
            </Accordion.Header>

            <Accordion.Content className="tekstinfo ">
                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.mndlonn.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {parser(tekst('utbetaling.mndlonn.innhold'))}
                </BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.arslonn.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {parser(tekst('utbetaling.arslonn.innhold.del1'))}
                    <Vis hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                        render={() =>
                            <>{parser(tekst('utbetaling.arslonn.innhold.del2'))}</>
                        }
                    />
                </BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.sykepengegrunnlag.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {parser(tekst(sykepengegrunnlagInnholdKey()))}
                </BodyLong>

                <BodyLong spacing size="small">
                    {parser(tekst('utbetaling.sykepengegrunnlag.skjønn'))}
                </BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.dagligbelop.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {tekst('utbetaling.dagligbelop.innhold')}
                </BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.totalbelop.tittel')}
                </Heading>
                <BodyLong spacing size="small" className="totalbelop">
                    {tekst(totalbelopInnholdKey())}
                </BodyLong>

                <Vis hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                    render={() => <>
                        <Heading spacing size="xsmall" level="4">
                            {tekst('utbetaling.flere-arbeidsforhold.tittel')}
                        </Heading>
                        <BodyLong spacing size="small">
                            {tekst('utbetaling.flere-arbeidsforhold.innhold')}
                        </BodyLong>
                    </>
                    }
                />

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.utbetalingsdager.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {tekst('utbetaling.utbetalingsdager.innhold')}
                </BodyLong>

                <BodyLong spacing size="small">
                    {tekst('utbetaling.beregning.les.mer')}
                    <Link href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                        {tekst('utbetaling.beregning.lenke.tekst')}
                    </Link>
                </BodyLong>

                <Heading spacing size="xsmall" level="4" className="blokkinfo__avsnitt">
                    {tekst('utbetaling.info.tittel')}
                </Heading>
                <BodyLong spacing size="small">
                    {parser(tekst('utbetaling.info.innhold'))}
                </BodyLong>
            </Accordion.Content>
        </Accordion.Item>
    )
}

export default BeregningInfo
