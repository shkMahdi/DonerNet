import { authClient } from "../auth-client";

export const handleDonate = async (request, user) => {
    const { data: token } = await authClient.token()

    if (!token) {
        return { error: 'No token found' };
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${request._id}/donate`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.token}`,
            },
            body: JSON.stringify({
                donorName: user?.name,
                donorEmail: user?.email,
            }),
        }
    );

    if (!res.ok) {
        const error = await res.json();
        return { error: error.message };
    }

    const result = await res.json();
    return { result };
};