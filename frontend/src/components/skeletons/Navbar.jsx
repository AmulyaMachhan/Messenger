import { Link } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

function Navbar() {
  const { logout, authUser } = useAuthStore();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="flex flex-end">
      <div className="flex items-center gap-4">
        {!authUser ? (
          <div>
            <button onClick={() => handleClick()}>Logout</button>
          </div>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
