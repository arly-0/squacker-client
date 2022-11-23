import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

export const tabToUrl = (tab) => {
    if(tab === 'Home')
        return '/'
    else
        return `/${tab.toLowerCase()}`
}

export const formatDate = date => {
    if(date) return new Date(date).toDateString()
    else return 'Not specified'
}
export const formatBool = bool => {
    if(bool === true) return <FontAwesomeIcon icon={faCheck} />
    else if (bool === false) return <FontAwesomeIcon icon={faXmark}/>
    else return 'Not specified'
}