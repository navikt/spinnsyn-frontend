import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import parser from 'html-react-parser'
import Etikett from 'nav-frontend-etiketter'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { RSBegrunnelse, RSDag } from '../../../types/rs-types/rs-vedtak'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'

const DagTabell = () => {
    const { valgtVedtak } = useAppStore()
    if (!valgtVedtak) return null
    const alleDager = valgtVedtak.dager

    const lagDagLabel = (dag: RSDag) => {
        // TODO: Legg inn permisjon og ferie når vi mottar denne dataen
        switch (dag.dagtype) {
            case 'NavDagSyk':
                return <Etikett mini type="suksess">Syk</Etikett>
            case 'NavDagDelvisSyk':
                return <Etikett mini type="suksess">Delvis syk</Etikett>
            case 'NavHelgDag':
                return <Etikett mini type="info">Helg</Etikett>
            case 'ArbeidsgiverperiodeDag':
                return <Etikett mini type="info">Arbeidsgiver betaler</Etikett>
            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeidsdag</Etikett>
            case 'Fridag':
                return <Etikett mini type="info">Fridag</Etikett>
            case 'ForeldetDag':
                return <Etikett mini type="fokus">Søkt for sent</Etikett>
            case 'AvvistDag':
                return dag.begrunnelser?.map((begrunnelse) =>
                    lagBegrunnelseLabel(begrunnelse)
                )
            case 'UkjentDag':
            default:
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    const lagBegrunnelseLabel = (begrunnelse: RSBegrunnelse) => {
        switch (begrunnelse) {
            case 'SykepengedagerOppbrukt':
                return <Etikett mini type="fokus">Maks antall dager nådd</Etikett>
            case 'MinimumInntekt':
                return <Etikett mini type="fokus">For lav inntekt</Etikett>
            case 'EgenmeldingUtenforArbeidsgiverperiode':
                return <Etikett mini type="fokus">Egenmelding når NAV skal betale</Etikett>
            case 'MinimumSykdomsgrad':
                return <Etikett mini type="fokus">Sykmeldt i for liten grad</Etikett>
            case 'ManglerOpptjening':
                return <Etikett mini type="fokus">Jobbet for kort</Etikett>
            case 'ManglerMedlemskap':
                return <Etikett mini type="fokus">Ikke medlem</Etikett>
            case 'EtterDødsdato':
                return <Etikett mini type="fokus">Etter dødsfall</Etikett>
            case 'UKJENT':
            default:
                logger.warn(`Har ingen begrunnelse for: ${begrunnelse}`)
                return <Etikett mini type="fokus">Ukjent</Etikett>
        }
    }

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
        const unikeDagtyper = alleDager.reduce((list: RSDag[], dag) => {
            if (dag.dagtype !== 'AvvistDag' && !list.find((d: RSDag) => d.dagtype === dag.dagtype)) {
                list.push(dag)
            }
            return list
        }, [])

        const unikeBegrunnelser = alleDager.reduce((list: RSDag[], dag) => {
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
        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
            tittel={'Daglig utbetalingsoversikt'}
        >
            <table className="tabell tabell--stripet tabell--dag">
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Sum</th>
                        <th>Dagtype</th>
                    </tr>
                </thead>
                <tbody>
                    {alleDager.map((dag, idx) =>
                        <tr key={idx}>
                            <td>{dayjs(dag.dato).format('DD.MM.YY')}</td>
                            <td>
                                {
                                    (dag.dagtype === 'NavDagSyk' || dag.dagtype === 'NavDagDelvisSyk')
                                        ? ValutaFormat.format(dag.belop) + ' kr'
                                        : '-'
                                }
                            </td>
                            <td>{lagDagLabel(dag)}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="tekstinfo">
                <Undertittel className="tekstinfo__avsnitt">
                    {tekst('utbetaling.tabell.dagtyper')}
                </Undertittel>

                {unikeDager().map((d, idx) =>
                    <div className="tekstinfo__avsnitt" key={idx}>
                        {lagDagLabel(d)}
                        {lagBeskrivelseForUnikDag(d)}
                    </div>
                )}
            </div>
        </Utvidbar>
    )
}

export default DagTabell
