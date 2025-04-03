const VirtualTourComponent = ({ tours }) => {
  const [selectedTour, setSelectedTour] = useState(tours[0]);
  
  return (
    <div className="virtual-tour-container">
      <div className="tour-viewer">
        {selectedTour ? (
          <iframe 
            src={selectedTour.tourUrl} 
            title={`Virtual tour of ${selectedTour.property.title}`}
            allowFullScreen
          />
        ) : (
          <div className="no-tour">No virtual tour available</div>
        )}
      </div>
      
      <div className="tour-thumbnails">
        {tours.map((tour) => (
          <div 
            key={tour.id}
            className={`thumbnail ${selectedTour.id === tour.id ? 'active' : ''}`}
            onClick={() => setSelectedTour(tour)}
          >
            <img src={tour.thumbnail.url} alt={`Tour ${tour.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
