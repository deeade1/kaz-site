import { gql } from '@apollo/client';
import { LISTING_BASIC_FIELDS, LISTING_IMAGE_FIELDS, LISTING_FILE_FIELDS} from "./fragments";

export const CREATE_LISTING = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      success
      listing {
        ...ListingBasicFields
      }
    }
  }
  ${LISTING_BASIC_FIELDS}
`;

export const UPDATE_LISTING = gql`
  mutation UpdateListing($input: UpdateListingInput!) {
    updateListing(input: $input) {
      success
      listing {
        ...ListingBasicFields
      }
    }
  }
  ${LISTING_BASIC_FIELDS}
`;

export const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(input: { id: $id }) {
      success
    }
  }
`;


export const UPDATE_CLIENT_LOCATION = gql`
  mutation UpdateClientLocation($clientId: ID!, $latitude: Float!, $longitude: Float!) {
    updateClientLocation(input: { clientId: $clientId, latitude: $latitude, longitude: $longitude }) {
      success
    }
  }
`;

export const UPDATE_AGENT_LOCATION = gql`
  mutation UpdateAgentLocation($agentId: ID!, $latitude: Float!, $longitude: Float!) {
    updateAgentLocation(input: { agentId: $agentId, latitude: $latitude, longitude: $longitude }) {
      success
    }
  }
`;

export const CREATE_LISTING_TYPE = gql`
  mutation CreateListingType($propertyType: String!) {
    createListingType(input: { propertyType: $propertyType }) {
      success
      listingType {
        id
        propertyType
      }
    }
  }
`;

export const ADD_LISTING_IMAGE = gql`
  mutation AddListingImage($listingId: ID!, $image: String!, $shortDescription: String) {
    addListingImage(input: { listingId: $listingId, image: $image, shortDescription: $shortDescription }) {
      success
      listingImage {
        ...ListingImageFields
      }
    }
  }
  ${LISTING_IMAGE_FIELDS}
`;



