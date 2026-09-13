import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fons: "#0E1220",
        panell: "#1A2138",
        panellclar: "#2A3452",
        panellsobre: "#35406A",
        camp: "#0A0D18",
        missio: "#1F2740",
        missiofeta: "#161C2E",
        vora: "#E3DFD2",
        text: "#F2EFE6",
        apagat: "#97A0BA",
        exp: "#79C7C2",
        or: "#E3B961",
        perill: "#E2958A",
        perillvora: "#9E6055",
        perillfons: "#2E2233",
      },
      fontFamily: {
        menu: ["var(--font-menu)", "sans-serif"],
        xifra: ["var(--font-xifra)", "monospace"],
      },
      boxShadow: {
        panell:
          "0 3px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.10)",
        panellalt:
          "0 5px 0 rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.16), 0 0 24px rgba(227,185,97,0.20)",
      },
      keyframes: {
        entrada: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "60%": { opacity: "1", transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pujada: {
          "0%": { opacity: "0", transform: "scale(0.7)" },
          "45%": { opacity: "1", transform: "scale(1.08)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pampallugueig: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        entrada: "entrada 260ms ease-out",
        pujada: "pujada 520ms cubic-bezier(0.2, 0.9, 0.3, 1.2)",
        pampallugueig: "pampallugueig 900ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;