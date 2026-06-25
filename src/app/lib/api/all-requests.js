export const getAllRequests = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests`);
    return response.json();
}