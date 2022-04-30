import { FC, ReactNode } from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";

import "styles/components/loader-button.css";

interface Props {
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  size: "sm" | "lg";
  type?: string;
  onClick?: (event: any) => Promise<void>;
}

const LoaderButton: FC<Props> = ({
  isLoading,
  className = "",
  disabled = false,
  children,
  size = "sm",
  type = "primary",
  onClick,
}) => (
  <Button
    disabled={disabled || isLoading}
    className={`LoaderButton ${className}`}
    size={size}
    type={type}
    onClick={onClick}
  >
    {isLoading && <BsArrowRepeat className="spinning" />}
    {children}
  </Button>
);

export default LoaderButton;
