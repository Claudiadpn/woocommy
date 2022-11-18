import {paginatedHandleResponse, handleResponse} from '@/helpers/api';
import { config } from "@/helpers/config";

export const noteService = {
    getNotes,
    createNote,
};

function getNotes(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.baseApiUrl}/orders/${id}/notes?${config.apiKeyQuery}`, requestOptions).then(handleResponse);
}

function createNote(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.note)
    };

    return fetch(`${config.baseApiUrl}/orders/${data.id}/notes?${config.apiKeyQuery}`, requestOptions).then(paginatedHandleResponse);
}
