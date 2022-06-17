const maaneder = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]
const SKILLETEGN_PERIODE = '–'

export const tilLesbarDatoUtenAarstall = (datoArg: any): string => {
    if (datoArg) {
        const dato = new Date(datoArg)
        const dag = dato.getDate()
        const manedIndex = dato.getMonth()
        const maned = maaneder[manedIndex]
        return `${dag}. ${maned}`
    }
    return ''
}

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    return datoArg
        ? `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(
              datoArg
          ).getFullYear()}`
        : undefined
}

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any) => {
    const fom = new Date(fomArg)
    const tom = new Date(tomArg)
    const erSammeAar = fom.getFullYear() === tom.getFullYear()
    const erSammeMaaned = fom.getMonth() === tom.getMonth()
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(
              tom
          )}`
        : erSammeAar
        ? `${tilLesbarDatoUtenAarstall(
              fom
          )} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : `${tilLesbarDatoMedArstall(
              fom
          )} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
}

export const erHelg = (dato: Date) => {
    return dato.getDay() === 6 || dato.getDay() === 0
}
