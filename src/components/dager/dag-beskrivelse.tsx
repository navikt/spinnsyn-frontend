import { BodyShort, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import DagLabel from './dag-label'

interface DagBeskrivelseProps {
    dager: RSDag[]
}

const DagBeskrivelse = ({ dager }: DagBeskrivelseProps) => {

    const lovhjemmel = (dag: RSDag) => {
        if (dag.begrunnelser.length > 0) {
            return parser(tekst(`utbetaling.tabell.avvist.lovhjemmel.${dag.begrunnelser?.[ 0 ]}` as any))
        }
        if ( dag.dagtype == 'ForeldetDag' || dag.dagtype == 'Feriedag' || dag.dagtype == 'Permisjonsdag') {
            return parser(tekst(`utbetaling.tabell.avvist.lovhjemmel.${dag.dagtype}` as any))
        }
        else return ''
    }

    const lagBeskrivelseForUnikDag = (dag: RSDag) => {
        const lovhjemmelTekst = lovhjemmel(dag)

        return (
            <>
                <Vis hvis={dag.dagtype !== 'AvvistDag'}
                    render={() =>
                        <BodyShort spacing size="small">
                            {tekst(`utbetaling.tabell.label.${dag.dagtype}` as any)}
                        </BodyShort>
                    }
                />

                <Vis hvis={dag.dagtype === 'AvvistDag'}
                    render={() =>
                        <BodyShort spacing  size="small">
                            {parser(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[0]}` as any))}
                        </BodyShort>
                    }
                />

                <Vis hvis={lovhjemmelTekst !== ''}
                    render={() =>
                        <BodyShort spacing size="small" className={'avvist-lovhjemmel'}>
                            {lovhjemmelTekst}
                        </BodyShort>
                    }
                />
            </>
        )
    }

    const unikeDager = (): RSDag[] => {
        const unikeDagtyper = dager.reduce((list: RSDag[], dag) => {
            if (dag.dagtype !== 'AvvistDag' && !list.find((d: RSDag) => d.dagtype === dag.dagtype)) {
                list.push(dag)
            }
            return list
        }, [])

        const unikeBegrunnelser = dager.reduce((list: RSDag[], dag) => {
            if (dag.dagtype === 'AvvistDag') {
                dag.begrunnelser?.forEach((begrunnelse: RSBegrunnelse) => {
                    if (!list.find((d: RSDag) => d.begrunnelser?.includes(begrunnelse))) {
                        list.push({
                            dato: dag.dato,
                            belop: dag.belop,
                            dagtype: dag.dagtype,
                            grad: dag.grad,
                            begrunnelser: [ begrunnelse ]
                        } as RSDag)
                    }
                })
            }
            return list
        }, [])

        return [ ...unikeDagtyper, ...unikeBegrunnelser ] as RSDag[]
    }

    return (
        <div className="tekstinfo">
            <Heading spacing size="xsmall" level="4">
                {tekst('utbetaling.tabell.dagtyper')}
            </Heading>

            {unikeDager().map((dag, idx) =>
                <>
                    <DagLabel dag={dag} />
                    {lagBeskrivelseForUnikDag(dag)}
                </>
            )}
        </div>
    )
}

export default DagBeskrivelse
