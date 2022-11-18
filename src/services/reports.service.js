import {handleResponse} from '@/helpers/api';
import { config } from "@/helpers/config";

export const reportsService = {
    getByDate
};

function getByDate(period) {
    const requestOptions = {
        method: 'GET'
    };

    let query = period ? `?date_min=${period.start}&date_max=${period.end}` : '';

    return fetch(`${config.baseApiUrl}/reports/sales${query}&${config.apiKeyQuery}`, requestOptions).then(handleResponse);
}
