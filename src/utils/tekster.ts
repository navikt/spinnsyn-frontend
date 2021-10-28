import BannerTekster from '../components/banner/banner-tekster'
import BetaTekster from '../components/beta-alertstripe/beta-tekster'
import SaksbehandlingstidOgUtbetalingTekster
    from '../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling-tekster'
import TeaserTekster from '../components/teaser/teaser-tekster'
import VedtakListeTekster from '../components/vedtak-liste/vedtak-liste-tekster'
import AnnulleringTekster from '../components/vedtak-side/annullering/annullering-tekster'
import AvvisteDagerTekster from '../components/vedtak-side/avviste-dager/avviste-dager-tekster'
import BehandlingTekster from '../components/vedtak-side/behandling/behandling-tekster'
import SykepengedagerTekster from '../components/vedtak-side/sykepengedager/sykepengedager-tekster'
import UenigTekster from '../components/vedtak-side/uenig/uenig-tekster'
import UtbetalingTekster from '../components/vedtak-side/utbetaling/utbetaling-tekster'
import VedtakTekster from '../components/vedtak-side/vedtak-tekster'
import VedtakStatusTekster from '../components/vedtak-status/vedtak-status-tekster'

const tekster = {
    ...BannerTekster,
    ...VedtakListeTekster,
    ...TeaserTekster,
    ...VedtakTekster,
    ...VedtakStatusTekster,
    ...UtbetalingTekster,
    ...UenigTekster,
    ...BehandlingTekster,
    ...AvvisteDagerTekster,
    ...SykepengedagerTekster,
    ...SaksbehandlingstidOgUtbetalingTekster,
    ...BetaTekster,
    ...AnnulleringTekster
}


type TekstKeys =
    keyof typeof BannerTekster
    | keyof typeof VedtakListeTekster
    | keyof typeof TeaserTekster
    | keyof typeof VedtakTekster
    | keyof typeof BetaTekster
    | keyof typeof VedtakStatusTekster
    | keyof typeof UtbetalingTekster
    | keyof typeof UenigTekster
    | keyof typeof BehandlingTekster
    | keyof typeof AvvisteDagerTekster
    | keyof typeof SykepengedagerTekster
    | keyof typeof SaksbehandlingstidOgUtbetalingTekster
    | keyof typeof AnnulleringTekster;

export const tekst = (tekst: TekstKeys): string => {
    const verdi = tekster[tekst]
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
