// AdminStaff.jsx
import React, { useEffect } from 'react';
import Skeleton from '../Skeleton';
import { useDashboardStore } from '../../store/useDasboardStore';
import { ChevronDown, ChevronLeft, ChevronRight, UserPlus, Shield, Mail, Users, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminStaffStore } from '../../store/useAdminStaffStore';

const AdminStaff = () => {
  const {
    getStaffs,
    staffs,
    totalStaffPages,
    currentStaffPage,
    isFetchingStaffs,
    staffError,
  } = useDashboardStore();

  const navigate = useNavigate();

  useEffect(() => {
    getStaffs(1, 10);
  }, [getStaffs]);

  console.log(staffs);

  const handlePageChange = (page) => {
    getStaffs(page, 10);
  };

  const handleAddStaff = () => {
    navigate('/admin/staff/add');
  };

  if (isFetchingStaffs) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded-lg w-40"></div>
          <div className="h-11 bg-gray-200 rounded-xl w-40"></div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-40"></div>
                <div className="h-4 bg-gray-200 rounded w-56"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (staffError) return (
    <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
        <Users className="w-6 h-6 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-red-700">Error loading staff</p>
        <p className="text-sm text-red-600">{staffError}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{staffs?.length || 0} Staff Members</h2>
            <p className="text-sm text-gray-500">Manage your team</p>
          </div>
        </div>
        <button
          onClick={handleAddStaff}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <UserPlus className="w-5 h-5" />
          Add New Staff
        </button>
      </div>

      {/* Staff List */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {staffs?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No staff members found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first team member.</p>
            <button 
              onClick={handleAddStaff}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <UserPlus className="w-5 h-5" />
              Add Staff Member
            </button>
          </div>
        ) : (
          staffs?.map((staff) => <StaffCard key={staff.id} item={staff} />)
        )}
      </div>

      {/* Pagination */}
      {totalStaffPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
          {currentStaffPage > 1 && (
            <button
              onClick={() => handlePageChange(currentStaffPage - 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {[...Array(totalStaffPages)]
            .map((_, index) => index + 1)
            .filter(
              (page) =>
                page >= currentStaffPage - 2 && page <= currentStaffPage + 2
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                  page === currentStaffPage
                    ? 'bg-primary text-secondary'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
          {currentStaffPage < totalStaffPages && (
            <button
              onClick={() => handlePageChange(currentStaffPage + 1)}
              className="h-10 px-4 rounded-xl bg-primary text-secondary font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const StaffCard = ({ item }) => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const [dropdownHeight, setDropdownHeight] = React.useState(0);
  const dropdownRef = React.useRef(null);
  const { deleteStaff, isLoading } = useAdminStaffStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isDropDownOpen]);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleEdit = (id) => {
    navigate(`/admin/staff/edit/${id}`);
  };

  const handleDelete = (id) => {
    window.confirm('Are you sure you want to delete this staff member?') &&
      deleteStaff(id);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-700';
      case 'editor':
        return 'bg-blue-100 text-blue-700';
      case 'moderator':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatRole = (role) => {
    return role
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="w-full flex items-center justify-between p-4 gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 ring-2 ring-gray-200">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Staff Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-gray-900">
              {item.name}
            </h3>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${getRoleBadgeColor(item.role)}`}>
              <Shield className="w-3 h-3" />
              {formatRole(item.role)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span className="truncate">{item.email}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Joined {formatDate(item.createdAt)}
          </p>
        </div>

        {/* Status */}
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />

        {/* Dropdown Button */}
        <button
          onClick={handleDropDownClick}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isDropDownOpen ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Dropdown Actions */}
      <div
        ref={dropdownRef}
        className="transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-100"
        style={{
          maxHeight: isDropDownOpen ? `${dropdownHeight}px` : '0px',
          opacity: isDropDownOpen ? 1 : 0,
          borderTopWidth: isDropDownOpen ? '1px' : '0px',
        }}
      >
        <div className="flex gap-3 p-4 bg-gray-50">
          <button
            onClick={() => handleEdit(item.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-red-600 font-semibold rounded-xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
