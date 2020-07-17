import { Vedtak } from '../types/Vedtak'

export const getUrlTilSoknad = (soknad: Vedtak) => {
    return `/soknader/${soknad.id}`

}
