import './vedtak.less'

import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Klage from '../../components/klage/klage'
import SykmeldingOpplysninger from '../../components/sykmelding-opplysninger/sykmelding-opplysninger'
import Utbetalinger from '../../components/utebetalinger/utbetalinger'
import Utbetalingsoversikt from '../../components/utebetalingesoversikt/utbetalingsoversikt'
import VedtakStatus from '../../components/vedtak-status/vedtakStatus'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule, Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('vedtak.sidetittel'),
    sti: '/vedtak',
    erKlikkbar: false
} ]

const Vedtak = () => {
    const { id } = useParams()
    const { setValgtVedtak, valgtVedtak, vedtak, sykmeldinger } = useAppStore()

    useEffect(() => {
        setValgtVedtak(vedtak.find(a => a.id === id))
        setBodyClass('vedtak')
    }, [ id, setValgtVedtak, vedtak ])

    const hentSykmeldinger = (): Sykmelding[] => {
        const sykmeldingIder = valgtVedtak?.vedtak.dokumenter
            .filter(dok => dok.type === 'Sykmelding')
            .map(dok => dok.dokumentId)
        return sykmeldinger.filter(syk => sykmeldingIder?.includes(syk.id) )
    }

    return (
        <>
            <Banner />
            <div className='limit'>
                <Brodsmuler brodsmuler={brodsmuler} />
                <VedtakStatus />
                {hentSykmeldinger().map((syk, idx) => <SykmeldingOpplysninger ekspandert={false} sykmelding={syk} key={idx} />)}
                <p> Begrunnelse... </p>
                <Utbetalinger />
                <Utbetalingsoversikt />
                <Klage />
            </div>
        </>
    )
}

export default Vedtak
