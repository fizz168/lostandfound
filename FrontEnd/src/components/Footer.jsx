function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-black bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#F0C020]">
          Lost&amp;Found
        </div>
        <div className="mb-4 text-base font-semibold text-white">
          Making campus life easier, one item at a time.
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-white/80">
          {['About', 'Contact', 'Privacy', 'Terms'].map((l) => (
            <a key={l} href="#" className="hover:text-[#F0C020] transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="text-sm text-white/60">© 2026 University Lost & Found System. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer;