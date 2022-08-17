import React from 'react'

import { logEvent } from '../amplitude/amplitude'

export interface EkspanderProps {
    erApen: boolean
    tittel: React.ReactNode | string
    ikon?: string
    children: React.ReactNode
    className?: string
}

const lukk = (ekspanderbar: any, tittel: string) => {
    if (window) {
        logEvent('accordion lukket', { component: tittel })
        midtstill(ekspanderbar)
        ekspanderbar.current?.focus()
    }
}

export const midtstill = (ekspanderbar: any) => {
    setTimeout(() => {
        if (!ekspanderbar.current) {
            return
        }
        const winhight = window.innerHeight
        const position = ekspanderbar.current!.getBoundingClientRect()
        let top
        if (position.height >= winhight) {
            top = position.top + window.scrollY
        } else {
            top =
                position.top - (winhight - position.height) / 2 + window.scrollY
        }
        window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
    }, 300)
}

export const ekspanderbarKlikk = (
    erApen: boolean,
    ekspanderbar: any,
    amplitudeText: string,
    klikksted?: 'lukk tekst' | 'header'
) => {
    if (!erApen) {
        if (window) {
            let eventProperties: Record<string, string | boolean> = {
                component: amplitudeText,
            }
            if (klikksted) {
                eventProperties['klikksted'] = klikksted
            }
            logEvent('accordion åpnet', eventProperties)
            midtstill(ekspanderbar)
            ekspanderbar.current?.focus()
            ekspanderbar.current?.classList.add('delayed--open')
        }
    } else {
        lukk(ekspanderbar, amplitudeText)
        setTimeout(() => {
            ekspanderbar.current?.classList.remove('delayed--open')
        }, 300)
    }
}
