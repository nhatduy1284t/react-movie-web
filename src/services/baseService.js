import axios from "axios"
import Axios from "axios"

import { DOMAIN, TOKEN, TOKEN_CYBERSOFT } from "../util/settings"

export class baseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN)),
            }
        })
    }

    post = (url, model) => {

        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: model,
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN)),

            }
        })
    }


    get = (url) => {

        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN)),
            }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN)),
            }
        })
    }
}

