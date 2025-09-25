import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

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
                <span className="text-sm font-bold text-primary-foreground">L</span>
              </div>
              <span className="text-xl font-bold">LearnPro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering professionals worldwide with industry-leading courses and career development programs.
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
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Mission & Vision</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Leadership Team</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Press & Media</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Partner with Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Student Success</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Course Catalog</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal & Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Accessibility</a></li>
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