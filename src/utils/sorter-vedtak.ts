//import dayjs from 'dayjs'

import { Vedtak } from '../types/vedtak'

export const sorterEtterPeriodeTom = (vedtak1: Vedtak, vedtak2: Vedtak) => {
    console.log('vedtak1', vedtak1); // eslint-disable-line
    console.log('vedtak2', vedtak2); // eslint-disable-line
    return 2
    /*
        const dato1 = dayjs(vedtak1.vedtak.tom).toDate()
        const dato2 = dayjs(vedtak2.vedtak.tom).toDate()
        return dato1.getTime() - dato2.getTime()
    */
}
