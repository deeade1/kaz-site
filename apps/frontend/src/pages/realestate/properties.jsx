import React, { memo } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_ALL_LISTINGS } from "../../queries/realestate_query/queries";



const Property = memo(() => {
  // Fetch data using the query
  const { loading, error, data } = useQuery(GET_ALL_LISTINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract listings from the data
  const listings = data?.allListings?.edges || [];

  return (
    <>
      <div className="content-inner pb-0 container-fluid" id="page_layout">
        <div className="border-bottom pb-3 d-flex align-items-center justify-content-between">
          <h5>Prperties</h5>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="submit"
          >
            <span className="d-flex">
              <svg
                className="icon-22"
                width="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.3328 22H7.66618C4.2769 22 2 19.6229 2 16.0843V7.91672C2 4.37811 4.2769 2 7.66618 2H16.3338C19.7231 2 22 4.37811 22 7.91672V16.0843C22 19.6229 19.7231 22 16.3328 22Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2451 8.67496C11.2451 10.045 10.1301 11.16 8.7601 11.16C7.3891 11.16 6.2751 10.045 6.2751 8.67496C6.2751 7.30496 7.3891 6.18896 8.7601 6.18896C10.1301 6.18896 11.2451 7.30496 11.2451 8.67496ZM19.4005 14.0876C19.6335 14.3136 19.8005 14.5716 19.9105 14.8466C20.2435 15.6786 20.0705 16.6786 19.7145 17.5026C19.2925 18.4836 18.4845 19.2246 17.4665 19.5486C17.0145 19.6936 16.5405 19.7556 16.0675 19.7556H7.6865C6.8525 19.7556 6.1145 19.5616 5.5095 19.1976C5.1305 18.9696 5.0635 18.4446 5.3445 18.1026C5.8145 17.5326 6.2785 16.9606 6.7465 16.3836C7.6385 15.2796 8.2395 14.9596 8.9075 15.2406C9.1785 15.3566 9.4505 15.5316 9.7305 15.7156C10.4765 16.2096 11.5135 16.8876 12.8795 16.1516C13.8132 15.641 14.3552 14.7673 14.827 14.0069L14.8365 13.9916C14.8682 13.9407 14.8997 13.8898 14.9311 13.8391C15.0915 13.5799 15.2495 13.3246 15.4285 13.0896C15.6505 12.7986 16.4745 11.8886 17.5395 12.5366C18.2185 12.9446 18.7895 13.4966 19.4005 14.0876Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="ms-3 mb-0">Add Prperties</span>
            </span>
          </button>
        </div>
        <h4 className="py-3 mb-0">Recently viewed</h4>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {listings.map(({ node: listing }) => (
            <div className="col" key={listing.id}>
              <div className="card iq-file-manager">
                <div className="card-body card-thumbnail">
                  <a
                    data-fslightbox="gallery"
                    href={listing.images[0]?.url || "#"} // Use the first image URL
                  >
                    <img
                      src={listing.images[0]?.url || "default-image-url"} // Fallback to a default image
                      className="img-fluid"
                      alt={listing.address}
                      loading="lazy"
                    />
                  </a>
                  <div className="mt-2">
                    <p className="small mb-2">{listing.created}</p>
                    <div className="d-flex align-items-center mb-2 text-primary gap-2">
                      <svg
                        className="icon-24"
                        width="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M16.3328 22H7.66618C4.2769 22 2 19.6229 2 16.0843V7.91672C2 4.37811 4.2769 2 7.66618 2H16.3338C19.7231 2 22 4.37811 22 7.91672V16.0843C22 19.6229 19.7231 22 16.3328 22Z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.2451 8.67496C11.2451 10.045 10.1301 11.16 8.7601 11.16C7.3891 11.16 6.2751 10.045 6.2751 8.67496C6.2751 7.30496 7.3891 6.18896 8.7601 6.18896C10.1301 6.18896 11.2451 7.30496 11.2451 8.67496ZM19.4005 14.0876C19.6335 14.3136 19.8005 14.5716 19.9105 14.8466C20.2435 15.6786 20.0705 16.6786 19.7145 17.5026C19.2925 18.4836 18.4845 19.2246 17.4665 19.5486C17.0145 19.6936 16.5405 19.7556 16.0675 19.7556H7.6865C6.8525 19.7556 6.1145 19.5616 5.5095 19.1976C5.1305 18.9696 5.0635 18.4446 5.3445 18.1026C5.8145 17.5326 6.2785 16.9606 6.7465 16.3836C7.6385 15.2796 8.2395 14.9596 8.9075 15.2406C9.1785 15.3566 9.4505 15.5316 9.7305 15.7156C10.4765 16.2096 11.5135 16.8876 12.8795 16.1516C13.8132 15.641 14.3552 14.7673 14.827 14.0069L14.8365 13.9916C14.8682 13.9407 14.8997 13.8898 14.9311 13.8391C15.0915 13.5799 15.2495 13.3246 15.4285 13.0896C15.6505 12.7986 16.4745 11.8886 17.5395 12.5366C18.2185 12.9446 18.7895 13.4966 19.4005 14.0876Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p className="mb-0 text-dark">{listing.address}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>You opened <a href="javascript:void(0)">just now</a></small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3 class="my-3">All Properties</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                <div class="col">
                    <div class="card iq-file-manager">
                        <div class="card-body card-thumbnail">
                            <a data-fslightbox="gallery" href="../file-manager/assets/images/5.png">
                                <img src={listing.images[0]?.url || "default-image-url"} class="img-fluid" alt="5.png" loading="lazy" />
                            </a>
                            <div class="mt-2">
                                <p class="small mb-2">{listing.created}</p>
                                <div class="d-flex align-items-center mb-2 text-primary gap-2">
                                    <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.3328 22H7.66618C4.2769 22 2 19.6229 2 16.0843V7.91672C2 4.37811 4.2769 2 7.66618 2H16.3338C19.7231 2 22 4.37811 22 7.91672V16.0843C22 19.6229 19.7231 22 16.3328 22Z" fill="currentColor"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2451 8.67496C11.2451 10.045 10.1301 11.16 8.7601 11.16C7.3891 11.16 6.2751 10.045 6.2751 8.67496C6.2751 7.30496 7.3891 6.18896 8.7601 6.18896C10.1301 6.18896 11.2451 7.30496 11.2451 8.67496ZM19.4005 14.0876C19.6335 14.3136 19.8005 14.5716 19.9105 14.8466C20.2435 15.6786 20.0705 16.6786 19.7145 17.5026C19.2925 18.4836 18.4845 19.2246 17.4665 19.5486C17.0145 19.6936 16.5405 19.7556 16.0675 19.7556H7.6865C6.8525 19.7556 6.1145 19.5616 5.5095 19.1976C5.1305 18.9696 5.0635 18.4446 5.3445 18.1026C5.8145 17.5326 6.2785 16.9606 6.7465 16.3836C7.6385 15.2796 8.2395 14.9596 8.9075 15.2406C9.1785 15.3566 9.4505 15.5316 9.7305 15.7156C10.4765 16.2096 11.5135 16.8876 12.8795 16.1516C13.8132 15.641 14.3552 14.7673 14.827 14.0069L14.8365 13.9916C14.8682 13.9407 14.8997 13.8898 14.9311 13.8391C15.0915 13.5799 15.2495 13.3246 15.4285 13.0896C15.6505 12.7986 16.4745 11.8886 17.5395 12.5366C18.2185 12.9446 18.7895 13.4966 19.4005 14.0876Z" fill="currentColor"></path>
                                    </svg>
                                    <p class=" mb-0 text-dark">Gallery-1234725783.jpg</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <small>You opened <a href="javascript:void(0)">just now</a></small>
                            </div>
                        </div>    
                    </div>        
                </div>
                
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div id="drag-drop-area">        
                                        <div class="uppy-Root">
                                            <div class="uppy-Dashboard uppy-Dashboard--animateOpenClose uppy-Dashboard--isInnerWrapVisible" data-uppy-theme="light" data-uppy-num-acquirers="0" data-uppy-drag-drop-supported="true" aria-hidden="false" aria-disabled="false" aria-label="Uppy Dashboard">
                                            <div aria-hidden="true" class="uppy-Dashboard-overlay" tabindex="-1">
                                            </div>
                                            <div class="uppy-Dashboard-inner" aria-modal="false" role="false" style="width: 1148px; height: 550px;">
                                                <div class="uppy-Dashboard-innerWrap">
                                                <div class="uppy-Dashboard-dropFilesHereHint">Drop your files here</div>
                                                <div class="uppy-Dashboard-AddFiles">
                                            <input class="uppy-Dashboard-input" hidden="" aria-hidden="true" tabindex="-1" type="file" name="files[]" multiple="" accept="" />
                                            <input class="uppy-Dashboard-input" hidden="" aria-hidden="true" tabindex="-1" webkitdirectory="" type="file" name="files[]" multiple="" accept="" />
                                            <div class="uppy-Dashboard-AddFiles-title">Drop files here or <button type="button" class="uppy-u-reset uppy-Dashboard-browse" data-uppy-super-focusable="true">browse files</button>
                                            </div>
                                            <div class="uppy-Dashboard-AddFiles-info">
                                                <a tabindex="-1" href="https://uppy.io" rel="noreferrer noopener" target="_blank" class="uppy-Dashboard-poweredBy">Powered by <span><svg aria-hidden="true" focusable="false" class="uppy-c-icon uppy-Dashboard-poweredByIcon" width="11" height="11" viewBox="0 0 11 11">
                                                    <path d="M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z" fillRule="evenodd"></path></svg><span class="uppy-Dashboard-poweredByUppy">Uppy</span></span>
                                                    </a>
                                                    </div>
                                                    </div>
                                                    <div class="uppy-Dashboard-progressindicators">
                                                        <div class="uppy-StatusBar is-waiting" aria-hidden="true">
                                                            <div class="uppy-StatusBar-progress" role="progressbar" aria-label="0%" aria-valuetext="0%" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="width: 0%;">
                                                                </div>
                                                                <div class="uppy-StatusBar-actions">
                                                                    </div>
                                                                    </div>
                                                                    <div class="uppy uppy-Informer"><span></span>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  );
});

export default Property;


