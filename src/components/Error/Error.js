import PropTypes from 'prop-types';

const Error = (message) => {
    return <p>Whoops, something went wrong: {message}</p>;
}

export default Error;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};