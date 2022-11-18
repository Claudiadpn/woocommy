import {handleResponse} from '@/helpers/api';
import { config } from "@/helpers/config";

export const securityService = {
    login
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.loginUrl}`, requestOptions).then(handleResponse);
}
