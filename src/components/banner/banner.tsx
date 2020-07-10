import './banner.less'

import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const Banner = () => {
    return (
        <header className='soknadtopp'>
            <Systemtittel tag='h1' className='soknadtopp__tittel'>
                {tekst('spvedtak.sidetittel')}
            </Systemtittel>
        </header>
    )
}

export default Banner
