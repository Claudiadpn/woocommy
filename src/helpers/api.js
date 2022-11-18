export function paginatedHandleResponse(response) {
    return response.text().then(text => {
        const textResponse = text && JSON.parse(text)

        if (!response.ok) {
            const error = (textResponse && textResponse.message) || response.statusText
            return Promise.reject(error)
        }

        let data = {
            total: Number(response.headers.get('X-WP-Total')),
            pages: Number(response.headers.get('X-WP-TotalPages')),
            items: textResponse
        }

        return data
    })
}
export function handleResponse(response) {
    return response.text().then(text => {
        const textResponse = text && JSON.parse(text)

        if (!response.ok) {
            const error = (textResponse && textResponse.message) || response.statusText
            return Promise.reject(error)
        }

        return textResponse
    })
}
