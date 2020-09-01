import dayjs from 'dayjs'

import { Vedtak } from '../types/vedtak';

export const sorterEtterPeriodeTom = (vedtak1: Vedtak, vedtak2: Vedtak) => {
    const dato1 = dayjs(vedtak1.vedtak.tom).toDate()
    const dato2 = dayjs(vedtak2.vedtak.tom).toDate()
    return dato1.getTime() - dato2.getTime()
}
