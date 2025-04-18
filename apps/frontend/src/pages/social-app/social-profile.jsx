const SocialProfile = memo(() => {
    return (
    <>
    <div class="content-inner pb-0 container-fluid" id="page_layout">
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <ul class="nav nav-pills mb-0 mb-md-3" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" href="#pills-timeline-tab" data-bs-toggle="tab" data-bs-target="#timeline" aria-selected="true" role="tab">Timeline</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" href="#pills-about-tab" data-bs-toggle="tab" data-bs-target="#about" aria-selected="false" role="tab" tabindex="-1">About</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link d-flex justify-content-center align-items-center" href="#pills-friends-tab" data-bs-toggle="tab" data-bs-target="#friends" aria-selected="false" role="tab" tabindex="-1">Friends  <span class="badge bg-success d-inline-block py-1 ms-2">100</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" href="#pills-photos-tab" data-bs-toggle="tab" data-bs-target="#photos" aria-selected="false" role="tab" tabindex="-1">Photos</a>
                    </li>
                </ul>
                <div class="d-flex flex-wrap flex-sm-nowrap gap-3 mt-4 mt-md-0">
                    <div class="d-flex justify-content-between align-items-center gap-3 mb-3 mb-sm-0">
                        <button class="btn btn-icon btn-sm btn-primary rounded-pill">
                            <span class="btn-inner">
                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                    <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                        <button class="btn btn-icon btn-sm btn-primary rounded-pill">
                            <span class="btn-inner">
                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                    <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                        <span>
                            <img class="img-fluid rounded-circle avatar-30" src="../social-app/assets/images/avatar/01.png" alt="user-img" loading="lazy">
                        </span>
                    </div>
                    <div class="nav">
                        <div class="form-group input-group mb-0 search-input w-100">
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-text">
                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tab-content iq-tab-fade-up">
        <div class="tab-pane fade show active" id="timeline" role="tabpanel">
            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="mb-0">Create a Post</h4>
                        </div>
                        <div class="card-body">
                            <div class="border-bottom">
                                <div class="d-flex align-items-center mb-3">
                                    <img class="img-fluid rounded-circle avatar-60 p-1 border border-2 border-primary border-dotted" src="../social-app/assets/images/avatar/22.png" alt="" loading="lazy">
                                    <form class="ms-3 w-100" data-bs-toggle="modal" data-bs-target="#post-modal" action="javascript:void(0);">
                                        <input type="text" class="form-control border-0 shadow-none" placeholder="Write Something Here...">
                                    </form>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mt-3 text-dark">
                                <div class="btn btn-sm btn-primary-subtle gap-2 d-flex align-items-center">
                                    <span>Photo</span>
                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                        <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div class="btn btn-sm btn-primary-subtle mx-3 gap-2 d-flex align-items-center">
                                    <span>Tag Friend</span>
                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div class="btn btn-sm btn-primary-subtle">More ...</div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex  justify-content-between">
                            <div class="header-title">
                                <div class="d-flex justify-content-center flex-wrap gap-3">
                                    <img class="img-fluid rounded-circle p-1 border border-2 border-primary border-dotted avatar-50" src="../social-app/assets/images/avatar/22.png" alt="profile-img" loading="lazy">
                                    <div class="media-support-info">
                                        <div class="d-flex align-items-center mb-2 gap-2">
                                            <h6 class="mb-0">Joshua Martin</h6>
                                            <small class="text-dark">Added New Post</small>
                                        </div>
                                        <p class="mb-0 text-muted">3 hrs Ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown">
                                <span id="post-dropdown-01" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                    <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                                    </svg>
                                </span>
                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="post-dropdown-01">
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Edit Post</span>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Security</span>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M22 12C22 17.524 17.523 22 12 22C6.477 22 2 17.524 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12Z" fill="currentColor"></path>
                                            <path d="M15.5739 15.8145C15.4429 15.8145 15.3109 15.7805 15.1899 15.7095L11.2639 13.3675C11.0379 13.2315 10.8989 12.9865 10.8989 12.7225V7.67554C10.8989 7.26154 11.2349 6.92554 11.6489 6.92554C12.0629 6.92554 12.3989 7.26154 12.3989 7.67554V12.2965L15.9589 14.4195C16.3139 14.6325 16.4309 15.0925 16.2189 15.4485C16.0779 15.6835 15.8289 15.8145 15.5739 15.8145Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Timer</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="user-post">
                                <img src="../social-app/assets/images/app/01.png" class="img-fluid rounded w-100" alt="post-image" data-bs-toggle="modal" data-bs-target="#image-modal" role="button" loading="lazy">
                            </div>
                            <div class="comment-area pt-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="total-like-block">
                                            <div class="dropdown">
                                                <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                        <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                        <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                    </svg>
                                                    <span class=" d-none d-sm-block">45 Likes</span>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="javascript:void(0);">Max Emum</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Bill Yerds</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Hap E. Birthday</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Tara Misu</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Midge Itz</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Sal Vidge</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Other</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="total-comment-block">
                                            <div class="dropdown">
                                                <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                    </svg>
                                                    <span class=" d-none d-sm-block">12 Comments</span>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="javascript:void(0);">Max Emum</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Bill Yerds</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Hap E. Birthday</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Tara Misu</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Midge Itz</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Sal Vidge</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Other</a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn">
                                            <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M5.50052 15C6.37518 14.9974 7.21675 14.6653 7.85752 14.07L14.1175 17.647C13.9078 18.4666 14.0002 19.3343 14.378 20.0913C14.7557 20.8483 15.3935 21.4439 16.1745 21.7692C16.9555 22.0944 17.8275 22.1274 18.6309 21.8623C19.4343 21.5971 20.1153 21.0515 20.5493 20.3252C20.9832 19.599 21.1411 18.7408 20.994 17.9076C20.8469 17.0745 20.4047 16.3222 19.7483 15.7885C19.0918 15.2548 18.2652 14.9753 17.4195 15.0013C16.5739 15.0273 15.7659 15.357 15.1435 15.93L8.88352 12.353C8.94952 12.103 8.98552 11.844 8.99152 11.585L15.1415 8.06996C15.7337 8.60874 16.4932 8.92747 17.2925 8.97268C18.0918 9.01789 18.8823 8.78684 19.5315 8.31828C20.1806 7.84972 20.6489 7.17217 20.8577 6.39929C21.0666 5.6264 21.0032 4.80522 20.6784 4.0735C20.3535 3.34178 19.7869 2.74404 19.0735 2.38056C18.3602 2.01708 17.5436 1.90998 16.7607 2.07723C15.9777 2.24447 15.2761 2.67588 14.7736 3.29909C14.271 3.92229 13.9981 4.69937 14.0005 5.49996C14.0045 5.78796 14.0435 6.07496 14.1175 6.35296L8.43352 9.59997C8.1039 9.09003 7.64729 8.67461 7.10854 8.39454C6.5698 8.11446 5.96746 7.97937 5.3607 8.00251C4.75395 8.02566 4.16365 8.20627 3.64781 8.52658C3.13197 8.84689 2.70834 9.29589 2.41853 9.82946C2.12872 10.363 1.98271 10.9628 1.99484 11.5699C2.00697 12.177 2.17683 12.7704 2.48772 13.292C2.79861 13.8136 3.23984 14.2453 3.76807 14.5447C4.29629 14.8442 4.89333 15.0011 5.50052 15Z" fill="currentColor"></path>
                                            </svg>
                                            <span class=" d-none d-sm-block">30 Share</span>
                                        </a>
                                    </div>
                                    <a href="javascript:void(0);" class="d-flex align-items-center gap-2 text-body save">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M11.9912 18.6215L5.49945 21.864C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7087C4 14.4283 4.40573 14.8725 5.47299 15.37L11.9912 18.6215Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z" fill="currentColor"></path>
                                        </svg>
                                        <span>
                                            Save
                                        </span>
                                    </a>
                                </div>
                                <hr>
                                <ul class="list-inline mt-4">
                                    <li class="mb-0">
                                        <div class="d-flex gap-3">
                                            <img src="../social-app/assets/images/avatar/11.png" alt="userimg" class="avatar-50 rounded-circle img-fluid" loading="lazy">
                                            <div class="w-100">
                                                <h6 class="mb-1">Larry Robbins</h6>
                                                <p class="mb-1">So True!!</p>
                                                <div class="d-flex flex-wrap align-items-center gap-3">
                                                    <a href="javascript:void(0)">Like</a>
                                                    <a href="#reply-01" data-bs-toggle="collapse" aria-expanded="false" aria-controls="reply-01">Reply</a>
                                                    <span> 2 Min Ago </span>
                                                </div>
                                                <div class="collapse" id="reply-01">
                                                    <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                                        <input type="text" class="form-control" placeholder="Enter Your Reply...">
                                                        <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                                            <a href="javascript:void(0);" class=" text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                                    <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                                    <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="javascript:void(0);" class="text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                                    <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="javascript:void(0);" class="text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                                    <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                    <input type="text" class="form-control" placeholder="Enter Your Comment Here...">
                                    <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                        <a href="javascript:void(0);" class=" text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                        <a href="javascript:void(0);" class="text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                        <a href="javascript:void(0);" class="text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="hero-image position-relative rounded">
                            <div class="h-100">
                                <div class="row align-items-center h-100">
                                    <div class="col-lg-12">
                                        <h2 class="mb-3 text-gray-dark">Complement your<br> flawless beauty.</h2>
                                        <p class="mb-3 text-gray">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                        <button type="button" class="btn btn-primary">Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex  justify-content-between">
                            <div class="header-title">
                                <div class="d-flex justify-content-center flex-wrap gap-3">
                                    <img class="img-fluid rounded-circle p-1 border border-2 border-primary border-dotted avatar-50" src="../social-app/assets/images/avatar/22.png" alt="profile-img" loading="lazy">
                                    <div class="media-support-info">
                                        <div class="d-flex align-items-center mb-2 gap-2">
                                            <h6 class="mb-0">Ella Martina</h6>
                                            <small class="text-dark">Updated Her Status</small>
                                        </div>
                                        <p class="mb-0 text-muted">5 hrs Ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown">
                                <span id="post-dropdown-02" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                    <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                                    </svg>
                                </span>
                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="post-dropdown-02">
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Edit Post</span>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Security</span>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                        <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M22 12C22 17.524 17.523 22 12 22C6.477 22 2 17.524 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12Z" fill="currentColor"></path>
                                            <path d="M15.5739 15.8145C15.4429 15.8145 15.3109 15.7805 15.1899 15.7095L11.2639 13.3675C11.0379 13.2315 10.8989 12.9865 10.8989 12.7225V7.67554C10.8989 7.26154 11.2349 6.92554 11.6489 6.92554C12.0629 6.92554 12.3989 7.26154 12.3989 7.67554V12.2965L15.9589 14.4195C16.3139 14.6325 16.4309 15.0925 16.2189 15.4485C16.0779 15.6835 15.8289 15.8145 15.5739 15.8145Z" fill="currentColor"></path>
                                        </svg>
                                        <span class="ms-2">Timer</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>Purchased New Home Decors For My New Home :)</p>
                            <div class="iq-grid-container">
                                <div class="item-img-1">
                                    <a data-fslightbox="social" href="../social-app/assets/images/social-profile/10.png">
                                        <img src="../social-app/assets/images/social-profile/10.png" class="img-fluid h-100 object-cover  rounded" alt="grid-1">
                                    </a>
                                </div>
                                <div class="item-img-2">
                                    <a class="d-flex justify-content-center" data-fslightbox="social" href="../social-app/assets/images/social-profile/11.png">
                                    <img class="img-fluid h-100 object-cover rounded" src="../social-app/assets/images/social-profile/11.png" alt="grid-2" loading="lazy">
                                    </a>
                                </div>
                                <a class="d-flex justify-content-center" data-fslightbox="social" href="../social-app/assets/images/social-profile/12.png">
                                    <img class="img-fluid h-100 object-cover rounded" src="../social-app/assets/images/social-profile/12.png" alt="grid-3" loading="lazy">
                                </a>
                                <a class="d-flex justify-content-center" data-fslightbox="social" href="../social-app/assets/images/social-profile/13.png">
                                    <img class="img-fluid h-100 object-cover rounded" src="../social-app/assets/images/social-profile/13.png" alt="grid-4" loading="lazy">
                                </a>
                            </div>
                            <div class="comment-area pt-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="total-like-block">
                                            <div class="dropdown">
                                                <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                        <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                        <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                    </svg>
                                                    <span class=" d-none d-sm-block">53 Likes</span>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="javascript:void(0);">Max Emum</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Bill Yerds</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Hap E. Birthday</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Tara Misu</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Midge Itz</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Sal Vidge</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Other</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="total-comment-block">
                                            <div class="dropdown">
                                                <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                    </svg>
                                                    <span class=" d-none d-sm-block">41 Comments</span>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="javascript:void(0);">Max Emum</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Bill Yerds</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Hap E. Birthday</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Tara Misu</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Midge Itz</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Sal Vidge</a>
                                                    <a class="dropdown-item" href="javascript:void(0);">Other</a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" class="text-body d-flex align-items-center gap-2" data-bs-toggle="offcanvas" data-bs-target="#share-btn" aria-controls="share-btn">
                                            <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M5.50052 15C6.37518 14.9974 7.21675 14.6653 7.85752 14.07L14.1175 17.647C13.9078 18.4666 14.0002 19.3343 14.378 20.0913C14.7557 20.8483 15.3935 21.4439 16.1745 21.7692C16.9555 22.0944 17.8275 22.1274 18.6309 21.8623C19.4343 21.5971 20.1153 21.0515 20.5493 20.3252C20.9832 19.599 21.1411 18.7408 20.994 17.9076C20.8469 17.0745 20.4047 16.3222 19.7483 15.7885C19.0918 15.2548 18.2652 14.9753 17.4195 15.0013C16.5739 15.0273 15.7659 15.357 15.1435 15.93L8.88352 12.353C8.94952 12.103 8.98552 11.844 8.99152 11.585L15.1415 8.06996C15.7337 8.60874 16.4932 8.92747 17.2925 8.97268C18.0918 9.01789 18.8823 8.78684 19.5315 8.31828C20.1806 7.84972 20.6489 7.17217 20.8577 6.39929C21.0666 5.6264 21.0032 4.80522 20.6784 4.0735C20.3535 3.34178 19.7869 2.74404 19.0735 2.38056C18.3602 2.01708 17.5436 1.90998 16.7607 2.07723C15.9777 2.24447 15.2761 2.67588 14.7736 3.29909C14.271 3.92229 13.9981 4.69937 14.0005 5.49996C14.0045 5.78796 14.0435 6.07496 14.1175 6.35296L8.43352 9.59997C8.1039 9.09003 7.64729 8.67461 7.10854 8.39454C6.5698 8.11446 5.96746 7.97937 5.3607 8.00251C4.75395 8.02566 4.16365 8.20627 3.64781 8.52658C3.13197 8.84689 2.70834 9.29589 2.41853 9.82946C2.12872 10.363 1.98271 10.9628 1.99484 11.5699C2.00697 12.177 2.17683 12.7704 2.48772 13.292C2.79861 13.8136 3.23984 14.2453 3.76807 14.5447C4.29629 14.8442 4.89333 15.0011 5.50052 15Z" fill="currentColor"></path>
                                            </svg>
                                            <span class=" d-none d-sm-block">52 Share</span>
                                        </a>
                                    </div>
                                    <a href="javascript:void(0);" class="d-flex align-items-center gap-2 text-body save">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M11.9912 18.6215L5.49945 21.864C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7087C4 14.4283 4.40573 14.8725 5.47299 15.37L11.9912 18.6215Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z" fill="currentColor"></path>
                                        </svg>
                                        <span>
                                            Save
                                        </span>
                                    </a>
                                </div>
                                <hr>
                                <ul class="list-inline mt-4">
                                    <li class="mb-0">
                                        <div class="d-flex gap-3">
                                            <img src="../social-app/assets/images/avatar/11.png" alt="userimg" class="avatar-50 rounded-circle img-fluid" loading="lazy">
                                            <div class="w-100">
                                                <h6 class="mb-1">Larry Robbins</h6>
                                                <p class="mb-1">So True!!</p>
                                                <div class="d-flex flex-wrap align-items-center gap-3">
                                                    <a href="javascript:void(0)">Like</a>
                                                    <a href="#reply-02" data-bs-toggle="collapse" aria-expanded="false" aria-controls="reply-02">Reply</a>
                                                    <span> 2 Min Ago </span>
                                                </div>
                                                <div class="collapse" id="reply-02">
                                                    <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                                        <input type="text" class="form-control" placeholder="Enter Your Reply...">
                                                        <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                                            <a href="javascript:void(0);" class=" text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                                    <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                                    <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="javascript:void(0);" class="text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                                    <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="javascript:void(0);" class="text-body">
                                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                                    <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                    <input type="text" class="form-control" placeholder="Enter Your Comment Here...">
                                    <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                        <a href="javascript:void(0);" class=" text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                        <a href="javascript:void(0);" class="text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                        <a href="javascript:void(0);" class="text-body">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 ">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3">
                                <span class="badge bg-info py-2 ">
                                    <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
                                <h5 class="mb-0">21 New Items For You</h5>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Photos</h4>
                            </div>
                            <div class="card-header-toolbar d-flex align-items-center">
                                <p class="m-0"><a href="javascript:void(0)">Add New </a></p>
                            </div>
                        </div>
                        <div class="card-body">
                            <ul class="profile-img-gallary p-0 m-0 list-unstyled d-grid gap-card grid-cols-3">
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/10.png"><img src="../social-app/assets/images/avatar/10.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/11.png"><img src="../social-app/assets/images/avatar/11.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/12.png"><img src="../social-app/assets/images/avatar/12.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/13.png"><img src="../social-app/assets/images/avatar/13.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/14.png"><img src="../social-app/assets/images/avatar/14.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/15.png"><img src="../social-app/assets/images/avatar/15.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/16.png"><img src="../social-app/assets/images/avatar/16.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/17.png"><img src="../social-app/assets/images/avatar/17.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                                <li class=""><a data-fslightbox="gallery" href="../social-app/assets/images/avatar/18.png"><img src="../social-app/assets/images/avatar/18.png" alt="gallary-image" class="img-fluid rounded" loading="lazy"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Friends</h4>
                            </div>
                            <div class="card-header-toolbar d-flex align-items-center">
                                <p class="m-0"><a href="javascript:void(0)">Add New </a></p>
                            </div>
                        </div>
                         <div class="card-body">
                            <ul class="profile-img-gallary p-0 m-0 list-unstyled d-grid gap-card grid-cols-3">
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/01.png">
                                    <img src="../social-app/assets/images/avatar/01.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Anna Rexia</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/02.png">
                                    <img src="../social-app/assets/images/avatar/02.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Tara Zona</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/03.png">
                                    <img src="../social-app/assets/images/avatar/03.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Polly Tech</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/04.png">
                                    <img src="../social-app/assets/images/avatar/04.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Bill Emia</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/05.png">
                                    <img src="../social-app/assets/images/avatar/05.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Moe Fugga</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/06.png">
                                    <img src="../social-app/assets/images/avatar/06.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Hal Appeno </h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/07.png">
                                    <img src="../social-app/assets/images/avatar/07.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Zack Lee</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/08.png">
                                    <img src="../social-app/assets/images/avatar/08.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Terry Aki</h6>
                                </li>
                                <li class="">
                                <a data-fslightbox="gallery" href="../social-app/assets/images/avatar/09.png">
                                    <img src="../social-app/assets/images/avatar/09.png" alt="gallary-image" class="img-fluid rounded" loading="lazy">
                                </a>
                                <h6 class="mt-2 text-center">Greta Life</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Live Events</h4>
                            </div>
                            <a class="text-body" href="javascript:void(0)">View All</a>
                        </div>
                        <div class="card-body">
                            <img src="../social-app/assets/images/social-profile/14.png" alt="userimg" class="img-fluid w-100" loading="lazy">
                            <div class="d-flex justify-content-between align-items-center my-3">
                                <h6 class="mb-0">Music Festival 2021</h6>
                                <div class="btn btn-sm text-dark ">
                                    Sep 23
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <span class="d-flex align-items-center gap-2">
                                    <svg class="icon-20" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <span class="d-none d-sm-block">1901 Thornridge</span>
                                </span>
                                <p class="mb-0">5 KM</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="iq-media-group iq-media-group-1">
                                    <a href="javascript:void(0)" class="iq-media-1">
                                        <div class="icon">
                                            <img class="img-fluid rounded-circle avatar-40" src="../social-app/assets/images/avatar/25.png" alt="" loading="lazy">
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="iq-media-1">
                                        <div class="icon">
                                            <img class="img-fluid rounded-circle avatar-40" src="../social-app/assets/images/avatar/27.png" alt="" loading="lazy">
                                        </div>
                                    </a>
                                    <a href="javascript:void(0)" class="iq-media-1">
                                        <div class="icon rounded-circle bg-primary text-white avatar-40">+ 25</div>
                                    </a>
                                </div>
                                <h6 class="mb-0">25 joined</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="about" role="tabpanel">
            <div class="row">
              <div class="col-sm-12">
                 <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="nav flex-column nav-pills nav-iconly gap-3" role="tablist">
                                    <a class="nav-link active" href="#v-pills-basicinfo-tab" data-bs-toggle="pill" data-bs-target="#v-pills-basicinfo-tab" role="button" aria-selected="true">Contact and Basic Info</a>
                                    <a class="nav-link" href="#v-pills-family-tab" data-bs-toggle="pill" data-bs-target="#v-pills-family" role="button" aria-selected="false" tabindex="-1">Family and Relationship</a>
                                    <a class="nav-link" href="#v-pills-work-tab" data-bs-toggle="pill" data-bs-target="#v-pills-work-tab" role="button" aria-selected="false" tabindex="-1">Work and Education</a>
                                    <a class="nav-link" href="#v-pills-lived-tab" data-bs-toggle="pill" data-bs-target="#v-pills-lived-tab" role="button" aria-selected="false" tabindex="-1">Places You've Lived</a>
                                    <a class="nav-link" href="#v-pills-details-tab" data-bs-toggle="pill" data-bs-target="#v-pills-details-tab" role="button" aria-selected="false" tabindex="-1">Details About You</a>
                                </div>
                            </div>
                            <div class="col-md-10">
                                <div class="tab-content iq-tab-fade-up">
                                    <div class="tab-pane fade active show" id="v-pills-basicinfo-tab" role="tabpanel" aria-labelledby="v-pills-basicinfo-tab">
                                        <div class="mb-3">
                                            <div class="border-bottom pb-3 mb-3">
                                                <h4 class="mb-0">Contact Information</h4>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <h6>Email</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">Bnijohn@gmail.com</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>Mobile</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">(001) 4544 565 456</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>Address</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">United States of America</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <div class="border-bottom pb-3 mb-3">
                                                <h4 class="mb-0">Websites and Social Links</h4>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <h6>Website</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">www.bootstrap.com</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>Social Link</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">www.bootstrap.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-0">
                                            <div class="border-bottom pb-3 mb-3">
                                                <h4 class="mb-0">Basic Information</h4>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                    <h6>Birth Date</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">24 January</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>Birth Year</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">1994</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>Gender</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">Female</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>interested in</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">Designing</p>
                                                </div>
                                                <div class="col-3">
                                                    <h6>language</h6>
                                                </div>
                                                <div class="col-9">
                                                    <p class="mb-0">English, French</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-family" role="tabpanel">
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Relationship</h4>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 mb-4">
                                            <a href="javascript:void(0)" class="d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </a>
                                            <h6 class="mb-0 text-primary">Add Your Relationship Status</h6>
                                        </div>
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Family Members</h4>
                                        </div>
                                        <ul class="suggestions-lists m-0 p-0">
                                            <li class="d-flex align-items-center gap-2 mb-4">
                                                <a href="javascript:void(0)" class="d-flex">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </a>
                                                <h6 class="mb-0 text-primary">Add Family Members</h6>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/01.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Paul Molive</h6>
                                                        <p class="mb-0">Brother</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2 mb-4" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/02.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Anna Mull</h6>
                                                        <p class="mb-0">Sister</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3">
                                                <img src="../social-app/assets/images/avatar/03.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Paige Turner</h6>
                                                        <p class="mb-0">Cousin</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-work-tab" role="tabpanel" aria-labelledby="v-pills-work-tab">
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Work</h4>
                                        </div>
                                        <ul class="suggestions-lists m-0 p-0">
                                            <li class="d-flex align-items-center gap-2 mb-4">
                                                <a href="javascript:void(0)" class="d-flex">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </a>
                                                <h6 class="mb-0 text-primary">Add Work Place</h6>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/04.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Themeforest</h6>
                                                        <p class="mb-0">Web Designer</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2 mb-4" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/05.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>iqonicdesign</h6>
                                                        <p class="mb-0">Software Developer</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/06.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>W3school</h6>
                                                        <p class="mb-0">Designer</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Professional Skills</h4>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 mb-4">
                                            <a href="javascript:void(0)" class="d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </a>
                                            <h6 class="mb-0 text-primary">Add Professional Skills</h6>
                                        </div>

                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">College</h4>
                                        </div>
                                        <ul class="suggestions-lists m-0 p-0">
                                            <li class="d-flex align-items-center gap-2 mb-4">
                                                <a href="javascript:void(0)" class="d-flex">
                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </a>
                                                <h6 class="mb-0 text-primary">Add College</h6>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3">
                                                <img src="../social-app/assets/images/avatar/07.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>London School of Brick and Balls</h6>
                                                        <p class="mb-0">Greenwich, United Kingdom</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-lived-tab" role="tabpanel" aria-labelledby="v-pills-lived-tab">
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Current City and Hometown</h4>
                                        </div>
                                        <ul class="suggestions-lists m-0 p-0">
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/01.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Birmingham</h6>
                                                        <p class="mb-0">Liverpool</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2 mb-4" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                            <li class="d-flex align-items-center justify-content-between gap-3 mb-4">
                                                <img src="../social-app/assets/images/avatar/02.png" alt="story-img" class="rounded-circle avatar-48" loading="lazy">
                                                <div class="d-flex justify-content-between w-100">
                                                    <div>
                                                        <h6>Manchester</h6>
                                                        <p class="mb-0">Newcastle</p>
                                                    </div>
                                                    <a class="d-flex align-items-start gap-2" href="javascript:void(0);">
                                                        <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                        </svg>
                                                        Edit
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Other Places Lived</h4>
                                        </div>
                                        <div class="d-flex align-items-center gap-2 mb-4">
                                            <a href="javascript:void(0)" class="d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0001 8.32739V15.6537" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M15.6668 11.9904H8.3335" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </a>
                                            <h6 class="mb-0 text-primary">Add Place</h6>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-details-tab" role="tabpanel" aria-labelledby="v-pills-details-tab">
                                        <div class="border-bottom mb-3 pb-3">
                                            <h3 class="mb-0">About You</h3>
                                        </div>
                                        <p class="mb-3">Hi, I’m Bni, I’m 26 and I work as a Web Designer for the iqonicdesign.</p>
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Other Name</h4>
                                        </div>
                                        <p class="mb-3">Bini Rock</p>
                                        <div class="border-bottom mb-3 pb-3">
                                            <h4 class="mb-0">Favorite Quotes</h4>
                                        </div>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
        <div class="tab-pane fade" id="friends" role="tabpanel">
            <div class="card">
                <div class="card-body">
                    <h4>Friends</h4>
                    <div class="friend-list-tab mt-2">
                    <ul class="nav nav-pills" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="pill" href="#pill-all-friends" data-bs-target="#all-friends" aria-selected="true" role="tab">All Friends</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="pill" href="#pill-recently-add" data-bs-target="#recently-add" aria-selected="false" tabindex="-1" role="tab">Recently Added</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="pill" href="#pill-closefriends" data-bs-target="#closefriends" aria-selected="false" tabindex="-1" role="tab"> Close friends</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="pill" href="#pill-home" data-bs-target="#home-town" aria-selected="false" tabindex="-1" role="tab"> Home/Town</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="pill" href="#pill-following" data-bs-target="#following" aria-selected="false" tabindex="-1" role="tab">Following</a>
                        </li>
                    </ul>
                    <div class="tab-content iq-tab-fade-up">
                        <div class="tab-pane fade active show" id="all-friends" role="tabpanel">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-md-6 col-lg-6 my-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/01.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Petey Cruiser</h5>
                                                        <p class="mb-0">15  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 my-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/02.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Anna Sthesia</h5>
                                                        <p class="mb-0">50  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/03.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Paul Molive</h5>
                                                        <p class="mb-0">10  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/04.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Gail Forcewind</h5>
                                                        <p class="mb-0">20  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/05.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Paige Turner</h5>
                                                        <p class="mb-0">12  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/06.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>b Frapples</h5>
                                                        <p class="mb-0">06  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Walter Melon</h5>
                                                        <p class="mb-0">30  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/08.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Barb Ackue</h5>
                                                        <p class="mb-0">14  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/09.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Buck Kinnear</h5>
                                                        <p class="mb-0">16  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/10.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Ira Membrit</h5>
                                                        <p class="mb-0">22  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/11.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Shonda Leer</h5>
                                                        <p class="mb-0">10  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/12.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>ock Lee</h5>
                                                        <p class="mb-0">18  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/13.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Maya Didas</h5>
                                                        <p class="mb-0">40  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/14.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Rick O'Shea</h5>
                                                        <p class="mb-0">50  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/15.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Pete Sariya</h5>
                                                        <p class="mb-0">5  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/16.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Monty Carlo</h5>
                                                        <p class="mb-0">2  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/17.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Sal Monella</h5>
                                                        <p class="mb-0">0  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/18.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Sue Vaneer</h5>
                                                        <p class="mb-0">25  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/19.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Cliff Hanger</h5>
                                                        <p class="mb-0">18  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/20.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Barb Dwyer</h5>
                                                        <p class="mb-0">23  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                    <div class="border rounded">
                                       <div class="d-flex">
                                           <img src="../social-app/assets/images/avatar/21.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                           <div class="p-3 mb-0 w-100">
                                               <div class="d-flex align-items-center justify-content-between h-100">
                                                   <div class="friend-info">
                                                       <h5>Terry Aki</h5>
                                                       <p class="mb-0">8  friends</p>
                                                   </div>
                                                   <div class="dropdown">
                                                       <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                           <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                               <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                           </svg>
                                                           Friend
                                                       </a>
                                                       <div class="dropdown-menu dropdown-menu-right">
                                                           <a class="dropdown-item" href="#">Get Notification</a>
                                                           <a class="dropdown-item" href="#">Close Friend</a>
                                                           <a class="dropdown-item" href="#">Unfollow</a>
                                                           <a class="dropdown-item" href="#">Unfriend</a>
                                                           <a class="dropdown-item" href="#">Block</a>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                           <div class="card-header-toolbar d-flex align-items-center">
                                           </div>
                                       </div>
                                   </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/22.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Cory Ander</h5>
                                                        <p class="mb-0">7  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/23.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Robin Banks</h5>
                                                        <p class="mb-0">14  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/24.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Jimmy Changa</h5>
                                                        <p class="mb-0">10  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/25.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Barry Wine</h5>
                                                        <p class="mb-0">18  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/26.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Poppa Cherry</h5>
                                                        <p class="mb-0">16  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/27.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Zack Lee</h5>
                                                        <p class="mb-0">33  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/28.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Don Stairs</h5>
                                                        <p class="mb-0">15  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/13.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Peter Pants</h5>
                                                        <p class="mb-0">12  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/23.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Hal Appeno</h5>
                                                        <p class="mb-0">13  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="recently-add" role="tabpanel">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-md-6 col-lg-6 my-3">
                                     <div class="border rounded">
                                        <div class="d-flex">
                                            <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                            <div class="p-3 mb-0 w-100">
                                                <div class="d-flex align-items-center justify-content-between h-100">
                                                    <div class="friend-info">
                                                        <h5>Otto Matic</h5>
                                                        <p class="mb-0">4  friends</p>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                            <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                            </svg>
                                                            Friend
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" href="#">Get Notification</a>
                                                            <a class="dropdown-item" href="#">Close Friend</a>
                                                            <a class="dropdown-item" href="#">Unfollow</a>
                                                            <a class="dropdown-item" href="#">Unfriend</a>
                                                            <a class="dropdown-item" href="#">Block</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-header-toolbar d-flex align-items-center">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/08.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Moe Fugga</h5>
                                                         <p class="mb-0">16  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/09.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Tom Foolery</h5>
                                                         <p class="mb-0">14  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/10.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Bud Wiser</h5>
                                                         <p class="mb-0">16  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/15.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Polly Tech</h5>
                                                         <p class="mb-0">10  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/16.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Holly Graham</h5>
                                                         <p class="mb-0">8  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/17.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Tara Zona</h5>
                                                         <p class="mb-0">5  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Barry Cade</h5>
                                                         <p class="mb-0">20  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="closefriends" role="tabpanel">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/19.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Bud Wiser</h5>
                                                         <p class="mb-0">32  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/05.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Otto Matic</h5>
                                                         <p class="mb-0">9  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/06.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Peter Pants</h5>
                                                         <p class="mb-0">2  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Zack Lee</h5>
                                                         <p class="mb-0">15  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/08.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Barry Wine</h5>
                                                         <p class="mb-0">36  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                    
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/09.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Robin Banks</h5>
                                                         <p class="mb-0">22  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/10.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Cory Ander</h5>
                                                         <p class="mb-0">10  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/15.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Moe Fugga</h5>
                                                         <p class="mb-0">12  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/16.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Polly Tec</h5>
                                                         <p class="mb-0">30  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/17.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Hal Appeno</h5>
                                                         <p class="mb-0">25  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="home-town" role="tabpanel">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/18.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Paul Molive</h5>
                                                         <p class="mb-0">14  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/19.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Paige Turner</h5>
                                                         <p class="mb-0">8  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/05.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Barb Ackue</h5>
                                                         <p class="mb-0">23  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/06.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Ira Membrit</h5>
                                                         <p class="mb-0">16  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Maya Didas</h5>
                                                         <p class="mb-0">12  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="following" role="tabpanel">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/05.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Maya Didas</h5>
                                                         <p class="mb-0">20  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 my-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/06.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Monty Carlo</h5>
                                                         <p class="mb-0">3  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Cliff Hanger</h5>
                                                         <p class="mb-0">20  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/08.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>b Ackue</h5>
                                                         <p class="mb-0">12  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/09.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Bob Frapples</h5>
                                                         <p class="mb-0">12  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/10.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Anna Mull</h5>
                                                         <p class="mb-0">6  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/15.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>ry Wine</h5>
                                                         <p class="mb-0">15  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/16.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Don Stairs</h5>
                                                         <p class="mb-0">12  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/17.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Peter Pants</h5>
                                                         <p class="mb-0">8  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/18.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Polly Tech</h5>
                                                         <p class="mb-0">18  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/19.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Tara Zona</h5>
                                                         <p class="mb-0">30  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/05.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Arty Ficial</h5>
                                                         <p class="mb-0">15  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/06.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Bill Emia</h5>
                                                         <p class="mb-0">25  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/07.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Bill Yerds</h5>
                                                         <p class="mb-0">9  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                <div class="col-md-6 col-lg-6 mb-3">
                                      <div class="border rounded">
                                         <div class="d-flex">
                                             <img src="../social-app/assets/images/avatar/08.png" alt="profile-img" class="img-fluid avatar-120 rounded-0 rounded-start" loading="lazy">
                                             <div class="p-3 mb-0 w-100">
                                                 <div class="d-flex align-items-center justify-content-between h-100">
                                                     <div class="friend-info">
                                                         <h5>Matt Innae</h5>
                                                         <p class="mb-0">19  friends</p>
                                                     </div>
                                                     <div class="dropdown">
                                                         <a href="javascript:void(0)" class="d-flex justify-content-center align-items-center  btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="true" role="button">
                                                             <svg class="me-1 icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <path d="M9.81214 17.6234C9.41137 17.6234 9.01059 17.4713 8.70464 17.1654L4.45892 12.9196C3.84703 12.3077 3.84703 11.3165 4.45892 10.7064C5.07082 10.0945 6.06024 10.0927 6.67214 10.7046L9.81214 13.8446L17.1979 6.45892C17.8098 5.84703 18.7992 5.84703 19.4111 6.45892C20.023 7.07082 20.023 8.06203 19.4111 8.67392L10.9196 17.1654C10.6137 17.4713 10.2129 17.6234 9.81214 17.6234" fill="currentColor"></path>
                                                             </svg>
                                                             Friend
                                                         </a>
                                                         <div class="dropdown-menu dropdown-menu-right">
                                                             <a class="dropdown-item" href="#">Get Notification</a>
                                                             <a class="dropdown-item" href="#">Close Friend</a>
                                                             <a class="dropdown-item" href="#">Unfollow</a>
                                                             <a class="dropdown-item" href="#">Unfriend</a>
                                                             <a class="dropdown-item" href="#">Block</a>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="card-header-toolbar d-flex align-items-center">
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
        <div class="tab-pane fade" id="photos" role="tabpanel">
            <div class="card">
                <div class="card-body">
                    <h4>Photos</h4>
                    <div class="friend-list-tab mt-2">
                        <ul class="nav nav-tabs mb-0" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="pill" href="#pill-photosofyou" data-bs-target="#photosofyou" aria-selected="true" role="tab">Photos of You</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="pill" href="#pill-your-photos" data-bs-target="#your-photos" aria-selected="false" tabindex="-1" role="tab">Your Photos</a>
                            </li>
                        </ul>
                        <div class="tab-content iq-tab-fade-up">
                            <div class="tab-pane fade active show" id="photosofyou" role="tabpanel">
                                <div class="card-body p-0">
                                    <div class="d-grid gap-2 d-grid-template-1fr-13 my-3">
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/01.png">
                                            <img src="../social-app/assets/images/profile-event/01.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/02.png">
                                            <img src="../social-app/assets/images/profile-event/02.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/03.png">
                                            <img src="../social-app/assets/images/profile-event/03.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/04.png">
                                            <img src="../social-app/assets/images/profile-event/04.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/05.png">
                                            <img src="../social-app/assets/images/profile-event/05.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/06.png">
                                            <img src="../social-app/assets/images/profile-event/06.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/07.png">
                                            <img src="../social-app/assets/images/profile-event/07.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/08.png">
                                            <img src="../social-app/assets/images/profile-event/08.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/09.png">
                                            <img src="../social-app/assets/images/profile-event/09.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/10.png">
                                            <img src="../social-app/assets/images/profile-event/10.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/11.png">
                                            <img src="../social-app/assets/images/profile-event/11.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/12.png">
                                            <img src="../social-app/assets/images/profile-event/12.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/13.png">
                                            <img src="../social-app/assets/images/profile-event/13.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/14.png">
                                            <img src="../social-app/assets/images/profile-event/14.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/15.png">
                                            <img src="../social-app/assets/images/profile-event/15.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/06.png">
                                            <img src="../social-app/assets/images/profile-event/06.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/07.png">
                                            <img src="../social-app/assets/images/profile-event/07.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/08.png">
                                            <img src="../social-app/assets/images/profile-event/08.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/09.png">
                                            <img src="../social-app/assets/images/profile-event/09.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/10.png">
                                            <img src="../social-app/assets/images/profile-event/10.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/01.png">
                                            <img src="../social-app/assets/images/profile-event/01.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/02.png">
                                            <img src="../social-app/assets/images/profile-event/02.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/03.png">
                                            <img src="../social-app/assets/images/profile-event/03.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/04.png">
                                            <img src="../social-app/assets/images/profile-event/04.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="your-photos" role="tabpanel">
                                <div class="card-body p-0">
                                    <div class="d-grid gap-2 d-grid-template-1fr-13 my-3">
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/01.png">
                                            <img src="../social-app/assets/images/profile-event/01.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/02.png">
                                            <img src="../social-app/assets/images/profile-event/02.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/03.png">
                                            <img src="../social-app/assets/images/profile-event/03.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/04.png">
                                            <img src="../social-app/assets/images/profile-event/04.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/05.png">
                                            <img src="../social-app/assets/images/profile-event/05.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/06.png">
                                            <img src="../social-app/assets/images/profile-event/06.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/07.png">
                                            <img src="../social-app/assets/images/profile-event/07.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/08.png">
                                            <img src="../social-app/assets/images/profile-event/08.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/09.png">
                                            <img src="../social-app/assets/images/profile-event/09.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/10.png">
                                            <img src="../social-app/assets/images/profile-event/10.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/11.png">
                                            <img src="../social-app/assets/images/profile-event/11.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/12.png">
                                            <img src="../social-app/assets/images/profile-event/12.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/13.png">
                                            <img src="../social-app/assets/images/profile-event/13.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/14.png">
                                            <img src="../social-app/assets/images/profile-event/14.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="user-images position-relative overflow-hidden">
                                            <a data-fslightbox="gallery" href="../social-app/assets/images/profile-event/15.png">
                                            <img src="../social-app/assets/images/profile-event/15.png" class="img-fluid rounded" alt="Responsive image" loading="lazy">
                                            </a>
                                            <div class="image-hover-data">
                                                <div class="product-elements-icon">
                                                <ul class="d-flex align-items-center gap-3 m-0 p-0 list-inline">
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            60
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            30
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="text-white d-flex justify-content-center align-items-center gap-2">
                                                            10
                                                            <svg width="20" class="icon-20" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M3.5 12.5645C6 7.56444 10.3333 6.73113 12.5 7.06447V13.0645C11 13.0645 7.6 13.3645 6 14.5645C4.70893 15.5328 2.89695 17.8684 2.24538 18.7343C2.18231 18.8181 2.04803 18.7632 2.06504 18.6597C2.26701 17.4306 2.90561 13.7532 3.5 12.5645Z" fill="currentcolor"></path>
                                                                <path d="M12.2947 16C12.4431 16 12.5893 15.9593 12.7186 15.88L21.1281 10.6625C21.3591 10.5185 21.5 10.2692 21.5 10C21.5 9.73086 21.3591 9.48151 21.1281 9.33754L12.7186 4.12003C12.4738 3.96876 12.1644 3.95937 11.9111 4.09813C11.6568 4.23584 11.5 4.49771 11.5 4.78252L11.5 15.2175C11.5 15.5024 11.6568 15.7642 11.9111 15.9019C12.0309 15.9677 12.1633 16 12.2947 16Z" fill="currentcolor"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            <a href="#" class="image-edit-btn btn bg-white btn-sm btn-icon position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit or Remove">
                                                <span class="btn-inner">
                                                    <svg width="15" class="icon-16" viewBox="0 0 24 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                            </a>
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
    <div class="offcanvas offcanvas-bottom share-offcanvas" tabindex="-1" id="share-btn" aria-labelledby="shareBottomLabel">
       <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="shareBottomLabel">Share</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
       </div>
       <div class="offcanvas-body small">
          <div class="d-flex flex-wrap align-items-center">
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/08.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>Facebook</h6>
             </div>
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/09.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>Twitter</h6>
             </div>
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/10.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>Instagram</h6>
             </div>
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/11.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>Google Plus</h6>
             </div>
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/13.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>In</h6>
             </div>
             <div class="text-center me-3 mb-3">
                <img src="../assets/images/brands/12.png" class="img-fluid rounded mb-2" alt="" loading="lazy">
                <h6>YouTube</h6>
             </div>
          </div>
       </div>
    </div>    <div class="modal fade" id="post-modal" tabindex="-1" aria-labelledby="post-modalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-lg modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="post-modalLabel">Create Post</h5>
                    <button type="button" class="btn-close btn shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex align-items-center border-bottom pb-3 mb-4">
                        <div class="user-img">
                            <img src="../social-app/assets/images/avatar/01.png" alt="userimg" class="avatar-60 rounded-circle img-fluid" loading="lazy">
                        </div>
                        <form class="w-100" action="#">
                            <input type="text" class="form-control shadow-none border-0" placeholder="Write something here...">
                        </form>
                    </div>
                    <ul class="row flex-wrap align-items-center list-inline m-0 p-0">
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                    <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                </svg>
                                Photo/Video
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                                Tag Friend
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.4" cx="12" cy="12" r="10" fill="currentColor"></circle>
                                    <path d="M9.70986 9.39758C8.73513 8.42277 7.14907 8.42285 6.17435 9.39758C5.94188 9.63 5.94188 10.0069 6.17435 10.2394C6.40685 10.4718 6.78376 10.4718 7.01618 10.2394C7.52681 9.72879 8.35759 9.72883 8.86814 10.2394C8.98439 10.3556 9.13669 10.4138 9.289 10.4138C9.4413 10.4138 9.59369 10.3556 9.70986 10.2394C9.94232 10.0069 9.94232 9.63004 9.70986 9.39758Z" fill="currentColor"></path>
                                    <path d="M17.5719 9.39758C16.5972 8.42285 15.0111 8.42277 14.0364 9.39758C13.8039 9.63 13.8039 10.0069 14.0364 10.2394C14.2689 10.4718 14.6458 10.4718 14.8782 10.2394C15.3888 9.72879 16.2196 9.72875 16.7302 10.2394C16.8465 10.3556 16.9988 10.4138 17.1511 10.4138C17.3034 10.4138 17.4558 10.3556 17.5719 10.2394C17.8044 10.0069 17.8044 9.63004 17.5719 9.39758Z" fill="currentColor"></path>
                                    <path d="M17.151 12.4751H6.59548C6.26673 12.4751 6.00024 12.7416 6.00024 13.0703C6.00024 16.3087 8.63489 18.9433 11.8733 18.9433C15.1116 18.9433 17.7463 16.3087 17.7463 13.0703C17.7463 12.7416 17.4798 12.4751 17.151 12.4751ZM11.8733 17.7529C9.49286 17.7529 7.52161 15.9676 7.22837 13.6656H16.5182C16.2249 15.9676 14.2536 17.7529 11.8733 17.7529Z" fill="currentColor"></path>
                                </svg> Feeling/Activity
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9998 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14334 16.134 6.81233 14.334C5.69859 12.8314 5.06584 11.016 5 9.13442C4.99856 6.57225 6.34677 4.20627 8.53162 2.93677ZM9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3692 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948Z" fill="currentColor"></path>
                                    <ellipse opacity="0.4" cx="12" cy="21" rx="5" ry="1" fill="currentColor"></ellipse>
                                </svg>
                                Check in
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="28" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.4" x="1" y="6" width="22" height="12.7368" rx="1" fill="currentColor"></rect>
                                    <path d="M4.47363 9.47363V15.2631H7.94732M9.68416 9.47363V15.2631M11.421 9.47363L13.1387 15.1993C13.1444 15.2183 13.1713 15.2183 13.177 15.1993L14.8947 9.47363M19.5263 15.2631H16.6315V12.5M19.5263 9.47363H16.6315V12.5M16.6315 12.5H19.5263" stroke="currentColor" stroke-linecap="round"></path>
                                </svg>
                                Live Video
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M18.8088 9.021C18.3573 9.021 17.7592 9.011 17.0146 9.011C15.1987 9.011 13.7055 7.508 13.7055 5.675V2.459C13.7055 2.206 13.5036 2 13.253 2H7.96363C5.49517 2 3.5 4.026 3.5 6.509V17.284C3.5 19.889 5.59022 22 8.16958 22H16.0463C18.5058 22 20.5 19.987 20.5 17.502V9.471C20.5 9.217 20.299 9.012 20.0475 9.013C19.6247 9.016 19.1177 9.021 18.8088 9.021Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M16.0842 2.56737C15.7852 2.25637 15.2632 2.47037 15.2632 2.90137V5.53837C15.2632 6.64437 16.1742 7.55437 17.2802 7.55437C17.9772 7.56237 18.9452 7.56437 19.7672 7.56237C20.1882 7.56137 20.4022 7.05837 20.1102 6.75437C19.0552 5.65737 17.1662 3.69137 16.0842 2.56737Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.97398 11.3877H12.359C12.77 11.3877 13.104 11.0547 13.104 10.6437C13.104 10.2327 12.77 9.89868 12.359 9.89868H8.97398C8.56298 9.89868 8.22998 10.2327 8.22998 10.6437C8.22998 11.0547 8.56298 11.3877 8.97398 11.3877ZM8.97408 16.3819H14.4181C14.8291 16.3819 15.1631 16.0489 15.1631 15.6379C15.1631 15.2269 14.8291 14.8929 14.4181 14.8929H8.97408C8.56308 14.8929 8.23008 15.2269 8.23008 15.6379C8.23008 16.0489 8.56308 16.3819 8.97408 16.3819Z" fill="currentColor"></path>
                                </svg>
                                GIF
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M2.80272 21.1951C3.08195 21.475 3.53915 21.6691 3.94668 21.7965C4.50686 21.9715 5.10133 21.9394 5.67366 21.8095C8.08368 21.2625 14.8098 19.6194 16.4489 17.9763C18.6557 15.764 16.0691 12.7192 14.0448 10.3364L14.0408 10.3316C11.9042 7.81668 8.02041 5.10103 6.41494 6.71049C5.16816 7.96025 3.01552 15.4789 2.26629 18.2007C2.08758 18.8499 2.02769 19.5351 2.24323 20.173C2.36971 20.5473 2.55161 20.9434 2.80272 21.1951Z" fill="currentColor"></path>
                                    <path d="M5.75003 17.8333L3.60547 13.5507L4.50004 10.75L7.41669 16.5833L12.8333 19.9166L9.91668 20.75L5.75003 17.8333Z" fill="currentColor"></path>
                                    <path d="M13.2381 11.5388C14.8268 13.3931 17.0565 15.9007 16.0476 16.7694C15.0387 17.6381 11.616 15.4049 10.0273 13.5506C8.43854 11.6964 6.20879 8.78632 7.2177 7.9176C8.22661 7.04888 11.6494 9.6846 13.2381 11.5388Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M12.9183 2.93536L13.651 3.33951C13.7045 3.36853 13.7675 3.3699 13.8194 3.34271L14.5421 2.97096C14.5842 2.94904 14.6339 2.94519 14.6805 2.96057C14.7265 2.97574 14.7655 3.00894 14.7886 3.05269C14.8078 3.08895 14.8151 3.1301 14.8094 3.16977L14.686 3.99376C14.6758 4.05241 14.6961 4.11358 14.7396 4.1563L15.3448 4.75002C15.4162 4.82291 15.4205 4.93736 15.3547 5.00873C15.3268 5.03711 15.2902 5.05506 15.2505 5.06044L14.44 5.16219C14.3804 5.17049 14.3296 5.20737 14.303 5.26154L13.953 6.00134C13.9105 6.09301 13.8025 6.12988 13.7093 6.08449C13.6733 6.06563 13.6438 6.03576 13.625 5.99944L13.2518 5.23727C13.225 5.18261 13.1731 5.1439 13.1145 5.13516L12.2954 4.99507C12.1981 4.9786 12.1285 4.88576 12.1398 4.78741C12.1401 4.78533 12.1404 4.78301 12.1407 4.78069C12.1457 4.74043 12.1642 4.70387 12.193 4.67686L12.7713 4.10502C12.8131 4.06405 12.8317 4.00389 12.8209 3.94356L12.656 3.12556C12.6428 3.0548 12.6706 2.98462 12.7275 2.94543L12.745 2.93278C12.798 2.90377 12.8631 2.90483 12.9183 2.93536" fill="currentColor"></path>
                                    <path opacity="0.4" d="M18.0965 3.70291L18.7345 4.24512C18.7811 4.28422 18.8426 4.29813 18.8989 4.28184L19.6809 4.06165C19.7264 4.04855 19.7759 4.0547 19.8185 4.07907C19.8606 4.1031 19.8923 4.14343 19.9062 4.1909C19.9178 4.23027 19.9168 4.27205 19.9034 4.3098L19.6189 5.0927C19.5972 5.14814 19.605 5.21215 19.6392 5.26269L20.1145 5.96524C20.17 6.05092 20.1515 6.16393 20.0728 6.22075C20.0399 6.243 20.0004 6.2533 19.9605 6.25064L19.146 6.18872C19.0859 6.18496 19.0287 6.21097 18.992 6.25876L18.5021 6.91396C18.4423 6.99533 18.3292 7.00993 18.2468 6.94686C18.2153 6.92119 18.1923 6.88604 18.1811 6.84669L17.9666 6.02532C17.9512 5.96642 17.908 5.91813 17.8523 5.89788L17.0774 5.59723C16.9853 5.56168 16.9355 5.45681 16.9661 5.36269C16.9668 5.3607 16.9676 5.35849 16.9683 5.35628C16.9812 5.31783 17.0065 5.28567 17.0402 5.26496L17.7204 4.81988C17.7695 4.78806 17.7997 4.73283 17.801 4.67153L17.8017 3.83699C17.8028 3.76502 17.8441 3.70179 17.9076 3.67473L17.9272 3.66582C17.9849 3.64796 18.0486 3.662 18.0965 3.70291" fill="currentColor"></path>
                                    <path opacity="0.4" d="M20.5754 10.8178L20.7202 11.6436C20.7311 11.7035 20.7695 11.7536 20.8232 11.7772L21.5649 12.109C21.6083 12.1281 21.6425 12.1646 21.6597 12.2106C21.6767 12.256 21.6754 12.3073 21.6558 12.3527C21.6396 12.3905 21.6122 12.422 21.5778 12.4424L20.8598 12.8621C20.8078 12.8909 20.773 12.9451 20.767 13.0059L20.6845 13.8507C20.6726 13.9522 20.5863 14.0272 20.4895 14.0205C20.45 14.0165 20.4131 13.9991 20.3841 13.9715L19.7972 13.4019C19.7534 13.3605 19.6929 13.3439 19.6342 13.3571L18.8396 13.547C18.7417 13.5712 18.6454 13.51 18.6223 13.4087C18.6145 13.3688 18.6192 13.327 18.6356 13.2895L18.9945 12.5205C19.0202 12.4653 19.0178 12.4005 18.9879 12.3492L18.5837 11.6214C18.5355 11.5351 18.5641 11.4226 18.6477 11.3698C18.6495 11.3687 18.6515 11.3675 18.6534 11.3663C18.6879 11.345 18.7279 11.3364 18.767 11.3421L19.5739 11.4357C19.6319 11.4427 19.6903 11.4196 19.7305 11.3733L20.2632 10.732C20.3099 10.6774 20.3819 10.6552 20.4481 10.6751L20.4688 10.6808C20.5246 10.704 20.5646 10.7556 20.5754 10.8178Z" fill="currentColor"></path>
                                    <path d="M12.7629 5.73096L9.18003 10.2466" stroke="currentColor" stroke-linecap="round"></path>
                                    <path d="M17.2517 7.03174L10.9037 11.8678" stroke="currentColor" stroke-linecap="round"></path>
                                    <path d="M17.9456 12.2917L12.4352 14.4031" stroke="currentColor" stroke-linecap="round"></path>
                                    <rect opacity="0.4" width="1.6057" height="1.60913" rx="0.5" transform="matrix(0.965766 -0.259415 0.258224 0.966085 9.22461 4.22949)" fill="currentColor"></rect>
                                    <rect opacity="0.4" width="1.6057" height="1.60913" rx="0.5" transform="matrix(0.965766 -0.259415 0.258224 0.966085 18.0544 15.4951)" fill="currentColor"></rect>
                                </svg> 
                                Watch Party
                            </div>
                        </li>
                        <li class="col-md-6 mb-3">
                            <div class="bg-body rounded p-2 pointer">
                                <svg width="24" class="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M13.3051 5.88243V6.06547C12.8144 6.05584 12.3237 6.05584 11.8331 6.05584V5.89206C11.8331 5.22733 11.2737 4.68784 10.6064 4.68784H9.63482C8.52589 4.68784 7.62305 3.80152 7.62305 2.72254C7.62305 2.32755 7.95671 2 8.35906 2C8.77123 2 9.09508 2.32755 9.09508 2.72254C9.09508 3.01155 9.34042 3.24276 9.63482 3.24276H10.6064C12.0882 3.2524 13.2953 4.43736 13.3051 5.88243Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.164 6.08279C15.4791 6.08712 15.7949 6.09145 16.1119 6.09469C19.5172 6.09469 22 8.52241 22 11.875V16.1813C22 19.5339 19.5172 21.9616 16.1119 21.9616C14.7478 21.9905 13.3837 22.0001 12.0098 22.0001C10.6359 22.0001 9.25221 21.9905 7.88813 21.9616C4.48283 21.9616 2 19.5339 2 16.1813V11.875C2 8.52241 4.48283 6.09469 7.89794 6.09469C9.18351 6.07542 10.4985 6.05615 11.8332 6.05615C12.3238 6.05615 12.8145 6.05615 13.3052 6.06579C13.9238 6.06579 14.5425 6.07427 15.164 6.08279ZM10.8518 14.7459H9.82139V15.767C9.82139 16.162 9.48773 16.4896 9.08538 16.4896C8.67321 16.4896 8.34936 16.162 8.34936 15.767V14.7459H7.30913C6.90677 14.7459 6.57311 14.4279 6.57311 14.0233C6.57311 13.6283 6.90677 13.3008 7.30913 13.3008H8.34936V12.2892C8.34936 11.8942 8.67321 11.5667 9.08538 11.5667C9.48773 11.5667 9.82139 11.8942 9.82139 12.2892V13.3008H10.8518C11.2542 13.3008 11.5878 13.6283 11.5878 14.0233C11.5878 14.4279 11.2542 14.7459 10.8518 14.7459ZM15.0226 13.1177H15.1207C15.5231 13.1177 15.8567 12.7998 15.8567 12.3952C15.8567 12.0002 15.5231 11.6727 15.1207 11.6727H15.0226C14.6104 11.6727 14.2866 12.0002 14.2866 12.3952C14.2866 12.7998 14.6104 13.1177 15.0226 13.1177ZM16.7007 16.4318H16.7988C17.2012 16.4318 17.5348 16.1139 17.5348 15.7092C17.5348 15.3143 17.2012 14.9867 16.7988 14.9867H16.7007C16.2885 14.9867 15.9647 15.3143 15.9647 15.7092C15.9647 16.1139 16.2885 16.4318 16.7007 16.4318Z" fill="currentColor"></path>
                                </svg>
                                Play with Friends
                            </div>
                        </li>
                    </ul>
                    <div class="other-option border-top pt-4 mt-2">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <div class="user-img me-3">
                                    <img src="../social-app/assets/images/avatar/01.png" alt="userimg" class="avatar-60 rounded-circle img-fluid" loading="lazy">
                                </div>
                                <h6 class="mb-0">Your Story</h6>
                            </div>
                            <div class="card-post-toolbar">
                                <div class="dropdown">
                                    <div class="btn btn-primary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                        Friend
                                    </div>
                                    <div class="dropdown-menu dropdown-menu-end p-0" style="">
                                        <a class="dropdown-item border-bottom p-3" href="javascript:void(0)">
                                            <div class="d-flex align-items-top">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M18.8088 9.021C18.3573 9.021 17.7592 9.011 17.0146 9.011C15.1987 9.011 13.7055 7.508 13.7055 5.675V2.459C13.7055 2.206 13.5036 2 13.253 2H7.96363C5.49517 2 3.5 4.026 3.5 6.509V17.284C3.5 19.889 5.59022 22 8.16958 22H16.0463C18.5058 22 20.5 19.987 20.5 17.502V9.471C20.5 9.217 20.299 9.012 20.0475 9.013C19.6247 9.016 19.1177 9.021 18.8088 9.021Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M16.0842 2.56737C15.7852 2.25637 15.2632 2.47037 15.2632 2.90137V5.53837C15.2632 6.64437 16.1742 7.55437 17.2802 7.55437C17.9772 7.56237 18.9452 7.56437 19.7672 7.56237C20.1882 7.56137 20.4022 7.05837 20.1102 6.75437C19.0552 5.65737 17.1662 3.69137 16.0842 2.56737Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.97398 11.3877H12.359C12.77 11.3877 13.104 11.0547 13.104 10.6437C13.104 10.2327 12.77 9.89868 12.359 9.89868H8.97398C8.56298 9.89868 8.22998 10.2327 8.22998 10.6437C8.22998 11.0547 8.56298 11.3877 8.97398 11.3877ZM8.97408 16.3819H14.4181C14.8291 16.3819 15.1631 16.0489 15.1631 15.6379C15.1631 15.2269 14.8291 14.8929 14.4181 14.8929H8.97408C8.56308 14.8929 8.23008 15.2269 8.23008 15.6379C8.23008 16.0489 8.56308 16.3819 8.97408 16.3819Z" fill="currentColor"></path>
                                                </svg>
                                                <div class="data ms-3">
                                                    <h6 class="mb-0">Public</h6>
                                                    <p class="mb-0">Anyone on or off Facebook</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a class="dropdown-item border-bottom p-3" href="javascript:void(0)">
                                            <div class="d-flex align-items-top">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M12.086 22C11.9622 22 11.8393 21.9716 11.7276 21.9137L8.12627 20.0496C7.10336 19.5201 6.30397 18.9259 5.68076 18.2336C4.31353 16.7195 3.55441 14.776 3.54132 12.7599L3.50004 6.12426C3.495 5.35842 3.98833 4.67103 4.72732 4.41215L11.34 2.10679C11.7336 1.96656 12.1716 1.9646 12.5703 2.09992L19.2081 4.32684C19.9511 4.57493 20.4535 5.25742 20.4575 6.02228L20.4998 12.6628C20.5129 14.676 19.7799 16.6274 18.4349 18.1581C17.8167 18.8602 17.0253 19.4632 16.0135 20.0025L12.4444 21.9088C12.3337 21.9686 12.2098 21.999 12.086 22Z" fill="currentColor"></path>
                                                    <path d="M13.0679 11.7249L14.426 10.4021C14.721 10.1148 14.721 9.65001 14.426 9.3627C14.131 9.07539 13.6528 9.07539 13.3578 9.3627L11.9996 10.6845L10.6425 9.3627C10.3475 9.07539 9.86926 9.07539 9.57427 9.3627C9.27928 9.65001 9.27928 10.1148 9.57427 10.4021L10.9324 11.7249L9.57427 13.0478C9.27928 13.3351 9.27928 13.7999 9.57427 14.0872C9.72227 14.2313 9.91557 14.3029 10.1089 14.3029C10.3012 14.3029 10.4945 14.2313 10.6425 14.0872L11.9996 12.7653L13.3578 14.0872C13.5058 14.2313 13.6981 14.3029 13.8914 14.3029C14.0847 14.3029 14.278 14.2313 14.426 14.0872C14.721 13.7999 14.721 13.3351 14.426 13.0478L13.0679 11.7249Z" fill="currentColor"></path>
                                                </svg>
                                                <div class="data ms-3">
                                                    <h6 class="mb-0">Friends</h6>
                                                    <p class="mb-0">Your Friend on facebook</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a class="dropdown-item border-bottom p-3" href="javascript:void(0)">
                                            <div class="d-flex align-items-top">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9173C2 20.3665 5.364 20.9999 9.34933 20.9999C13.3131 20.9999 16.6987 20.3876 16.6987 17.9403C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M16.1733 7.84873C16.1733 9.19505 15.7604 10.4513 15.0363 11.4948C14.961 11.6021 15.0275 11.7468 15.1586 11.7698C15.3406 11.7995 15.5275 11.8177 15.7183 11.8216C17.6165 11.8704 19.3201 10.6736 19.7907 8.87116C20.4884 6.19674 18.4414 3.79541 15.8338 3.79541C15.551 3.79541 15.2799 3.82416 15.0157 3.87686C14.9795 3.88453 14.9404 3.90177 14.9208 3.93244C14.8954 3.97172 14.914 4.02251 14.9394 4.05605C15.7232 5.13214 16.1733 6.44205 16.1733 7.84873Z" fill="currentColor"></path>
                                                    <path d="M21.779 15.1693C21.4316 14.4439 20.593 13.9465 19.3171 13.7022C18.7153 13.5585 17.0852 13.3544 15.5695 13.3831C15.547 13.386 15.5343 13.4013 15.5324 13.4109C15.5294 13.4262 15.5363 13.4492 15.5656 13.4655C16.2662 13.8047 18.9737 15.2804 18.6332 18.3927C18.6185 18.5288 18.729 18.6438 18.867 18.6246C19.5333 18.5317 21.2476 18.1704 21.779 17.0474C22.0735 16.4533 22.0735 15.7634 21.779 15.1693Z" fill="currentColor"></path>
                                                </svg>
                                                <div class="data ms-3">
                                                    <h6 class="mb-0">Friends except</h6>
                                                    <p class="mb-0">Don't show to some friends</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a class="dropdown-item p-3" href="javascript:void(0)">
                                            <div class="d-flex align-items-top">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2428 4.73756C15.2428 6.95855 17.0459 8.75902 19.2702 8.75902C19.5151 8.75782 19.7594 8.73431 20 8.68878V16.6615C20 20.0156 18.0215 22 14.6624 22H7.34636C3.97851 22 2 20.0156 2 16.6615V9.3561C2 6.00195 3.97851 4 7.34636 4H15.3131C15.2659 4.243 15.2423 4.49001 15.2428 4.73756ZM13.15 14.8966L16.0078 11.2088V11.1912C16.2525 10.8625 16.1901 10.3989 15.8671 10.1463C15.7108 10.0257 15.5122 9.97345 15.3167 10.0016C15.1211 10.0297 14.9453 10.1358 14.8295 10.2956L12.4201 13.3951L9.6766 11.2351C9.51997 11.1131 9.32071 11.0592 9.12381 11.0856C8.92691 11.1121 8.74898 11.2166 8.63019 11.3756L5.67562 15.1863C5.57177 15.3158 5.51586 15.4771 5.51734 15.6429C5.5002 15.9781 5.71187 16.2826 6.03238 16.3838C6.35288 16.485 6.70138 16.3573 6.88031 16.0732L9.35125 12.8771L12.0948 15.0283C12.2508 15.1541 12.4514 15.2111 12.6504 15.1863C12.8494 15.1615 13.0297 15.0569 13.15 14.8966Z" fill="currentColor"></path>
                                                    <circle opacity="0.4" cx="19.5" cy="4.5" r="2.5" fill="currentColor"></circle>
                                                </svg>
                                                <div class="data ms-3">
                                                    <h6 class="mb-0">Only Me</h6>
                                                    <p class="mb-0">Only me</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary d-block w-100 mt-3">Post</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade p-0" id="image-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-fullscreen-lx-down" style="max-width: 1400px;">
            <div class="modal-content">
                <div class="model-header relative">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="position: absolute; right:0; z-index: 1; padding: 10px;"></button>
                </div>
                <div class="modal-body p-0">
                    <div class="d-flex gap-2">
                        <div>
                            <div class="card" style="height: 100%; width:100%">
                                <img src="../social-app/assets/images/app/01.png" class="img-fluid" alt="post-image" style="width: 100%; height:100%" loading="lazy">
                            </div>
                        </div>
                        <div class=" mt-4">
                            <div class="card mb-0">
                                <div class="card-header d-flex  justify-content-between">
                                    <div class="header-title">
                                        <div class="d-flex justify-content-center flex-wrap gap-3">
                                            <img class="img-fluid rounded-circle p-1 border border-2 border-primary border-dotted avatar-50" src="../social-app/assets/images/avatar/01.png" alt="profile-img" loading="lazy">
                                            <div class="media-support-info">
                                                <div class="d-flex align-items-center mb-2 gap-2">
                                                    <h6 class="mb-0">Joshua Martin</h6>
                                                    <small class="text-dark">Added New Post</small>
                                                </div>
                                                <p class="mb-0 text-muted">3 hrs Ago</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown">
                                        <span id="post-dropdown-001" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                                            </svg>
                                        </span>
                                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="post-dropdown-001">
                                            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                                <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                    <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                </svg>
                                                <span class="ms-2">Edit Post</span>
                                            </a>
                                            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                                <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                                                </svg>
                                                <span class="ms-2">Security</span>
                                            </a>
                                            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                                <svg class="icon-18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M22 12C22 17.524 17.523 22 12 22C6.477 22 2 17.524 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12Z" fill="currentColor"></path>
                                                    <path d="M15.5739 15.8145C15.4429 15.8145 15.3109 15.7805 15.1899 15.7095L11.2639 13.3675C11.0379 13.2315 10.8989 12.9865 10.8989 12.7225V7.67554C10.8989 7.26154 11.2349 6.92554 11.6489 6.92554C12.0629 6.92554 12.3989 7.26154 12.3989 7.67554V12.2965L15.9589 14.4195C16.3139 14.6325 16.4309 15.0925 16.2189 15.4485C16.0779 15.6835 15.8289 15.8145 15.5739 15.8145Z" fill="currentColor"></path>
                                                </svg>
                                                <span class="ms-2">Timer</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 border-bottom"></div>
                                <div class="card-body">
                                    <ul class="list-inline mb-0">
                                        <li class="mb-4">
                                            <div class="d-flex gap-3">
                                                <img src="../social-app/assets/images/avatar/11.png" alt="userimg" class="avatar-50 rounded-circle img-fluid" loading="lazy">
                                                <div class="w-100">
                                                    <h6 class="mb-1">Larry Robbins</h6>
                                                    <p class="mb-1">Great Picture Loved It.</p>
                                                    <div class="d-flex flex-wrap align-items-center gap-3">
                                                        <a href="javascript:void(0)">Like</a>
                                                        <a href="#reply-05" data-bs-toggle="collapse" aria-expanded="false" aria-controls="reply-05">Reply</a>
                                                        <span> 5 Min Ago </span>
                                                    </div>
                                                    <div class="collapse" id="reply-05">
                                                        <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                                            <input type="text" class="form-control" placeholder="Enter Your Reply...">
                                                            <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                                                <a href="javascript:void(0);" class=" text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                                        <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                                        <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="mb-4">
                                            <div class="d-flex gap-3">
                                                <img src="../social-app/assets/images/avatar/05.png" alt="userimg" class="avatar-50 rounded-circle img-fluid" loading="lazy">
                                                <div class="w-100">
                                                    <h6 class="mb-1">David Willey</h6>
                                                    <p class="mb-1">Wow nice place.</p>
                                                    <div class="d-flex flex-wrap align-items-center gap-3">
                                                        <a href="javascript:void(0)">Like</a>
                                                        <a href="#reply-06" data-bs-toggle="collapse" aria-expanded="false" aria-controls="reply-06">Reply</a>
                                                        <span> 10 Min Ago </span>
                                                    </div>
                                                    <div class="collapse" id="reply-06">
                                                        <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                                            <input type="text" class="form-control" placeholder="Enter Your Reply...">
                                                            <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                                                <a href="javascript:void(0);" class=" text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                                        <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                                        <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="d-flex gap-3">
                                                <img src="../social-app/assets/images/avatar/09.png" alt="userimg" class="avatar-50 rounded-circle img-fluid" loading="lazy">
                                                <div class="w-100">
                                                    <h6 class="mb-1">Chaeyoung Park</h6>
                                                    <p class="mb-1">Loved It</p>
                                                    <div class="d-flex flex-wrap align-items-center gap-3">
                                                        <a href="javascript:void(0)">Like</a>
                                                        <a href="#reply-07" data-bs-toggle="collapse" aria-expanded="false" aria-controls="reply-07">Reply</a>
                                                        <span> 25 Min Ago </span>
                                                    </div>
                                                    <div class="collapse" id="reply-07">
                                                        <form class="iq-social-comment-text position-relative d-flex align-items-center mt-3" action="javascript:void(0);">
                                                            <input type="text" class="form-control" placeholder="Enter Your Reply...">
                                                            <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                                                <a href="javascript:void(0);" class=" text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                                        <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                                        <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                                <a href="javascript:void(0);" class="text-body">
                                                                    <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                                        <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-footer pt-0">
                                    <form class="iq-social-comment-text position-relative d-flex align-items-center" action="javascript:void(0);">
                                        <input type="text" class="form-control" placeholder="Add a comment">
                                        <div class="iq-social-comment-attagement d-flex position-absolute gap-3">
                                            <a href="javascript:void(0);" class=" text-body">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.9999 14.7024V16.0859C21.9999 16.3155 21.9899 16.5471 21.9699 16.7767C21.6893 19.9357 19.4949 22 16.3286 22H7.67126C6.06806 22 4.71535 21.4797 3.74341 20.5363C3.36265 20.1864 3.042 19.7753 2.7915 19.3041C3.12217 18.9021 3.49291 18.462 3.85363 18.0208C4.46485 17.289 5.05603 16.5661 5.42677 16.0959C5.97788 15.4142 7.43078 13.6196 9.44481 14.4617C9.85563 14.6322 10.2164 14.8728 10.547 15.0833C11.3586 15.6247 11.6993 15.7851 12.2705 15.4743C12.9017 15.1335 13.3125 14.4617 13.7434 13.76C13.9739 13.388 14.2043 13.0281 14.4548 12.6972C15.547 11.2736 17.2304 10.8926 18.6332 11.7348C19.3346 12.1559 19.9358 12.6872 20.4969 13.2276C20.6172 13.3479 20.7374 13.4592 20.8476 13.5695C20.9979 13.7198 21.4989 14.2211 21.9999 14.7024Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z" fill="currentColor"></path>
                                                    <path d="M11.4543 8.79668C11.4543 10.2053 10.2809 11.3783 8.87313 11.3783C7.46632 11.3783 6.29297 10.2053 6.29297 8.79668C6.29297 7.38909 7.46632 6.21509 8.87313 6.21509C10.2809 6.21509 11.4543 7.38909 11.4543 8.79668Z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                            <a href="javascript:void(0);" class="text-body">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.71 10.0721C16.71 10.5715 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5715 18.52 10.0721C18.52 9.57263 18.11 9.16309 17.61 9.16309C17.11 9.16309 16.71 9.57263 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2541 12 17.2541C10.95 17.2541 9.97 16.8446 9.22 16.1054C8.48 15.3562 8.07 14.3773 8.07 13.3285C8.06 12.2896 8.47 11.3107 9.21 10.5615C9.96 9.81236 10.95 9.40282 12 9.40282C13.05 9.40282 14.04 9.81236 14.78 10.5515C15.52 11.3007 15.93 12.2896 15.93 13.3285C15.92 14.4172 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0798 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9777 9.82 14.5871 10.28 15.0465C10.74 15.506 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z" fill="currentColor"></path>
                                                    <path opacity="0.4" d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                            <a href="javascript:void(0);" class="text-body">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                                                    <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </form>
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
}) 
export default SocialProfile 