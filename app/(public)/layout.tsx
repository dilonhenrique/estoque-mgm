export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-screen min-h-screen justify-center items-center">
      {children}
    </div>
  );
}
