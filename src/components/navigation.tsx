"use client";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { role, setRole } = useRole();
  const [menuOpen, setMenuOpen] = useState(false);

  const patientUrls = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/ai-assistant", name: "AI Assistant" },
  ];
  const clinicianUrls = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/patient-lookup", name: "Patient Lookup" },
    { url: "/ai-assistant", name: "AI Assistant" },
  ];

  const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const handleSwitchAccount = () => {
    if (user?.role === "clinician") {
      const newRole = role === "clinician" ? "patient" : "clinician";
      setRole(newRole);
    } else {
      signOut();
      localStorage.removeItem("role");
      router.push("/signin");
    }
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("role");
    router.push("/signin");
    setMenuOpen(false);
  };

  const links = role === "patient" ? patientUrls : clinicianUrls;

  return (
    <nav className="bg-slate-400 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-lg">Logo</div>

          <ul className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.url} href={link.url} className="hover:underline">
                {link.name}
              </Link>
            ))}
            <li onClick={handleSwitchAccount} className="flex items-center gap-2">
              Switch ({role}) <Switch />
            </li>
            <li onClick={handleSignOut}>Logout</li>
            <Image
              src={user?.avatar || placeholderImage}
              alt="user-avatar"
              width={32}
              height={32}
              className="rounded-full border border-slate-300 dark:border-slate-600"
            />
          </ul>

          <li className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </li>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden bg-slate-400 dark:bg-slate-800 px-4 pt-2 pb-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="block py-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <li onClick={handleSwitchAccount} className="flex items-center gap-2 py-2 w-full">
            Switch ({role}) <Switch />
          </li>
          <li onClick={handleSignOut} className="py-2 w-full text-left">
            Logout
          </li>
        </ul>
      )}
    </nav>
  );
}
