import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    fullName: "",
  });

  const { signup } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          value={formData.password}
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        ></input>
        <button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          X
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
