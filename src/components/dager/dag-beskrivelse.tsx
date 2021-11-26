import parser from 'html-react-parser'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
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
                        <Normaltekst>
                            {tekst(`utbetaling.tabell.label.${dag.dagtype}` as any)}
                        </Normaltekst>
                    }
                />

                <Vis hvis={dag.dagtype == 'AvvistDag'}
                    render={() =>
                        <Normaltekst>
                            {parser(tekst(`utbetaling.tabell.avvist.${dag.begrunnelser?.[0]}` as any))}
                        </Normaltekst>
                    }
                />
                <Vis hvis={lovhjemmelTekst !== ''}
                    render={() =>
                        <Normaltekst className={'avvist-lovhjemmel'}>
                            {lovhjemmelTekst}
                        </Normaltekst>
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
            <Undertittel className="tekstinfo__avsnitt">
                {tekst('utbetaling.tabell.dagtyper')}
            </Undertittel>

            {unikeDager().map((dag, idx) =>
                <div className="tekstinfo__avsnitt" key={idx}>
                    <DagLabel dag={dag} />
                    {lagBeskrivelseForUnikDag(dag)}
                </div>
            )}
        </div>
    )
}

export default DagBeskrivelse
