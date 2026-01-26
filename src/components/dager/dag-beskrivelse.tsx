import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSBegrunnelse, RSUtbetalingdag } from '../../types/rs-types/rs-vedtak-felles'
import { tekst } from '../../utils/tekster'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

import DagLabel from './dag-label'

interface DagBeskrivelseProps {
    dager: RSUtbetalingdag[]
}

const DagBeskrivelse = ({ dager }: DagBeskrivelseProps) => {
    const erAvvistEllerAndreYtelser = (dag: RSUtbetalingdag) => {
        return dag.type === 'AvvistDag' || dag.type === 'AndreYtelser'
    }

    const lagBeskrivelseForUnikDag = (dag: RSUtbetalingdag) => {
        return (
            <div className="pt-1">
                <BodyShort>
                    {!erAvvistEllerAndreYtelser(dag)
                        ? parserWithReplace(tekst(`utbetaling.tabell.label.${dag.type}` as any))
                        : parserWithReplace(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[0]}`))}
                </BodyShort>
            </div>
        )
    }

    const unikeDager = (): RSUtbetalingdag[] => {
        const uniketyper = dager.reduce((list: RSUtbetalingdag[], dag) => {
            if (dag.type === 'NavDagDelvisSyk' || dag.type === 'NavDag') {
                dag.type = 'NavDag'
            }
            if (!erAvvistEllerAndreYtelser(dag) && !list.find((d: RSUtbetalingdag) => d.type === dag.type)) {
                list.push(dag)
            }
            return list
        }, [])

        const unikeBegrunnelser = dager.reduce((list: RSUtbetalingdag[], dag) => {
            if (erAvvistEllerAndreYtelser(dag)) {
                dag.begrunnelser?.forEach((begrunnelse: RSBegrunnelse) => {
                    if (!list.find((d: RSUtbetalingdag) => d.begrunnelser?.includes(begrunnelse))) {
                        list.push({
                            ...dag,
                            begrunnelser: [begrunnelse],
                        } as RSUtbetalingdag)
                    }
                })
            }
            return list
        }, [])

        return [...uniketyper, ...unikeBegrunnelser] as RSUtbetalingdag[]
    }

    return (
        <div className="p-3" data-testid="dagtabell-forklaring">
            <Heading size="xsmall" spacing level="4">
                {tekst('utbetaling.tabell.dagtyper')}
            </Heading>

            {unikeDager().map((dag, idx) => (
                <div key={idx} className="pb-4">
                    <h5>
                        <DagLabel dag={dag} />
                    </h5>
                    {lagBeskrivelseForUnikDag(dag)}
                </div>
            ))}
        </div>
    )
}

export default DagBeskrivelse
