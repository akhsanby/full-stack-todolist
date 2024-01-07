type TokenTypes = string | undefined;

const isAuthorized = async (token: TokenTypes) => {
  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:8000/api/user", {
      method: "get",
      headers: { Authorization: token },
    });
    const result = await response.json();

    if (result.errors === "Unauthorized") {
      return false;
    } else if (result.data) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export default isAuthorized;
