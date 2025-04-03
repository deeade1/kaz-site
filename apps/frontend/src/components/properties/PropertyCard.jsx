const PropertyCard = ({ listing }) => {
  const [isSaved, setIsSaved] = useState(listing.isSaved);
  
  const [saveProperty] = useMutation(SAVE_PROPERTY, {
    variables: { propertyId: listing.id },
    optimisticResponse: {
      __typename: 'Mutation',
      saveProperty: {
        __typename: 'Listing',
        id: listing.id,
        isSaved: !isSaved,
      },
    },
    onCompleted: (data) => setIsSaved(data.saveProperty.isSaved),
  });

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img src={listing.image.url} alt={listing.title} />
        <button 
          className={`save-button ${isSaved ? 'saved' : ''}`}
          onClick={saveProperty}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
      
      <div className="property-details">
        <div className="property-header">
          <ListingStatusBadge status={listing.status} />
          <PropertyTypeIcon type={listing.propertyType} />
        </div>
        
        <h3>{listing.title}</h3>
        <p className="price">{formatCurrency(listing.price)}</p>
        
        <div className="property-stats">
          <span>{listing.bedrooms} beds</span>
          <span>{listing.bathrooms} baths</span>
          <span>{formatSquareFeet(listing.squareFeet)}</span>
        </div>
        
        <PropertyActions listing={listing} />
      </div>
    </div>
  );
};