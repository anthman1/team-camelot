import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  children?: ReactNode;
}

export function Card({
  variant,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "card",
    variant && `card--${variant}`,
    `card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
