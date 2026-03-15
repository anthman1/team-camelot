import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card, Text } from "@team-camelot/ui";
import { css } from "../../styled-system/css";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export const Route = createFileRoute("/dev/join/$gameId/$username")({
  component: DevJoinPage,
});

function DevJoinPage() {
  const { gameId, username } = Route.useParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const joinMutation = useMutation({
    mutationFn: async () => {
      const response = await api.auth.devJoin(gameId, username);
      return response;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate({ to: "/" });
    },
  });

  // Auto-join on mount (only in dev mode)
  useEffect(() => {
    if (!joinMutation.isPending && !joinMutation.isSuccess && !joinMutation.isError) {
      joinMutation.mutate();
    }
  }, []);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: "8",
      })}
    >
      <Card
        className={css({
          bg: "bg.surface",
          borderWidth: "1px",
          borderColor: "border",
          borderRadius: "md",
          boxShadow: "sm",
          p: "4",
        })}
      >
        {joinMutation.isPending && <Text>Joining as {username}...</Text>}
        {joinMutation.isError && <Text>Error: {joinMutation.error.message}</Text>}
        {joinMutation.isSuccess && <Text>Joined successfully! Redirecting...</Text>}
      </Card>
    </div>
  );
}
