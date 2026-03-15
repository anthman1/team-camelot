import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { css } from "../../styled-system/css";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div
      className={css({
        minHeight: "100vh",
        bg: "bg.canvas",
        color: "fg",
      })}
    >
      <Outlet />
    </div>
  );
}
