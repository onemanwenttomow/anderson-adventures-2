import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  shortcuts: {
    'num-pad-li': 'py-2 px-4 bg-gray-600 font-semibold rounded-lg shadow-md text-center select-none',
  },
  variants: {},
  plugins: [],
});
