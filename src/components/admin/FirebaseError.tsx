
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function FirebaseError() {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Firebase Configuration Error</AlertTitle>
            <AlertDescription>
                <p>The application failed to connect to Firebase. This is likely because the necessary environment variables are not set.</p>
                <p className="mt-4">Please ensure you have a <strong>.env</strong> file in your project root with the following variables:</p>
                <ul className="list-disc list-inside mt-2 font-mono text-xs bg-gray-800 text-white p-4 rounded-md">
                    <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
                    <li>FIREBASE_CLIENT_EMAIL</li>
                    <li>FIREBASE_PRIVATE_KEY</li>
                </ul>
                 <p className="mt-4">You can find these values in your Firebase project settings under "Service Accounts". After adding them, please restart the development server.</p>
            </AlertDescription>
        </Alert>
    );
}
