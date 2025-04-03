import { gql } from "@apollo/client";
//import { LISTING_BASIC_FIELDS, LISTING_IMAGE_FIELDS, LISTING_FILE_FIELDS } from './fragments'; // Assuming you saved fragments
import { LISTING_BASIC_FIELDS,LISTING_IMAGE_FIELDS, LISTING_FILE_FIELDS } from "./fragments";


export const GET_LISTING = gql`
  query GetListing($id: ID!) {
    listing(id: $id) {
      ...ListingBasicFields
      address
      bedrooms
      propertyLocation
      bathrooms
      garage
      squareFeet
      lotSize
      yearBuilt
      agent {
        id
      }
      owner {
        id
      }
      reviewer {
        id
      }
      freeFrom
      images {
        ...ListingImageFields
      }
      files {
        ...ListingFileFields
      }
    }
  }
  ${LISTING_BASIC_FIELDS}
  ${LISTING_IMAGE_FIELDS}
  ${LISTING_FILE_FIELDS}
`;

export const GET_ALL_LISTINGS = gql`
  query GetAllListings {
    allListings {
      edges {
        node {
          ...ListingBasicFields
          address
          bedrooms
          propertyLocation
          bathrooms
          garage
          squareFeet
          lotSize
          yearBuilt
          created
          agent {
            id
          }
          owner {
            id
          }
          reviewer {
            id
          }
          freeFrom
          images {
            ...ListingImageFields
          }
          files {
            ...ListingFileFields
          }
        }
      }
    }
  }
  ${LISTING_BASIC_FIELDS}
  ${LISTING_IMAGE_FIELDS}
  ${LISTING_FILE_FIELDS}
`;


