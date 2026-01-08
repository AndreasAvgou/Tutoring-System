import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite" // Η νέα μέθοδος για v4
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Ενεργοποίηση του Tailwind
  ],
  resolve: {
    alias: {
      // Σωστό alias για Node 24 χωρίς __dirname
      "@": path.resolve(path.dirname(new URL(import.meta.url).pathname).substring(1), "src"),
    },
  },
})
