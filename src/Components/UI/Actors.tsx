import { FC } from "react";
interface ActorsProps {
    actor: { original_name: string, profile_path: string, id: number }
}
const Actors: FC<ActorsProps> = ({actor}) => {
    const img = import.meta.env.VITE_FULL_IMG
    return (
        <div className="actors">
            <img src={img+actor.profile_path} alt="" />
            <p className="actors_name">{actor.original_name}</p>
        </div>
    )
}

export default Actors