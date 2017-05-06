import {API_URL} from '../constants/Environment';

export default class API {

    phone_verification(params, success, error){
        let connection = this.newConnection('POST',`${API_URL}/verifications/phone`, success, error);
        connection.send(JSON.stringify(params));
    }

    phone_verification_finish(params, success, error){
        let connection = this.newConnection('POST',`${API_URL}/verifications/finish`, success, error);
        connection.send(JSON.stringify(params));
    }

    email_verification(params, success, error){
        let connection = this.newConnection('POST',`${API_URL}/verifications/email`, success, error);
        connection.send(JSON.stringify(params));
    }

    email_verification_status(token, success, error){
        let connection = this.newConnection('GET',`${API_URL}/verifications/status/${token}`, success, error);
        connection.send();
    }

    new_user(params, success, error){
        let connection = this.newConnection('POST',`${API_URL}/user`, success, error);
        connection.send(JSON.stringify(params));
    }

    login(params, success, error){
        let connection = this.newConnection('POST',`${API_URL}/user/login`, success, error);
        connection.send(JSON.stringify(params));
    }

    newConnection(type,url,success, error) {
        let xhr = this.createCORSRequest();
        xhr.withCredentials = false;
        xhr.onreadystatechange = (response) => {
        if (xhr.readyState === 4) {
            try {
                if (xhr.status === 200 && xhr.responseText !== "No result") {
                    let response = JSON.parse(xhr.responseText);
                    success(response);
                } else {
                    error(xhr.responseText);
                }
            }
            catch(err) {
                console.error(err);
                error(err);
            }
        }
    };

    xhr.open(type, url, true);
    xhr.setRequestHeader("Developer-Authorization", "YR+5N/RRDsGbzdtLJ9sGMGJGQGSUfvjcOkHc2X9Jkrij70AGPaqLILqPHuNRSTmz");
    xhr.setRequestHeader("Project", "IK7jHFMh41poZK2Z9qbu5pNeyi0b0/r5xSzvXEGuFiRd+1NEl83f6vQUjDnI3Mr+");
    xhr.setRequestHeader("X-Device", "x86_64 - 9.3");
    xhr.setRequestHeader("Accept-Language", "en-us");
    xhr.setRequestHeader("X-Api-Version", "1.0");
    xhr.setRequestHeader("Content-Type", "application/json");
    return xhr;
    }

    createCORSRequest() {
        let xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
        } else {
            xhr = null;
        }
        return xhr;
    }
}
