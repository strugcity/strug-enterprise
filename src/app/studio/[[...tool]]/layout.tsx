export const metadata = {
  title: "Strug City Studio",
  description: "Sanity Studio for Strug City content management",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}
