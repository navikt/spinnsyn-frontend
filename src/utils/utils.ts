import { hentLoginUrl } from '../data/data-fetcher'
import { logger } from './logger'


export const redirectTilLoginHvis401 = (res: Response) => {
    if (res.status === 401) {
        logger.warn('Redirecter til login grunnet 401')
        window.location.href = hentLoginUrl()
        return true
    }
    return false
}


export const setBodyClass = (name: string) => {
    if (document.body.className !== '') {
        document.body.setAttribute('class', '')
    }
    document.body.classList.add(name)
}

export const camelCaseTilSetning = (str: string) => {
    const medSpace = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add space between camel casing
    return medSpace.charAt(0).toUpperCase() + medSpace.slice(1).toLowerCase() // Capitalize the first letter
}
