import React, { memo, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Row, Col, Card } from "react-bootstrap";
import SubHeader from "../../components/widgets/sub-header";
import placeholderImage from '../../assets/images/products/Royal Infinity/elite/Elite-Scene-1.png';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { GET_ALL_LISTINGS, GET_LISTING } from "../../queries/realestate_query/queries";
const PropertiesDetail = () => {
  const { slug } = useParams();

  // Fetch product details
  const { loading: loading, error: errordataListing, data: datadataListing } = useQuery(GET_LISTING, {
    variables: { slug },
  });

  // Fetch similar products
  const { loading: loadingListings, error: errorListings, data: dataListings } = useQuery(GET_ALL_LISTINGS, {
    variables: { first: 10 },
  });

  // Combined loading and error states
  const isLoading = loadingdataListing || loadingListings;
  const hasError = errorListing || errorListings;

  // Memoize product details
  const product = dataListing?.ListingsBySlug;

  // Memoize breadcrumbs
  const breadcrumbItems = useMemo(() => {
    const items = ["Home"];
    if (listing?.listingCategory) {
      const { parent, name } = listing.listingCategory;
      if (parent) {
        if (parent.parent) items.push(parent.parent.name); // Grandparent
        items.push(parent.name); // Parent
      }
      items.push(name); // Current category
    }
    if (listing?.name) items.push(listing.name);
    return items;
  }, [listing]);

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error loading content. Please try again later.</p>;

  return (
    <>
      {/* SubHeader */}

      <SubHeader breadcrumbItems={breadcrumbItems} />


      <div className="content-inner pb-0 container-fluid" id="page_layout">
        <Row>
          <Col lg={12}>
            {/* Product Details */}
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  {/* Property Images */}
                  <Col lg={7}>
                    {listing?.media?.edges.length > 0 ? (
                      listing.media.edges.map(({ node }, idx) => (
                        <img
                          key={idx}
                          alt={`${listing.name}-${idx}`}
                          src={`http://localhost:8081/media/${node.image}`}
                          className="img-fluid iq-product-img rounded-2 w-100 mb-3"
                          loading="lazy"
                        />
                      ))
                    ) : (
                      <p>No product images available.</p>
                    )}
                  </Col>

                  {/* listing Info */}
                  <Col lg={5} className="mt-4 mt-lg-0">
                    <h2 className="mb-3">{listing.name}</h2>
                    <p>{listing.description}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Similar Property */}
            <Card className="mt-4">
              <Card.Body>
                <h4>Similar Properties</h4>
                <Swiper
                  spaceBetween={32}
                  slidesPerView={2}
                  navigation
                  modules={[Navigation]}
                  className="slider-circle-btn"
                >
                  {dataListings?.allListings?.edges.map(({ node: simListing }) => {
                    const productMedia = simListing.media?.edges?.[0]?.node.image;
                    return (
                      <SwiperSlide key={simListing.slug} className="swiper-slide card-slide">
                        <Link to={`/products/${simListing.slug}`} className="text-decoration-none">
                          <img
                            alt={simListing.name}
                            src={
                              listingMedia
                                ? `http://localhost:8080/media/${listingMedia}`
                                : placeholderImage 
                            }
                            className="img-fluid iq-product-img rounded-2 w-100 mb-2"
                            loading="lazy"
                          />
                          <div className="card-body p-0">
                            <p className="h6 iq-product-detail mb-0 text-secondary">{simListing.name}</p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo(PropertiesDetail);
