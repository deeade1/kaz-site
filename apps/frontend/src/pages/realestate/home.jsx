import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { ListingStatusBadge, PropertyTypeIcon } from './PropertyComponents';
import { formatCurrency, formatSquareFeet } from './utils/formatting';

// =====================
// GraphQL Mutations
// =====================

const UPDATE_LISTING_STATUS = gql`
  mutation UpdateListingStatus($id: ID!, $status: String!) {
    updateListingStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

const SAVE_PROPERTY = gql`
  mutation SaveProperty($propertyId: ID!) {
    saveProperty(propertyId: $id) {
      id
      isSaved
    }
  }
`;

const SCHEDULE_TOUR = gql`
  mutation ScheduleTour($input: TourInput!) {
    scheduleTour(input: $input) {
      id
      scheduledTime
      meetingLink
    }
  }
`;

// =====================
// Main Components
// =====================





const StatusUpdateForm = ({ listing }) => {
  const [updateStatus] = useMutation(UPDATE_LISTING_STATUS, {
    onError: (error) => {
      // Handle error
    },
  });

  const handleStatusChange = (newStatus) => {
    updateStatus({
      variables: {
        id: listing.id,
        status: newStatus,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateListingStatus: {
          __typename: 'Listing',
          id: listing.id,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        },
      },
    });
  };

  return (
    <div className="status-update-form">
      <h4>Update Listing Status</h4>
      <div className="status-buttons">
        {['draft', 'published', 'pending_review', 'approved', 'rejected', 'sold', 'rented'].map((status) => (
          <button
            key={status}
            className={`status-button ${listing.status === status ? 'active' : ''}`}
            onClick={() => handleStatusChange(status)}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};





// =====================
// Helper Components
// =====================





export {
  PropertyCard,
  PropertyActions,
  StatusUpdateForm,
  PropertyDetailsForm,
  VirtualTourComponent,
  DocumentSigningComponent,
  MortgageCalculatorComponent
};