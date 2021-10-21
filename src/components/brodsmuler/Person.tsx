import Popover, { PopoverOrientering } from 'nav-frontend-popover'
import Image from 'next/image'
import React, { useState } from 'react'

import { personas } from '../../data/mock/testperson'
import env from '../../utils/environment'
import Vis from '../vis'
import personIkon from './person.svg'

const Person = () => {
    const [ visInnhold, setVisInnhold ] = useState<boolean>(false)
    const kanVelgePerson = (env.isMockBackend() || env.isOpplaering())

    return (
        <>
            <Image src={personIkon} alt="Du" className="brodsmuler__ikon" onClick={() => {
                if (kanVelgePerson) {
                    setVisInnhold(!visInnhold)
                }
            }} />
            <Vis hvis={kanVelgePerson && visInnhold}
                render={() =>
                    <Popover
                        //TODO    ankerEl={person.current as HTMLElement}
                        orientering={PopoverOrientering.Under}
                        onRequestClose={() => setVisInnhold(false)}
                    >
                        <ul style={{ minWidth: 190 }}>
                            {Object.keys(personas).map((p, idx) =>
                                <li key={idx}>
                                    <a href={`?testperson=${p}`}>{p}</a>
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
