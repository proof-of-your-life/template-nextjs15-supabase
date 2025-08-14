const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}) => {
  const variantClasses =
    variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-black";

  return (
    <button
      className={`${variantClasses} ${className} rounded p-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
