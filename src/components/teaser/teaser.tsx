import dayjs from 'dayjs'
import { HoyreChevron } from 'nav-frontend-chevron'
import { Undertekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Sykmelding } from '../../types/types'
import { getDuration } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import Vis from '../vis'
import avkryssetHover from './avkrysset-hover.svg'
import avkrysset from './avkrysset.svg'
import { hentTeaserStatustekst, SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { sykmeldinger } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const stegId = soknad.status === RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING ? '1' : ''
    const sykmelding: Sykmelding = sykmeldinger.filter(sykm => sykm.id = soknad.sykmeldingId)[0]

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad, stegId)}>
                <div className="inngangspanel__venstre">
                    <InngangsIkon ikon={avkrysset} ikonHover={avkryssetHover} />
                    <div className='inngangspanel__innhold'>
                        <InngangsHeader
                            meta={dayjs(soknad.fom).format('DD. MMM') + ' - ' + dayjs(soknad.tom).format('DD. MMM YYYY')}
                            tittel={tekst('spvedtak.teaser.tittel')}
                            status={hentTeaserStatustekst(soknad)}
                        />
                        <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                            <Undertekst className='inngangspanel__tekst'>
                                {getLedetekst(tekst('spvedtak.teaser.sykmeldt'), {
                                    '%PROSENT%': sykmelding?.mulighetForArbeid.perioder[0].grad,
                                    '%ARBEIDSGIVER%': soknad.arbeidsgiver?.navn,
                                    '%DAGER%': getDuration(soknad.fom!, soknad.tom!),
                                })}
                            </Undertekst>
                        </Vis>
                    </div>
                </div>
                <div className="inngangspanel__venstre">
                    <Vis hvis={soknad.sendtTilArbeidsgiverDato !== null}>
                        <Undertekst className='inngangspanel__status'>
                            {tekst('spvedtak.sendt.til.arbeidsgiver')}
                        </Undertekst>
                    </Vis>
                    <Vis hvis={soknad.sendtTilArbeidsgiverDato === null && soknad.sendtTilNAVDato !== null}>
                        <Undertekst className='inngangspanel__status'>
                            {tekst('spvedtak.sendt.til.nav')}
                        </Undertekst>
                    </Vis>
                    <HoyreChevron />
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
