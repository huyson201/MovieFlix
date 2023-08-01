import { ComponentType } from "react";
import { AuthState, useAuth } from "../context/auth/auth.context";
import { AuthContextConsumer } from "../context/auth/auth.context";

interface WithAuthProps {
    auth: AuthState | null
}

function withAuth<P extends object>(
    Component: React.ComponentType<P & WithAuthProps>,
): React.FunctionComponent<P> {
    return (props: P) => {
        return (
            <AuthContextConsumer>
                {(auth) => {
                    return <Component {...props} auth={auth} />
                }}
            </AuthContextConsumer>
        );
    };
}
export default withAuth