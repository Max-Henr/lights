import "./MobileMenu.css";
import { LayoutDashboard, Settings, Sun } from "lucide-react";

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <nav className="mobile-nav">
        <a href="/">
          <LayoutDashboard color="var(--primary)" />
        </a>
        <Sun color="var(--primary)" size={36} />
        <a href="/settings">
          <Settings color="var(--primary)" />
        </a>
      </nav>
    </div>
  );
}
