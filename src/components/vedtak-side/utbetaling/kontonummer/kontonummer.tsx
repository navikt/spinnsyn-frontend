import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Vis from '../../../vis'

const Kontonummer = () => {
    const url = new URL(window.location.href)
    const testperson = url.searchParams.get('testperson')
    const visKontonummer = (testperson === 'kun-direkte' || testperson === 'kombinasjon')

    return (
        <>
            <Vis hvis={visKontonummer} render={() =>
                <Normaltekst>
                    <strong>{tekst('utbetaling.kontonummer.utbetales')}</strong> 9901 01 12345
                </Normaltekst>
            } />

            <Vis hvis={testperson === 'kun-direkte-uten-kontonummer'} render={() =>
                <>
                    <Element tag="h2" className="info__tittel">
                        {tekst('utbetaling.kontonummer.tittel')}
                    </Element>
                    <Normaltekst>
                        {parser(tekst('utbetaling.kontonummer.mangler'))}
                    </Normaltekst>
                </>
            } />
        </>
    )
}

export default Kontonummer

