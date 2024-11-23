import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogginIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      LoginPage
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="p-3 flex flex-col gap-4"
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label htmlFor="password">Email</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          type="button"
          className="m-3"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>

        <button type="submit">
          {isLogginIn ? <Loader2>Loading...</Loader2> : <p>Login</p>}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
