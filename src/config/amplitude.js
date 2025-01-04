const initAmplitude = () => {
  if (window.amplitude) {
    window.amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY);
  }
};

export { initAmplitude };
