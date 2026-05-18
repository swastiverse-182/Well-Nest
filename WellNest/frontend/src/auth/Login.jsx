import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // backend error
      if (data?.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // SUCCESS: backend sends {_id, name, email, token}
      if (data?.token && data?._id) {
        login(data); // store in context + localStorage
        navigate("/", { replace: true });
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-600 mb-3 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-600 font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
}
