import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, BodyShort, Button, Label, Textarea } from '@navikt/ds-react'
import { MagnifyingGlassIcon } from '@navikt/aksel-icons'

import { cn } from '../../utils/tw-utils'
import { logEvent } from '../amplitude/amplitude'

import { UseOpprettFlexjarFeedback } from './queryhooks/useOpprettFlexjarFeedback'
import { UseOppdaterFlexjarFeedback } from './queryhooks/useOppdaterFlexjarFeedback'
import { tommelOpp } from './emojies'

interface FlexjarFellesProps {
    feedbackId: string
    children: React.ReactNode
    activeState: string | number | null
    setActiveState: (s: string | number | null) => void
    thanksFeedback: boolean
    setThanksFeedback: (b: boolean) => void
    getPlaceholder: () => string
    textRequired?: boolean
    flexjarsporsmal: string
    flexjartittel: string
    feedbackProps: Record<string, string | undefined | boolean | number>
    feedbackPropsFunction?: () => Record<string, string | undefined | number | boolean>
}

export function FlexjarFelles({
    feedbackId,
    getPlaceholder,
    activeState,
    setActiveState,
    thanksFeedback,
    setThanksFeedback,
    flexjartittel,
    flexjarsporsmal,
    children,
    textRequired,
    feedbackProps,
    feedbackPropsFunction,
}: FlexjarFellesProps) {
    const [textValue, setTextValue] = useState('')
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const textAreaRef = useRef(null)
    const { mutate: giFeedback, data, reset } = UseOpprettFlexjarFeedback()
    const { mutate: oppdaterFeedback } = UseOppdaterFlexjarFeedback()
    const fetchFeedback = useCallback(
        async (knappeklikk?: () => void): Promise<boolean> => {
            if (activeState === null) {
                return false
            }

            const body = {
                feedback: textValue,
                feedbackId: feedbackId,
                svar: activeState,
                ...feedbackProps,
            }
            if (feedbackPropsFunction) {
                Object.assign(body, feedbackPropsFunction())
            }
            if (data?.id) {
                oppdaterFeedback({ body, id: data.id, cb: knappeklikk })
                return true
            } else {
                giFeedback(body)
                return false
            }
        },
        [
            activeState,
            data?.id,
            feedbackId,
            feedbackProps,
            giFeedback,
            oppdaterFeedback,
            textValue,
            feedbackPropsFunction,
        ],
    )
    useEffect(() => {
        setErrorMsg(null)
    }, [activeState])

    useEffect(() => {
        fetchFeedback().catch()
        // kan ikke bruke fetchFeedback som dependency, da blir det dobble kall
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeState])

    const feedbackPropsString = JSON.stringify(feedbackProps)
    useEffect(() => {
        setErrorMsg(null)
        setTextValue('')
        setActiveState(null)
        reset()
    }, [feedbackPropsString, setActiveState, feedbackId, reset])

    const sendTilbakemelding = 'Send tilbakemelding'

    const handleSend = async (p: () => void) => {
        if (textRequired && textValue === '') {
            setErrorMsg('Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.')
            return
        }
        logEvent('knapp klikket', {
            komponent: 'flexjar',
            feedbackId: feedbackId,
            svar: activeState + '',
            tekst: sendTilbakemelding,
        })
        const oppdatert = await fetchFeedback(p)
        if (oppdatert) {
            setErrorMsg(null)

            setActiveState(null)
            setTextValue('')
            setThanksFeedback(true)
        }
    }

    return (
        <div role="region" className="w-full mt-16 md:w-3/4">
            <div>
                {!thanksFeedback && (
                    <div className="mt-1 border-4 border-surface-subtle rounded-medium">
                        <div className="bg-surface-subtle p-6 flex gap-4 items-center">
                            <div className="bg-gray-900 w-10 h-10 rounded-full flex justify-center items-center">
                                <MagnifyingGlassIcon aria-hidden={true} className="text-white axe-exclude" />
                            </div>
                            <div>
                                <Label as="h2" className="mb-2">
                                    {flexjartittel}
                                </Label>
                                <BodyShort>Svarene dine er anonyme</BodyShort>
                            </div>
                        </div>
                        <div className="px-6 py-8">
                            {flexjarsporsmal && (
                                <Label as="p" className="mb-8">
                                    {flexjarsporsmal}
                                </Label>
                            )}

                            {children}
                            {activeState !== null && (
                                <form className="mt-10 w-full">
                                    <Textarea
                                        ref={textAreaRef}
                                        error={errorMsg}
                                        label={getPlaceholder()}
                                        description="Unngå å skrive inn navn, fødselsnummer eller andre personlige opplysninger."
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter' && e.ctrlKey) {
                                                e.preventDefault()
                                                await handleSend(() => reset())
                                            }
                                        }}
                                        value={textValue}
                                        onChange={(e) => {
                                            setThanksFeedback(false)
                                            setErrorMsg(null)
                                            setTextValue(e.target.value)
                                        }}
                                        maxLength={600}
                                        minRows={2}
                                    />
                                    <Alert variant="warning" className="mt-4">
                                        Tilbakemeldingen din er anonym og vil ikke knyttes til søknaden din. Den brukes
                                        kun for å gjøre nettsidene bedre
                                    </Alert>
                                    <Button
                                        className="mr-auto mt-6"
                                        size="medium"
                                        variant="secondary-neutral"
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            await handleSend(() => reset())
                                        }}
                                    >
                                        {sendTilbakemelding}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
                <div aria-live="polite">
                    {thanksFeedback && (
                        <div className="mt-2 border-4 border-green-100 rounded-medium bg-green-100 p-6 flex flex-row items-center">
                            {tommelOpp()}
                            <div className="pl-6">
                                <Label as="h3" className="mb-2">
                                    Takk for tilbakemeldingen!
                                </Label>
                                <BodyShort>
                                    Vi setter stor pris på at du tok deg tid til å dele dine tanker med oss.
                                </BodyShort>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface FeedbackButtonProps {
    tekst: string
    svar: string
    activeState: string | number | null
    setThanksFeedback: (b: boolean) => void
    setActiveState: (s: string | null | number) => void
    feedbackId: string
}

export function FeedbackButton(props: FeedbackButtonProps) {
    return (
        <Button
            variant="secondary-neutral"
            size="medium"
            className={cn({
                'bg-surface-neutral-active text-text-on-inverted hover:bg-surface-neutral-active':
                    props.activeState === props.svar,
            })}
            aria-pressed={props.activeState === props.svar}
            onClick={(e) => {
                e.preventDefault()
                logEvent('knapp klikket', {
                    komponent: 'flexjar',
                    feedbackId: props.feedbackId,
                    tekst: props.tekst,
                    svar: props.svar,
                })
                props.setThanksFeedback(false)
                if (props.activeState === props.svar) {
                    props.setActiveState(null)
                } else {
                    props.setActiveState(props.svar)
                }
            }}
        >
            {props.tekst}
        </Button>
    )
}
