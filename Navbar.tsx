import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const navigate = (path: string) => {
    setLocation(path);
  };

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={user ? '/dashboard' : '/'} className="text-xl font-bold text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-home">
            SHARE Gateway
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button 
                  variant={location === '/dashboard' ? 'default' : 'ghost'}
                  onClick={() => navigate('/dashboard')}
                  data-testid="button-dashboard"
                >
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleSignOut} data-testid="button-signout">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant={location === '/login' ? 'default' : 'ghost'}
                  onClick={() => navigate('/login')}
                  data-testid="button-login"
                >
                  Login
                </Button>
                <Button 
                  variant={location === '/register' ? 'default' : 'ghost'}
                  onClick={() => navigate('/register')}
                  data-testid="button-register"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-2">
            {user ? (
              <>
                <Button 
                  variant={location === '/dashboard' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  data-testid="button-dashboard-mobile"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start"
                  data-testid="button-signout-mobile"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant={location === '/login' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  data-testid="button-login-mobile"
                >
                  Login
                </Button>
                <Button 
                  variant={location === '/register' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  data-testid="button-register-mobile"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
