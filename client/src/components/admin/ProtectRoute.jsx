

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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

export default ProtectRoute;
