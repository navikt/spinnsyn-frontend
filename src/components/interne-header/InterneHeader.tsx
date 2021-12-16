import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

interface InterneHeaderProps {
    fnr: string | null;
}

function InterneHeader({ fnr }: InterneHeaderProps): JSX.Element {
    const undertittel = () => {
        if (!fnr) {
            return 'Speiling av brukers visning av svar på sykepengesøknader'
        }
        const fnrForVisning = `${fnr.slice(0, 6)} ${fnr.slice(5)}`
        return `Slik ser svar på søknader ut for ${fnrForVisning}`
    }

    return (
        <header className="interne-header">
            <img src="/syk/sykepenger/static/img/nav-hvit.svg" alt="NAV logo" />
            <Undertittel>{undertittel()}</Undertittel>
        </header>
    )
}

export default InterneHeader
