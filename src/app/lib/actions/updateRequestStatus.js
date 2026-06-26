import { authClient } from "../auth-client";

export const updateRequestStatus = async (requestId, newStatus) => {
    const { data: token } = await authClient.token();

    if (!token) {
        return { error: 'No token found' };
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${requestId}/status`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.error || 'Failed to update status' };
        }

        const result = await res.json();
        return { result };
    } catch (err) {
        return { error: 'Failed to update status' };
    }
};