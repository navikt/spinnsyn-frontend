import React, { useContext, useState } from 'react'
import { shuffle } from 'remeda'

import { ArkiveringContext } from '../../context/arkivering-context'
import { spinnsynFrontendInterne } from '../../utils/environment'

import { FeedbackRadioGroup, FlexjarFelles } from './flexjar-felles'

export const VANSKELIGHETSGRAD = {
    VELDIG_ENKELT: 'Veldig enkelt',
    GANSKE_ENKELT: 'Ganske enkelt',
    LITT_VANSKELIG: 'Litt vanskelig',
    VELDIG_VANSKELIG: 'Veldig vanskelig',
} as const

export const VANSKELIGE_AARSAKER = {
    SKJONTE_IKKE_HVORFOR: 'Skjønte ikke hvorfor svaret ble som det ble',
    VANSKELIG_A_FINNE: 'Svaret var vanskelig å finne frem i',
    KOMPLISERT_SPRAK: 'Språket var komplisert',
    MANGLET_INFO: 'Svaret manglet viktig informasjon',
    ANNET: 'Annet',
} as const

const ALLE_VANSKELIGE_AARSAKER_BLANDET = [
    ...shuffle(Object.values(VANSKELIGE_AARSAKER).slice(0, -1)),
    VANSKELIGE_AARSAKER.ANNET,
]

export const FlexjarVarSidenNyttig = ({
    erDirekteutbetaling,
    erRefusjon,
    harAvvisteDager,
    annullert,
    erRevurdert,
    julesoknad,
    erRevurdering,
}: {
    erRefusjon: boolean
    erDirekteutbetaling: boolean
    harAvvisteDager: boolean
    annullert: boolean
    erRevurdert: boolean
    julesoknad: boolean
    erRevurdering: boolean
}) => {
    const arkivering = useContext(ArkiveringContext)

    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const [aarsak, setAarsak] = useState<string | null>(null)
    const [visSendeKnapp, setVisSendeKnapp] = useState<boolean>(false)
    const [visTextTilbakemelding, setVisTextTilbakemelding] = useState<boolean>(false)

    if (arkivering || spinnsynFrontendInterne()) return null

    const feedbackId = 'spinnsyn-vedtak'
    const getPlaceholder = (): string => {
        switch (activeState) {
            case VANSKELIGHETSGRAD.VELDIG_ENKELT:
            case VANSKELIGHETSGRAD.GANSKE_ENKELT:
                return 'Hva synes du var bra?'
            case VANSKELIGHETSGRAD.LITT_VANSKELIG:
            case VANSKELIGHETSGRAD.VELDIG_VANSKELIG:
                return 'Har du forslag til hvordan vi kan gjøre det bedre?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    const tilleggssporsmal: Record<string, string | undefined | boolean> = {
        aarsak: aarsak?.toString(),
    }

    const feedbackProps: Record<string, string | undefined | boolean> = {
        erRefusjon,
        harAvvisteDager,
        erDirekteutbetaling,
        annullert,
        revurdert: erRevurdert,
        erRevurdering,
    }

    if (julesoknad) {
        feedbackProps['julesøknad'] = true
    }

    const handterEndretVanskelighet = (value: string) => {
        setActiveState(value)
        if (VANSKELIGHETSGRAD.VELDIG_ENKELT === value || VANSKELIGHETSGRAD.GANSKE_ENKELT === value) {
            setAarsak(null)
            setVisTextTilbakemelding(false)
        }
        setVisSendeKnapp(true)
    }

    const handterEndretAarsak = (value: string | number | null) => {
        setVisTextTilbakemelding(true)
        setAarsak(value?.toString() ?? null)
    }

    const visAarsak =
        VANSKELIGHETSGRAD.LITT_VANSKELIG === activeState || VANSKELIGHETSGRAD.VELDIG_VANSKELIG === activeState

    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            feedbackProps={feedbackProps}
            flexjartittel="Vil du hjelpe oss å gjøre denne siden bedre?"
            textRequired={false}
            showSendFeedback={visSendeKnapp}
            showTextBox={visTextTilbakemelding}
            additionalQuestions={tilleggssporsmal}
        >
            <div className="flex w-full mt-2 mb-2">
                <FeedbackRadioGroup
                    feedbackId={feedbackId}
                    sporsmal="Hvordan synes du det var å forstå svaret på søknaden?"
                    svarAlternativer={Object.values(VANSKELIGHETSGRAD)}
                    setSvar={handterEndretVanskelighet}
                    svar={activeState?.toString() ?? ''}
                />
            </div>
            {visAarsak && (
                <div className="flex w-full mt-4">
                    <FeedbackRadioGroup
                        feedbackId={feedbackId}
                        sporsmal="Hva synes du var vanskelig?"
                        undertekst="Velg alternativet som passer best"
                        svarAlternativer={ALLE_VANSKELIGE_AARSAKER_BLANDET}
                        setSvar={handterEndretAarsak}
                        svar={aarsak ?? ''}
                    />
                </div>
            )}
        </FlexjarFelles>
    )
}
