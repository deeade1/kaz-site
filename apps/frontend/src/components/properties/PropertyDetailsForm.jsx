const PropertyDetailsForm = ({ listing }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      squareFeet: listing.squareFeet,
    },
  });

  const [updateProperty] = useMutation(UPDATE_PROPERTY_DETAILS, {
    onCompleted: () => {
      // Show success message
    },
    onError: (error) => {
      // Handle error and potentially reset form
    },
  });

  const onSubmit = (data) => {
    updateProperty({
      variables: {
        id: listing.id,
        input: data,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Listing',
          id: listing.id,
          ...data,
          updatedAt: new Date().toISOString(),
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Title</label>
        <input {...register('title', { required: true })} />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea {...register('description')} rows={5} />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Price</label>
          <input type="number" {...register('price', { required: true })} />
        </div>
        
        <div className="form-group">
          <label>Square Feet</label>
          <input type="number" {...register('squareFeet')} />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Bedrooms</label>
          <input type="number" {...register('bedrooms')} />
        </div>
        
        <div className="form-group">
          <label>Bathrooms</label>
          <input type="number" {...register('bathrooms')} step="0.5" />
        </div>
      </div>
      
      <button type="submit" className="btn-primary">Save Changes</button>
    </form>
  );
};
