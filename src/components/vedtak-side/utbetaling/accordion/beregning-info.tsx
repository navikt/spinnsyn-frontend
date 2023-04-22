import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak'
import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../../utils/tekster'
import { ekspanderbarKlikk } from '../../../ekspanderbar/ekspander-utils'
import Vis from '../../../vis'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'

export interface BeregningInfoProps {
    vedtak: RSVedtakWrapper
    mottaker: 'person' | 'refusjon'
    heltAvvist?: boolean
}

const BeregningInfo = ({ vedtak, mottaker, heltAvvist }: BeregningInfoProps) => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)
    const accordionRef = useRef<HTMLDivElement>(null)

    const harMinstEnForLavInntektDag =
        vedtak.dagerArbeidsgiver.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0

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

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Mer om beregningen')
        setOpen(!open)
    }

    return (
        <Accordion.Item ref={accordionRef} open={open} data-cy={'mer-om-beregningen'}>
            <Accordion.Header onClick={onButtonClick}>
                <Heading size="small" level="3">
                    {tekst('utbetaling.beregning.tittel')}
                </Heading>
            </Accordion.Header>

            <Accordion.Content className={'bg-white'}>
                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.mndlonn.tittel')}
                </Heading>
                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.mndlonn.innhold'))}</BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.arslonn.tittel')}
                </Heading>
                <BodyLong spacing>
                    {parserWithReplace(tekst('utbetaling.arslonn.innhold.del1'))}
                    <Vis
                        hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                        render={() => <>{parserWithReplace(tekst('utbetaling.arslonn.innhold.del2'))}</>}
                    />
                </BodyLong>

                <Heading spacing size="xsmall" level="4">
                    {tekst('utbetaling.sykepengegrunnlag.tittel')}
                </Heading>
                <BodyLong spacing>{parserWithReplace(tekst(sykepengegrunnlagInnholdKey()))}</BodyLong>

                <BodyLong spacing>{parserWithReplace(tekst('utbetaling.sykepengegrunnlag.skjønn'))}</BodyLong>

                <Vis
                    hvis={!heltAvvist || !harMinstEnForLavInntektDag}
                    render={() => (
                        <>
                            <Heading spacing size="xsmall" level="4">
                                {tekst('utbetaling.dagligbelop.tittel')}
                            </Heading>
                            <BodyLong spacing>{tekst('utbetaling.dagligbelop.innhold')}</BodyLong>

                            <Heading spacing size="xsmall" level="4">
                                {tekst('utbetaling.totalbelop.tittel')}
                            </Heading>
                            <BodyLong spacing className="totalbelop">
                                {tekst(totalbelopInnholdKey())}
                            </BodyLong>

                            <Vis
                                hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                                render={() => (
                                    <>
                                        <Heading spacing size="xsmall" level="4">
                                            {tekst('utbetaling.flere-arbeidsforhold.tittel')}
                                        </Heading>
                                        <BodyLong spacing>{tekst('utbetaling.flere-arbeidsforhold.innhold')}</BodyLong>
                                    </>
                                )}
                            />

                            <Heading spacing size="xsmall" level="4">
                                {tekst('utbetaling.utbetalingsdager.tittel')}
                            </Heading>
                            <BodyLong spacing>{tekst('utbetaling.utbetalingsdager.innhold')}</BodyLong>

                            <BodyLong spacing>
                                {tekst('utbetaling.beregning.les.mer')}
                                <Link href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                                    {tekst('utbetaling.beregning.lenke.tekst')}
                                </Link>
                            </BodyLong>

                            <Heading spacing size="xsmall" level="4">
                                {tekst('utbetaling.info.tittel')}
                            </Heading>
                            <BodyLong spacing>{parserWithReplace(tekst('utbetaling.info.innhold'))}</BodyLong>
                        </>
                    )}
                />
            </Accordion.Content>
        </Accordion.Item>
    )
}

export default BeregningInfo
