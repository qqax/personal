import { auth } from "@/auth";

export default async function Cms() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    return (<div>You are registered</div>)
}