import ProtectedPage from "@/src/components/auth/ProtectedPage";

// layout.tsx
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div>

    <ProtectedPage allowedRoles={["admin", "medico", "enfermero"]}>
      <div>{children}</div>;
    </ProtectedPage>
    // </div>
  );
}
