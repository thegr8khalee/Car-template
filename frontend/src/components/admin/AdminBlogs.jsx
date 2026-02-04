// AdminBlogs.jsx
import React, { useEffect } from 'react';
import Skeleton from '../Skeleton';
import { useDashboardStore } from '../../store/useDasboardStore';
import { ChevronDown, ChevronLeft, ChevronRight, User, Calendar, Eye, FileText, Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminOpsStore } from '../../store/useAdminOpsStore';

const AdminBlogs = () => {
  const {
    getBlogs,
    blogs,
    totalBlogPages,
    currentBlogPage,
    isFetchingBlogs,
    blogError,
  } = useDashboardStore();

  console.log(blogs);

  useEffect(() => {
    getBlogs({ page: 1, limit: 10 });
  }, [getBlogs]);

  const handlePageChange = (page) => {
    const params = { page, limit: 10 };
    getBlogs(params);
  };

  const navigate = useNavigate();

  if (isFetchingBlogs) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
          <div className="h-11 bg-gray-200 rounded-xl w-40"></div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-18 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-64"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (blogError) return (
    <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
        <FileText className="w-6 h-6 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-red-700">Error loading blogs</p>
        <p className="text-sm text-red-600">{blogError}</p>
      </div>
    </div>
  );
  if (blogs?.length === 0) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs found</h3>
      <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
      <button 
        onClick={() => navigate('/admin/blogs/new')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
      >
        <Plus className="w-5 h-5" />
        Create New Blog
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{blogs?.length} Blog Posts</h2>
            <p className="text-sm text-gray-500">Manage your blog content</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/blogs/new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-secondary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Add New Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} item={blog} />
        ))}
      </div>

      {/* Pagination */}
      {totalBlogPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
          {currentBlogPage > 1 && (
            <button
              onClick={() => handlePageChange(currentBlogPage - 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {[...Array(totalBlogPages)]
            .map((_, index) => index + 1)
            .filter(
              (page) =>
                page >= currentBlogPage - 2 && page <= currentBlogPage + 2,
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                  page === currentBlogPage
                    ? 'bg-primary text-secondary'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
          {currentBlogPage < totalBlogPages && (
            <button
              onClick={() => handlePageChange(currentBlogPage + 1)}
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

const BlogCard = ({ item }) => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(null);
  const [dropdownHeight, setDropdownHeight] = React.useState(0);
  const dropdownRef = React.useRef(null);
  const { deleteBlog, isLoading } = useAdminOpsStore();
  const { getBlogs } = useDashboardStore();

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
    navigate(`/admin/blogs/update/${id}`);
  };

  const handleDelete = (id) => {
    window.confirm('Are you sure you want to delete this blog?') &&
      deleteBlog(id).then(() => {
        getBlogs({ page: 1, limit: 10 });
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-100 text-emerald-700';
      case 'draft':
        return 'bg-amber-100 text-amber-700';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="w-full flex items-center justify-between p-4 gap-4">
        <div className="w-24 h-18 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={item.featuredImage || '/placeholder-blog.jpg'}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate mb-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{item.author?.name || 'Unknown'}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {item.publishedAt
                ? formatDate(item.publishedAt)
                : formatDate(item.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {item.viewCount || 0} views
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(item.status)}`}>
          {item.status}
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
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
