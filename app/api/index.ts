
import { BASEURL } from "@/constants"

export const refreshToken = async (refresh: string, access: string) => {

    console.log('first', JSON.stringify({
        refresh
    }))
    try {
        const response = await fetch(`${BASEURL}/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({
                refresh
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const data = await response.json()

        if(data.status_code === 401) throw "unauthorized"

        return {
            refresh: data?.refresh,
            access: data?.access
        }
    } catch (error) {
        console.log('error', error)
    }
}