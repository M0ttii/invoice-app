import Settings from "@/components/ui/Settings/Settings";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense>
      <Settings></Settings>
    </Suspense>
  );
}