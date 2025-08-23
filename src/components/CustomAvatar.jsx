const getInitials = (name) => {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return names
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
};

const CustomAvatar = ({ src, alt = "User Avatar", name = "", size = 32 }) => {
  return (
    <div
      className="relative rounded-full overflow-hidden bg-primary dark:bg-muted flex items-center justify-center text-sm font-medium text-white dark:text-muted-foreground"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src || getInitials(name)}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export default CustomAvatar;
