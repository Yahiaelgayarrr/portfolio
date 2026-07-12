/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05060a',
        'bg-2': '#0a0c12',
        accent: '#38e1ff',
        'accent-2': '#7c9bff',
        muted: '#9aa3b2',
        faint: '#5b6472',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1180px' },
    },
  },
  plugins: [],
};
