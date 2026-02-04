import React, { useEffect, useState } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Car,
  Calendar,
  Gauge,
  ImageIcon,
} from 'lucide-react';
import { useDashboardStore } from '../../store/useDasboardStore';

const AdminSellingToUs = () => {
  const {
    getSellSubmissionsStats,
    getSellSubmissions,
    sellSubmissionsStats,
    sellSubmissions,
    totalSellPages,
    currentSellPage,
    isFetchingSellSubmissions,
    sellSubmissionError,
  } = useDashboardStore();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    getSellSubmissionsStats();
    getSellSubmissions({ page: 1, limit: 10, status: selectedFilter });
  }, [getSellSubmissionsStats, getSellSubmissions]);

  const handlePageChange = (page) => {
    getSellSubmissions({ page, limit: 10, status: selectedFilter });
  };

  const handleFilterChange = (status) => {
    setSelectedFilter(status);
    setIsFilterOpen(false);
    getSellSubmissions({ page: 1, limit: 10, status });
  };

  const getFilterLabel = () => {
    const labels = {
      all: 'All Submissions',
      Pending: 'Pending',
      'Offer Sent': 'Offers Sent',
      Accepted: 'Accepted',
      Rejected: 'Rejected',
    };
    return labels[selectedFilter] || 'All Submissions';
  };

  if (isFetchingSellSubmissions && !sellSubmissionsStats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sellSubmissionError && !sellSubmissionsStats) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-red-600 font-medium">Error: {sellSubmissionError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sell Submissions</h1>
          <p className="text-sm text-gray-500">Review car selling requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Submissions"
          value={sellSubmissionsStats?.totalSubmissions || 0}
          icon={<Car className="w-5 h-5" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending"
          value={sellSubmissionsStats?.pendingSubmissions || 0}
          icon={<Clock className="w-5 h-5" />}
          color="bg-amber-500"
        />
        <StatCard
          title="Offers Sent"
          value={sellSubmissionsStats?.offersSent || 0}
          icon={<Send className="w-5 h-5" />}
          color="bg-emerald-500"
        />
        <StatCard
          title="Accepted"
          value={sellSubmissionsStats?.acceptedOffers || 0}
          icon={<CheckCircle className="w-5 h-5" />}
          color="bg-teal-500"
        />
      </div>

      {/* Submissions Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Submissions</h2>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium text-gray-700"
            >
              <Filter className="w-4 h-4" />
              {getFilterLabel()}
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {['all', 'Pending', 'Offer Sent', 'Accepted', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      selectedFilter === status ? 'text-primary font-medium' : 'text-gray-700'
                    }`}
                  >
                    {status === 'all' ? 'All Submissions' : status === 'Offer Sent' ? 'Offers Sent' : status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submissions List */}
        {sellSubmissions?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No submissions found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sellSubmissions?.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalSellPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => handlePageChange(currentSellPage - 1)}
              disabled={currentSellPage === 1}
              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(totalSellPages)]
              .map((_, index) => index + 1)
              .filter(
                (page) =>
                  page >= currentSellPage - 2 && page <= currentSellPage + 2
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl font-medium transition-colors ${
                    page === currentSellPage
                      ? 'bg-primary text-secondary'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentSellPage + 1)}
              disabled={currentSellPage === totalSellPages}
              className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-xl`}>{icon}</div>
      </div>
    </div>
  );
};

const SubmissionCard = ({ submission }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [offerAmount, setOfferAmount] = useState('');
  const dropdownRef = React.useRef(null);
  const { updateSellSubmissionStatus, sendOffer, isUpdatingSellSubmission } =
    useDashboardStore();

  React.useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isDropDownOpen]);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateSellSubmissionStatus(submission.id, newStatus);
      setIsDropDownOpen(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSendOffer = async () => {
    if (!offerAmount || parseFloat(offerAmount) <= 0) {
      alert('Please enter a valid offer amount');
      return;
    }

    try {
      await sendOffer(submission.id, parseFloat(offerAmount));
      setOfferAmount('');
      setIsDropDownOpen(false);
    } catch (error) {
      console.error('Failed to send offer:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { text: 'Pending', class: 'bg-amber-100 text-amber-700' },
      'Offer Sent': { text: 'Offer Sent', class: 'bg-blue-100 text-blue-700' },
      Accepted: { text: 'Accepted', class: 'bg-emerald-100 text-emerald-700' },
      Rejected: { text: 'Rejected', class: 'bg-red-100 text-red-700' },
    };
    return statusConfig[status] || statusConfig.Pending;
  };

  const statusBadge = getStatusBadge(submission.offerStatus);
  const photos = submission.uploadPhotos || '[]';

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="font-semibold text-gray-900">{submission.fullName}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.class}`}>
                {statusBadge.text}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              {submission.carMake} {submission.carModel} ({submission.yearOfManufacture})
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {submission.phoneNumber}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {submission.emailAddress}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(submission.createdAt)}
            </p>
          </div>

          <button
            onClick={handleDropDownClick}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
            disabled={isUpdatingSellSubmission}
          >
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
              isDropDownOpen ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Mileage</p>
              <p className="text-sm font-medium text-gray-900">{submission.mileageKm} km</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Year</p>
              <p className="text-sm font-medium text-gray-900">{submission.yearOfManufacture}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Condition</p>
              <p className="text-sm font-medium text-gray-900">{submission.condition}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Photos</p>
              <p className="text-sm font-medium text-gray-900">{photos.length}</p>
            </div>
          </div>
        </div>

        {submission.additionalNotes && (
          <div className="mt-2 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Additional Notes:</p>
            <p className="text-sm text-gray-700">{submission.additionalNotes}</p>
          </div>
        )}

        {submission.offerAmount && (
          <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-xs text-gray-500 mb-1">Offer Amount:</p>
            <p className="text-lg font-bold text-emerald-600">
              N{parseFloat(submission.offerAmount).toLocaleString()}
            </p>
            {submission.offerSentDate && (
              <p className="text-xs text-gray-500 mt-1">
                Sent: {formatDate(submission.offerSentDate)}
              </p>
            )}
          </div>
        )}
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
        <div className="p-4 space-y-4 bg-gray-50">
          {/* Send Offer */}
          {submission.offerStatus === 'Pending' && (
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Enter offer amount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <button
                onClick={handleSendOffer}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                disabled={isUpdatingSellSubmission}
              >
                <Send className="w-4 h-4" />
                Send Offer
              </button>
            </div>
          )}

          {/* Status Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleStatusChange('Accepted')}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={
                submission.offerStatus === 'Accepted' || isUpdatingSellSubmission
              }
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </button>
            <button
              onClick={() => handleStatusChange('Rejected')}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={
                submission.offerStatus === 'Rejected' || isUpdatingSellSubmission
              }
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>

          {/* View Photos */}
          {photos.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos:</p>
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(0, 4).map((photo, index) => (
                  <a
                    key={index}
                    href={photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={photo}
                      alt={`Car ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </a>
                ))}
              </div>
              {photos.length > 4 && (
                <p className="text-xs text-gray-500 mt-2">
                  +{photos.length - 4} more photos
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSellingToUs;
