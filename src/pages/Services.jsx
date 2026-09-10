import { useState, useMemo } from 'react';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';

const Services = () => {
  const { services } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(services.map((s) => s.category));
    return ['All', ...Array.from(cats)];
  }, [services]);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.features && service.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchTerm]);

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="text-primary fw-bold text-uppercase small">Full Automotive Services</span>
          <h1 className="display-5 fw-bold text-dark mb-3">Service & Repair Catalog</h1>
          <p className="text-secondary lead">
            From routine oil flushes to complex computerized transmission and engine rebuilds, explore our full spectrum of automotive solutions.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="card carcare-card border-0 p-3 mb-5 shadow-sm">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-secondary">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 ps-0 shadow-none"
                  placeholder="Search service, brakes, diagnostics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-light border-start-0 text-secondary"
                    type="button"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="col-lg-7">
              <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn btn-sm px-3 rounded-pill fw-semibold ${
                      selectedCategory === category
                        ? 'btn-primary'
                        : 'btn-light border text-secondary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="row g-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border">
            <i className="bi bi-search display-3 text-muted mb-3 d-block"></i>
            <h4 className="fw-bold text-dark">No Services Found</h4>
            <p className="text-secondary mb-3">No automotive services match your current query "{searchTerm}".</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="btn btn-primary btn-sm px-4 rounded-3"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
