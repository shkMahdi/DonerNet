import { authClient } from "../auth-client";

export const editRequest = async (requestId, updatedData) => {
    const { data: token } = await authClient.token();

    if (!token) {
        return { error: 'No token found' };
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${requestId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.token}`,
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.error || 'Failed to update request' };
        }

        return { success: true };
    } catch (err) {
        return { error: 'Failed to update request' };
    }
};