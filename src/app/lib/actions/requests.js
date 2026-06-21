import { authClient } from "../auth-client";

export const createRequest = async (newRequest) => {
    const {data: token} = await authClient.token()

    if(!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.token}`,
        },
        body: JSON.stringify(newRequest)
    });


    return response.json();
};