import { useParams } from "react-router-dom"

export default function UserPage() {
    const userId = useParams()
    return (<>
        <div className="user">
            {userId.id}
        </div>
    </>)
}