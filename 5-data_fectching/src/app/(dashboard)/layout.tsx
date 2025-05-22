export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <h1 className="text-3xl">DASHBOARD</h1>
            {children}
        </div>
    );
  }