import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

import { kombinertDirekteOgRefusjon } from './kombinert'

export const kombinertRevurdert = jsonDeepCopy(kombinertDirekteOgRefusjon)
kombinertRevurdert.revurdert = true
