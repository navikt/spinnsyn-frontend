import { Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { personas } from '../../data/mock/testperson'
import { isMockBackend, isOpplaering } from '../../utils/environment'
import Vis from '../vis'

const Person = () => {
    const [ visInnhold, setVisInnhold ] = useState<boolean>(false)
    const person = useRef<HTMLImageElement>(null)
    const kanVelgePerson = (isMockBackend() || isOpplaering())

    if (kanVelgePerson) {
        person?.current?.addEventListener('click', () => {
            setVisInnhold(!visInnhold)
        })
    }

    return (
        <>
            <img src={'/syk/sykepenger/static/img/person.svg'} alt="Du" className="brodsmuler__ikon" ref={person} />
            <Vis hvis={kanVelgePerson && visInnhold}
                render={() =>
                    <Popover
                        open={false}
                        anchorEl={person.current as HTMLElement}
                        placement="bottom"
                        onClose={() => setVisInnhold(false)}
                    >
                        <ul style={{ minWidth: 190 }}>
                            {Object.keys(personas).map((p, idx) =>
                                <li key={idx}>
                                    <a href={`/syk/sykepenger?testperson=${p}`}>{p}</a>
                                </li>
                            )}
                        </ul>
                    </Popover>
                }
            />
        </>
    )
}

export default Person
