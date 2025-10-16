import { Theme } from "../../components/theme";
import { Card } from "../../components/ui/card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center relative bg-background">
      <div className="absolute top-4 right-4">
        <Theme />
      </div>
      <Card className="w-[450px]  px-6 pt-8">{children}</Card>
    </div>
  );
}
