import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Vis from '../../../vis'

const Kontonummer = () => {
    const url = new URL(window.location.href)
    const testperson = url.searchParams.get('testperson')
    const visKontonummer = (testperson === 'kun-direkte' || testperson === 'kombinasjon')

    return (
        <>
            <Vis hvis={visKontonummer} render={() =>
                <Normaltekst>
                    <strong>Utbetales til kontonummer:</strong> 9901 01 12345
                </Normaltekst>
            } />

            <Vis hvis={testperson === 'kun-direkte-uten-kontonummer'} render={() =>
                <>
                    <Element tag="h2" className="info__tittel">
                        Kontonummer for utbetaling
                    </Element>
                    <Normaltekst>
                        Vi har ikke registrert noe kontonummer på deg.
                    </Normaltekst>
                </>
            } />
        </>
    )
}

export default Kontonummer

