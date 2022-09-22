export const tabToUrl = (tab) => {
    if(tab === 'Home')
        return '/'
    else
        return `/${tab.toLowerCase()}`
}