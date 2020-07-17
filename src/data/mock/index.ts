import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { soknaderIntegration } from './data/soknader-integration'
import { soknaderOpplaering } from './data/soknader-opplaering'
import { sykmeldinger } from './data/sykmeldinger'
import { unleashToggles } from './data/toggles'
import { vedtakTestdata } from './data/vedtak'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

const soknader = [ ...jsonDeepCopy(soknaderOpplaering) ]
if (!env.isOpplaering) {
    soknader.push(...jsonDeepCopy(soknaderIntegration))
}


mock.post(env.unleashUrl, unleashToggles)
mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`, soknader as any)
mock.get(`${env.syforestRoot}/sykmeldinger`, sykmeldinger as any)
mock.get(`${env.spinnsynRoot}/api/v1/vedtak`, vedtakTestdata as any)
