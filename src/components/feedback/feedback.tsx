import { Button, ButtonProps, Heading, Textarea } from '@navikt/ds-react'
import { useEffect, useRef, useState, MouseEvent } from 'react'

import { cn } from '../../utils/tw-utils'

enum Feedbacktype {
    'JA' = 'JA',
    'NEI' = 'NEI',
    'FORBEDRING' = 'FORBEDRING',
}

interface FeedbackButtonProps extends ButtonProps {
    feedbacktype: Feedbacktype
}

export const Feedback = ({
    erDirekteutbetaling,
    erRefusjon,
    harAvvisteDager,
    annullert,
    revurdert,
}: {
    erRefusjon: boolean
    erDirekteutbetaling: boolean
    harAvvisteDager: boolean
    annullert: boolean
    revurdert: boolean
}) => {
    const [textValue, setTextValue] = useState('')
    const [activeState, setActiveState] = useState<Feedbacktype | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const textAreaRef = useRef(null)

    const fetchFeedback = async (): Promise<void> => {
        if (activeState === null) {
            return
        }

        const body = {
            feedback: textValue,
            feedbackId: 'spinnsyn-vedtak',
            svar: activeState,
            app: 'spinsyn-frontend',
            erRefusjon,
            harAvvisteDager,
            erDirekteutbetaling,
            annullert,
            revurdert,
        }

        await fetch('/syk/sykepenger/api/flexjar-backend/api/v1/feedback', {
            method: 'POST',
            body: JSON.stringify(body),
        })
    }

    const FeedbackButton = (props: FeedbackButtonProps) => {
        return (
            <Button
                variant={'primary-neutral'}
                className={cn({
                    'bg-surface-neutral-active text-text-on-inverted': activeState === props.feedbacktype,
                })}
                onClick={() => {
                    setThanksFeedback(false)
                    setActiveState((x) => (x === props.feedbacktype ? null : props.feedbacktype))
                }}
                {...props}
            >
                {props.children}
            </Button>
        )
    }
    const handleSend = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (activeState === Feedbacktype.FORBEDRING && textValue === '') {
            setErrorMsg('Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.')
            return
        }
        await fetchFeedback()
        setErrorMsg(null)

        setActiveState(null)
        setTextValue('')
        setThanksFeedback(true)
    }

    useEffect(() => {
        textValue && errorMsg && setErrorMsg(null)
    }, [textValue, errorMsg])

    useEffect(() => {
        activeState && textAreaRef.current && (textAreaRef.current as any).focus()
        setErrorMsg(null)
    }, [activeState])

    const getPlaceholder = (): string => {
        switch (activeState) {
            case Feedbacktype.JA:
                return 'Er det noe du vil trekke frem? (valgfritt)'
            case Feedbacktype.NEI:
                return 'Hva er det du ikke liker? (valgfritt)'
            case Feedbacktype.FORBEDRING:
                return 'Hva kan forbedres?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    return (
        <div className={'toc-ignore mb-28 mt-12 scroll-my-[30vh]'}>
            <div className={'flex w-full flex-col gap-4'}>
                <Heading size="small" level="2">
                    Var denne siden nyttig?
                </Heading>
                <div className={'flex w-full gap-4'}>
                    <FeedbackButton feedbacktype={Feedbacktype.JA}>Ja</FeedbackButton>
                    <FeedbackButton feedbacktype={Feedbacktype.NEI}>Nei</FeedbackButton>
                    <FeedbackButton feedbacktype={Feedbacktype.FORBEDRING}>Foreslå forbedring</FeedbackButton>
                </div>
                {activeState !== null && (
                    <form className={'animate-fadeIn mt-4 flex w-full max-w-sm flex-col gap-4'}>
                        <Textarea
                            ref={textAreaRef}
                            error={errorMsg}
                            label={getPlaceholder()}
                            value={textValue}
                            onChange={(e) => {
                                setThanksFeedback(false)
                                setTextValue(e.target.value)
                            }}
                            maxLength={600}
                            minRows={3}
                            description="Ikke skriv inn navn eller andre personopplysninger"
                        />
                        <Button className="mr-auto" variant={'primary-neutral'} onClick={handleSend}>
                            Send inn svar
                        </Button>
                    </form>
                )}
            </div>
            <div aria-live="polite">
                {thanksFeedback && (
                    <Heading size="small" as="p" className="mt-8">
                        Takk for tilbakemeldingen!
                    </Heading>
                )}
            </div>
        </div>
    )
}