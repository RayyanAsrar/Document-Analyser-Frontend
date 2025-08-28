import { useAuth } from "../context/AuthContext";

const getInitials = (name) => {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return names
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
};

const CustomAvatar = ({ size = 32 }) => {
  const { user } = useAuth();
  return (
    <div
      className="relative rounded-full overflow-hidden bg-primary dark:bg-muted flex items-center justify-center text-sm font-medium text-white dark:text-muted-foreground"
      style={{ width: size, height: size }}
    >
      {user?.profileImage ? (
        <img
          src={user?.profileImage || getInitials(user?.name || user?.username || "")}
          alt={"Profile Image"}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        getInitials(user?.name || user?.username || "")
      )}
    </div>
  );
};

export default CustomAvatar;
