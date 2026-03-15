import { createFileRoute } from "@tanstack/react-router";
import { Card, Text, useTheme } from "@team-camelot/ui";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: "8",
        gap: "8",
      })}
    >
      <Text as="h1" variant="heading" className={css({ fontSize: "4xl" })}>
        Team Camelot
      </Text>

      <Text as="p" muted>
        A companion app for in-person tabletop RPG play
      </Text>

      <Card
        className={css({
          maxWidth: "md",
          width: "100%",
          bg: "bg.surface",
          borderWidth: "1px",
          borderColor: "border",
          borderRadius: "md",
          boxShadow: "sm",
          p: "4",
        })}
      >
        <div className={css({ display: "flex", flexDirection: "column", gap: "4" })}>
          <Text as="h2" variant="heading" className={css({ fontSize: "lg" })}>
            Current Theme: {theme}
          </Text>

          <Text>Who am I? Where am I? What can I do here?</Text>

          <button
            onClick={toggleTheme}
            className={css({
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "medium",
              borderRadius: "md",
              cursor: "pointer",
              transition: "all 0.2s",
              bg: "accent",
              color: "accent.fg",
              h: "10",
              px: "4",
              fontSize: "md",
              _hover: { opacity: 0.9 },
            })}
          >
            Switch Theme
          </button>
        </div>
      </Card>

      <div
        className={css({ display: "flex", gap: "4", flexWrap: "wrap", justifyContent: "center" })}
      >
        <Card
          className={css({
            bg: "bg.surface",
            borderWidth: "1px",
            borderColor: "border",
            borderRadius: "md",
            boxShadow: "sm",
            p: "3",
          })}
        >
          <Text variant="mono" className={css({ fontSize: "sm" })}>
            Nineties: CRT green-on-black
          </Text>
        </Card>
        <Card
          className={css({
            bg: "bg.surface",
            borderWidth: "1px",
            borderColor: "border",
            borderRadius: "md",
            boxShadow: "sm",
            p: "3",
          })}
        >
          <Text variant="mono" className={css({ fontSize: "sm" })}>
            Paperwhite: Neutral cream, serif
          </Text>
        </Card>
        <Card
          className={css({
            bg: "bg.surface",
            borderWidth: "1px",
            borderColor: "border",
            borderRadius: "md",
            boxShadow: "sm",
            p: "3",
          })}
        >
          <Text variant="mono" className={css({ fontSize: "sm" })}>
            Medieval: Parchment, calligraphic
          </Text>
        </Card>
      </div>
    </div>
  );
}
