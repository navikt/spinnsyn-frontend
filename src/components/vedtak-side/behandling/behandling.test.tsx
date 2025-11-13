import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { RSVedtakFelles } from '../../../types/rs-types/rs-vedtak-felles'

import { Behandling } from './behandling'

describe('Behandling', () => {
    it('Varianter av opplysningene', () => {
        const vedtakMedFlereArbeidsgivere: Pick<
            RSVedtakFelles,
            'utbetaling' | 'vedtakFattetTidspunkt' | 'yrkesaktivitetstype' | 'tags'
        > = {
            utbetaling: { automatiskBehandling: false, forbrukteSykedager: 0, gjenståendeSykedager: 0 },
            vedtakFattetTidspunkt: '2022-03-21',
            yrkesaktivitetstype: 'ARBEIDSTAKER',
            tags: [],
        }

        render(<Behandling vedtak={vedtakMedFlereArbeidsgivere} />)

        expect(screen.getByTestId('behandling-header')).toHaveTextContent('Søknaden ble behandlet av en saksbehandler')
    })
})
