const CategoryList  = memo(() => {
    return (
    <>
    <div class="content-inner pb-0 container-fluid" id="page_layout">
        <div class=" mb-4">
            <div>
                <h4 class="mb-0">Category</h4>
            </div>
            <div>
                <ul class="nav iq-nav-category mt-3 mb-3 justify-content-start bg-transparent" id="pills-tab" role="tablist">
                    <li class="nav-item me-3" role="presentation">
                        <a class="nav-link active" id="pills-no-1-tab" data-bs-toggle="pill" href="" data-bs-target="#pills-no-1" role="tab" aria-controls="pills-no-1" aria-selected="true">All</a>
                    </li>
                    <li class="nav-item me-3" role="presentation">
                        <a class="nav-link" id="pills-no-2-tab" data-bs-toggle="pill" data-bs-target="#pills-no-2" href="" role="tab" aria-controls="pills-no-2" aria-selected="false" tabindex="-1">Popular</a>
                    </li>
                    <li class="nav-item me-3" role="presentation">
                        <a class="nav-link" id="pills-no-3-tab" data-bs-toggle="pill" data-bs-target="#pills-no-3" href="" role="tab" aria-controls="pills-no-3" aria-selected="false" tabindex="-1">Latest</a>
                    </li>
                </ul>
            </div>
            <div class="tab-content iq-tab-fade-up mt-3" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-no-1" role="tabpanel" aria-labelledby="pills-no-1">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458</span>
                                    </div>
                                </div>
                            </div>                   
                             </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                   
                             </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Knitted Shrug</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                   
                             </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                   
                             </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                  
                              </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                  
                              </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                                        <span class="text-muted">Qty: 500</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
        <div class="iq-product-hover-img position-relative">
            <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
        </div>
        <div class="card-body">
            <div class="d-flex flex-column">
                <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                <span class="text-muted">Qty: 500</span>
            </div>
        </div>
    </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458 </span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" /> 
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" /> 
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-no-2" role="tabpanel" aria-labelledby="pills-no-2">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" /> 
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458 </span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Knitted Shrug</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                                        <span class="text-muted">Qty: 500</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
        <div class="iq-product-hover-img position-relative">
            <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
        </div>
        <div class="card-body">
            <div class="d-flex flex-column">
                <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                <span class="text-muted">Qty: 500</span>
            </div>
        </div>
    </div>                       </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458 </span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" /> 
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-no-3" role="tabpanel" aria-labelledby="pills-no-3">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-4">
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458 </span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Knitted Shrug</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                                        <span class="text-muted">Qty: 500</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
        <div class="iq-product-hover-img position-relative">
            <img src="../e-commerce/assets/images/product/07.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
        </div>
        <div class="card-body">
            <div class="d-flex flex-column">
                <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Sweater</a>
                <span class="text-muted">Qty: 500</span>
            </div>
        </div>
    </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/02.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Casual Shoes</a>
                                        <span class="text-muted">Qty: 5458 </span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/05.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Black Sweatshirt</a>
                                        <span class="text-muted">Qty: 3265</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/04.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Biker’s Jacket</a>
                                        <span class="text-muted">Qty: 6542</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/10.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Pink Handbag</a>
                                        <span class="text-muted">Qty: 365</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/06.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Blue Handbag</a>
                                        <span class="text-muted">Qty: 1546</span>
                                    </div>
                                </div>
                            </div>                    </div>
                        <div class="col">
                            <div class="card iq-product-custom-card">
                                <div class="iq-product-hover-img position-relative">
                                    <img src="../e-commerce/assets/images/product/09.png" alt="product-details" class="img-fluid iq-product-img" loading="lazy" />
                                </div>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <a href="./product-detail.html" class="h5 mb-0 iq-product-detail">Brown Hand Bag</a>
                                        <span class="text-muted">Qty: 4623</span>
                                    </div>
                                </div>
                            </div>                    </div>
                    </div>
                </div>
            </div> 
            <div class="text-center">
                <a href="javascript:void(0);" class="btn btn-primary">Load More</a>
            </div>
        </div>
    </div>
    </>
    );
}) 
export default CategoryList