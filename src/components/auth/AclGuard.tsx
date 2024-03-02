// ** React Imports
import { ReactNode } from 'react';

// ** Types
import { ACLObj, AppAbility, buildAbilityFor } from 'src/configs/acl';
import BlankLayout from 'src/views/layouts/BlankLayout';
import NoAuthorized from 'src/pages/401';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { AbilityContext } from 'src/components/acl/Can';

interface AclGuardProps {
    children: ReactNode;
    authGuard?: boolean;
    guestGuard?: boolean;
    aclAbilities: ACLObj;
}

const AclGuard = (props: AclGuardProps) => {
    // ** Props
    const { aclAbilities, children, guestGuard = false, authGuard = true } = props;
    const router = useRouter();

    const auth = useAuth();
    const permissionUser = auth.user?.role.permissions ?? [];

    let ability: AppAbility;

    // Xây dựng permission cho user
    if (auth.user && !ability) {
        ability = buildAbilityFor(permissionUser, aclAbilities.subject);
    }

    // If guest guard or no guard (no need to login) or error page, don't have to build permission
    if (guestGuard || !authGuard || router.route === '/500' || router.route === '/404') {
        if (auth.user && ability) {
            return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
        } else {
            return children;
        }
    }

    // Check the access of user
    // Check ability is built successfully, user is logged in and user have permission
    if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
        return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
    }

    return (
        <BlankLayout>
            <NoAuthorized />
        </BlankLayout>
    );
};

export default AclGuard;
