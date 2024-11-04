/** @type {import('tailwindcss').Config} */

const createPxEntries = (size) => {
  return {
    0: "0",
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i}`]: `${i / 16}rem` };
    }),
  };
};

const PX_ENTRIES_10 = createPxEntries(10);
const PX_ENTRIES_100 = createPxEntries(100);
const PX_ENTRIES_1200 = createPxEntries(1200);

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_100,
    spacing: PX_ENTRIES_1200,
    extend: {},
  },
  plugins: [],
};
