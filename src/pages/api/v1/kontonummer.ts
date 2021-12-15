import type { NextApiRequest, NextApiResponse } from 'next'

import { Brukerkonto } from '../../../types/types'
import { isProd } from '../../../utils/environment'

const isNumber = (char: string) => !isNaN(parseInt(char, 10))

const hentMockKontoNummer = (id: string): string | null => {
    // Randomisering for testing. Returnerer et kontonummer kun om første tegn i id er et tall
    if (!isNumber(id)) {
        return null
    }
    return '10011110011'
}

const handler = (req: NextApiRequest, res: NextApiResponse<Brukerkonto | string | null>): void => {

    if (req.method !== 'GET') {
        return res.status(405).json('Kun GET er tillatt')
    }

    let kontonummer: string | null = null

    if (!isProd()) {
        kontonummer = hentMockKontoNummer(req.query.id[0])
    }

    if (kontonummer) {
        return res.status(200).json({ kontonummer: kontonummer })
    }
    return res.status(404).json(null)
}

export default handler
