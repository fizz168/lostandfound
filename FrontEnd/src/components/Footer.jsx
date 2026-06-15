function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 py-6 text-center text-xs text-gray-400">
      <div className="mb-1 font-semibold text-gray-500">Lost&amp;Found — Making campus life easier, one item at a time</div>
      <div className="flex justify-center gap-4">
        {["About","Contact","Privacy","Terms"].map(l => <a key={l} href="#" className="hover:text-gray-600 transition-colors">{l}</a>)}
      </div>
      <div className="mt-2">© 2026 University Lost & Found System. All rights reserved.</div>
    </footer>
  );
}

export default Footer;