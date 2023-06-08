import { Accordion, BodyLong, BodyShort, ExpansionCard, Heading } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Vis from '../../vis'
import BeregningInfo from '../utbetaling/accordion/beregning-info'
import InntektInfo from '../utbetaling/accordion/inntekt-info/inntekt-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
    heltAvvist: boolean
}

const AvvisteDager = ({ avvisteDager, vedtak, heltAvvist }: AvvisteDagerProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(arkivering)

    const harMinstEnForLavInntektDag =
        avvisteDager.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0

    const avvisteDagerTekst = avvisteDager.length === 1 ? ' sykepengedag' : ' sykepengedager'

    const onButtonClick = () => {
        setOpen(!open)
    }

    const graa = vedtak.annullert || vedtak.revurdert

    return (
        <ExpansionCard
            className="mt-4"
            data-cy="avviste-dager-card"
            aria-label="Avviste sykepengedager"
            defaultOpen={arkivering}
            style={
                {
                    '--ac-expansioncard-bg': graa ? 'var(--a-gray-100)' : 'var(--a-orange-100)',
                    '--ac-expansioncard-border-color': graa ? 'var(--a-gray-100)' : 'var(--a-orange-100)',
                } as React.CSSProperties
            }
        >
            <ExpansionCard.Header>
                <Heading level="2" size="large">
                    {avvisteDager.length + avvisteDagerTekst}
                    <BodyShort as="span" className="block">
                        {tekst('avviste.dager.dekkes.ikke')}
                    </BodyShort>
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyLong spacing>{tekst('avviste.dager.intro')}</BodyLong>

                <Vis hvis={heltAvvist && harMinstEnForLavInntektDag} render={() => <InntektInfo vedtak={vedtak} />} />

                <Accordion>
                    <Accordion.Item
                        open={open}
                        data-cy="avvistedageroversikt"
                        style={
                            {
                                '--ac-accordion-header-bg': open
                                    ? 'var(--a-surface-action-subtle)'
                                    : 'var(--a-surface-transparent)',
                                '--ac-accordion-header-bg-hover': open
                                    ? 'var(--a-surface-action-subtle)'
                                    : 'var(--a-surface-hover)',
                            } as React.CSSProperties
                        }
                    >
                        <Accordion.Header onClick={onButtonClick}>
                            <Heading size="small" level="3">
                                Dager NAV ikke utbetaler
                            </Heading>
                        </Accordion.Header>
                        <Accordion.Content className="bg-white p-0">
                            <DagTabell dager={avvisteDager} />

                            <DagBeskrivelse dager={avvisteDager} />
                        </Accordion.Content>
                    </Accordion.Item>

                    <Vis
                        hvis={heltAvvist && harMinstEnForLavInntektDag}
                        render={() => <BeregningInfo vedtak={vedtak} mottaker="refusjon" heltAvvist={heltAvvist} />}
                    />
                </Accordion>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default AvvisteDager
