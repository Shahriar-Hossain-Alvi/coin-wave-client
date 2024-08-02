import PropTypes from 'prop-types';


const SectionHeading = ({ title }) => {
    return (
        <h1 className="text-center mt-5 font-bold text-3xl text-cwViolate uppercase underline">{title}</h1>
    );
};

SectionHeading.propTypes = {
    title: PropTypes.string
}

export default SectionHeading;