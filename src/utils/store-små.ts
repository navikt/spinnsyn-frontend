export const storFørste = (str: string, navn: string) => {
    let ord = ''
    ord += str.substring(0, 1).toUpperCase()
    ord += str.substring(1, str.length).toLowerCase()
    if (ord.length === 2 && navn === '') ord = ord.toUpperCase()
    if (ord.toLowerCase().includes('og')) ord = ord.toLowerCase()
    if (ord.toLowerCase() === 'vvs') ord = ord.toUpperCase()
    if (ord.toLowerCase() === 'ikt') ord = ord.toUpperCase()
    return ord
}

export const storeTilStoreOgSmå = (str: string) => {
    let nyStr = str.replace(/,/g, ', ')
    nyStr = nyStr.replace(/  +/g, ' ')
    const strArr = nyStr.split(' ')
    let navn = ''

    strArr.map(ord => {
        if(ord.toLowerCase() === 'as' || ord.toLowerCase() === 'as,' || ord.toLowerCase().includes('a/s')){
            navn += navn !== '' ? ' ' : ''
            navn += ord.toUpperCase()
        } else {
            navn += navn !== '' ? ' ' : ''
            navn += storFørste(ord, navn)
        }
    })
    return navn
}
