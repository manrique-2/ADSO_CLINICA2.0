// layout.tsx
// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
export default function tratamientoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
