'use server'

export const createRequest = async (newRequest) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
    });

    if (!response.ok) {
        throw new Error('Failed to create request');
    }

    return response.json();
};