"use client";
import { useRole } from "@/context/RoleContext";
import { PatientDashboard } from "@/components/patient/Dashboard/patientDashboard";
import { ClinicianDashboard } from "@/components/clinician/Dashboard/clinicianDashboard";


export default function Dashboard() {
  const { role } = useRole();
  const convertRole = role.replace(/^"(.*)"$/, "$1");
  return <div>{convertRole === "patient" ? <PatientDashboard /> : <ClinicianDashboard />}</div>;
}
