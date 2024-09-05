import './globals.css'; // Import global styles (if any)
import Navigation from '../components/Navigation';

export default function Layout({ children }) {
  return (
    <html lang="en">

      <body>
        <Navigation /> {/* Shared navigation */}
        <main>{children}</main> {/* Page-specific content */}
        <footer>
          <p>Footer Content Here</p> {/* Shared footer content */}
        </footer>
        
      </body>
    </html>
  );
}
