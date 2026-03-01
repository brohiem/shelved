export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white/60 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-display text-xl font-bold text-white mb-1">
          Shelved
        </p>
        <p className="text-sm mb-4">A demo bookstore app</p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Shelved. Built with React, Tailwind
          CSS, and Node.js
        </p>
      </div>
    </footer>
  );
}
