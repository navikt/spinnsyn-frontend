import React from 'react'

import { logEvent } from '../amplitude/amplitude'

export interface UtvidbarProps {
    erApen: boolean
    tittel: React.ReactNode | string
    children: React.ReactNode
    className?: string
}

const åpne = (utvidbar: any, tittel: string) => {
    if (window) {
        logEvent('panel åpnet', { 'component': tittel })
        midtstill(utvidbar)
        utvidbar.current?.focus()
    }
}

const midtstill = (utvidbar: any) => {
    setTimeout(() => {
        if (!utvidbar.current) {
            return
        }
        const winhight = window.innerHeight
        const position = utvidbar.current!.getBoundingClientRect()
        let top
        if (position.height >= winhight) {
            top = position.top + window.scrollY
        } else {
            top = position.top - ((winhight - position.height) / 2) + window.scrollY
        }
        window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
    }, 300)
}

export const utvidbarKlikk = (erApen: boolean, utvidbar: any, amplitudeText: string) => {
    if (!erApen) {
        if (window) {
            logEvent('panel åpnet', { 'component': amplitudeText })
            midtstill(utvidbar)
            utvidbar.current?.focus()
        }
    } else {
        åpne(utvidbar, amplitudeText)
    }
}
