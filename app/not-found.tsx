import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] font-inter">
      <Card className="w-full max-w-md mx-4 border-[#E6E6E6] rounded-[13px] bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <CardTitle className="text-xl font-inter-tight">404 Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[#171717]/60 text-sm font-inter-tight">
            The page you are looking for does not exist.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-[#369762] hover:underline font-inter-tight font-medium">
            Return to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
