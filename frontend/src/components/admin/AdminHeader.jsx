import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, LogOut, User, MessageSquare, Star, Car, Search, ChevronDown, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthStore } from '../../store/useUserAuthStore';
import { useDashboardStore } from '../../store/useDasboardStore';

const AdminHeader = ({ toggleSidebar, activeSection, setActiveSection }) => {
  const { authUser, logout } = useUserAuthStore();
  const { dashboardStats } = useDashboardStore();

  const pendingComments = dashboardStats?.engagement?.pendingComments || 0;
  const pendingReviews = dashboardStats?.engagement?.pendingReviews || 0;
  const pendingSellRequests = dashboardStats?.sellingToUs?.pending || 0;
  
  const totalNotifications = pendingComments + pendingReviews + pendingSellRequests;

  // Search Logic
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const searchableItems = [
    { id: 'dashboard', label: 'Dashboard Overview', type: 'page', section: 'overview' },
    { id: 'listings', label: 'Vehicle Inventory', type: 'page', section: 'Listings' },
    { id: 'profitability', label: 'Profitability Analytics', type: 'page', section: 'Profitability' },
    { id: 'selling', label: 'Sell Requests', type: 'page', section: 'SellingToUs' },
    { id: 'blogs', label: 'Blog Management', type: 'page', section: 'Blogs' },
    { id: 'staff', label: 'Staff Management', type: 'page', section: 'Staffs' },
    { id: 'users', label: 'User Management', type: 'page', section: 'Users' },
    { id: 'newsletter', label: 'Newsletter', type: 'page', section: 'Newsteller' },
    { id: 'comments', label: 'Comment Moderation', type: 'page', section: 'Comments' },
    { id: 'reviews', label: 'Review Management', type: 'page', section: 'Reviews' },
    { id: 'analytics', label: 'Analytics', type: 'page', section: 'Analytics' },
    { id: 'add-listing', label: 'Add New Car', type: 'action', path: '/admin/cars/new' },
    { id: 'add-blog', label: 'Write New Blog', type: 'action', path: '/admin/blogs/new' },
    { id: 'add-staff', label: 'Add New Staff', type: 'action', path: '/admin/staff/add' },
    { id: 'check-profit', label: 'Check Profitability', type: 'action', section: 'Profitability' },
    { id: 'manage-users', label: 'Manage Users', type: 'action', section: 'Users' },
    { id: 'pending-comments', label: 'View Pending Comments', type: 'action', section: 'Comments' },
    { id: 'pending-reviews', label: 'View Pending Reviews', type: 'action', section: 'Reviews' },
    { id: 'pending-requests', label: 'View Sell Requests', type: 'action', section: 'SellingToUs' },
  ];

  const filteredItems = searchableItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      setActiveSection(item.section);
    }
    setSearchQuery('');
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div className="relative hidden md:block" ref={searchRef}>
              <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/10">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search pages or actions..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder:text-gray-400"
                />
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredItems.length > 0 ? (
                    <ul className="py-2 max-h-64 overflow-y-auto">
                      {filteredItems.map(item => (
                        <li key={item.id}>
                          <button 
                            onClick={() => handleSearchSelect(item)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg ${item.type === 'action' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                                {item.type === 'action' ? (
                                  <MoveRight className={`w-3 h-3 ${item.type === 'action' ? 'text-amber-600' : 'text-blue-600'}`} />
                                ) : (
                                  <Search className="w-3 h-3 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">{item.label}</p>
                                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
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
