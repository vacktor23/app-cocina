import { useParams, useLocation } from 'react-router'

import { Recipes } from './Recipes'

export const Profile = () => {
    const { username } = useParams()
    const { state: { userId } } = useLocation()

    return <div>
        <h1 className="px-[var(--padding-x)] text-xl flex justify-center">{username}</h1>

        <Recipes targetUserId={userId} />
    </div>
}