import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ picture: base64Image });
    };
  };
  return (
    <div className="p-12 mt-10">
      <img
        src={selectedImg || authUser.profilePic || ".../public/vite.svg"}
        alt=""
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleUpload(e);
        }}
      />
    </div>
  );
};

export default ProfilePage;
