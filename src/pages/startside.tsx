import { Sidetittel } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'

import { tekst } from '../utils/tekster'
import { setBodyClass } from '../utils/utils'

const Startside = () => {

    useEffect(() => {
        setBodyClass('startside')
    }, [])

    return (
        <>
            <div className='limit'>
                <Sidetittel tag='h1' className='sidetopp__tittel'>
                    {tekst('vedtak.sidetittel')}
                </Sidetittel>
            </div>
        </>
    )
}

export default Startside
