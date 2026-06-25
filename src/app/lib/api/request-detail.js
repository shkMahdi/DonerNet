export const getRequestDetail = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donation-requests/${id}`);
    const data = await res.json();
    return data;
}
