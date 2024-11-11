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
const PX_ENTRIES_200 = createPxEntries(200);
const PX_ENTRIES_1440 = createPxEntries(1440);

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_200,
    spacing: PX_ENTRIES_1440,
    zIndex: {
      header: "30",
      modal: "40",
      modalDropDown: "50",
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 2.5s linear",
      },
    },
  },
  plugins: [],
};
