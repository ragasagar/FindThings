

export function postUser(url, data) {
    let token = btoa("sagar:test");
    return fetch(url, {//Fetching the data
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": 'Basic ' + token
        }
    })
}
export function post(url, data) {
    let token = localStorage.getItem('token')
    return fetch(url, {//Fetching the data
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": 'Basic ' + token
        }
    })
}
export function put(url, data) {
    let token = localStorage.getItem('token')
    return fetch(url, {//Fetching the data
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": 'Basic ' + token
        }
    })
}


export function get(url) {
    let token = localStorage.getItem('token')
    return fetch(url, {//Fetching the data
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": 'Basic ' + token
        }
    })
}