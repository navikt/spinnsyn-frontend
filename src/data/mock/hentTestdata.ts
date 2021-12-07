import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { diverseData } from './data/personas'
import { personas } from './testperson'


export function hentTestdata(url?: string) {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (testperson && Object.prototype.hasOwnProperty.call(personas, testperson)) {
        return jsonDeepCopy(personas[ testperson ]().vedtak)
    } else {
        return jsonDeepCopy(diverseData.vedtak)
    }
}
