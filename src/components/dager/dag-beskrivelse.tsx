import parser from 'html-react-parser'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { RSBegrunnelse, RSDag } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import DagLabel from './dag-label'

interface DagBeskrivelseProps {
    dager: RSDag[]
}

const DagBeskrivelse = ({ dager }: DagBeskrivelseProps) => {

    const lagBeskrivelseForUnikDag = (dag: RSDag) => {
        if (dag.dagtype === 'ForeldetDag') {
            return (
                <>
                    <Normaltekst>
                        {tekst('utbetaling.tabell.label.ForeldetDag' as any)}
                    </Normaltekst>

                    <Normaltekst className={'avvist-lovhjemmel'}>
                        {parser(tekst('utbetaling.tabell.avvist.lovhjemmel.ForeldetDag'))}
                    </Normaltekst>
                </>
            )
        }

        if (dag.dagtype !== 'AvvistDag') {
            return (
                <Normaltekst>
                    {tekst(`utbetaling.tabell.label.${dag.dagtype}` as any)}
                </Normaltekst>
            )
        }

        return (
            <>
                <Normaltekst>
                    {parser(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[ 0 ]}` as any))}
                </Normaltekst>

                <Normaltekst className={'avvist-lovhjemmel'}>
                    {parser(tekst(`utbetaling.tabell.avvist.lovhjemmel.${dag.begrunnelser?.[ 0 ]}` as any))}
                </Normaltekst>
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

    return(
        <div className="tekstinfo">
            <Undertittel className="tekstinfo__avsnitt">
                {tekst('utbetaling.tabell.dagtyper')}
            </Undertittel>

            {
                unikeDager().map((dag, idx) =>
                    <div className="tekstinfo__avsnitt" key={idx}>
                        <DagLabel dag={dag} />
                        {lagBeskrivelseForUnikDag(dag)}
                    </div>
                )
            }
        </div>
    )
}

export default DagBeskrivelse
