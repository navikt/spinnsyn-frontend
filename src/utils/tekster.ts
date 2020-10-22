import BannerTekster from '../components/banner/banner-tekster'
import BetaTekster from '../components/beta-alertstripe/beta-tekster'
import KlageTekster from '../components/klage/klage-tekster'
import SaksbehandlingstidOgUtbetalingTekster
    from '../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling-tekster'
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
    ...BannerTekster,
    ...VedtakListeTekster,
    ...TeaserTekster,
    ...VedtakTekster,
    ...KlageTekster,
    ...VedtakStatusTekster,
    ...UtbetalingTekster,
    ...RefreshHvisFeilStateTekster,
    ...UenigTekster,
    ...BehandlingTekster,
    ...SykepengedagerTekster,
    ...SaksbehandlingstidOgUtbetalingTekster,
    ...BetaTekster
}


type TekstKeys =
    keyof typeof BannerTekster
    | keyof typeof VedtakListeTekster
    | keyof typeof TeaserTekster
    | keyof typeof VedtakTekster
    | keyof typeof BetaTekster
    | keyof typeof KlageTekster
    | keyof typeof VedtakStatusTekster
    | keyof typeof UtbetalingTekster
    | keyof typeof RefreshHvisFeilStateTekster
    | keyof typeof UenigTekster
    | keyof typeof BehandlingTekster
    | keyof typeof SykepengedagerTekster
    | keyof typeof SaksbehandlingstidOgUtbetalingTekster;

export const tekst = (tekst: TekstKeys): string => {
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
