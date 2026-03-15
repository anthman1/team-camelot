import type { HTMLAttributes, ReactNode } from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  variant?: "body" | "heading" | "label" | "caption" | "mono";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  muted?: boolean;
  children?: ReactNode;
}

export function Text({
  as: Component = "span",
  variant = "body",
  size,
  muted,
  className = "",
  ...props
}: TextProps) {
  const classes = [
    "text",
    `text--${variant}`,
    size && `text--${size}`,
    muted && "text--muted",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes} {...props} />;
}
