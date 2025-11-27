import BannerTekster from '../components/banner/banner-tekster'
import ListevisningTekster from '../components/listevisning/listevisning-tekster'
import VedtakArkiveringTekster from '../components/vedtak-arkivering/vedtak-arkivering-tekster'
import AnnulleringTekster from '../components/vedtak-side/annullering/annullering-tekster'
import SykepengedagerTekster from '../components/vedtak-side/sykepengedager/sykepengedager-tekster'
import UenigTekster from '../components/vedtak-side/uenig/uenig-tekster'
import UtbetalingTekster from '../components/vedtak-side/utbetaling/utbetaling-tekster'
import VedtakTekster from '../components/vedtak-side/vedtak-tekster'

const tekster = {
    ...BannerTekster,
    ...ListevisningTekster,
    ...VedtakTekster,
    ...VedtakArkiveringTekster,
    ...UtbetalingTekster,
    ...UenigTekster,
    ...SykepengedagerTekster,
    ...AnnulleringTekster,
}

type TekstKeys =
    | keyof typeof BannerTekster
    | keyof typeof ListevisningTekster
    | keyof typeof VedtakTekster
    | keyof typeof VedtakArkiveringTekster
    | keyof typeof UtbetalingTekster
    | keyof typeof UenigTekster
    | keyof typeof SykepengedagerTekster
    | keyof typeof AnnulleringTekster

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
