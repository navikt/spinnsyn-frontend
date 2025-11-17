import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak-felles'
import { tekst } from '../../utils/tekster'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

import DagLabel from './dag-label'
import { dataCyBeskrivelse } from './dag-data-cy-util'

interface DagBeskrivelseProps {
    dager: RSDag[]
}

const DagBeskrivelse = ({ dager }: DagBeskrivelseProps) => {
    const lovhjemmel = (dag: RSDag) => {
        if (dag.begrunnelser.length > 0) {
            return parserWithReplace(tekst(`utbetaling.tabell.avvist.lovhjemmel.${dag.begrunnelser?.[0]}` as any))
        }
        if (dag.dagtype == 'ForeldetDag' || dag.dagtype == 'Feriedag' || dag.dagtype == 'Permisjonsdag') {
            return parserWithReplace(tekst(`utbetaling.tabell.avvist.lovhjemmel.${dag.dagtype}` as any))
        } else return ''
    }

    const erAvvistEllerAndreYtelser = (dag: RSDag) => {
        return dag.dagtype === 'AvvistDag' || dag.dagtype === 'AndreYtelser'
    }

    const lagBeskrivelseForUnikDag = (dag: RSDag) => {
        const lovhjemmelTekst = lovhjemmel(dag)

        return (
            <div className="pt-1" data-testid={dataCyBeskrivelse(dag)}>
                <BodyShort>
                    {!erAvvistEllerAndreYtelser(dag) ? (
                        <>
                            {parserWithReplace(tekst(`utbetaling.tabell.label.${dag.dagtype}` as any))}
                            {lovhjemmelTekst && <BodyShort as="span">{lovhjemmelTekst}</BodyShort>}
                        </>
                    ) : (
                        <>
                            {parserWithReplace(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[0]}`))}
                            {lovhjemmelTekst && <BodyShort as="span">{lovhjemmelTekst}</BodyShort>}
                        </>
                    )}
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
                    <DagLabel dag={dag} />
                    {lagBeskrivelseForUnikDag(dag)}
                </div>
            ))}
        </div>
    )
}

export default DagBeskrivelse
