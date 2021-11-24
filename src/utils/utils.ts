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
