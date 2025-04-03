const DocumentSigningComponent = ({ document }) => {
  const [signDocument] = useMutation(SIGN_DOCUMENT, {
    onCompleted: () => {
      // Show success message
    },
    onError: (error) => {
      // Handle error
    },
  });

  const handleSign = (signatureData) => {
    signDocument({
      variables: {
        documentId: document.id,
        signatureImage: signatureData,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        signDocument: {
          __typename: 'DocumentSignature',
          id: `temp-${Date.now()}`,
          document: {
            __typename: 'Document',
            id: document.id,
            isSigned: true,
          },
          signedAt: new Date().toISOString(),
        },
      },
    });
  };

  return (
    <div className="document-signing">
      <h3>{document.title}</h3>
      <div className="document-viewer">
        {/* PDF or document viewer would go here */}
      </div>
      <SignaturePad onSave={handleSign} />
    </div>
  );
};