import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak-felles'
import { tekst } from '../../utils/tekster'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

import DagLabel from './dag-label'

interface DagBeskrivelseProps {
    dager: RSDag[]
}

const DagBeskrivelse = ({ dager }: DagBeskrivelseProps) => {
    const erAvvistEllerAndreYtelser = (dag: RSDag) => {
        return dag.dagtype === 'AvvistDag' || dag.dagtype === 'AndreYtelser'
    }

    const lagBeskrivelseForUnikDag = (dag: RSDag) => {
        return (
            <div className="pt-1">
                <BodyShort>
                    {!erAvvistEllerAndreYtelser(dag)
                        ? parserWithReplace(tekst(`utbetaling.tabell.label.${dag.dagtype}` as any))
                        : parserWithReplace(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[0]}`))}
                </BodyShort>
            </div>
        )
    }

    const unikeDager = (): RSDag[] => {
        const unikeDagtyper = dager.reduce((list: RSDag[], dag) => {
            if (dag.dagtype === 'NavDagDelvisSyk') {
                dag.dagtype = 'NavDagSyk'
            }
            if (!erAvvistEllerAndreYtelser(dag) && !list.find((d: RSDag) => d.dagtype === dag.dagtype)) {
                list.push(dag)
            }
            return list
        }, [])

        const unikeBegrunnelser = dager.reduce((list: RSDag[], dag) => {
            if (erAvvistEllerAndreYtelser(dag)) {
                dag.begrunnelser?.forEach((begrunnelse: RSBegrunnelse) => {
                    if (!list.find((d: RSDag) => d.begrunnelser?.includes(begrunnelse))) {
                        list.push({
                            dato: dag.dato,
                            belop: dag.belop,
                            dagtype: dag.dagtype,
                            grad: dag.grad,
                            begrunnelser: [begrunnelse],
                        } as RSDag)
                    }
                })
            }
            return list
        }, [])

        return [...unikeDagtyper, ...unikeBegrunnelser] as RSDag[]
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
