import { defineConfig } from "@pandacss/dev";

// Custom fonts per theme
const fonts = {
  nineties: {
    body: '"Press Start 2P", monospace',
    heading: '"Press Start 2P", monospace',
    mono: '"Press Start 2P", monospace',
  },
  paperwhite: {
    body: '"Crimson Pro", Georgia, serif',
    heading: '"Crimson Pro", Georgia, serif',
    mono: '"IBM Plex Mono", monospace',
  },
  medieval: {
    body: '"Cinzel", "Times New Roman", serif',
    heading: '"Uncial Antiqua", "Cinzel", serif',
    mono: '"Fira Code", monospace',
  },
};

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],

  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],

  jsxFramework: "react",
  outdir: "styled-system",

  theme: {
    extend: {
      recipes: {
        button: {
          className: "button",
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "medium",
            borderRadius: "md",
            cursor: "pointer",
            transition: "all 0.2s",
            _disabled: {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          },
          variants: {
            variant: {
              solid: {
                bg: "accent",
                color: "accent.fg",
                _hover: { opacity: 0.9 },
              },
              outline: {
                borderWidth: "1px",
                borderColor: "border",
                bg: "transparent",
                _hover: { bg: "bg.muted" },
              },
              ghost: {
                bg: "transparent",
                _hover: { bg: "bg.muted" },
              },
            },
            size: {
              sm: { h: "8", px: "3", fontSize: "sm" },
              md: { h: "10", px: "4", fontSize: "md" },
              lg: { h: "12", px: "6", fontSize: "lg" },
            },
          },
          defaultVariants: {
            variant: "solid",
            size: "md",
          },
        },
        input: {
          className: "input",
          base: {
            display: "flex",
            width: "100%",
            borderWidth: "1px",
            borderColor: "border",
            borderRadius: "md",
            bg: "bg.surface",
            color: "fg",
            px: "3",
            py: "2",
            fontSize: "md",
            transition: "all 0.2s",
            _placeholder: { color: "fg.subtle" },
            _focus: {
              outline: "none",
              borderColor: "accent",
              boxShadow: "sm",
            },
            _disabled: {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          },
          variants: {
            size: {
              sm: { h: "8", fontSize: "sm" },
              md: { h: "10", fontSize: "md" },
              lg: { h: "12", fontSize: "lg" },
            },
          },
          defaultVariants: {
            size: "md",
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: {
              value: {
                base: "{colors.neutral.50}",
                _dark: "{colors.neutral.950}",
                _nineties: "#0a0a0a",
                _paperwhite: "#f5f2eb",
                _medieval: "#d4c4a8",
              },
            },
            surface: {
              value: {
                base: "{colors.white}",
                _dark: "{colors.neutral.900}",
                _nineties: "#1a1a1a",
                _paperwhite: "#faf8f3",
                _medieval: "#e8dcc8",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _dark: "{colors.neutral.800}",
                _nineties: "#2a2a2a",
                _paperwhite: "#ebe6dc",
                _medieval: "#c9b896",
              },
            },
          },
          fg: {
            DEFAULT: {
              value: {
                base: "{colors.neutral.950}",
                _dark: "{colors.neutral.50}",
                _nineties: "#00ff00",
                _paperwhite: "#2c2c2c",
                _medieval: "#3d2914",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.600}",
                _dark: "{colors.neutral.400}",
                _nineties: "#00cc00",
                _paperwhite: "#666666",
                _medieval: "#5c4023",
              },
            },
            subtle: {
              value: {
                base: "{colors.neutral.400}",
                _dark: "{colors.neutral.600}",
                _nineties: "#008800",
                _paperwhite: "#999999",
                _medieval: "#7a5c3d",
              },
            },
          },
          accent: {
            DEFAULT: {
              value: {
                base: "{colors.neutral.900}",
                _dark: "{colors.neutral.100}",
                _nineties: "#00ff00",
                _paperwhite: "#8b4513",
                _medieval: "#8b0000",
              },
            },
            fg: {
              value: {
                base: "{colors.white}",
                _dark: "{colors.neutral.950}",
                _nineties: "#000000",
                _paperwhite: "#ffffff",
                _medieval: "#f5e6d3",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _dark: "{colors.neutral.800}",
                _nineties: "#003300",
                _paperwhite: "#d4a574",
                _medieval: "#a52a2a",
              },
            },
          },
          border: {
            DEFAULT: {
              value: {
                base: "{colors.neutral.200}",
                _dark: "{colors.neutral.800}",
                _nineties: "#00ff00",
                _paperwhite: "#c9c0b0",
                _medieval: "#8b7355",
              },
            },
            muted: {
              value: {
                base: "{colors.neutral.100}",
                _dark: "{colors.neutral.900}",
                _nineties: "#004400",
                _paperwhite: "#ddd6c8",
                _medieval: "#a89070",
              },
            },
          },
        },
        fonts: {
          body: {
            value: {
              base: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
              _nineties: fonts.nineties.body,
              _paperwhite: fonts.paperwhite.body,
              _medieval: fonts.medieval.body,
            },
          },
          heading: {
            value: {
              base: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
              _nineties: fonts.nineties.heading,
              _paperwhite: fonts.paperwhite.heading,
              _medieval: fonts.medieval.heading,
            },
          },
          mono: {
            value: {
              base: '"Fira Code", "Fira Mono", Menlo, monospace',
              _nineties: fonts.nineties.mono,
              _paperwhite: fonts.paperwhite.mono,
              _medieval: fonts.medieval.mono,
            },
          },
        },
        shadows: {
          sm: {
            value: {
              base: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              _nineties: "0 0 4px #00ff00",
              _paperwhite: "0 1px 2px rgb(0 0 0 / 0.08)",
              _medieval: "2px 2px 4px rgb(0 0 0 / 0.2)",
            },
          },
          md: {
            value: {
              base: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              _nineties: "0 0 8px #00ff00",
              _paperwhite: "0 2px 4px rgb(0 0 0 / 0.1)",
              _medieval: "3px 3px 6px rgb(0 0 0 / 0.25)",
            },
          },
          lg: {
            value: {
              base: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              _nineties: "0 0 16px #00ff00",
              _paperwhite: "0 4px 8px rgb(0 0 0 / 0.12)",
              _medieval: "4px 4px 10px rgb(0 0 0 / 0.3)",
            },
          },
        },
      },
    },
  },

  conditions: {
    extend: {
      nineties: "[data-theme=nineties] &",
      paperwhite: "[data-theme=paperwhite] &",
      medieval: "[data-theme=medieval] &",
    },
  },

  globalCss: {
    html: {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "body",
    },
    body: {
      minHeight: "100vh",
    },
  },
});
