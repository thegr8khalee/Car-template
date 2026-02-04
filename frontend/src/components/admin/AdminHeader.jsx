import React from 'react';
import { Menu, Bell, LogOut, User, MessageSquare, Star, Car, Search, ChevronDown } from 'lucide-react';
import { useUserAuthStore } from '../../store/useUserAuthStore';
import { useDashboardStore } from '../../store/useDasboardStore';

const AdminHeader = ({ toggleSidebar, activeSection, setActiveSection }) => {
  const { authUser, logout } = useUserAuthStore();
  const { dashboardStats } = useDashboardStore();

  const pendingComments = dashboardStats?.engagement?.pendingComments || 0;
  const pendingReviews = dashboardStats?.engagement?.pendingReviews || 0;
  const pendingSellRequests = dashboardStats?.sellingToUs?.pending || 0;
  
  const totalNotifications = pendingComments + pendingReviews + pendingSellRequests;

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard Overview',
      'Overview': 'Dashboard Overview',
      'Listings': 'Vehicle Inventory',
      'Profitability': 'Profitability Analytics',
      'SellingToUs': 'Sell Requests',
      'Blogs': 'Blog Management',
      'Staffs': 'Staff Management',
      'Users': 'User Management',
      'Newsteller': 'Newsletter',
      'Comments': 'Comment Moderation',
      'Reviews': 'Review Management',
    };
    return titles[activeSection] || activeSection.replace('-', ' ');
  };

  return (
    <header className="bg-white rounded-2xl shadow-sm mb-6 sticky top-0 z-30 border border-gray-100">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Menu + Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Manage your dealership</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search (Desktop) */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-40 placeholder:text-gray-400"
              />
            </div>

            {/* Notifications */}
            <div className="dropdown dropdown-end">
              <button 
                tabIndex={0} 
                className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {totalNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
                )}
              </button>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-xs text-gray-500">{totalNotifications} pending items</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {totalNotifications === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">All caught up!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {pendingComments > 0 && (
                        <button 
                          onClick={() => setActiveSection('Comments')} 
                          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900">{pendingComments} New Comments</p>
                            <p className="text-xs text-gray-500">Awaiting moderation</p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </button>
                      )}
                      {pendingReviews > 0 && (
                        <button 
                          onClick={() => setActiveSection('Reviews')} 
                          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Star className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900">{pendingReviews} New Reviews</p>
                            <p className="text-xs text-gray-500">Awaiting approval</p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </button>
                      )}
                      {pendingSellRequests > 0 && (
                        <button 
                          onClick={() => setActiveSection('SellingToUs')} 
                          className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Car className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900">{pendingSellRequests} Sell Requests</p>
                            <p className="text-xs text-gray-500">Action needed</p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="dropdown dropdown-end">
              <button 
                tabIndex={0} 
                className="flex items-center gap-2 p-1.5 pr-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  {authUser?.avatar ? (
                    <img src={authUser.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 truncate">{authUser?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-500 capitalize">{authUser?.role || 'Administrator'}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={logout} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
