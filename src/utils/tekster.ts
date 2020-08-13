import BannerTekster from '../components/banner/banner-tekster'
import BegrunnelseTekster from '../components/begrunnelse/begrunnelse-tekster'
import KlageTekster from '../components/klage/klage-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import OpplysningerTekster from '../components/sykmelding-opplysninger/opplysninger-tekster'
import TeaserTekster from '../components/teaser/teaser-tekster'
import UtbetalingTekster from '../components/utbetalinger/utbetaling-tekster'
import UtbetalingsoversiktTekster from '../components/utbetalingsoversikt/utbetalingsoversikt-tekster'
import VedtakStatusTekster from '../components/vedtak-status/vedtak-status-tekster'
import VedtakListeTekster from '../pages/vedtak-liste/vedtak-liste-tekster'
import VedtakTekster from '../pages/vedtak/vedtak-tekster'
import { logger } from './logger'

const tekster = {
    ...BannerTekster.nb,
    ...VedtakListeTekster.nb,
    ...TeaserTekster.nb,
    ...VedtakTekster.nb,
    ...KlageTekster.nb,
    ...VedtakStatusTekster.nb,
    ...UtbetalingsoversiktTekster.nb,
    ...UtbetalingTekster.nb,
    ...OpplysningerTekster.nb,
    ...OppsummeringTekster.nb,
    ...BegrunnelseTekster.nb,
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
