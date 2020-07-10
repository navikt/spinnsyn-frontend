import './banner.less'

import { Sidetittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const Banner = () => {
    return (
        <header className='sidebanner'>
            <Sidetittel tag='h1' className='sidebanner__tittel'>
                {tekst('spvedtak.sidetittel')}
            </Sidetittel>
        </header>
    )
}

export default Banner
