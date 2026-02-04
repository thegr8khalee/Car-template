// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AdminDashboardContent from '../components/admin/AdminDashboardContent';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminListings from '../components/admin/AdminListings';
import AdminBlogs from '../components/admin/AdminBlogs';
import AdminStaff from '../components/admin/AdminStaff';
import AdminUsers from '../components/admin/AdminUsers';
import AdminNewsTeller from '../components/admin/AdminNewsTeller';
import AdminComments from '../components/admin/AdminComments';
import Adminreviews from '../components/admin/Adminreviews';
import AdminSellingToUs from '../components/admin/AdminSellingToUs';
import UserDetailPage from '../components/admin/UserDetailPAge';
import InventoryProfitabilityDashboard from '../components/admin/InventoryProfitabilityDashboard';
import AdminAnalytics from '../components/admin/AdminAnalytics';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // For user detail view

  // Read from URL when page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, []);

  // Function to update state + URL together
  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    const params = new URLSearchParams(window.location.search);
    params.set('section', section);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <AdminDashboardContent setActiveSection={handleSetActiveSection} />
        );
      case 'Listings':
        return <AdminListings />;
      case 'Profitability':
        return <InventoryProfitabilityDashboard />;
      case 'SellingToUs':
        return <AdminSellingToUs />;
      case 'Blogs':
        return <AdminBlogs />;
      case 'Staffs':
        return <AdminStaff />;
      case 'Users':
        return <AdminUsers setActiveSection={handleSetActiveSection} setSelectedUser={setSelectedUser} />;
      case 'Newsteller':
        return <AdminNewsTeller />;
      case 'Comments':
        return <AdminComments />;
      case 'Reviews':
        return <Adminreviews />;
      case 'Analytics':
        return <AdminAnalytics />;
      case 'user-profile':
        return <UserDetailPage user={selectedUser} setActiveSection={handleSetActiveSection} />;
      default:
        return (
          <AdminDashboardContent setActiveSection={handleSetActiveSection} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={handleSetActiveSection}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AdminHeader 
            toggleSidebar={() => setIsSidebarOpen(true)}
            activeSection={activeSection}
            setActiveSection={handleSetActiveSection}
          />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 min-h-[calc(100vh-12rem)]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
