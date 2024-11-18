/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx,vue,edge}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#1e293b',
        'card-color': '#374151',
        'h-card-color': '#4b5563',
        'nav-color': '#0f172a',
        'card-border-color': '#1f2937',
        'text-color': '#f3f4f6',
      },
    },
  },

  plugins: [],
}
