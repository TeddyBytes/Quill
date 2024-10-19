// app/(auth)/login/page.tsx
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      {/* Logo and Brand */}
      <div className="mb-8 flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Feather className="w-8 h-8 text-indigo-600" />
          <span className="font-medium text-2xl text-gray-900">quill</span>
        </div>
        <h1 className="text-4xl font-semibold text-gray-900 text-center">
          Document Your Journey
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-md">
          Record your experiences, track your growth, and shape your career path
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Welcome to Quill</h2>
            <p className="text-gray-500 text-sm">
              Sign in to start recording your experiences
            </p>
          </div>

          <Button 
            variant="outline" 
            size="lg"
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => {/* Add your Google sign-in logic here */}}
          >
            <img 
              src="/google-logo.svg" 
              alt="Google" 
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </Button>

          <div className="text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>
            {" "}and{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}