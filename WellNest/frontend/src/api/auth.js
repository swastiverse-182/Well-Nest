const BASE = import.meta.env.VITE_API_URL;

/* LOGIN USER */
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    // returns { token, user }
    return data;
  } catch (err) {
    console.error("Login API error:", err.message);
    return { error: err.message };
  }
};

/* REGISTER USER */
export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    // returns { message }
    return data;
  } catch (err) {
    console.error("Register API error:", err.message);
    return { error: err.message };
  }
};
