import {paginatedHandleResponse} from '@/helpers/api';
import { config } from "@/helpers/config";
import {getIsoString} from "@/helpers/date";

export const orderService = {
    getByDate,
    updateOrder
};

function getByDate(period, page, perPage) {
    const requestOptions = {
        method: 'GET'
    };
    let query = period ? `?page=${page}&status=processing,completed&order=asc&per_page=${perPage}&after=${getIsoString(period.start)}&before=${getIsoString(period.end)}` : '';

    return fetch(`${config.baseApiUrl}/orders${query}&${config.apiKeyQuery}`, requestOptions).then(paginatedHandleResponse);
}

function updateOrder(data) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.baseApiUrl}/orders/${data.id}?${config.apiKeyQuery}`, requestOptions).then(paginatedHandleResponse);
}