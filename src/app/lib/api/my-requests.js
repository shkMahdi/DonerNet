export const getMyRequests = async (requesterEmail) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/requests?requesterEmail=${requesterEmail}`);
    return response.json();
}