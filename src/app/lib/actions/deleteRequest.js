import { authClient } from "@/app/lib/auth-client";

export const deleteRequest = async (requestId) => {
    const { data: token } = await authClient.token();

    if (!token) {
        return { error: 'No token found' };
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${requestId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.error || 'Failed to delete request' };
        }

        const data = await res.json();
        return { success: true, data };
    } catch (err) {
        return { error: err.message || 'Failed to delete request' };
    }
};