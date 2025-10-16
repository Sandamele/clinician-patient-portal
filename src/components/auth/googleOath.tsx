import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

export function GoogleOath({
  label,
  onClick,
  loading = false,
}: {
  label: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <Button type="button" className="w-full my-4 cursor-pointer" variant="outline" onClick={onClick} disabled={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <span className="flex items-center gap-2">
          <FaGoogle /> {label} with Google
        </span>
      )}
    </Button>
  );
}
