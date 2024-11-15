import PropTypes from "prop-types";

const Error = ({ errorMessage }) => {
  return (
    <main className="flex-center w-full h-full">
      <h1 className="text-18 text-red-400">{errorMessage}</h1>
    </main>
  );
};

export default Error;

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
