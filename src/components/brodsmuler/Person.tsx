import { BodyShort, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { personas } from '../../data/testdata/testperson'
import { isMockBackend, isOpplaering } from '../../utils/environment'
import Vis from '../vis'

const Person = () => {
    const [visInnhold, setVisInnhold] = useState<boolean>(false)
    const person = useRef<HTMLImageElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    if (kanVelgePerson) {
        person?.current?.addEventListener('click', () => {
            setVisInnhold(!visInnhold)
        })
    }

    return (
        <>
            <img src={'/syk/sykepenger/static/img/person.svg'} alt="Du" className="brodsmuler__ikon" ref={person} />
            <Vis
                hvis={kanVelgePerson && visInnhold}
                render={() => (
                    <Popover
                        open={true}
                        anchorEl={person.current as HTMLElement}
                        placement="bottom"
                        onClose={() => setVisInnhold(false)}
                    >
                        <Popover.Content>
                            <ul style={{ margin: 0, paddingLeft: '1.4rem' }}>
                                {Object.keys(personas).map((p, idx) => (
                                    <BodyShort size="medium" as="li" key={idx}>
                                        <a href={`/syk/sykepenger?testperson=${p}`}>{p}</a>
                                    </BodyShort>
                                ))}
                            </ul>
                        </Popover.Content>
                    </Popover>
                )}
            />
        </>
    )
}

export default Person
