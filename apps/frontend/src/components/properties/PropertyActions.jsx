const PropertyActions = ({ listing }) => {
  const [scheduleTour] = useMutation(SCHEDULE_TOUR, {
    onCompleted: (data) => {
      // Handle successful tour scheduling
    },
    onError: (error) => {
      // Handle error
    },
  });

  const handleScheduleTour = () => {
    scheduleTour({
      variables: {
        input: {
          propertyId: listing.id,
          scheduledTime: new Date().toISOString(), // Replace with actual date picker value
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        scheduleTour: {
          __typename: 'Tour',
          id: `temp-${Date.now()}`,
          scheduledTime: new Date().toISOString(),
          meetingLink: '',
        },
      },
    });
  };

  return (
    <div className="property-actions">
      <button className="btn-primary" onClick={handleScheduleTour}>
        Schedule Tour
      </button>
      <button className="btn-secondary">Contact Agent</button>
    </div>
  );
};