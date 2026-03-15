import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md" | "lg";
}

export function Input({ inputSize = "md", className = "", ...props }: InputProps) {
  const classes = `input input--${inputSize} ${className}`.trim();
  return <input className={classes} {...props} />;
}
