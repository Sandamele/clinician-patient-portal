import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";

export function Navigation() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { role, setRole } = useRole();

  const patientUrls = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/ai-assistant", name: "AI Assistant" },
  ];
  const clinicianUrls = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/patient-lookup", name: "Patient Lookup" },
    { url: "/ai-assistant", name: "AI Assistant" },
  ];

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const handleSwitchAccount = () => {
    if (user?.role === "clinician") {
      const newRole = role === "clinician" ? "patient" : "clinician";
      setRole(newRole);
    } else {
      signOut();
      localStorage.removeItem("role");
      router.push("/signin");
    }
  };

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("role");
    router.push("/signin");
  };

  return (
    <nav className="flex items-center justify-between mx-6 my-4
      bg-slate-400 dark:bg-slate-800
      text-slate-800 dark:text-slate-100
      py-3 px-6 rounded-4xl shadow-xl transition-colors">
      <div>Logo</div>
      <ul className="flex items-center gap-x-2 font-medium">
        {role === "patient"
          ? patientUrls.map((patientUrl) => (
            <li key={patientUrl.url} className="cursor-pointer">
              <Link href={patientUrl.url}>{patientUrl.name}</Link>
            </li>
          ))
          : clinicianUrls.map((clinicianUrl) => (
            <li key={clinicianUrl.url} className="cursor-pointer">
              <Link href={clinicianUrl.url}>{clinicianUrl.name}</Link>
            </li>
          ))}
      </ul>
      <ul className="flex items-center gap-x-2 font-medium">
        <li
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleSwitchAccount}
        >
          Switch Account ({role}) <Switch /> |
        </li>
        <li onClick={handleSignOut} className="cursor-pointer">
          Logout |
        </li>
        <li>
          <Image
            src={user?.avatar || placeholderImage}
            alt={"user-avatar"}
            width={25}
            height={25}
            className="rounded-4xl border border-slate-300 dark:border-slate-600"
          />
        </li>
      </ul>
    </nav>
  );
}
