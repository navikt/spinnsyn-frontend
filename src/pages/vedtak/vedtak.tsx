import './vedtak.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import Banner from '../../components/banner/banner'
import Begrunnelse from '../../components/begrunnelse/begrunnelse'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import SoknadOppsummering from '../../components/soknad-oppsummering/soknad-oppsummering'
import SykmeldingOpplysninger from '../../components/sykmelding-opplysninger/sykmelding-opplysninger'
import Utbetalinger from '../../components/utbetalinger/utbetalinger'
import Utbetalingsoversikt from '../../components/utbetalingsoversikt/utbetalingsoversikt'
import VedtakStatus from '../../components/vedtak-status/vedtak-status'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
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
    const { valgtVedtak, setValgtVedtak, vedtak, setVedtak } = useAppStore()

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
                    vedtak.find(a => a.id === id)!.lest = true
                    setVedtak(vedtak)
                } else {
                    logger.error('Feil ved markering av vedtak som lest. Ikke status 200', res)
                }
            }
            merkVedtakSomLest().catch(r => logger.error('Feil ved markering av vedtak som lest async', r))
        }
    })

    return (
        <div>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                <VedtakStatus />
                <SykmeldingOpplysninger />
                <SoknadOppsummering />
                <Begrunnelse />
                <Utbetalinger />
                <Utbetalingsoversikt ekspandert={false} />

                {/* <Klage /> */}

                <Lenke className="vedtak__tilbake" href={env.sykefravaerUrl}>
                    <VenstreChevron />
                    <Normaltekst className="vedtak__tilbake--lenke"> {tekst('vedtak.tilbake')} </Normaltekst>
                </Lenke>
            </div>
        </div>
    )
}

export default Vedtak
