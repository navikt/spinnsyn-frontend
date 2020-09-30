import dayjs from 'dayjs'
import { HoyreChevron } from 'nav-frontend-chevron'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import { getUrlTilVedtak } from '../../utils/url-utils'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import hand from './hand.svg'
import { arbeidsgiverListevisning,SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ vedtak }: SykepengesoknadTeaserProps) => {
    const { soknader } = useAppStore()

    return (
        <article aria-labelledby={`soknader-header-${vedtak.id}`}>
            <Inngangspanel to={getUrlTilVedtak(vedtak)}>
                <div className="inngangspanel__venstre">
                    <InngangsIkon ikon={hand} ikonHover={hand} />
                    <div className="inngangspanel__innhold">
                        <InngangsHeader
                            meta={
                                dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' +
                                dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')
                            }
                            tittel={tekst('spinnsyn.teaser.tittel')}
                        />
                        {arbeidsgiverListevisning(vedtak, soknader)}
                    </div>
                </div>
                <div className="inngangspanel__del2">
                    <HoyreChevron />
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
