const BASE_URL = 'http://localhost:3001/api/v1';

export const destroyAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        active: "false",
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(`Error al cancelar la cuenta: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error en la solicitud PATCH: ${error.message}`);
  }
};
