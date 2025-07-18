import { Heading, Link, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { arkiverteVedtakUrl, isMockBackend, isOpplaering, spinnsynFrontendInterne } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { sorterEtterNyesteFom } from '../../utils/sorter-vedtak'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'

import LenkepanelGruppering from './lenkepanel-gruppering'

const Listevisning = ({ vedtak }: { vedtak?: RSVedtakWrapper[] }) => {
    useUpdateBreadcrumbs(() => [], [])

    const uleste = vedtak?.filter((v) => !v.lest).sort(sorterEtterNyesteFom)
    const leste = vedtak?.filter((v) => v.lest).sort(sorterEtterNyesteFom)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    return (
        <>
            <div className="mt-4 flex items-center justify-between pb-8 ">
                <Heading size="xlarge" level="1">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Heading>
                {kanVelgePerson && <Person />}
            </div>

            <LenkepanelGruppering
                dataCy="uleste-vedtak"
                vedtak={uleste}
                tittel={tekst('spinnsyn.teaser.uleste')}
                tomListeTekst={tekst('vedtak-liste.ingen-nye-soknader')}
            />

            <LenkepanelGruppering
                dataCy="leste-vedtak"
                vedtak={leste}
                tittel={tekst('spinnsyn.teaser.leste')}
                tomListeTekst={tekst('vedtak-liste.ingen-tidligere-soknader')}
            />

            {!spinnsynFrontendInterne() && (
                <Link as={vedtak ? 'a' : Skeleton} href={arkiverteVedtakUrl()}>
                    {tekst('vedtak-liste.lenke-arkiverte-vedtak')}
                </Link>
            )}
        </>
    )
}

export default Listevisning
