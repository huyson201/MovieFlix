import React from 'react'
import withAuth from '../../HOC/withAuth'
import Wrapper from '../../components/Wrapper/Wrapper'
import { AuthState } from '../../context/auth/auth.context'
import RequireAuth, { RequireAuthContent } from '../../components/RequireAuth/RequireAuth'
import { MdSwitchAccount } from 'react-icons/md'
import AuthInfo from '../../components/AuthInfo/AuthInfo'


type Props = {}

const Profile = ({ auth }: Props & { auth: AuthState | null }) => {
    return (
        <div className='pt-20 pb-12 bg-black-2'>
            <section className='py-[9px] bg-black-2'>
                <Wrapper>
                    {!auth?.isLogged ? <RequireAuth content={<RequireAuthContent
                        icon={<MdSwitchAccount />}
                        title='Your profile'
                        description='Sign in to view and update your profile.' />}
                    /> : (
                        <AuthInfo auth={auth} />

                    )}
                </Wrapper>
            </section>
        </div>
    )
}

const WithAuthProfile = withAuth(Profile)
const ProfileWrapper = () => {
    return <WithAuthProfile />
}
export default ProfileWrapper