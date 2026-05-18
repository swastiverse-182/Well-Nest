function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} WellNest · Your Wellness Companion
      </div>
    </footer>
  );
}

export default Footer;
