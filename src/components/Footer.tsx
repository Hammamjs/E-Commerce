import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm border-t border-border/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              E-store
            </h3>
            <p className="text-foreground/60 mb-4">
              Redefining digital commerce with style and innovation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-foreground/60 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-foreground/60 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-foreground/60 hover:text-primary cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-foreground/60 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-foreground/60">
            © 2024 ModernShop. All rights reserved. Built with innovation and
            care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
