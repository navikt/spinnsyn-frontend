import BannerTekster from '../components/banner/banner-tekster'
import KlageTekster from '../components/klage/klage-tekster'
import SoknadOppsummeringTekster from '../components/soknad-oppsummering/soknad-oppsummering-tekster'
import TeaserTekster from '../components/teaser/teaser-tekster'
import VedtakStatusTekster from '../components/vedtak-status/vedtak-status-tekster'
import RefreshHvisFeilStateTekster from '../pages/feil/refresh-hvis-feil-state-tekster'
import VedtakListeTekster from '../pages/vedtak-liste/vedtak-liste-tekster'
import BehandlingTekster from '../pages/vedtak-side/behandling/behandling-tekster'
import SykepengedagerTekster from '../pages/vedtak-side/sykepengedager/sykepengedager-tekster'
import UenigTekster from '../pages/vedtak-side/uenig/uenig-tekster'
import UtbetalingTekster from '../pages/vedtak-side/utbetaling/utbetaling-tekster'
import VedtakTekster from '../pages/vedtak-side/vedtak-tekster'
import { logger } from './logger'

const tekster = {
    ...BannerTekster.nb,
    ...VedtakListeTekster.nb,
    ...TeaserTekster.nb,
    ...VedtakTekster.nb,
    ...KlageTekster.nb,
    ...VedtakStatusTekster.nb,
    ...UtbetalingTekster.nb,
    ...SoknadOppsummeringTekster.nb,
    ...RefreshHvisFeilStateTekster.nb,
    ...UenigTekster.nb,
    ...BehandlingTekster.nb,
    ...SykepengedagerTekster.nb,
}

export const tekst = (tekst: string): string => {
    const verdi = tekster[tekst]
    // Generiskfeilmelding har ingen tekst
    if (!verdi === undefined && !tekst.includes('soknad.feilmelding')) {
        // eslint-disable-next-line no-console
        console.log(`Mangler teksten [ ${tekst} ]`)
        logger.error(`Mangler teksten [ ${tekst} ]`)
        return undefined as any
    }
    if (verdi === undefined) {
        return tekst
    }
    return verdi
}

export const getLedetekst = (text: string, data: any): string => {
    if (text === undefined || data === undefined) {
        return ''
    }
    let newtext = text
    Object.keys(data).forEach((key) => {
        const regex = new RegExp(key, 'g')
        newtext = newtext.replace(regex, data[key])
    })
    return newtext
}
