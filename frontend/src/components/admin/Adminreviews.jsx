// AdminReviews.jsx
import React, { useEffect, useState } from 'react';
import Skeleton from '../Skeleton';
import { useDashboardStore } from '../../store/useDasboardStore';
import {
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Car as CarIcon,
} from 'lucide-react';

const AdminReviews = () => {
  const {
    getReviewsStats,
    getReviews,
    reviewsStats,
    reviews,
    totalReviewPages,
    currentReviewPage,
    // eslint-disable-next-line no-unused-vars
    reviewFilter,
    isFetchingReviews,
    reviewError,
  } = useDashboardStore();

  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    getReviewsStats();
    getReviews({ page: 1, limit: 10, status: selectedFilter });
  }, [getReviewsStats, getReviews]);

  const handlePageChange = (page) => {
    getReviews({ page, limit: 10, status: selectedFilter });
  };

  const handleFilterChange = (status) => {
    setSelectedFilter(status);
    getReviews({ page: 1, limit: 10, status });
  };

  if (isFetchingReviews && !reviewsStats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (reviewError && !reviewsStats) {
    return (
      <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <Star className="w-6 h-6 text-red-500" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-red-700">Error loading reviews</p>
          <p className="text-sm text-red-600">{reviewError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Star className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Review Management</h2>
          <p className="text-sm text-gray-500">Moderate customer reviews</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Reviews"
          value={reviewsStats?.totalReviews || 0}
          icon={<Star className="w-5 h-5" />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Pending"
          value={reviewsStats?.pendingReviews || 0}
          icon={<Clock className="w-5 h-5" />}
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="Approved"
          value={reviewsStats?.approvedReviews || 0}
          icon={<CheckCircle className="w-5 h-5" />}
          color="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          title="Rejected"
          value={reviewsStats?.rejectedReviews || 0}
          icon={<XCircle className="w-5 h-5" />}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          title="Spam"
          value={reviewsStats?.spamReviews || 0}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Average Ratings */}
      {reviewsStats?.averageRatings && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Average Ratings (Approved)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <RatingItem
              label="Interior"
              value={reviewsStats.averageRatings.interior}
            />
            <RatingItem
              label="Exterior"
              value={reviewsStats.averageRatings.exterior}
            />
            <RatingItem
              label="Comfort"
              value={reviewsStats.averageRatings.comfort}
            />
            <RatingItem
              label="Performance"
              value={reviewsStats.averageRatings.performance}
            />
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Reviews</h2>

          {/* Filter Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              {selectedFilter === 'all'
                ? 'All Reviews'
                : selectedFilter.charAt(0).toUpperCase() +
                  selectedFilter.slice(1)}
              <ChevronDown className="w-4 h-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-xl w-52 mt-2 border border-gray-100"
            >
              <li>
                <a onClick={() => handleFilterChange('all')} className="rounded-lg">All Reviews</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange('pending')} className="rounded-lg">Pending</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange('approved')} className="rounded-lg">Approved</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange('rejected')} className="rounded-lg">Rejected</a>
              </li>
              <li>
                <a onClick={() => handleFilterChange('spam')} className="rounded-lg">Spam</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Reviews List */}
        {reviews?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-500">No reviews match your current filter.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalReviewPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
            {currentReviewPage > 1 && (
              <button
                onClick={() => handlePageChange(currentReviewPage - 1)}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {[...Array(totalReviewPages)]
              .map((_, index) => index + 1)
              .filter(
                (page) =>
                  page >= currentReviewPage - 2 && page <= currentReviewPage + 2
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                    page === currentReviewPage
                      ? 'bg-primary text-secondary'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
            {currentReviewPage < totalReviewPages && (
              <button
                onClick={() => handlePageChange(currentReviewPage + 1)}
                className="h-10 px-4 rounded-xl bg-primary text-secondary font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`${color} p-3 rounded-xl`}>{icon}</div>
      </div>
    </div>
  );
};

const RatingItem = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
      <span className="text-sm text-gray-600">{label}:</span>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const dropdownRef = React.useRef(null);
  const { updateReviewStatus, isUpdatingReview } = useDashboardStore();

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
      await updateReviewStatus(review.id, newStatus);
      setIsDropDownOpen(false);
    } catch (error) {
      console.error('Failed to update status:', error);
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
      pending: { text: 'Pending', class: 'bg-amber-100 text-amber-700' },
      approved: { text: 'Approved', class: 'bg-emerald-100 text-emerald-700' },
      rejected: { text: 'Rejected', class: 'bg-red-100 text-red-700' },
      spam: { text: 'Spam', class: 'bg-gray-100 text-gray-600' },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const statusBadge = getStatusBadge(review.status);

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="font-semibold text-gray-900">
                {review.name || review.user?.username}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.class}`}>
                {statusBadge.text}
              </span>
              {review.isEdited && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <CarIcon className="w-4 h-4" />
              {review.car
                ? `${review.car.make} ${review.car.model} ${review.car.year}`
                : 'Unknown Car'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(review.createdAt)}
            </p>
          </div>

          <button
            onClick={handleDropDownClick}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
            disabled={isUpdatingReview}
          >
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
              isDropDownOpen ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3">
          {review.interiorRating && (
            <RatingDisplay label="Interior" value={review.interiorRating} />
          )}
          {review.exteriorRating && (
            <RatingDisplay label="Exterior" value={review.exteriorRating} />
          )}
          {review.comfortRating && (
            <RatingDisplay label="Comfort" value={review.comfortRating} />
          )}
          {review.performanceRating && (
            <RatingDisplay
              label="Performance"
              value={review.performanceRating}
            />
          )}
        </div>

        <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{review.content}</p>
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
        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50">
          <button
            onClick={() => handleStatusChange('approved')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={review.status === 'approved' || isUpdatingReview}
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={review.status === 'rejected' || isUpdatingReview}
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => handleStatusChange('spam')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={review.status === 'spam' || isUpdatingReview}
          >
            <AlertTriangle className="w-4 h-4" />
            Mark Spam
          </button>
          <button
            onClick={() => handleStatusChange('pending')}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={review.status === 'pending' || isUpdatingReview}
          >
            <Clock className="w-4 h-4" />
            Pending
          </button>
        </div>
      </div>
    </div>
  );
};

const RatingDisplay = ({ label, value }) => {
  return (
    <div className="flex flex-col p-2 bg-gray-50 rounded-lg">
      <span className="text-xs text-gray-500 mb-1">{label}</span>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < value ? 'fill-primary text-primary' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
