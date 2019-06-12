import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const ScrollToTop = ({ location }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.key]);

    return null;
};

ScrollToTop.propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(ScrollToTop);
