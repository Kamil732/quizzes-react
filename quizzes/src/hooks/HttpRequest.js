import { useEffect, useState } from 'react'
import axios from 'axios'

export function useAxiosGet(url) {
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: null,
    })

    useEffect(() => {
        setRequest({
            ...request,
            loading: true,
        })

        axios.get(url)
            .then(response => {
                setRequest({
                    ...request,
                    data: response.data,
                })
            })
            .catch(() => {
                setRequest({
                    ...request,
                    error: 'ERROR 404: Quiz is not Found',
                })
            })
    }, [url])

    return request
}

export async function AxiosPost(url, form1=null, data=null) {
    if (data) {
        return await axios.post(url, data)
            .then(response => response.data)
            .catch(error => console.log(error))
    } else if (form1) {
        const form = new FormData(form1)
        let formData = {}

        for (let [key, value] of form.entries()) {
            formData = { ...formData, [key]: value }
        }

        return await axios.post(url, formData)
            .then(response => response.data)
            .catch(error => console.log(error))
    } else {
        return Error('None of the data was passed')
    }
}