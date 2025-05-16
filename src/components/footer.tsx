export default async function Footer() {
  return (
    <footer className="w-full border-t bg-muted mt-3 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {process.env.SITENAME}. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0"></div>
      </div>
    </footer>
  );
}
