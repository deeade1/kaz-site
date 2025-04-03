import { gql, useMutation } from '@apollo/client';

// CheckIn Mutation
const CHECK_IN_MUTATION = gql`
  mutation CheckIn {
    checkIn(input: {}) {
      success
    }
  }
`;

// Leave Mutation
const LEAVE_MUTATION = gql`
  mutation Leave {
    leave(input: {}) {
      success
    }
  }
`;

// Decline Mutation
const DECLINE_MUTATION = gql`
  mutation Decline {
    decline(input: {}) {
      success
    }
  }
`;

// Get Mutation
const GET_PACKAGE_INFO_MUTATION = gql`
  mutation GetPackageInfo {
    get(input: {}) {
      packageInfo
    }
  }
`;

// Accept Mutation
const ACCEPT_MUTATION = gql`
  mutation Accept {
    accept(input: {}) {
      success
    }
  }
`;

// Complete Mutation
const COMPLETE_MUTATION = gql`
  mutation Complete {
    complete(input: {}) {
      success
    }
  }
`;

// Fail Mutation
const FAIL_MUTATION = gql`
  mutation Fail {
    fail(input: {}) {
      success
    }
  }
`;

// Location Update Mutation
const LOC_UPDATE_MUTATION = gql`
  mutation LocUpdate($lat: String!, $lng: String!) {
    locUpdate(input: { lat: $lat, lng: $lng }) {
      success
    }
  }
`;


import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CHECK_IN_MUTATION,
  LEAVE_MUTATION,
  DECLINE_MUTATION,
  GET_PACKAGE_INFO_MUTATION,
  ACCEPT_MUTATION,
  COMPLETE_MUTATION,
  FAIL_MUTATION,
  LOC_UPDATE_MUTATION,
} from './mutations';

function CourierActions() {
  // Define states for each mutation's response if needed
  const [checkIn, { data: checkInData }] = useMutation(CHECK_IN_MUTATION);
  const [leave, { data: leaveData }] = useMutation(LEAVE_MUTATION);
  const [decline, { data: declineData }] = useMutation(DECLINE_MUTATION);
  const [getPackageInfo, { data: getPackageData }] = useMutation(GET_PACKAGE_INFO_MUTATION);
  const [accept, { data: acceptData }] = useMutation(ACCEPT_MUTATION);
  const [complete, { data: completeData }] = useMutation(COMPLETE_MUTATION);
  const [fail, { data: failData }] = useMutation(FAIL_MUTATION);
  const [locUpdate, { data: locUpdateData }] = useMutation(LOC_UPDATE_MUTATION);

  // States for location data
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleLocUpdate = () => {
    locUpdate({ variables: { lat, lng } });
  };

  return (
    <div>
      <h2>Courier Actions</h2>

      {/* Action Buttons */}
      <button onClick={() => checkIn()}>Check In</button>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => decline()}>Decline</button>
      <button onClick={() => getPackageInfo()}>Get Package Info</button>
      <button onClick={() => accept()}>Accept</button>
      <button onClick={() => complete()}>Complete</button>
      <button onClick={() => fail()}>Fail</button>

      {/* Location Update */}
      <div>
        <h3>Update Location</h3>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button onClick={handleLocUpdate}>Update Location</button>
      </div>

      {/* Display Responses */}
      {checkInData && <p>Check-in successful: {checkInData.checkIn.success.toString()}</p>}
      {leaveData && <p>Leave successful: {leaveData.leave.success.toString()}</p>}
      {declineData && <p>Decline successful: {declineData.decline.success.toString()}</p>}
      {getPackageData && <p>Package Info: {getPackageData.get.packageInfo}</p>}
      {acceptData && <p>Accept successful: {acceptData.accept.success.toString()}</p>}
      {completeData && <p>Complete successful: {completeData.complete.success.toString()}</p>}
      {failData && <p>Fail successful: {failData.fail.success.toString()}</p>}
      {locUpdateData && <p>Location Update successful: {locUpdateData.locUpdate.success.toString()}</p>}
    </div>
  );
}

export default CourierActions;
