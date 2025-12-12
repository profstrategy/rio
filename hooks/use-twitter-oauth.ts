'use client'
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useTwitterOAuth = () => {
    const session = useSession()
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const isConnected = searchParams.get("twitterConnected");

        if (isConnected) {
            toast.success("Twitter connected successfully!");

            // Remove the flag from the URL without reloading
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("twitterConnected");

            router.replace(`/?${newParams.toString()}`);
        }
    }, [searchParams]);

    const handleConnectTwitter = () => {
        signIn('twitter', { callbackUrl: '/?twitterConnected=1' })
    }

    const handleDashboard = () => {
        router.push('/')
    }

    return { handleConnectTwitter, handleDashboard, session };
}