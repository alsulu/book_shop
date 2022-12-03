const getData = (url) => {
    return fetch('http://localhost:1111' + url)
        .then((response) => {
            console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

const postData = (url, params={}) => {
    return fetch('http://localhost:1111' + url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

const deleteData = (url, params={}) => {
    return fetch('http://localhost:1111' + url, {
        method: 'DELETE',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

export default {
    get: getData,
    post: postData,
    delete: deleteData,
}