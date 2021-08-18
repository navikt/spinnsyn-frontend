import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import useSoknader from '../../../query-hooks/useSoknader'
import useValgtVedtak from '../../../query-hooks/useValgtVedtak'
import { getLedetekst, tekst } from '../../../utils/tekster'

const ArbeidsgiverInfo = () => {
    const valgtVedtak = useValgtVedtak()
    const { data: soknader } = useSoknader()

    const soknadIder = valgtVedtak?.vedtak.dokumenter
        .filter(dok => dok.type === 'Søknad')
        .map(dok => dok.dokumentId)

    const soknad = soknader?.find(sok => soknadIder?.includes(sok.id))

    return (
        <section className="arbeidsgiver-info">
            <Element tag="h3" className="arbeidsgiver-info__tittel">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Element>
            <Normaltekst className="arbeidsgiver-info__tekst">
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': soknad?.arbeidsgiver?.navn
                })}
            </Normaltekst>
        </section>
    )
}

export default ArbeidsgiverInfo
