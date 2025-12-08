import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, BodyShort, Button, Label, Radio, RadioGroup, Textarea } from '@navikt/ds-react'
import { MagnifyingGlassIcon } from '@navikt/aksel-icons'

import { logEvent } from '../umami/umami'

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
    flexjarsporsmal?: string
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
            const svar = JSON.stringify(activeState)
            const body = {
                feedback: textValue,
                feedbackId: feedbackId,
                svar,
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
                                <BodyShort>Det er valgfritt å svare. Svarene dine er anonyme</BodyShort>
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

type FeedbackRadioProps = {
    setThanksFeedback: (b: boolean) => void
    feedbackId: string
    activeState: string | number | null
    setActiveState: (s: string | number | null) => void
}

export const FeedbackRadio = (props: FeedbackRadioProps) => {
    const [hovedvalg, setHovedvalg] = useState<string | null>(null)
    const [visVanskelig, setVisVanskelig] = useState(false)

    const ENKELT = 'Veldig enkelt'
    const GANSKE_ENKELT = 'Ganske enkelt'
    const LITT_VANSKELIG = 'Litt vanskelig'
    const VELDIG_VANSKELIG = 'Veldig vanskelig'

    return (
        <>
            <RadioGroup
                className="mb-8"
                legend="Hvordan synes du det var å forstå svaret på søknaden?"
                onChange={(val) => {
                    setHovedvalg(val)
                    if (val === ENKELT || val === GANSKE_ENKELT) {
                        setVisVanskelig(false)
                        props.setActiveState(JSON.stringify({ hovedvalg: val, undervalg: '' }))
                    } else if (val === LITT_VANSKELIG || val === VELDIG_VANSKELIG) {
                        setVisVanskelig(true)
                        props.setActiveState(JSON.stringify({ hovedvalg: val, undervalg: '' }))
                    }
                    props.setThanksFeedback(false)
                }}
            >
                <Radio value={ENKELT}>Veldig enkelt</Radio>
                <Radio value={GANSKE_ENKELT}>Ganske enkelt</Radio>
                <Radio value={LITT_VANSKELIG}>Litt vanskelig</Radio>
                <Radio value={VELDIG_VANSKELIG}>Veldig vanskelig</Radio>
            </RadioGroup>
            {visVanskelig && hovedvalg && (
                <RadioGroup
                    className="mb-8"
                    legend="Hva synes du var vanskelig?"
                    description="Velg alternativet som passer best"
                    onChange={(val) => {
                        props.setThanksFeedback(false)
                        props.setActiveState(JSON.stringify({ hovedvalg, undervalg: val }))
                    }}
                >
                    <Radio value="Skjønte ikke hvorfor svaret ble som det ble">
                        Skjønte ikke hvorfor svaret ble som det ble
                    </Radio>
                    <Radio value="Svaret var vanskelig å finne frem i">Svaret var vanskelig å finne frem i</Radio>
                    <Radio value="Språket var komplisert">Språket var komplisert</Radio>
                    <Radio value="Svaret manglet viktig informasjon">Svaret manglet viktig informasjon</Radio>
                    <Radio value="Annet">Annet</Radio>
                </RadioGroup>
            )}
        </>
    )
}
