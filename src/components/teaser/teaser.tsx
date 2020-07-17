import dayjs from 'dayjs'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import avkryssetHover from './avkrysset-hover.svg'
import avkrysset from './avkrysset.svg'
import { SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ vedtak }: SykepengesoknadTeaserProps) => {
    return (
        <article aria-labelledby={`soknader-header-${vedtak.id}`}>
            <Inngangspanel to={getUrlTilSoknad(vedtak)}>
                <div className="inngangspanel__venstre">
                    <InngangsIkon ikon={avkrysset} ikonHover={avkryssetHover} />
                    <div className='inngangspanel__innhold'>
                        <InngangsHeader
                            meta={dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' + dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')}
                            tittel={tekst('spvedtak.teaser.tittel')}
                            status={'??'}
                        />
                    </div>
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
