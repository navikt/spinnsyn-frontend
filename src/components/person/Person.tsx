import { BodyShort, Button, Heading, LinkPanel, Modal, Popover, Tooltip } from '@navikt/ds-react'
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { SandboxIcon } from '@navikt/aksel-icons'

import { PersonaData, PersonaGroupKey, testpersonerGruppert } from '../../data/testdata/testperson'

export default function Person() {
    const [showHint, setShowHint] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    const dismissHint = useCallback(() => {
        localStorage.setItem('devtools-hint', 'false')
        setShowHint(false)
    }, [])

    useEffect(() => {
        if (localStorage.getItem('devtools-hint') === null) {
            localStorage.setItem('devtools-hint', 'true')
        }

        setTimeout(() => {
            if (localStorage.getItem('devtools-hint') === 'true') {
                setShowHint(true)
            }
        }, 1000)
    }, [])

    return (
        <>
            <div hidden={openState}>
                <Tooltip content="Verktøy for testing">
                    <Button
                        ref={buttonRef}
                        onClick={() => setOpenState((b) => !b)}
                        icon={<SandboxIcon title="Åpne testdataverktøy" />}
                        variant="tertiary-neutral"
                    />
                </Tooltip>
                <div
                    style={
                        {
                            '--ac-popover-bg': 'var(--a-surface-info-subtle)',
                            '--ac-popover-border': 'var(--a-border-info)',
                        } as CSSProperties
                    }
                >
                    <Popover open={showHint} onClose={() => void 0} placement="bottom-end" anchorEl={buttonRef.current}>
                        <Popover.Content>
                            <Heading size="small" level="2" className="motion-safe:animate-bounce">
                                Tips!
                            </Heading>
                            <div className="w-[220px]">
                                Her finner du verktøy for å endre mellom forskjellige brukere
                            </div>
                            <Button onClick={dismissHint} className="mt-2" variant="secondary-neutral" size="small">
                                OK!
                            </Button>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
            <Modal
                open={openState}
                onClose={() => {
                    if (showHint) dismissHint()
                    setOpenState(false)
                }}
                className="h-screen max-h-max max-w-[369px] rounded-none p-0 left-auto m-0"
                header={{ heading: 'Testdataverktøy' }}
            >
                <Modal.Body>
                    {Object.entries(testpersonerGruppert).map(([gruppe, personer]) => (
                        <PersonGruppeVisning gruppe={gruppe as PersonaGroupKey} personer={personer} key={gruppe} />
                    ))}
                </Modal.Body>
            </Modal>
        </>
    )
}

function PersonGruppeVisning({ gruppe, personer }: { gruppe: PersonaGroupKey; personer: PersonaData }) {
    function heading() {
        switch (gruppe) {
            case 'mottaker': {
                return 'Brukerutbetaling og refusjon'
            }
            case 'selvstendig-naeringsdrivende': {
                return 'Selvstendig næringsdrivende'
            }
            case 'avvist-delvis-innvilgelse-bømlo': {
                return 'Avvist eller delvis innvilget søknad'
            }
            case 'vedtak-innhold': {
                return 'Vedtak med forskjellig innhold'
            }
            case 'testing': {
                return 'Vedtak brukt til testing'
            }
            default: {
                throw Error(`mangler testperson gruppe heading for ${gruppe}`)
            }
        }
    }

    return (
        <>
            <Heading size="small" level="4" className="mt-2">
                {heading()}
            </Heading>
            <ul className="mt-2 flex flex-col gap-2">
                {Object.entries(personer).map(([key, person]) => {
                    let href = `/syk/sykepenger?testperson=${key}`
                    person?.togglesOn?.forEach((toggle) => {
                        href += `&${toggle}=true`
                    })
                    person?.togglesOff?.forEach((toggle) => {
                        href += `&${toggle}=false`
                    })

                    return (
                        <LinkPanel key={key} className="w-full text-start" href={href}>
                            <BodyShort>{person.beskrivelse}</BodyShort>
                        </LinkPanel>
                    )
                })}
            </ul>
        </>
    )
}
