

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    if (!user) {
        return null;  // or a loading spinner if user data is loading
    }

    if (user.role !== 'recruiter') {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

ProtectRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures `children` is a valid React node and required
};

export default ProtectRoute;
