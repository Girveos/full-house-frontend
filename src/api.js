const BASE_URL = 'http://localhost:3001/api/v1';

export const destroyAccount = async (token) => {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(`Error al eliminar la cuenta: ${response.statusText}`);
    }
  };