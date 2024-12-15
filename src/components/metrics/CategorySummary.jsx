import React from 'react';

function CategorySummary({ categoryPercentages = {} }) {
  const categories = {
    booking: 'Booking & Scheduling',
    pricing: 'Pricing Transparency',
    treatment: 'Treatment Outcomes',
    aftercare: 'Aftercare Support',
    staff: 'Staff Professionalism',
    facility: 'Facility Environment'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Category Analysis</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categories).map(([key, label]) => (
          <div key={key} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">{label}</h3>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(categoryPercentages[key] || 0)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySummary;