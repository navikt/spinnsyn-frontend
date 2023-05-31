import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import dayjs from 'dayjs'

const Index = () => {
    function countWeekdaysUntil(targetDate: string): number {
        let today = dayjs()
        const endDay = dayjs(targetDate)

        if (endDay.isBefore(today)) {
            return 0
        }

        let weekdayCount = 0

        while (!today.isAfter(endDay)) {
            // Sjekk om dagen ikke er en helgedag
            if (today.day() !== 0 && today.day() !== 6) {
                weekdayCount++
            }
            // Gå til neste dag
            today = today.add(1, 'day')
        }

        return weekdayCount
    }

    function numberToEmoji(n: number): string {
        const emojiNumbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
        let emojiString = ''

        const numberString = n.toString()
        for (let i = 0; i < numberString.length; i++) {
            const digit = parseInt(numberString[i])
            emojiString += emojiNumbers[digit]
        }

        return emojiString
    }

    const targetDate = '2023-09-01'
    const dagerIgjen = numberToEmoji(countWeekdaysUntil(targetDate))

    return (
        <div className="w-100 max-w-90 h-screen bg-gray-900 pt-10 text-center leading-none text-white">
            <h1 className="text-8xl">Team Flex - T2 - 2023 💪</h1>

            <BodyShort className="mt-30 mt-20 text-5xl">
                ℹ️ Brukerne kan gi den informasjonen og de opplysningene NAV trenger med en gang
            </BodyShort>
            <BodyShort className="mt-30 mt-20 text-5xl">
                💌 De sykmeldte får en fin og gyldig forklaring på NAV sin beslutning
            </BodyShort>
            <BodyShort className="mt-30 mt-20  text-5xl" spacing>
                🤩 Den sykmeldte vet hva som skjer i sin sak og kan hjelpe seg selv
            </BodyShort>
            <BodyShort className="mt-20 block  text-7xl">{`Det er ${dagerIgjen} arbeidsdager igjen`}</BodyShort>
        </div>
    )
}

export default Index
