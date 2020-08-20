import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import Vis from '../vis'

const Sykedager = () => {
    const { valgtVedtak } = useAppStore()

    return (
        <Vis hvis={valgtVedtak}>
            <Undertittel tag="h2">
                {tekst('sykedager.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('sykedager.brukt')} {valgtVedtak?.vedtak.forbrukteSykedager} { ' sykedager' }
            </Normaltekst>
            <Normaltekst>
                {tekst('sykedager.igjen')} {valgtVedtak?.vedtak.gjenståendeSykedager}
            </Normaltekst>
            <Utvidbar erApen={false} type="intern" tittel={tekst('sykedager.slutt')}>
                <AlertStripeInfo>
                    {tekst('sykedager.slutt.undertekst')}
                    <br />
                    <Lenke href={tekst('sykedager.slutt.lenke-url')}>
                        {tekst('sykedager.slutt.lenke-tekst')}
                    </Lenke>
                </AlertStripeInfo>
            </Utvidbar>
        </Vis>
    )
}

export default Sykedager
