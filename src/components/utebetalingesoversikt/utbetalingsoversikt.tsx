import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { infoStyle } from '../../pages/vedtak/vedtak'

const Utbetalingsoversikt = () => {
    return (
        <div style={infoStyle}>
            <em>Her kommer: </em>
            <Undertittel tag="span">Utbetalingsoversikt</Undertittel>
        </div>
    )
}

export default Utbetalingsoversikt
