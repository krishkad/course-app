import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 pt-16 pb-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  L
                </span>
              </div>
              <span className="text-xl font-bold">LearnPro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering every individual — not just tech experts — to harness
              AI responsibly and creatively
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Mission & Vision
                </Link>
              </li>
             
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Course Catalog
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Press & Media
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Partner with Us
                </a>
              </li> */}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Events
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Student Success
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Course Catalog
                </a>
              </li> */}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
             
              <li>
                <Link
                  href="/refund-policy"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@learnpro.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1-800-LEARN-PRO</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-center items-center">
          <div className="text-sm text-muted-foreground">
            © {currentYear} LearnPro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
