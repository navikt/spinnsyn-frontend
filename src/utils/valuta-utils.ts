export const ValutaFormat = Intl.NumberFormat('nb-NO', {
    maximumFractionDigits: 0,
})

export const formaterValuta = (belop: number) => {
    return ValutaFormat.format(Math.floor(belop)) + ' kr'
}

export const formatOneDecimal = (value: number) => {
    return value.toFixed(1).replace('.', ',')
}
