import { BodyShort, Button, Heading, LinkPanel, Modal, Popover, Tooltip } from '@navikt/ds-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SandboxIcon } from '@navikt/aksel-icons'

import { synligeTestpersoner } from '../../data/testdata/testperson'

const personer = synligeTestpersoner()

export default function Person() {
    const [showHint, setShowHint] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    const dismissHint = useCallback(() => {
        localStorage.setItem('devtools-hint', 'false')
        setShowHint(false)
    }, [])

    useEffect(() => {
        const value = localStorage.getItem('devtools-hint')
        // Respekter eksplisitt 'false' (f.eks. satt av tester eller etter at hintet er avvist).
        if (value === 'false') return

        const timer = setTimeout(() => setShowHint(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <div hidden={openState}>
                <Tooltip content="Verktøy for testing">
                    <Button
                        data-color="neutral"
                        ref={buttonRef}
                        onClick={() => setOpenState((b) => !b)}
                        icon={<SandboxIcon title="Åpne testdataverktøy" />}
                        variant="tertiary"
                    />
                </Tooltip>
                <Popover
                    open={showHint}
                    onClose={() => void 0}
                    placement="bottom-end"
                    anchorEl={buttonRef.current} // eslint-disable-line react-hooks/refs
                    className="bg-[var(--ax-bg-info-soft)] border-[var(--ax-border-info)]"
                >
                    <Popover.Content>
                        <Heading size="small" level="2" className="motion-safe:animate-bounce">
                            Tips!
                        </Heading>
                        <div className="w-[220px]">Her finner du verktøy for å endre mellom forskjellige brukere</div>
                        <Button
                            data-color="neutral"
                            onClick={dismissHint}
                            className="mt-2"
                            variant="secondary"
                            size="small"
                        >
                            OK!
                        </Button>
                    </Popover.Content>
                </Popover>
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
                    <ul className="flex flex-col gap-2">
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
                </Modal.Body>
            </Modal>
        </>
    )
}
