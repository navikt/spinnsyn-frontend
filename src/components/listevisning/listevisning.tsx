import { Heading, Link, Skeleton } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { arkiverteVedtakUrl, isMockBackend, isOpplaering, spinnsynFrontendInterne } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { sorterEtterNyesteFom } from '../../utils/sorter-vedtak'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { testpersonFraUrl } from '../../utils/testperson-fra-url'

import LenkepanelGruppering from './lenkepanel-gruppering'
import ListevisningDemoinfo from './listevisning-demoinfo'

const Listevisning = ({ alleVedtak }: { alleVedtak?: RSVedtakWrapper[] }) => {
    useUpdateBreadcrumbs(() => [], [])

    const router = useRouter()
    const uleste = alleVedtak?.filter((v) => !v.lest).sort(sorterEtterNyesteFom)
    const leste = alleVedtak?.filter((v) => v.lest).sort(sorterEtterNyesteFom)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    return (
        <>
            <div className="mt-4 flex items-center justify-between pb-8 ">
                <Heading size="xlarge" level="1">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Heading>
                {kanVelgePerson && <Person />}
            </div>

            {isOpplaering() && <ListevisningDemoinfo testperson={testpersonFraUrl(router.asPath)} />}

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
                <Link as={alleVedtak ? 'a' : Skeleton} href={arkiverteVedtakUrl()}>
                    {tekst('vedtak-liste.lenke-arkiverte-vedtak')}
                </Link>
            )}
        </>
    )
}

export default Listevisning
