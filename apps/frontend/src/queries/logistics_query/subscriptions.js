import { gql } from '@apollo/client';

// Subscription for dispatch status
export const DISPATCH_STATUS_SUBSCRIPTION = gql`
  subscription {
    dispatchStatus {
      dispatchStatus
    }
  }
`;

// Subscription for courier state updates
export const COURIER_STATE_UPDATE_SUBSCRIPTION = gql`
  subscription CourierStateUpdate($courierId: ID!) {
    courierStateUpdate(courierId: $courierId) {
      courierId
      state
      timestamp
    }
  }
`;

// Subscription for package state updates
export const PACKAGE_STATE_UPDATE_SUBSCRIPTION = gql`
  subscription PackageStateUpdate($packageId: ID!) {
    packageStateUpdate(packageId: $packageId) {
      packageId
      state
      timestamp
    }
  }
`;



import React from 'react';
import { useSubscription } from '@apollo/client';
import { DISPATCH_STATUS_SUBSCRIPTION, COURIER_STATE_UPDATE_SUBSCRIPTION, PACKAGE_STATE_UPDATE_SUBSCRIPTION } from './subscriptions';

function DispatchDashboard({ courierId, packageId }) {
  // Subscription for dispatch status
  const { data: dispatchData } = useSubscription(DISPATCH_STATUS_SUBSCRIPTION);
  
  // Subscription for courier state update
  const { data: courierData } = useSubscription(COURIER_STATE_UPDATE_SUBSCRIPTION, {
    variables: { courierId },
  });
  
  // Subscription for package state update
  const { data: packageData } = useSubscription(PACKAGE_STATE_UPDATE_SUBSCRIPTION, {
    variables: { packageId },
  });

  return (
    <div>
      <h2>Dispatch Dashboard</h2>

      {/* Dispatch Status */}
      <div>
        <h3>Dispatch Status</h3>
        <p>{dispatchData?.dispatchStatus?.dispatchStatus || "Waiting for updates..."}</p>
      </div>

      {/* Courier State */}
      <div>
        <h3>Courier State</h3>
        {courierData ? (
          <p>
            Courier ID: {courierData.courierStateUpdate.courierId} <br />
            State: {courierData.courierStateUpdate.state} <br />
            Last Update: {new Date(courierData.courierStateUpdate.timestamp).toLocaleString()}
          </p>
        ) : (
          <p>Waiting for courier updates...</p>
        )}
      </div>

      {/* Package State */}
      <div>
        <h3>Package State</h3>
        {packageData ? (
          <p>
            Package ID: {packageData.packageStateUpdate.packageId} <br />
            State: {packageData.packageStateUpdate.state} <br />
            Last Update: {new Date(packageData.packageStateUpdate.timestamp).toLocaleString()}
          </p>
        ) : (
          <p>Waiting for package updates...</p>
        )}
      </div>
    </div>
  );
}

export default DispatchDashboard;
