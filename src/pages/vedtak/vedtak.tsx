import './vedtak.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import Banner from '../../components/banner/banner'
import Begrunnelse from '../../components/begrunnelse/begrunnelse'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Oppsummering from '../../components/oppsummering/oppsummering'
import SykmeldingOpplysninger from '../../components/sykmelding-opplysninger/sykmelding-opplysninger'
import Utbetalinger from '../../components/utbetalinger/utbetalinger'
import Utbetalingsoversikt from '../../components/utbetalingsoversikt/utbetalingsoversikt'
import VedtakStatus from '../../components/vedtak-status/vedtak-status'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule, Soknad, Sykmelding } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { redirectTilLoginHvis401, setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('vedtak-liste.sidetittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('vedtak.sidetittel'),
        sti: '/vedtak',
        erKlikkbar: false
    }
]

const Vedtak = () => {
    const { id } = useParams()
    const { valgtVedtak, setValgtVedtak, vedtak, sykmeldinger, soknader, setVedtak } = useAppStore()

    useEffect(() => {
        setValgtVedtak(vedtak.find(a => a.id === id))
        setBodyClass('vedtak')
    }, [ id, setValgtVedtak, vedtak ])

    useEffect(() => {
        if (valgtVedtak && !valgtVedtak.lest) {
            const merkVedtakSomLest = async() => {
                const res = await fetch(`${env.spinnsynRoot}/api/v1/vedtak/${valgtVedtak.id}/les`, {
                    method: 'POST',
                    credentials: 'include',
                })
                const status = res.status
                if (redirectTilLoginHvis401(res)) {
                    return
                } else if (status === 200) {
                    valgtVedtak.lest = true
                    setValgtVedtak(valgtVedtak)
                    vedtak.find(a => a.id === id)!.lest= true
                    setVedtak(vedtak)

                } else {
                    logger.error('Feil ved markering av vedtak som lest. Ikke status 200', res)
                }

            }
            merkVedtakSomLest().catch(r => logger.error('Feil ved markering av vedtak som lest async', r))
        }
    } )

    const hentSykmeldinger = (): Sykmelding[] => {
        const sykmeldingIder = valgtVedtak?.vedtak.dokumenter
            .filter(dok => dok.type === 'Sykmelding')
            .map(dok => dok.dokumentId)
        return sykmeldinger.filter(syk => sykmeldingIder?.includes(syk.id))
    }

    const hentSoknader = (): Soknad[] => {
        const soknadIder = valgtVedtak?.vedtak.dokumenter
            .filter(dok => dok.type === 'Søknad')
            .map(dok => dok.dokumentId)
        return soknader.filter(sok => soknadIder?.includes(sok.id))
    }

    return (
        <>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />

                <VedtakStatus />

                {hentSykmeldinger().map((syk, idx) =>
                    <SykmeldingOpplysninger ekspandert={false} sykmelding={syk} key={idx} />
                )}

                {hentSoknader().map((sok, idx) =>
                    <Oppsummering ekspandert={false} soknad={sok} key={idx} />
                )}

                <Begrunnelse />

                <Utbetalinger />

                <Utbetalingsoversikt ekspandert={false} />

                {/* <Klage /> */}

                <Lenke className="vedtak__tilbake" href={env.sykefravaerUrl}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </>
    )
}

export default Vedtak
