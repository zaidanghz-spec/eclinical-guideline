import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, Search, Activity, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "About",
    "Pathways",
    "Services",
    "Resources",
    "Contact"
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-teal-600"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="bg-white rounded-lg p-2">
              <Activity className={`size-8 ${isScrolled ? "text-teal-600" : "text-teal-600"}`} />
            </div>
            <div>
              <h1 className={`text-xl transition-colors ${isScrolled ? "text-teal-600" : "text-white"}`}>
                Clinical Pathway
              </h1>
              <p className={`text-xs transition-colors ${isScrolled ? "text-gray-600" : "text-teal-100"}`}>
                Patient Care Excellence
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`transition-colors hover:scale-105 ${
                  isScrolled
                    ? "text-gray-700 hover:text-teal-600"
                    : "text-white hover:text-teal-200"
                }`}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Search & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${isScrolled ? "text-gray-400" : "text-gray-400"}`} />
              <Input
                placeholder="Search..."
                className="pl-10 w-48 bg-white"
              />
            </div>
            
            {/* User Profile & Logout */}
            {user && (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isScrolled ? "bg-teal-50" : "bg-white/20"}`}>
                  <User className={`size-4 ${isScrolled ? "text-teal-600" : "text-white"}`} />
                  <div className="text-left">
                    <p className={`text-sm ${isScrolled ? "text-teal-900" : "text-white"}`}>
                      {user.name}
                    </p>
                    <p className={`text-xs ${isScrolled ? "text-teal-600" : "text-teal-100"}`}>
                      {user.title || user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-2 ${isScrolled ? "border-teal-600 text-teal-600 hover:bg-teal-50" : "border-white text-white hover:bg-white/20"}`}
                >
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-gray-700" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-700" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block py-2 transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-teal-600"
                    : "text-white hover:text-teal-200"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}