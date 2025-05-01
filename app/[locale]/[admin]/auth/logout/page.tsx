import LogoutForm from "@/app/components/forms/logoutForm";
import { auth } from "@/auth";

export default async function LogoutPage() {
    const session = await auth();
    if (!session) return <div>Not authenticated</div>;
    return (
        <div>
            <h5>Are you sure you want to sign out?</h5>
            <LogoutForm/>
        </div>
    );
}