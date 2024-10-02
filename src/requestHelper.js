function parseJSON(res) {
    return res.json();
}

async function executeRequest(requestParams, method) {
    const { url, headers, onSuccess, body, onError } = requestParams || {};
    await fetch(url, { method, headers, body })
    .then(parseJSON)
    .then(res => {
        onSuccess(res.data || res);
        return res.data || res;
    })
    .catch(error => {
        return onError ? onError(error) : error;
    }) 
};

const getRequest = (requestParams) => executeRequest(requestParams, "GET");
const putRequest = (requestParams) => executeRequest(requestParams, "PUT");
const postRequest = (requestParams) => executeRequest(requestParams, "POST");
const deleteRequest = (requestParams) => executeRequest(requestParams, "DELETE");

export const requestHelper = { getRequest, putRequest, postRequest, deleteRequest };