import React, { useEffect, useState } from 'react';
import Dashboard from './components/layout/Dashboard';
import { reviewStore } from './data/reviews';
import { reviewAnalyzer } from './services/analysis';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Initialize store and sync with realReviews data
        await reviewStore.initialize();
        
        // Get all reviews and analyze them
        const allReviews = await reviewStore.getAll();
        const analyzedReviews = reviewAnalyzer.analyzeReviews(allReviews);
        setReviews(analyzedReviews);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setError('Failed to load reviews. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard reviews={reviews} />
    </div>
  );
}

export default App;