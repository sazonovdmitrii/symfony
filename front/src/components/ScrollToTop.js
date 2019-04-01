import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        const { history, location } = this.props;

        if (location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);

            if (!/\/$/.test(location.pathname)) history.replace(`${location.pathname}/`);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
