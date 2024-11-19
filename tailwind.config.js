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
        fadeInSlow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInFast: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulse: {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".6",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeInSlow: "fadeInSlow 3s linear",
        fadeInFast: "fadeInFast 1s linear",
        pulse: "pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
