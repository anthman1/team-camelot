import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

export function Button({ variant = "solid", size = "md", className = "", ...props }: ButtonProps) {
  // Classes will be applied via Panda CSS in the consuming app
  const classes = `button button--${variant} button--${size} ${className}`.trim();
  return <button className={classes} {...props} />;
}
