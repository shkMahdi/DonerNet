export const getAllUsers = async (token) => {
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response);

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    return data;
};