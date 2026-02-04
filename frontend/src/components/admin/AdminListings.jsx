import React, { useEffect } from 'react';
import Skeleton from '../Skeleton';
import { useDashboardStore } from '../../store/useDasboardStore';
import { ChevronDown, ChevronLeft, ChevronRight, User, Plus, Car, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminOpsStore } from '../../store/useAdminOpsStore';
import CarSearchBar from '../Searchbar';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'bg-emerald-100 text-emerald-700';
    case 'reserved':
      return 'bg-amber-100 text-amber-700';
    case 'sold':
      return 'bg-red-100 text-red-700';
    case 'preparing':
      return 'bg-blue-100 text-blue-700';
    case 'acquired':
      return 'bg-gray-100 text-gray-700';
    case 'maintenance':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-emerald-100 text-emerald-700';
  }
};

const AdminListings = () => {
  const {
    getListings,
    listings,
    totalPages,
    currentPage,
    isFetchingListings,
    listingError,
  } = useDashboardStore();

  useEffect(() => {
    getListings({ page: 1, limit: 10 });
  }, [getListings]);

  console.log(listings);

  const handlePageChange = (page) => {
    const params = { page };
    getListings(params);
  };

  const navigate = useNavigate();

  if (isFetchingListings) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
          <div className="h-11 bg-gray-200 rounded-xl w-40"></div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-18 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (listingError) return (
    <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
        <Car className="w-6 h-6 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-red-700">Error loading listings</p>
        <p className="text-sm text-red-600">{listingError}</p>
      </div>
    </div>
  );
  if (listings.length === 0) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <Car className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
      <p className="text-gray-500 mb-6">Get started by adding your first vehicle listing.</p>
      <button 
        onClick={() => navigate('/admin/cars/new')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
      >
        <Plus className="w-5 h-5" />
        Add New Listing
      </button>
    </div>
  );
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Car className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{listings.length} Listings</h2>
            <p className="text-sm text-gray-500">Manage your vehicle inventory</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/admin/cars/new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add New Listing
        </button>
      </div>

      {/* Listings */}
      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
        {listings.map((listing) => (
          <ListCard key={listing.id} item={listing} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {[...Array(totalPages)]
            .map((_, index) => index + 1)
            .filter(
              (page) => page >= currentPage - 2 && page <= currentPage + 2,
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-secondary'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
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

const ListCard = ({ item }) => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(null);
  const [dropdownHeight, setDropdownHeight] = React.useState(0);
  const dropdownRef = React.useRef(null);
  const { deleteCar } = useAdminOpsStore();
  const { getListings } = useDashboardStore();

  React.useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isDropDownOpen]);

  const handleDropDownClick = (item) => {
    if (isDropDownOpen === item) {
      setIsDropDownOpen(null);
    } else {
      setIsDropDownOpen(item);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/cars/update/${id}`);
  };
  const handleDelete = (id) => {
    window.confirm('Are you sure you want to delete this listing?') &&
      deleteCar(id).then(() => {
        getListings({ page: 1, limit: 10 });
      });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="w-full flex items-center justify-between p-4 gap-4">
        <div className="w-24 h-18 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img 
            src={item.imageUrls[0]} 
            alt={`${item.make} ${item.model}`} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {item.make} {item.model} {item.year}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-bold text-primary">₦{item.price.toLocaleString()}</span>
            {item.stockNumber && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                #{item.stockNumber}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1.5 text-sm text-gray-500">
            <User className="w-3.5 h-3.5" />
            <span className="capitalize">{item.condition}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(
          item.status || (item.sold ? 'sold' : 'available'),
        )}`}>
          {item.status || (item.sold ? 'Sold' : 'Available')}
        </span>
        <button
          onClick={() => handleDropDownClick(item.id)}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isDropDownOpen === item.id ? 'rotate-180' : ''
          }`} />
        </button>
      </div>
      <div
        ref={dropdownRef}
        className="transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-100"
        style={{
          maxHeight: isDropDownOpen === item.id ? `${dropdownHeight}px` : '0px',
          opacity: isDropDownOpen === item.id ? 1 : 0,
          borderTopWidth: isDropDownOpen === item.id ? '1px' : '0px',
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminListings;
