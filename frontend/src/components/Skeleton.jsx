import React from 'react';

export default function Skeleton({ className = '', style = {}, height = 24, width = '100%' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ height, width, ...style }}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
}
