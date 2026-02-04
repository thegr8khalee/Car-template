// src/components/Admin/AdminSidebar.jsx
import React from 'react';
import { 
  LogOut, 
  UserRound, 
  X, 
  LayoutDashboard, 
  Car, 
  TrendingUp, 
  HandCoins, 
  FileText, 
  Users, 
  UserCog, 
  Mail, 
  MessageSquare, 
  Star,
  BarChart3 
} from 'lucide-react';
import { useUserAuthStore } from '../../store/useUserAuthStore';
import branding from '../../config/branding';

const AdminSidebar = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  closeSidebar,
}) => {
  const { authUser, logout } = useUserAuthStore();

  const navItems = [
    { id: 'Overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'Analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'Listings', name: 'Listings', icon: Car },
    { id: 'Profitability', name: 'Profitability', icon: TrendingUp },
    { id: 'SellingToUs', name: 'Selling To Us', icon: HandCoins },
    { id: 'Blogs', name: 'Blogs', icon: FileText },
    { id: 'Staffs', name: 'Staff', icon: UserCog },
    { id: 'Users', name: 'Users', icon: Users },
    { id: 'Newsteller', name: 'Newsletter', icon: Mail },
    { id: 'Comments', name: 'Comments', icon: MessageSquare },
    { id: 'Reviews', name: 'Reviews', icon: Star },
  ];

  const handleNavigationClick = (sectionId) => {
    setActiveSection(sectionId);
    closeSidebar();
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50
        w-72 bg-secondary text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header with Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">{branding.company.name}</h1>
              <p className="text-xs text-white/50">Admin Panel</p>
            </div>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigationClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary text-secondary shadow-lg shadow-primary/25' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-secondary' : 'text-white/50 group-hover:text-white'}`} />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            {authUser?.avatar ? (
              <img src={authUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <UserRound className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{authUser?.username || 'Admin'}</p>
            <p className="text-xs text-white/50 capitalize">{authUser?.role || 'Administrator'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
