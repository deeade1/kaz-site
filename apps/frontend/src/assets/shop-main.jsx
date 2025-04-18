
<style>
[data-scrollbar] {
  display: block;
  position: relative;
}

.scroll-content {
  display: flow-root;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

.scrollbar-track {
  position: absolute;
  opacity: 0;
  z-index: 1;
  background: rgba(222, 222, 222, .75);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transition: opacity 0.5s 0.5s ease-out;
          transition: opacity 0.5s 0.5s ease-out;
}
.scrollbar-track.show,
.scrollbar-track:hover {
  opacity: 1;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}

.scrollbar-track-x {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
}
.scrollbar-track-y {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
}
.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: rgba(0, 0, 0, .5);
  border-radius: 4px;
}

  
   

    
    <aside class="sidebar sidebar-base sidebar-white left-bordered sidebar-mini" data-toggle="main-sidebar" data-sidebar="responsive">
         <div class="sidebar-header d-flex align-items-center justify-content-start">
             <a href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index.html" class="navbar-brand">
                 
                 <!--Logo start-->
                 <div class="logo-main">
                     <div class="logo-normal">
                         <svg class=" icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"></rect>
                             <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"></rect>
                             <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"></rect>
                             <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"></rect>
                         </svg>
                     </div>
                     <div class="logo-mini">
                         <svg class=" icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"></rect>
                             <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"></rect>
                             <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"></rect>
                             <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"></rect>
                         </svg>
                     </div>
                 </div>
                 <!--logo End-->        <h4 class="logo-title" data-setting="app_name">Hope UI</h4>
             </a>
             <div class="sidebar-toggle" data-toggle="sidebar" data-active="true">
                 <i class="icon">
                     <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                         <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                     </svg>
                 </i>
             </div>
         </div>    <div class="sidebar-body pt-0 data-scrollbar" data-scrollbar="true" tabindex="-1" style="overflow: hidden; outline: none;"><div class="scroll-content">
            <div class="sidebar-profile-card mt-3">
                <div class="sidebar-profile-body">
                    <div class="mb-3 d-flex justify-content-center">
                        <div class="rounded rounded-3 border border-primary p-2">
                            <img src="./shop-main_files/01.png" alt="User-Profile" class="img-fluid rounded" loading="lazy">
                        </div>
                    </div>
                    <div class="sidebar-profile-detail">
                        <h6 class="sidebar-profile-name">Elon musk</h6>
                        <span class="sidebar-profile-username">@musk</span>
                    </div>
                    <div class="sidebar-profile-action">
                        <div class="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                            <span class="btn-inner">
                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </div>
                        <div class="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                            <span class="btn-inner">
                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                </svg>
                            </span>
                        </div>
                        <div class="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                            <span class="btn-inner">
                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span class="notification-alert"></span>
                        </div>
                    </div>
                </div>
            </div>        <hr class="hr-horizontal">
            <div class="sidebar-list">
                <!-- Sidebar Menu Start -->
                <ul class="navbar-nav iq-main-menu" id="e-commerce">
                    <li class="nav-item static-item">
                        <a class="nav-link static-item disabled text-start" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" tabindex="-1">
                            <span class="default-icon">E-COMMERCE</span>
                            <span class="mini-icon">-</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/index.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name"> Admin Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/vendor-dashboard.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.6756 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0711 3.92889 22 7.33333 22H16.6756C20.08 22 22 20.0711 22 16.6667V7.33333C22 3.92889 20.08 2 16.6756 2Z" fill="currentColor"></path>
                                    <path d="M7.36866 9.3689C6.91533 9.3689 6.54199 9.74223 6.54199 10.2045V17.0756C6.54199 17.5289 6.91533 17.9022 7.36866 17.9022C7.83088 17.9022 8.20421 17.5289 8.20421 17.0756V10.2045C8.20421 9.74223 7.83088 9.3689 7.36866 9.3689Z" fill="currentColor"></path>
                                    <path d="M12.0352 6.08887C11.5818 6.08887 11.2085 6.4622 11.2085 6.92442V17.0755C11.2085 17.5289 11.5818 17.9022 12.0352 17.9022C12.4974 17.9022 12.8707 17.5289 12.8707 17.0755V6.92442C12.8707 6.4622 12.4974 6.08887 12.0352 6.08887Z" fill="currentColor"></path>
                                    <path d="M16.6398 12.9956C16.1775 12.9956 15.8042 13.3689 15.8042 13.8312V17.0756C15.8042 17.5289 16.1775 17.9023 16.6309 17.9023C17.0931 17.9023 17.4664 17.5289 17.4664 17.0756V13.8312C17.4664 13.3689 17.0931 12.9956 16.6398 12.9956Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Vendor Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link active" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#shop-main" role="button" aria-expanded="true" aria-controls="shop-main">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Shop</span>
                            <i class="right-icon">
                                <svg class="submit icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </i>
                        </a>
                        <ul class="sub-nav collapse show" id="shop-main" data-bs-parent="#e-commerce" style="">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html">
                                    <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> SM </i>
                                    <span class="item-name">Shop Main</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-left-filter.html">
                                  <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                  <i class="sidenav-mini-icon"> SL </i>
                                  <span class="item-name">Shop - Left Filter</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-right-filter.html">
                                    <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> SR </i>
                                    <span class="item-name">Shop - Right Filter</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link product-grid" aria-current="page" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/products.html?type=product-grid">
                                    <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> PG </i>
                                    <span class="item-name">Product Grid View</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link product-list" aria-current="page" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/products.html?type=product-list">
                                    <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> PL </i>
                                    <span class="item-name">Product List View</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/categories-list.html">
                                  <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                  <i class="sidenav-mini-icon"> C </i>
                                  <span class="item-name"> Categories List</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#products" role="button" aria-expanded="false" aria-controls="products">
                            <i class="icon">
                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.34 1.99976H7.67C4.28 1.99976 2 4.37976 2 7.91976V16.0898C2 19.6198 4.28 21.9998 7.67 21.9998H16.34C19.73 21.9998 22 19.6198 22 16.0898V7.91976C22 4.37976 19.73 1.99976 16.34 1.99976Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1246 8.18921C11.1246 8.67121 11.5156 9.06421 11.9946 9.06421C12.4876 9.06421 12.8796 8.67121 12.8796 8.18921C12.8796 7.70721 12.4876 7.31421 12.0046 7.31421C11.5196 7.31421 11.1246 7.70721 11.1246 8.18921ZM12.8696 11.362C12.8696 10.88 12.4766 10.487 11.9946 10.487C11.5126 10.487 11.1196 10.88 11.1196 11.362V15.782C11.1196 16.264 11.5126 16.657 11.9946 16.657C12.4766 16.657 12.8696 16.264 12.8696 15.782V11.362Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Product Detail</span>
                            <i class="right-icon">
                                <svg class="submit icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </i>
                        </a>
                        <ul class="sub-nav collapse" id="products" data-bs-parent="#e-commerce">
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                  <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                  <i class="sidenav-mini-icon"> P </i>
                                  <span class="item-name">Product Details</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail-3d.html">
                                    <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i class="sidenav-mini-icon"> 3D </i>
                                    <span class="item-name">3D Product Detail</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail-360.html">
                                  <i class="icon">
                                        <svg class="icon-10" width="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                  <i class="sidenav-mini-icon"> P </i>
                                  <span class="item-name"> 360 Product Detail</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li><hr class="hr-horizontal"></li>
                    <li class="nav-item static-item">
                        <a class="nav-link static-item disabled text-start" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" tabindex="-1">
                            <span class="default-icon">Pages</span>
                            <span class="mini-icon">-</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/order-process.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.6203 22H7.3797C4.68923 22 2.5 19.8311 2.5 17.1646V11.8354C2.5 9.16894 4.68923 7 7.3797 7H16.6203C19.3108 7 21.5 9.16894 21.5 11.8354V17.1646C21.5 19.8311 19.3108 22 16.6203 22Z" fill="currentColor"></path>
                                    <path d="M15.7551 10C15.344 10 15.0103 9.67634 15.0103 9.27754V6.35689C15.0103 4.75111 13.6635 3.44491 12.0089 3.44491C11.2472 3.44491 10.4477 3.7416 9.87861 4.28778C9.30854 4.83588 8.99272 5.56508 8.98974 6.34341V9.27754C8.98974 9.67634 8.65604 10 8.24487 10C7.8337 10 7.5 9.67634 7.5 9.27754V6.35689C7.50497 5.17303 7.97771 4.08067 8.82984 3.26285C9.68098 2.44311 10.7814 2.03179 12.0119 2C14.4849 2 16.5 3.95449 16.5 6.35689V9.27754C16.5 9.67634 16.1663 10 15.7551 10Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Order Process</span>
                            <div>
                                <span class="badge bg-info rounded-pill d-inline-block">21</span>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/invoice.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Invoice</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/wishlist.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name"> Wishlist</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/user-profile.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name"> User Profile</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/user-list.html">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>
                                    <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>
                                    <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">User List</span>
                        </a>
                    </li>
                    <li><hr class="hr-horizontal"></li>
                    <li class="nav-item static-item">
                        <a class="nav-link static-item disabled text-start" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" tabindex="-1">
                            <span class="default-icon">Other</span>
                            <span class="mini-icon">-</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/sign-in.html" target="_blank">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M2 6.447C2 3.996 4.03024 2 6.52453 2H11.4856C13.9748 2 16 3.99 16 6.437V17.553C16 20.005 13.9698 22 11.4744 22H6.51537C4.02515 22 2 20.01 2 17.563V16.623V6.447Z" fill="currentColor"></path>
                                    <path d="M21.7787 11.4548L18.9329 8.5458C18.6388 8.2458 18.1655 8.2458 17.8723 8.5478C17.5802 8.8498 17.5811 9.3368 17.8743 9.6368L19.4335 11.2298H17.9386H9.54826C9.13434 11.2298 8.79834 11.5748 8.79834 11.9998C8.79834 12.4258 9.13434 12.7698 9.54826 12.7698H19.4335L17.8743 14.3628C17.5811 14.6628 17.5802 15.1498 17.8723 15.4518C18.0194 15.6028 18.2113 15.6788 18.4041 15.6788C18.595 15.6788 18.7868 15.6028 18.9329 15.4538L21.7787 12.5458C21.9199 12.4008 21.9998 12.2048 21.9998 11.9998C21.9998 11.7958 21.9199 11.5998 21.7787 11.4548Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Sign Out</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#">
                            <i class="icon">
                                <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M22 11.9998C22 17.5238 17.523 21.9998 12 21.9998C6.477 21.9998 2 17.5238 2 11.9998C2 6.47776 6.477 1.99976 12 1.99976C17.523 1.99976 22 6.47776 22 11.9998Z" fill="currentColor"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8701 12.6307C12.8701 13.1127 12.4771 13.5057 11.9951 13.5057C11.5131 13.5057 11.1201 13.1127 11.1201 12.6307V8.21069C11.1201 7.72869 11.5131 7.33569 11.9951 7.33569C12.4771 7.33569 12.8701 7.72869 12.8701 8.21069V12.6307ZM11.1251 15.8035C11.1251 15.3215 11.5161 14.9285 11.9951 14.9285C12.4881 14.9285 12.8801 15.3215 12.8801 15.8035C12.8801 16.2855 12.4881 16.6785 12.0051 16.6785C11.5201 16.6785 11.1251 16.2855 11.1251 15.8035Z" fill="currentColor"></path>
                                </svg>
                            </i>
                            <span class="item-name">Help</span>
                        </a>
                    </li>
                </ul>
                <!-- Sidebar Menu End -->
            </div>
        </div><div class="scrollbar-track scrollbar-track-x" style="display: block;"><div class="scrollbar-thumb scrollbar-thumb-x" style="width: 23.6263px; transform: translate3d(0px, 0px, 0px);"></div></div><div class="scrollbar-track scrollbar-track-y" style="display: block;"><div class="scrollbar-thumb scrollbar-thumb-y" style="height: 149.961px; transform: translate3d(0px, 0px, 0px);"></div></div></div>
        <div class="sidebar-footer"></div>
    </aside>
    <main class="main-content">
      <div class="position-relative">
        <!--Nav Start-->
        <nav class="nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu left-border default">
           <div class="container-fluid navbar-inner">
              <a href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index.html" class="navbar-brand">
                 
                 <!--Logo start-->
                 <div class="logo-main">
                     <div class="logo-normal">
                         <svg class="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"></rect>
                             <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"></rect>
                             <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"></rect>
                             <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"></rect>
                         </svg>
                     </div>
                     <div class="logo-mini">
                         <svg class="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"></rect>
                             <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"></rect>
                             <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"></rect>
                             <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"></rect>
                         </svg>
                     </div>
                 </div>
                 <!--logo End-->         <h4 class="logo-title d-block d-xl-none" data-setting="app_name">Hope UI</h4>
              </a>
              <div class="sidebar-toggle" data-toggle="sidebar" data-active="true">
                 <i class="icon d-flex">
                    <svg class="icon-20" width="20" viewBox="0 0 24 24">
                       <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                    </svg>
                 </i>
              </div>
              <div class="d-flex align-items-center justify-content-between product-offcanvas">
                 <div class="breadcrumb-title border-end me-3 pe-3 d-none d-xl-block">
                    <small class="mb-0 text-capitalize">Shop Main</small>
                 </div>
                 <div class="offcanvas offcanvas-end shadow-none iq-product-menu-responsive on-rtl end" tabindex="-1" id="offcanvasBottom">
                    <div class="offcanvas-body">
                       <ul class="iq-nav-menu list-unstyled">
                          <li class="nav-item active">
                             <a class="nav-link menu-arrow justify-content-start" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#homeData" role="button" aria-expanded="false" aria-controls="homeData">
                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"></path>
                                </svg>
                                <span class="nav-text ms-2">Home</span>
                             </a>
                             <ul class="iq-header-sub-menu list-unstyled collapse" id="homeData">
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index.html">Dashboard</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/alternate-dashboard.html">Alternate Dashboard</a></li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#menuStyles" role="button" aria-expanded="false" aria-controls="menuStyles">
                                      Menu Style
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="menuStyles">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index-horizontal.html">Horizontal Dashboard</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index-dual-horizontal.html">Dual Horizontal Dashboard</a>
                                      </li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index-dual-compact.html">Dual Compact</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index-boxed.html">Boxed Horizontal</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/index-boxed-fancy.html">Boxed Fancy</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/index.html">E-Commerce</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/social-app/index.html">Social App</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/blog/index.html">Blog</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/appointment/index.html">Appointment</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/file-manager/index.html">File Manager</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/chat/index.html" target="_blank">Chat</a></li>
                                <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/mail/index.html">Mail</a></li>
                             </ul>
                          </li>
                          <li class="nav-item">
                             <a class="nav-link menu-arrow justify-content-start" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#allPagesData" role="button" aria-expanded="false" aria-controls="allPagesData">
                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2" fill="currentColor"></path>
                                   <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z" fill="currentColor"></path>
                                </svg>
                                <span class="nav-text ms-2">Pages</span>
                             </a>
                             <ul class="iq-header-sub-menu list-unstyled collapse" id="allPagesData">
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow " data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#specialPages" role="button" aria-expanded="false" aria-controls="specialPages">
                                      Special Pages
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="specialPages">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/special-pages/billing.html">Billing</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/special-pages/calender.html">Calender</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/special-pages/kanban.html">Kanban</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/special-pages/pricing.html">Pricing</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/special-pages/timeline.html">Timeline</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#authSkins" role="button" aria-expanded="false" aria-controls="authSkins">
                                      Auth skins
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="authSkins">
                                      <li class="nav-item">
                                         <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#defaultAuth" role="button" aria-expanded="false" aria-controls="defaultAuth">
                                            Default
                                            <i class="right-icon">
                                               <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                               </svg>
                                            </i>
                                         </a>
                                         <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="defaultAuth">
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/sign-in.html">Sign In</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/sign-up.html">Sign Up</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/confirm-mail.html">Email Verified</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/recoverpw.html">Reset Password</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/lock-screen.html">Lock Screen</a></li>
                                         </ul>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#animatedAuth" role="button" aria-expanded="false" aria-controls="animatedAuth">
                                            Animated
                                            <i class="right-icon">
                                               <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                               </svg>
                                            </i>
                                         </a>
                                         <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="animatedAuth">
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/sign-in.html">Sign In</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/sign-up.html">Sign Up</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/email.html">Email</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/lock-screen.html">Lock screen</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/reset-password.html">Reset password</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/two-factor.html">Two factor</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth-pro/account-deactivate.html">Account
                                                  deactivate</a></li>
                                         </ul>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#popupAuth" role="button" aria-expanded="false" aria-controls="popupAuth">
                                            popup
                                            <i class="right-icon">
                                               <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                               </svg>
                                            </i>
                                         </a>
                                         <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="popupAuth">
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sign In</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Sign Up</a></li>
                                         </ul>
                                      </li>
                                      <li class="nav-item">
                                         <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#simpleAuth" role="button" aria-expanded="false" aria-controls="simpleAuth">
                                            simple
                                            <i class="right-icon">
                                               <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                               </svg>
                                            </i>
                                         </a>
                                         <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="simpleAuth">
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/simple-auth-pro/sign-in.html">Sign In</a></li>
                                            <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/simple-auth-pro/sign-up.html">Sign Up</a></li>
                                         </ul>
                                      </li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#userApps" role="button" aria-expanded="false" aria-controls="userApps">
                                      User
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="userApps">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/app/user-profile.html">User Profile</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/app/user-add.html">User Add</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/app/user-list.html">User List</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#utilities" role="button" aria-expanded="false" aria-controls="utilities">
                                      Utilities
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="utilities">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/errors/maintenance.html">Maintenance</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/errors/error404.html">404</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/errors/error500.html">505</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#extraPlugins" role="button" aria-expanded="false" aria-controls="extraPlugins">
                                      Plugins
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="extraPlugins">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/button-hover.html">Button Hover</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/choise-js.html">Choise JS</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/fslightbox.html">FSlightbox</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/select2.html">Select2</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/sweet-alert.html">Sweetalert</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/flatpickr.html">flatpickr</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/apexcharts.html">Apexcharts</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/gallery-hover.html">Gallery Hover</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/image-croper.html">Image Croper</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/loader.html">Loader</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/rating.html">Rating</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/quill-editor.html">Quill</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/uppy.html">Uppy</a></li>
                                   </ul>
                                </li>
                             </ul>
                          </li>
                          <li class="nav-item">
                             <a class="nav-link menu-arrow justify-content-start" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#elementsData" role="button" aria-expanded="false" aria-controls="elementsData">
                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path opacity="0.4" d="M11.9912 18.6215L5.49945 21.8641C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7088C4 14.4284 4.40573 14.8726 5.47299 15.3701L11.9912 18.6215Z" fill="currentColor"></path>
                                   <path fill-rule="evenodd" clip-rule="evenodd" d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z" fill="currentColor"></path>
                                </svg>
                                <span class="nav-text ms-2">Elements </span>
                             </a>
                             <ul class="iq-header-sub-menu list-unstyled collapse" id="elementsData">
                                <li class="nav-item">
                                   <a class="nav-link" href="https://templates.iqonic.design/hope-ui/pro/html/">Components</a>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link" href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/plugins/ui-color.html">UI Color</a>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#widgetsPage" role="button" aria-expanded="false" aria-controls="widgetsPage">
                                      Widgets
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="widgetsPage">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/widget/widgetbasic.html">Widget Basic</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/widget/widgetchart.html">Widget Chart</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/widget/widgetcard.html">Widget Card</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#mapPages" role="button" aria-expanded="false" aria-controls="mapPages">
                                      Map
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="mapPages">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/maps/google.html">Google</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/maps/vector.html">Vector</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#formsPages" role="button" aria-expanded="false" aria-controls="formsPages">
                                      Form
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="formsPages">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/form/form-element.html">Element</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/form/form-wizard.html">Wizard</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/form/form-validation.html">Validation</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#tablesPages" role="button" aria-expanded="false" aria-controls="tablesPages">
                                      Table
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="tablesPages">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/table/bootstrap-table.html">Bootstrap Table</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/table/table-data.html">Data Table</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/table/border-table.html">Bordered Table</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/table/fancy-table.html">Fancy Table</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/table/fixed-table.html">Fixed Table</a></li>
                                   </ul>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link menu-arrow" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#iconsPages" role="button" aria-expanded="false" aria-controls="iconsPages">
                                      Icons
                                      <i class="right-icon">
                                         <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                         </svg>
                                      </i>
                                   </a>
                                   <ul aria-expanded="false" class="iq-header-sub-menu left list-unstyled collapse" id="iconsPages">
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/icons/solid.html">Solid</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/icons/outline.html">Outlined</a></li>
                                      <li class="nav-item"><a class="nav-link " href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/icons/dual-tone.html">Dual Tone</a></li>
                                   </ul>
                                </li>
                             </ul>
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>
              <div class="d-flex align-items-center">
                 <button id="navbar-toggle" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                       <span class="navbar-toggler-bar bar1 mt-1"></span>
                       <span class="navbar-toggler-bar bar2"></span>
                       <span class="navbar-toggler-bar bar3"></span>
                    </span>
                 </button>
              </div>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                    <li class="nav-item dropdown me-0 me-xl-3">
                       <div class="d-flex align-items-center mr-2 iq-font-style" role="group" aria-label="First group" data-setting="radio">
                          <input type="radio" class="btn-check" name="theme_font_size" value="theme-fs-sm" id="font-size-sm">
                          <label for="font-size-sm" class="btn btn-border border-0 btn-icon btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Font size 14px">
                             <span class="mb-0 h6" style="color: inherit !important;">A</span>
                          </label>
                          <input type="radio" class="btn-check" name="theme_font_size" value="theme-fs-md" id="font-size-md">
                          <label for="font-size-md" class="btn btn-border border-0 btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Font size 16px">
                             <span class="mb-0 h4" style="color: inherit !important;">A</span>
                          </label>
                          <input type="radio" class="btn-check" name="theme_font_size" value="theme-fs-lg" id="font-size-lg">
                          <label for="font-size-lg" class="btn btn-border border-0 btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Font size 18px">
                             <span class="mb-0 h2" style="color: inherit !important;">A</span>
                          </label>
                       </div>
                    </li>
                    <li class="nav-item dropdown border-end pe-3 d-none d-xl-block">
                       <div class="form-group input-group mb-0 search-input">
                          <input type="text" class="form-control" placeholder="Search...">
                          <span class="input-group-text">
                             <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                             </svg>
                          </span>
                       </div>
                    </li>
                    <li class="nav-item dropdown iq-responsive-menu border-end d-block d-xl-none">
                       <div class="btn btn-sm bg-body" id="navbarDropdown-search-11" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                             <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                       </div>
                       <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown-search-11" style="width: 25rem;">
                          <li class="px-3 py-0">
                             <div class="form-group input-group mb-0">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-text">
                                   <svg class="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                      <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   </svg>
                                </span>
                             </div>
                          </li>
                       </ul>
                    </li>
                    <li class="nav-item dropdown">
                       <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="nav-link ps-3" id="notification-drop" data-bs-toggle="dropdown">
                          <div class="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                             <span class="btn-inner">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                   <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                </svg>
                             </span>
                             <span class="notification-alert"></span>
                          </div>
                       </a>
                       <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="notification-drop">
                          <div class="m-0 shadow-none card">
                             <div class="py-3 card-header d-flex justify-content-between bg-primary">
                                <div class="header-title">
                                   <h5 class="mb-0 text-white">All Carts</h5>
                                </div>
                             </div>
                             <div class="p-0 card-body max-17 scroll-thin">
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/01(1).png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Biker’s Jacket</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/02.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Casual Shoes</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/03.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Knitted Shrug</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/04.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Blue Handbag</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/01(1).png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Biker’s Jacket</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/02.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Casual Shoes</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/03.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Knitted Shrug</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                                <div class="iq-sub-card">
                                   <div class="d-flex align-items-center">
                                      <img class="p-1 avatar-40 rounded-pill bg-soft-primary" src="./shop-main_files/04.png" alt="" loading="lazy">
                                      <div class="ms-3 flex-grow-1">
                                         <h6 class="mb-0 ">Blue Handbag</h6>
                                         <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0">$56.00</p>
                                         </div>
                                      </div>
                                      <button type="button" class="btn btn-icon text-danger btn-sm">
                                         <span class="btn-inner">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                               <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                            </svg>
                                         </span>
                                      </button>
                                   </div>
                                </div>
                             </div>
                             <div class="card-footer p-0 text-center">
                                <div class="d-grid">
                                   <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/order-process.html" class="btn btn-primary">View All</a>
                                </div>
                             </div>
                          </div>
                       </div>
                    </li>
                    <li class="nav-item dropdown" id="itemdropdown1">
                       <a class="py-0 nav-link d-flex align-items-center" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <div class="btn btn-primary btn-icon btn-sm rounded-pill">
                             <span class="btn-inner">
                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                   <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                </svg>
                             </span>
                          </div>
                       </a>
                       <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                          <li>
                             <a class="dropdown-item" href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/app/user-profile.html">Profile</a>
                          </li>
                          <li>
                             <a class="dropdown-item" href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/app/user-privacy-setting.html">Privacy Setting</a>
                          </li>
                          <li>
                             <hr class="dropdown-divider">
                          </li>
                          <li>
                             <a class="dropdown-item" href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/auth/sign-in.html">Logout</a>
                          </li>
                       </ul>
                    </li>
                    <li class="nav-item iq-full-screen d-none d-xl-block" id="fullscreen-item">
                       <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="nav-link" id="btnFullscreen" data-bs-toggle="dropdown">
                          <div class="btn btn-primary btn-icon btn-sm rounded-pill">
                             <span class="btn-inner">
                                <svg class="normal-screen icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M18.5528 5.99656L13.8595 10.8961" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M5.8574 18.896L10.5507 13.9964" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <svg class="full-normal-screen d-none icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M13.7542 10.1932L18.1867 5.79319" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M10.4224 13.5726L5.82149 18.1398" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                   <path d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                             </span>
                          </div>
                       </a>
                    </li>
                 </ul>
              </div>
           </div>
        </nav>        <!--Nav End-->
      </div>
      <div class="content-inner pb-0 container-fluid" id="page_layout">
<div class="row">
    <div class="col-lg-9">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="mb-0">Trending Items</h4>
            <ul class="nav nav-pills mb-0 iq-product-filter d-flex bg-transparent align-items-center" id="pills-tab" role="tablist">
                <li class="nav-item dropdown d-none d-xl-block">
                    <div class="form-group input-group mb-0 search-input w-100">
                        <input type="text" class="form-control" placeholder="Search...">
                        <span class="input-group-text">
                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                            <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </div>
                </li>
                <li class="nav-item ms-2" role="presentation">
                    <button class="nav-link btn btn-sm btn-icon rounded-pill active" id="grid-view-tab" data-bs-toggle="pill" data-bs-target="#pills-grid-view" type="button" role="tab" aria-controls="pills-grid-view" aria-selected="true">
                        <span class="btn-inner">
                            <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </button>
                </li>
                <li class="nav-item ms-2" role="presentation">
                    <button class="nav-link btn btn-sm btn-icon rounded-pill" id="list-view-tab" data-bs-toggle="pill" data-bs-target="#pills-list-view" type="button" role="tab" aria-controls="pills-list-view" aria-selected="false" tabindex="-1">
                        <span class="btn-inner">
                            <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M10.0833 15.958H3.50777C2.67555 15.958 2 16.6217 2 17.4393C2 18.2559 2.67555 18.9207 3.50777 18.9207H10.0833C10.9155 18.9207 11.5911 18.2559 11.5911 17.4393C11.5911 16.6217 10.9155 15.958 10.0833 15.958Z" fill="currentColor"></path>
                                <path opacity="0.4" d="M22.0001 6.37867C22.0001 5.56214 21.3246 4.89844 20.4934 4.89844H13.9179C13.0857 4.89844 12.4102 5.56214 12.4102 6.37867C12.4102 7.1963 13.0857 7.86 13.9179 7.86H20.4934C21.3246 7.86 22.0001 7.1963 22.0001 6.37867Z" fill="currentColor"></path>
                                <path d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856Z" fill="currentColor"></path>
                                <path d="M21.9998 17.3992C21.9998 19.2648 20.4609 20.7777 18.5609 20.7777C16.6621 20.7777 15.1221 19.2648 15.1221 17.3992C15.1221 15.5325 16.6621 14.0195 18.5609 14.0195C20.4609 14.0195 21.9998 15.5325 21.9998 17.3992Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-grid-view" role="tabpanel" aria-labelledby="grid-view-tab">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/02(1).png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Casual Shoes</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/04(1).png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                    <div class="iq-ribbon-effect text-primary">
                                        <span>New</span>
                                    </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Biker's Jacket</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/05.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Knitted Shrug</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/06.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Blue Handbag</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/07.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                    <div class="iq-ribbon-effect text-warning">
                                        <span>Sold</span>
                                    </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Pink Sweater</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                    <div class="col">
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/10.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Pink Handbag</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-list-view" role="tabpanel" aria-labelledby="list-view-tab">
                <div class="row row-cols-1">
                    <div class="col">
                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/02(1).png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Casual Shoes</a>
                                        <h4 class="mb-3">$56.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">3.5</h6>
                                                <small class="ms-2">3.5k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-success">In Stock</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 30</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/04(1).png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Biker's Jacket</a>
                                        <h4 class="mb-3">$65.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">4.5</h6>
                                                <small class="ms-2">4.5k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-danger">Out of Stock</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 25</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/05.png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Knitted Shrug</a>
                                        <h4 class="mb-3">$65.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">4.0</h6>
                                                <small class="ms-2">4.0k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-warning">Limited</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 31</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/06.png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Blue Handbag</a>
                                        <h4 class="mb-3">$65.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">4.5</h6>
                                                <small class="ms-2">4.5k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-success">In Stock</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 22</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/07.png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Pink Triusers</a>
                                        <h4 class="mb-3">$65.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">4.5</h6>
                                                <small class="ms-2">4.5k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-success">In Stock</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 25</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        <div class="card iq-product-list-view">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <div class="iq-product-list-left-side d-flex gap-3 flex-wrap align-items-center justify-content-center justify-content-sm-center">
                                    <img src="./shop-main_files/10.png" alt="product-details" class="img-fluid trending-img iq-product-img" loading="lazy">
                                    <div class="iq-list-view-left text-center text-sm-start">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h5 d-block mb-3 iq-product-detail">Pink Handbag</a>
                                        <h4 class="mb-3">$65.00</h4>
                                        <div>
                                            <div class="d-flex align-items-center">
                                                <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                </svg>
                                                <h6 class="mb-0">3.0</h6>
                                                <small class="ms-2">3.0k Review</small>
                                            </div>
                                        </div>
                                        <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none">
                                                    <path d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <input type="text" class="btn btn-sm btn-outline-light input-display" data-qty="input" pattern="^(0|[1-9][0-9]*)$" minlength="1" maxlength="2" value="2" title="Qty" readonly="">
                                            <button type="button" class="btn btn-sm btn-outline-light iq-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <path d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="iq-list-view-right d-flex flex-column justify-content-center align-items-end d-block align-items-center align-items-sm-end mx-sm-0 mx-auto">
                                    <div>
                                        <span class="badge rounded-pill p-2 px-3 bg-soft-success">In Stock</span>
                                    </div>
                                    <div class="d-flex flex-column text-end">
                                        <span>Delivery by, Thu Jan 26</span>
                                    </div>
                                    <div class="iq-list-options d-flex align-items-end gap-2">
                                        <button class="btn btn-info d-flex align-items-center wishlist-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Wishlist
                                        </button>
                                        <button class="btn btn-primary d-flex align-items-center cart-btn gap-2">
                                            <span class="btn-inner d-flex">
                                                <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Offers</h4>
            <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/categories-list.html" class="h6">View All</a>
        </div>
        <div class="mt-3">
            <div class="iq-product-offers mb-4">
                <div class="product-grid-item bg-soft-secondary mb-0 card">
                    <div class="card-body">
                        <div class="offer-card row">
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <h4 class="pb-2">Get Up TO 40%</h4>
                                <h6 class="pb-3">For The Holiday Session</h6>
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html">Shop now</a>
                            </div>
                            <div class="col-6">
                                <img src="./shop-main_files/06(1).png" alt="product-details" class="img-fluid" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-grid-item bg-soft-secondary mb-0 card">
                    <div class="card-body">
                        <div class="offer-card row">
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <h4 class="pb-2">Get Up TO 30%</h4>
                                <h6 class="pb-3">For The Holiday Session</h6>
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html">Shop now</a>
                            </div>
                            <div class="col-6">
                                <img src="./shop-main_files/07(1).png" alt="product-details" class="img-fluid" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-grid-item bg-soft-secondary mb-0 card">
                    <div class="card-body">
                        <div class="offer-card row">
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <h4 class="pb-2">Get Up TO 10%</h4>
                                <h6 class="pb-3">For The Holiday Session</h6>
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html">Shop now</a>
                            </div>
                            <div class="col-6">
                                <img src="./shop-main_files/10(1).png" alt="product-details" class="img-fluid" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="product-grid-item bg-soft-secondary mb-0 card">
                    <div class="card-body">
                        <div class="offer-card row">
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <h4 class="pb-2">Get Up TO 25%</h4>
                                <h6 class="pb-3">For The Holiday Session</h6>
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html">Shop now</a>
                            </div>
                            <div class="col-6">
                                <img src="./shop-main_files/09.png" alt="product-details" class="img-fluid" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="">
            <!-- Filter Component Start -->
            <div class="card iq-filter-card">
                <div class="card-header border-bottom px-0 py-4 mx-4">
                    <h4 class="list-main mb-0">Filters</h4>
                </div>
                <div class="card-body">
                    <a class="bg-transparent iq-custom-collapse w-100 d-flex justify-content-between pb-3" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#iq-product-filter-01" role="button" aria-expanded="true" aria-controls="iq-product-filter-01">
                        <h5 class="mb-0">Categories</h5>
                        <i class="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </a>
                    <div class="collapse show" id="iq-product-filter-01">
                        <div class="mt-2">
                            <span>Price</span>
                            <div class="form-group mt-3 product-range">
                                <div class="range-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr" id="product-price-range"><div class="noUi-base"><div class="noUi-connects"><div class="noUi-connect" style="transform: translate(10%, 0px) scale(0.9, 1);"></div></div><div class="noUi-origin" style="transform: translate(-900%, 0px); z-index: 5;"><div class="noUi-handle noUi-handle-lower" data-handle="0" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="0.0" aria-valuemax="2000.0" aria-valuenow="50.0" aria-valuetext="50.00"><div class="noUi-touch-area"></div></div></div><div class="noUi-origin" style="transform: translate(0%, 0px); z-index: 4;"><div class="noUi-handle noUi-handle-upper" data-handle="1" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="50.0" aria-valuemax="2000.0" aria-valuenow="2000.0" aria-valuetext="2000.00"><div class="noUi-touch-area"></div></div></div></div></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <small id="lower-value">$50</small>
                                <small id="upper-value">$2000</small>
                            </div>
                            <div class="product-ratings mt-2">
                                <h5 class="py-3 mb-0">
                                    Avg. Customer Review
                                </h5>
                                <div>
                                    <div class="form-check d-flex align-items-center">
                                        <input type="checkbox" class="form-check-input" id="Check-01" checked="">
                                        <label class="ms-2 d-flex align-items-center w-100" for="Check-01">
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                            <span class="ms-2">&amp; Up</span>
                                        </label>
                                    </div>                        <div class="form-check d-flex align-items-center">
                                        <input type="checkbox" class="form-check-input" id="Check-02">
                                        <label class="ms-2 d-flex align-items-center w-100" for="Check-02">
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                            <span class="ms-2">&amp; Up</span>
                                        </label>
                                    </div>                        <div class="form-check d-flex align-items-center">
                                        <input type="checkbox" class="form-check-input" id="Check-03">
                                        <label class="ms-2 d-flex align-items-center w-100" for="Check-03">
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                            <span class="ms-2">&amp; Up</span>
                                        </label>
                                    </div>                        <div class="form-check d-flex align-items-center">
                                        <input type="checkbox" class="form-check-input" id="Check-04">
                                        <label class="ms-2 d-flex align-items-center w-100" for="Check-04">
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                            <span class="ms-2">&amp; Up</span>
                                        </label>
                                    </div>                        <div class="form-check d-flex align-items-center">
                                        <input type="checkbox" class="form-check-input" id="Check-05">
                                        <label class="ms-2 d-flex align-items-center w-100" for="Check-05">
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <svg class="icon-20" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="#FFD329" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                            <span class="ms-2">&amp; Up</span>
                                        </label>
                                    </div>                    </div>
                            </div>
                        </div>
                    </div>
                    <a class="bg-transparent d-flex justify-content-between iq-custom-collapse py-3" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#iq-product-filter-02" role="button" aria-expanded="true" aria-controls="iq-product-filter-02">
                        <h5 class="mb-0">Type</h5>
                        <i class="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </a>
                    <div class="collapse show" id="iq-product-filter-02">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="type-01" checked="">
                            <label class="form-check-label w-100" for="type-01">Accessories</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="type-02">
                            <label class="form-check-label w-100" for="type-02">Bags</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="type-03">
                            <label class="form-check-label w-100" for="type-03">Men's Fashion</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="type-04">
                            <label class="form-check-label w-100" for="type-04">Women's Fashion</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="type-05">
                            <label class="form-check-label w-100" for="type-05">Fashion</label>
                        </div>        </div>
                    <a class="bg-transparent d-flex justify-content-between iq-custom-collapse py-3" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#iq-product-filter-03" role="button" aria-expanded="true" aria-controls="iq-product-filter-03">
                        <h5 class="mb-0">Discount</h5>
                        <i class="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </a>
                    <div class="collapse show" id="iq-product-filter-03">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-01">
                            <label class="form-check-label w-100" for="discount-01">80% Off</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-02">
                            <label class="form-check-label w-100" for="discount-02">50% Off</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-03">
                            <label class="form-check-label w-100" for="discount-03">40% Off</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-04">
                            <label class="form-check-label w-100" for="discount-04">30% Off</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-05">
                            <label class="form-check-label w-100" for="discount-05">20% Off</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="discount-06" checked="">
                            <label class="form-check-label w-100" for="discount-06">10% Off</label>
                        </div>        </div>
                    <a class="bg-transparent d-flex justify-content-between iq-custom-collapse pt-3" data-bs-toggle="collapse" href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#iq-product-filter-04" role="button" aria-expanded="true" aria-controls="iq-product-filter-04">
                        <h5 class="mb-0">Sellers</h5>
                        <i class="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </i>
                    </a>
                    <div class="collapse show mt-3" id="iq-product-filter-04">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="sellers-01">
                            <label class="form-check-label w-100" for="sellers-01">Max</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="sellers-02">
                            <label class="form-check-label w-100" for="sellers-02">Ajio</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="sellers-03">
                            <label class="form-check-label w-100" for="sellers-03">Levi's</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="sellers-04">
                            <label class="form-check-label w-100" for="sellers-04">Woodie</label>
                        </div>            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="sellers-05">
                            <label class="form-check-label w-100" for="sellers-05">Denim</label>
                        </div>        </div>
                </div>
            </div>            <!-- Filter Component Start -->
        </div>
        <div class="overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" id="collection-slider">
            <ul class="p-0 m-0 mb-2 swiper-wrapper list-inline" id="swiper-wrapper-5bec2bd5b7bae8d0" aria-live="off" style="transition-duration: 300ms; transform: translate3d(-1866px, 0px, 0px);"><li class="swiper-slide card-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="1" role="group" aria-label="2 / 2" style="width: 925px; margin-right: 8px;">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="./shop-main_files/01(2).png" class="img-fluid object-contain avatar-100" alt="product" loading="lazy">
                            </div>
                            <div class="text-center">
                                <h6 class="text-primary">
                                    New Collection for you
                                </h6>
                                <p class="small">Get 20 % off on Biker's Jacket</p>
                                <button class="btn btn-primary" type="submit">View Now</button>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="swiper-slide card-slide swiper-slide-prev swiper-slide-duplicate-next" data-swiper-slide-index="0" role="group" aria-label="1 / 2" style="width: 925px; margin-right: 8px;">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="./shop-main_files/03(1).png" class="img-fluid object-contain avatar-100" alt="product" loading="lazy">
                            </div>
                            <div class="text-center">
                                <h6 class="text-primary">
                                    New Collection for you
                                </h6>
                                <p class="small">Get 20 % off on Headphones</p>
                                <button class="btn btn-primary" type="submit">View Now</button>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="swiper-slide card-slide swiper-slide-active" data-swiper-slide-index="1" role="group" aria-label="2 / 2" style="width: 925px; margin-right: 8px;">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="./shop-main_files/01(2).png" class="img-fluid object-contain avatar-100" alt="product" loading="lazy">
                            </div>
                            <div class="text-center">
                                <h6 class="text-primary">
                                    New Collection for you
                                </h6>
                                <p class="small">Get 20 % off on Biker's Jacket</p>
                                <button class="btn btn-primary" type="submit">View Now</button>
                            </div>
                        </div>
                    </div>
                </li>
            <li class="swiper-slide card-slide swiper-slide-duplicate swiper-slide-next swiper-slide-duplicate-prev" data-swiper-slide-index="0" role="group" aria-label="1 / 2" style="width: 925px; margin-right: 8px;">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img src="./shop-main_files/03(1).png" class="img-fluid object-contain avatar-100" alt="product" loading="lazy">
                            </div>
                            <div class="text-center">
                                <h6 class="text-primary">
                                    New Collection for you
                                </h6>
                                <p class="small">Get 20 % off on Headphones</p>
                                <button class="btn btn-primary" type="submit">View Now</button>
                            </div>
                        </div>
                    </div>
                </li></ul>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>  
    </div>
    <div class="row row-cols-1">
        <div class="d-flex py-4 pt-0">
            <h4 class="mb-0">Featured Products</h4>
        </div>
        <div class="overflow-hidden slider-circle-btn swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" id="ecommerce-slider">
            <ul class="p-0 m-0 mb-2 swiper-wrapper list-inline" id="swiper-wrapper-566b3c423f8e4f19" aria-live="polite" style="transform: translate3d(0px, 0px, 0px);">
                <li class="swiper-slide card-slide swiper-slide-active" role="group" aria-label="1 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media mb-0">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/06.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Blue Handbag</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide swiper-slide-next" role="group" aria-label="2 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/07.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                    <div class="iq-ribbon-effect text-warning">
                                        <span>Sold</span>
                                    </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Pink Sweater</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$65.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide" role="group" aria-label="3 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/10.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Knitted Shrug</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide" role="group" aria-label="4 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/11.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Leather Bags</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide" role="group" aria-label="5 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/04(1).png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                    <div class="iq-ribbon-effect text-primary">
                                        <span>New</span>
                                    </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Biker's Jacket</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$65.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide" role="group" aria-label="6 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/10.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Knitted Shrug</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
                <li class="swiper-slide card-slide" role="group" aria-label="7 / 7" style="width: 436.5px; margin-right: 32px;">
                    <div>
                        <div class="card iq-product-custom-card animate:hover-media ">
                            <div class="iq-product-hover-img position-relative animate:hover-media-wrap">
                                <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html">
                                    <img src="./shop-main_files/06.png" alt="product-details" class="img-fluid iq-product-img hover-media" loading="lazy">
                                </a>
                                 <div class="iq-product-card-hover-effect-1 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill wishlist-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor"></path>
                                                <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor"></path>
                                                <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                                <div class="iq-product-card-hover-effect-2 iq-product-info">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" class="btn btn-icon iq-product-btn rounded-pill cart-btn">
                                        <span class="btn-inner">
                                            <svg class="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/product-detail.html" class="h6 iq-product-detail mb-0">Blue Handbag</a>
                                        <div class="d-flex align-items-center">
                                            <svg class="icon-24" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" fill="#FFD329"></path>
                                            </svg>
                                            <h6 class="mb-0">3.5</h6>
                                        </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">$56.00</h5>
                                        <span>3.5k Ratings</span>
                                </div>
                            </div>
                        </div>                </div>
                </li>
            </ul>
            <div class="swiper-button swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-566b3c423f8e4f19" aria-disabled="false"></div>
            <div class="swiper-button swiper-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-566b3c423f8e4f19" aria-disabled="true"></div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
    </div></div>
      </div>
      <!-- Footer Section Start -->
      <footer class="footer default">
          <div class="footer-body">
              <ul class="left-panel list-inline mb-0 p-0">
                  <li class="list-inline-item"><a href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/extra/privacy-policy.html">Privacy Policy</a></li>
                  <li class="list-inline-item"><a href="https://templates.iqonic.design/hope-ui/pro/html/dashboard/extra/terms-of-service.html">Terms of Use</a></li>
              </ul>
              <div class="right-panel">
                  ©<script>2022</script> <span data-setting="app_name">Hope UI</span>, Made with
                  <span class="text-gray">
                      <svg class="icon-16" width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.85 2.50065C16.481 2.50065 17.111 2.58965 17.71 2.79065C21.401 3.99065 22.731 8.04065 21.62 11.5806C20.99 13.3896 19.96 15.0406 18.611 16.3896C16.68 18.2596 14.561 19.9196 12.28 21.3496L12.03 21.5006L11.77 21.3396C9.48102 19.9196 7.35002 18.2596 5.40102 16.3796C4.06102 15.0306 3.03002 13.3896 2.39002 11.5806C1.26002 8.04065 2.59002 3.99065 6.32102 2.76965C6.61102 2.66965 6.91002 2.59965 7.21002 2.56065H7.33002C7.61102 2.51965 7.89002 2.50065 8.17002 2.50065H8.28002C8.91002 2.51965 9.52002 2.62965 10.111 2.83065H10.17C10.21 2.84965 10.24 2.87065 10.26 2.88965C10.481 2.96065 10.69 3.04065 10.89 3.15065L11.27 3.32065C11.3618 3.36962 11.4649 3.44445 11.554 3.50912C11.6104 3.55009 11.6612 3.58699 11.7 3.61065C11.7163 3.62028 11.7329 3.62996 11.7496 3.63972C11.8354 3.68977 11.9247 3.74191 12 3.79965C13.111 2.95065 14.46 2.49065 15.85 2.50065ZM18.51 9.70065C18.92 9.68965 19.27 9.36065 19.3 8.93965V8.82065C19.33 7.41965 18.481 6.15065 17.19 5.66065C16.78 5.51965 16.33 5.74065 16.18 6.16065C16.04 6.58065 16.26 7.04065 16.68 7.18965C17.321 7.42965 17.75 8.06065 17.75 8.75965V8.79065C17.731 9.01965 17.8 9.24065 17.94 9.41065C18.08 9.58065 18.29 9.67965 18.51 9.70065Z" fill="currentColor"></path>
                      </svg>
                  </span> by <a href="https://iqonic.design/" target="_blank">IQONIC Design</a>.
              </div>
          </div>
      </footer>
      <!-- Footer Section End -->
    </main>
    <!-- Wrapper End-->
        <!-- landing page start -->
    <a class="btn btn-secondary btn-dashboard" href="https://templates.iqonic.design/hope-ui/pro/html/landing-pages/index.html">
            Landing Pages
    </a>
     <!-- landing page end -->
    <!-- Live Customizer start -->
    <!-- Setting offcanvas start here -->
    <div class="offcanvas offcanvas-end live-customizer on-rtl end" tabindex="-1" id="live-customizer" data-bs-scroll="true" data-bs-backdrop="false" aria-labelledby="live-customizer-label">
        <div class="offcanvas-header">
            <div class="d-flex align-items-center">
                <h4 class="offcanvas-title" id="live-customizer-label">Live Customizer</h4>
            </div>
            <div class="d-flex gap-2 align-items-center">
                <button class="btn btn-primary px-3" data-copy="settings" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Copy">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M18.8088 9.021C18.3573 9.021 17.7592 9.011 17.0146 9.011C15.1987 9.011 13.7055 7.508 13.7055 5.675V2.459C13.7055 2.206 13.5026 2 13.253 2H7.96363C5.49517 2 3.5 4.026 3.5 6.509V17.284C3.5 19.889 5.59022 22 8.16958 22H16.0453C18.5058 22 20.5 19.987 20.5 17.502V9.471C20.5 9.217 20.298 9.012 20.0465 9.013C19.6247 9.016 19.1168 9.021 18.8088 9.021Z" fill="currentColor"></path>
                        <path opacity="0.4" d="M16.0842 2.56737C15.7852 2.25637 15.2632 2.47037 15.2632 2.90137V5.53837C15.2632 6.64437 16.1742 7.55437 17.2792 7.55437C17.9772 7.56237 18.9452 7.56437 19.7672 7.56237C20.1882 7.56137 20.4022 7.05837 20.1102 6.75437C19.0552 5.65737 17.1662 3.69137 16.0842 2.56737Z" fill="currentColor"></path>
                        <path d="M14.3672 12.2364H12.6392V10.5094C12.6392 10.0984 12.3062 9.7644 11.8952 9.7644C11.4842 9.7644 11.1502 10.0984 11.1502 10.5094V12.2364H9.4232C9.0122 12.2364 8.6792 12.5704 8.6792 12.9814C8.6792 13.3924 9.0122 13.7264 9.4232 13.7264H11.1502V15.4524C11.1502 15.8634 11.4842 16.1974 11.8952 16.1974C12.3062 16.1974 12.6392 15.8634 12.6392 15.4524V13.7264H14.3672C14.7782 13.7264 15.1122 13.3924 15.1122 12.9814C15.1122 12.5704 14.7782 12.2364 14.3672 12.2364Z" fill="currentColor"></path>
                    </svg>
                    Copy Config
                </button>
                <button class="btn btn-primary btn-icon" data-reset="settings" data-bs-toggle="tooltip" data-bs-placement="left" aria-label="Reset All Settings" data-bs-original-title="Reset All Settings">
                    <span class="btn-inner">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.4">
                                <path d="M4.88076 14.6713C4.74978 14.2784 4.32504 14.066 3.93208 14.197C3.53912 14.328 3.32675 14.7527 3.45774 15.1457L4.88076 14.6713ZM20.8808 15.1457C21.0117 14.7527 20.7994 14.328 20.4064 14.197C20.0135 14.066 19.5887 14.2784 19.4577 14.6713L20.8808 15.1457ZM4.16925 14.9085C3.45774 15.1457 3.45785 15.146 3.45797 15.1464C3.45802 15.1465 3.45815 15.1469 3.45825 15.1472C3.45845 15.1478 3.45868 15.1485 3.45895 15.1493C3.45948 15.1509 3.46013 15.1528 3.46092 15.1551C3.46249 15.1597 3.46456 15.1657 3.46716 15.1731C3.47235 15.188 3.47961 15.2084 3.48902 15.2341C3.50782 15.2854 3.53521 15.3576 3.5717 15.4477C3.64461 15.6279 3.7542 15.8805 3.90468 16.1814C4.2048 16.7817 4.67223 17.5836 5.34308 18.3886C6.68942 20.0043 8.88343 21.6585 12.1693 21.6585V20.1585C9.45507 20.1585 7.64908 18.8128 6.49542 17.4284C5.91627 16.7334 5.5087 16.0354 5.24632 15.5106C5.11555 15.2491 5.02201 15.0329 4.96212 14.8849C4.9322 14.811 4.91076 14.7543 4.89733 14.7177C4.89062 14.6994 4.88593 14.6861 4.88318 14.6783C4.88181 14.6744 4.88093 14.6718 4.88053 14.6706C4.88033 14.67 4.88025 14.6698 4.88029 14.6699C4.88031 14.67 4.88036 14.6701 4.88044 14.6704C4.88047 14.6705 4.88056 14.6707 4.88058 14.6708C4.88067 14.671 4.88076 14.6713 4.16925 14.9085ZM12.1693 21.6585C15.4551 21.6585 17.6491 20.0043 18.9954 18.3886C19.6663 17.5836 20.1337 16.7817 20.4338 16.1814C20.5843 15.8805 20.6939 15.6279 20.7668 15.4477C20.8033 15.3576 20.8307 15.2854 20.8495 15.2341C20.8589 15.2084 20.8662 15.188 20.8713 15.1731C20.8739 15.1657 20.876 15.1597 20.8776 15.1551C20.8784 15.1528 20.879 15.1509 20.8796 15.1493C20.8798 15.1485 20.8801 15.1478 20.8803 15.1472C20.8804 15.1469 20.8805 15.1465 20.8805 15.1464C20.8807 15.146 20.8808 15.1457 20.1693 14.9085C19.4577 14.6713 19.4578 14.671 19.4579 14.6708C19.4579 14.6707 19.458 14.6705 19.4581 14.6704C19.4581 14.6701 19.4582 14.67 19.4582 14.6699C19.4583 14.6698 19.4582 14.67 19.458 14.6706C19.4576 14.6718 19.4567 14.6744 19.4553 14.6783C19.4526 14.6861 19.4479 14.6994 19.4412 14.7177C19.4277 14.7543 19.4063 14.811 19.3764 14.8849C19.3165 15.0329 19.223 15.2491 19.0922 15.5106C18.8298 16.0354 18.4222 16.7334 17.8431 17.4284C16.6894 18.8128 14.8834 20.1585 12.1693 20.1585V21.6585Z" fill="currentColor"></path>
                                <path d="M21.5183 19.2271C21.4293 19.2234 21.3427 19.196 21.2671 19.1465L16.3546 15.8924C16.2197 15.8026 16.1413 15.6537 16.148 15.4969C16.1546 15.34 16.2452 15.1982 16.3873 15.1202L21.5571 12.2926C21.7075 12.2106 21.8932 12.213 22.0416 12.3003C22.1907 12.387 22.2783 12.5436 22.2712 12.7096L22.014 18.7913C22.007 18.9573 21.9065 19.1059 21.7506 19.1797C21.6772 19.215 21.597 19.2305 21.5183 19.2271" fill="currentColor"></path>
                            </g>
                            <path d="M20.0742 10.0265C20.1886 10.4246 20.6041 10.6546 21.0022 10.5401C21.4003 10.4257 21.6302 10.0102 21.5158 9.61214L20.0742 10.0265ZM4.10803 8.88317C3.96071 9.27031 4.15513 9.70356 4.54226 9.85087C4.92939 9.99818 5.36265 9.80377 5.50996 9.41664L4.10803 8.88317ZM20.795 9.81934C21.5158 9.61214 21.5157 9.6118 21.5156 9.61144C21.5155 9.61129 21.5154 9.6109 21.5153 9.61059C21.5152 9.60998 21.515 9.60928 21.5147 9.60848C21.5143 9.60689 21.5137 9.60493 21.513 9.6026C21.5116 9.59795 21.5098 9.59184 21.5075 9.58431C21.503 9.56925 21.4966 9.54853 21.4882 9.52251C21.4716 9.47048 21.4473 9.39719 21.4146 9.3056C21.3493 9.12256 21.2503 8.8656 21.1126 8.55861C20.8378 7.94634 20.4044 7.12552 19.7678 6.29313C18.4902 4.62261 16.3673 2.87801 13.0844 2.74053L13.0216 4.23922C15.7334 4.35278 17.4816 5.77291 18.5763 7.20436C19.1258 7.92295 19.5038 8.63743 19.744 9.17271C19.8638 9.43949 19.9482 9.65937 20.0018 9.80972C20.0286 9.88483 20.0477 9.94238 20.0596 9.97951C20.0655 9.99808 20.0696 10.0115 20.072 10.0195C20.0732 10.0235 20.074 10.0261 20.0744 10.0273C20.0746 10.0278 20.0746 10.0281 20.0746 10.028C20.0746 10.0279 20.0745 10.0278 20.0745 10.0275C20.0744 10.0274 20.0744 10.0272 20.0743 10.0271C20.0743 10.0268 20.0742 10.0265 20.795 9.81934ZM13.0844 2.74053C9.80146 2.60306 7.54016 4.16407 6.12741 5.72193C5.42345 6.49818 4.92288 7.27989 4.59791 7.86704C4.43497 8.16144 4.31491 8.40923 4.23452 8.58617C4.1943 8.67471 4.16391 8.7457 4.14298 8.79616C4.13251 8.82139 4.1244 8.84151 4.11859 8.85613C4.11568 8.86344 4.11336 8.86938 4.1116 8.8739C4.11072 8.87616 4.10998 8.87807 4.10939 8.87962C4.10909 8.88039 4.10883 8.88108 4.1086 8.88167C4.10849 8.88196 4.10834 8.88234 4.10829 8.88249C4.10815 8.88284 4.10803 8.88317 4.80899 9.14991C5.50996 9.41664 5.50985 9.41692 5.50975 9.41719C5.50973 9.41725 5.50964 9.41749 5.50959 9.4176C5.5095 9.41784 5.50945 9.41798 5.50942 9.41804C5.50938 9.41816 5.50947 9.41792 5.50969 9.41734C5.51014 9.41619 5.51113 9.41365 5.51267 9.40979C5.51574 9.40206 5.52099 9.38901 5.52846 9.37101C5.5434 9.335 5.56719 9.27924 5.60018 9.20664C5.66621 9.0613 5.76871 8.84925 5.91031 8.59341C6.19442 8.08008 6.63084 7.39971 7.23855 6.72958C8.44912 5.39466 10.3098 4.12566 13.0216 4.23922L13.0844 2.74053Z" fill="currentColor"></path>
                            <path d="M8.78337 9.33604C8.72981 9.40713 8.65805 9.46292 8.57443 9.49703L3.1072 11.6951C2.95672 11.7552 2.78966 11.7352 2.66427 11.6407C2.53887 11.5462 2.47359 11.3912 2.48993 11.2299L3.09576 5.36863C3.11367 5.19823 3.22102 5.04666 3.37711 4.97402C3.5331 4.9005 3.71173 4.91728 3.84442 5.01726L8.70581 8.68052C8.8385 8.78051 8.90387 8.94759 8.8762 9.1178C8.86358 9.19825 8.83082 9.27308 8.78337 9.33604" fill="currentColor"></path>
                        </svg>
                    </span>
                </button>
            </div>
            <button type="button" class="btn-close px-0 text-reset shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body data-scrollbar">
            <div class="row">
                <div class="col-lg-12">
                    <div class="border border-2 rounded mb-3">
                        <div class="px-3 pt-3 text-center">
                            <h5 class="d-inline-block">Style Setting</h5>
                        </div>
                        <div class="p-3">
                            <!-- Theme start here -->
                            <div>
                                <h6 class="mb-3">Theme</h6>
                                <div class="d-grid gap-3 grid-cols-3 mb-3">
                                    <div data-setting="radio">
                                        <input type="radio" value="auto" class="btn-check" name="theme_scheme" id="color-mode-auto" checked="">
                                        <label class="btn btn-border d-block" for="color-mode-auto">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M7,2V13H10V22L17,10H13L17,2H7Z"></path>
                                            </svg>
                                            Auto
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="dark" class="btn-check" name="theme_scheme" id="color-mode-dark">
                                        <label class="btn btn-border d-block" for="color-mode-dark">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M9,2C7.95,2 6.95,2.16 6,2.46C10.06,3.73 13,7.5 13,12C13,16.5 10.06,20.27 6,21.54C6.95,21.84 7.95,22 9,22A10,10 0 0,0 19,12A10,10 0 0,0 9,2Z"></path>
                                            </svg>
                                            Dark
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="light" class="btn-check" name="theme_scheme" id="color-mode-light">
                                        <label class="btn  btn-border d-block" for="color-mode-light">
                                            <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z">
                                                </path>
                                            </svg>
                                            Light
                                        </label>
                                    </div>
                                </div>
                                <div class="d-grid gap-3 grid-cols-2 mb-4">
                                    <div data-setting="attribute" class="text-center">
                                        <input type="radio" value="ltr" class="btn-check" name="theme_scheme_direction" data-prop="dir" id="theme-scheme-direction-ltr" checked="">
                                        <label class="btn btn-border d-block p-0" for="theme-scheme-direction-ltr">
                                            <img src="./shop-main_files/01(3).png" alt="ltr" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/01(4).png" alt="ltr" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class=" mt-2"> LTR </span>
                                    </div>
                                    <div data-setting="attribute" class="text-center">
                                        <input type="radio" value="rtl" class="btn-check" name="theme_scheme_direction" data-prop="dir" id="theme-scheme-direction-rtl">
                                        <label class="btn btn-border d-block p-0" for="theme-scheme-direction-rtl">
                                            <img src="./shop-main_files/02(2).png" alt="ltr" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/02(3).png" alt="ltr" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class=" mt-2"> RTL </span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Theme end here -->
    
                            <hr class="hr-horizontal">
    
                            <!-- Color customizer start here -->
    
                            <div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <h6 class="mt-4 mb-3">Color Customizer</h6>
                                    <div class="d-flex align-items-center">
                                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#custom-color" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="custom-color">Custom</a>
                                        <div data-setting="radio">
                                            <input type="radio" value="theme-color-default" class="btn-check" name="theme_color" id="theme-color-default" data-colors="{&quot;primary&quot;: &quot;#3a57e8&quot;, &quot;info&quot;: &quot;#08B1BA&quot;}">
                                            <label class="btn bg-transparent px-2 border-0" for="theme-color-default" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Reset Color" aria-label="Reset Color">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.4799 12.2424C21.7557 12.2326 21.9886 12.4482 21.9852 12.7241C21.9595 14.8075 21.2975 16.8392 20.0799 18.5506C18.7652 20.3986 16.8748 21.7718 14.6964 22.4612C12.518 23.1505 10.1711 23.1183 8.01299 22.3694C5.85488 21.6205 4.00382 20.196 2.74167 18.3126C1.47952 16.4293 0.875433 14.1905 1.02139 11.937C1.16734 9.68346 2.05534 7.53876 3.55018 5.82945C5.04501 4.12014 7.06478 2.93987 9.30193 2.46835C11.5391 1.99683 13.8711 2.2599 15.9428 3.2175L16.7558 1.91838C16.9822 1.55679 17.5282 1.62643 17.6565 2.03324L18.8635 5.85986C18.945 6.11851 18.8055 6.39505 18.549 6.48314L14.6564 7.82007C14.2314 7.96603 13.8445 7.52091 14.0483 7.12042L14.6828 5.87345C13.1977 5.18699 11.526 4.9984 9.92231 5.33642C8.31859 5.67443 6.8707 6.52052 5.79911 7.74586C4.72753 8.97119 4.09095 10.5086 3.98633 12.1241C3.8817 13.7395 4.31474 15.3445 5.21953 16.6945C6.12431 18.0446 7.45126 19.0658 8.99832 19.6027C10.5454 20.1395 12.2278 20.1626 13.7894 19.6684C15.351 19.1743 16.7062 18.1899 17.6486 16.8652C18.4937 15.6773 18.9654 14.2742 19.0113 12.8307C19.0201 12.5545 19.2341 12.3223 19.5103 12.3125L21.4799 12.2424Z" fill="#31BAF1"></path>
                                                    <path d="M20.0941 18.5594C21.3117 16.848 21.9736 14.8163 21.9993 12.7329C22.0027 12.4569 21.7699 12.2413 21.4941 12.2512L19.5244 12.3213C19.2482 12.3311 19.0342 12.5633 19.0254 12.8395C18.9796 14.283 18.5078 15.6861 17.6628 16.8739C16.7203 18.1986 15.3651 19.183 13.8035 19.6772C12.2419 20.1714 10.5595 20.1483 9.01246 19.6114C7.4654 19.0746 6.13845 18.0534 5.23367 16.7033C4.66562 15.8557 4.28352 14.9076 4.10367 13.9196C4.00935 18.0934 6.49194 21.37 10.008 22.6416C10.697 22.8908 11.4336 22.9852 12.1652 22.9465C13.075 22.8983 13.8508 22.742 14.7105 22.4699C16.8889 21.7805 18.7794 20.4073 20.0941 18.5594Z" fill="#0169CA"></path>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="collapse" id="custom-color">
                                    <div class="form-group d-flex justify-content-between align-items-center">
                                        <label class="" for="custom-primary-color">Primary</label>
                                        <input class="" name="theme_color" data-extra="primary" type="color" id="custom-primary-color" value="#3a57e8" data-setting="color">
                                    </div>
                                    <div class="form-group d-flex d-flex justify-content-between align-items-center">
                                        <label class="" for="custom-info-color">Secondary</label>
                                        <input class="" name="theme_color" data-extra="info" type="color" id="custom-info-color" value="#08B1BA" data-setting="color">
                                    </div>
                                </div>
                                <div class="grid-cols-5 mb-4 d-grid gap-3">
                                    <div data-setting="radio">
                                        <input type="radio" value="theme-color-blue" class="btn-check" name="theme_color" id="theme-color-1" data-colors="{&quot;primary&quot;: &quot;#00C3F9&quot;, &quot;info&quot;: &quot;#573BFF&quot;}">
                                        <label class="btn btn-border d-block bg-transparent" for="theme-color-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Theme-1" aria-label="Theme-1">
                                            <svg class="customizer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                                <circle cx="12" cy="12" r="10" fill="#00C3F9"></circle>
                                                <path d="M2,12 a1,1 1 1,0 20,0" fill="#573BFF"></path>
                                            </svg>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="theme-color-gray" class="btn-check" name="theme_color" id="theme-color-2" data-colors="{&quot;primary&quot;: &quot;#91969E&quot;, &quot;info&quot;: &quot;#FD8D00&quot;}">
                                        <label class="btn btn-border d-block bg-transparent" for="theme-color-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Theme-2" aria-label="Theme-2">
                                            <svg class="customizer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                                <circle cx="12" cy="12" r="10" fill="#91969E"></circle>
                                                <path d="M2,12 a1,1 1 1,0 20,0" fill="#FD8D00"></path>
                                            </svg>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="theme-color-red" class="btn-check" name="theme_color" id="theme-color-3" data-colors="{&quot;primary&quot;: &quot;#DB5363&quot;, &quot;info&quot;: &quot;#366AF0&quot;}">
                                        <label class="btn btn-border d-block bg-transparent" for="theme-color-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Theme-3" aria-label="Theme-3">
                                            <svg class="customizer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                                <circle cx="12" cy="12" r="10" fill="#DB5363"></circle>
                                                <path d="M2,12 a1,1 1 1,0 20,0" fill="#366AF0"></path>
                                            </svg>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="theme-color-yellow" class="btn-check" name="theme_color" id="theme-color-4" data-colors="{&quot;primary&quot;: &quot;#EA6A12&quot;, &quot;info&quot;: &quot;#6410F1&quot;}">
                                        <label class="btn btn-border d-block bg-transparent" for="theme-color-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Theme-4" aria-label="Theme-4">
                                            <svg class="customizer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                                <circle cx="12" cy="12" r="10" fill="#EA6A12"></circle>
                                                <path d="M2,12 a1,1 1 1,0 20,0" fill="#6410F1"></path>
                                            </svg>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="theme-color-pink" class="btn-check" name="theme_color" id="theme-color-5" data-colors="{&quot;primary&quot;: &quot;#E586B3&quot;, &quot;info&quot;: &quot;#25C799&quot;}">
                                        <label class="btn btn-border d-block bg-transparent" for="theme-color-5" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Theme-5" aria-label="Theme-5">
                                            <svg class="customizer-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                                <circle cx="12" cy="12" r="10" fill="#E586B3"></circle>
                                                <path d="M2,12 a1,1 1 1,0 20,0" fill="#25C799"></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Color customizer end here -->
                            <!-- menu hide start here -->
                            <hr class="hr-horizontal">
                            <div data-setting="checkbox">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h6 class="mt-4 mb-3">Menu Hide</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" value="sidebar-none" name="sidebar_show" id="switch-sidebar-show" type="checkbox">
                                    </div>
                                </div>
                            </div>
                            <!-- menu hide end here -->
    
                            <hr class="hr-horizontal">
    
                            <!-- Menu color start here -->
    
                            <div>
                                <h6 class="mt-4 mb-3">Menu Color</h6>
                                <div class="d-grid gap-3 grid-cols-3 mb-3">
                                    <div data-setting="radio">
                                        <input type="radio" value="sidebar-white" class="btn-check" name="sidebar_color" id="sidebar-white" checked="">
                                        <label class="btn btn-border d-flex align-items-center bg-transparent" for="sidebar-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Sidebar White">
                                            <i class="text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="12" r="8" fill="currentColor" stroke="black" stroke-width="3"></circle>
                                                </svg>
                                            </i>
                                            <span class="ms-2 ">Default</span>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="sidebar-dark" class="btn-check" name="sidebar_color" id="sidebar-dark">
                                        <label class="btn btn-border d-flex align-items-center bg-transparent" for="sidebar-dark" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Sidebar Dark">
                                            <i class="text-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                </svg>
                                            </i>
                                            <span class="ms-2 "> Dark </span>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="sidebar-color" class="btn-check" name="sidebar_color" id="sidebar-color">
                                        <label class="btn btn-border d-flex align-items-center bg-transparent" for="sidebar-color" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Sidebar Colored">
                                            <i class="text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                </svg>
                                            </i>
                                            <span class="ms-2 "> Color </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="d-grid gap-3 grid-cols-2 mb-4">
                                    <div data-setting="radio">
                                        <input type="radio" value="sidebar-transparent" class="btn-check" name="sidebar_color" id="sidebar-transparent">
                                        <label class="btn btn-border d-flex align-items-center bg-transparent" for="sidebar-transparent" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Sidebar Transparent">
                                            <i class="text-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="12" r="8" fill="#F5F6FA" stroke="black" stroke-width="3"></circle>
                                                </svg>
                                            </i>
                                            <span class="ms-2">Transparent</span>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="sidebar-glass" class="btn-check" name="sidebar_color" id="sidebar-glass">
                                        <label class="btn btn-border d-flex align-items-center bg-transparent" for="sidebar-glass" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Sidebar Transparent">
                                            <i class="text-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon-18" width="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="12" cy="12" r="8" fill="#F5F6FA" stroke="black" stroke-width="3"></circle>
                                                </svg>
                                            </i>
                                            <span class="ms-2">Glass</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Menu color end here -->
    
                            <hr class="hr-horizontal">
    
                            <!-- Menu Style start here -->
    
                            <div>
                                <h6 class="mt-4 mb-3">Menu Style</h6>
                                <div class="d-grid gap-3 grid-cols-4 mb-4">
                                    <div data-setting="checkbox" class="text-center">
                                        <input type="checkbox" value="sidebar-mini" class="btn-check" name="sidebar_type" id="sidebar-mini">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="sidebar-mini">
                                            <img src="./shop-main_files/03(2).png" alt="mini" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/03(3).png" alt="mini" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Mini</span>
                                    </div>
                                    <div data-setting="checkbox" class="text-center">
                                        <input type="checkbox" value="sidebar-hover" data-extra="{target: &#39;.sidebar&#39;, ClassListAdd: &#39;sidebar-mini&#39;}" class="btn-check" name="sidebar_type" id="sidebar-hover">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="sidebar-hover">
                                            <img src="./shop-main_files/04(2).png" alt="hover" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/04(3).png" alt="hover" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Hover</span>
                                    </div>
                                    <div data-setting="checkbox" class="text-center">
                                        <input type="checkbox" value="sidebar-boxed" class="btn-check" name="sidebar_type" id="sidebar-boxed">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="sidebar-boxed">
                                            <img src="./shop-main_files/05(1).png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/05(2).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Boxed</span>
                                    </div>
                                    <div data-setting="checkbox" class="text-center">
                                        <input type="checkbox" value="sidebar-soft" class="btn-check" name="sidebar_type" id="sidebar-soft">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="sidebar-soft">
                                            <img src="./shop-main_files/05(1).png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/05(2).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Soft</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Menu Style end here -->
    
                            <hr class="hr-horizontal">
    
                            <!-- Active Menu Style start here -->
    
                            <div>
                                <h6 class="mt-4 mb-3">Active Menu Style</h6>
                                <div class="d-grid gap-3 grid-cols-3 mb-4">
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="sidebar-default navs-rounded" class="btn-check" name="sidebar_menu_style" id="navs-rounded">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-rounded">
                                            <img src="./shop-main_files/06(2).png" alt="mini" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/06(3).png" alt="mini" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Rounded One Side</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="sidebar-default navs-rounded-all" class="btn-check" name="sidebar_menu_style" id="navs-rounded-all">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-rounded-all">
                                            <img src="./shop-main_files/07(2).png" alt="hover" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/07(3).png" alt="hover" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Rounded All</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="sidebar-default navs-pill" class="btn-check" name="sidebar_menu_style" id="navs-pill">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-pill">
                                            <img src="./shop-main_files/08.png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/08(1).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Pill One Side</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="sidebar-default navs-pill-all" class="btn-check" name="sidebar_menu_style" id="navs-pill-all">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-pill-all">
                                            <img src="./shop-main_files/09(1).png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/09(2).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Pill All</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="left-bordered" class="btn-check" name="sidebar_menu_style" id="left-bordered" checked="">
                                        <label class="btn btn-border position-relative p-0 d-block overflow-hidden" for="left-bordered">
                                            <img src="./shop-main_files/14.png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/14(1).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                            <small class="badge bg-danger position-absolute top-1 end-0 m-2">Pro</small>
                                        </label>
                                        <span class="mt-2">Left Bordered</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="sidebar-default navs-full-width" class="btn-check" name="sidebar_menu_style" id="navs-full-width">
                                        <label class="btn btn-border position-relative p-0 d-block overflow-hidden" for="navs-full-width">
                                            <img src="./shop-main_files/15.png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/15(1).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                            <small class="badge bg-danger position-absolute top-1 end-0 m-2">Pro</small>
                                        </label>
                                        <span class="mt-2">Full Width</span>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Active Menu Style end here -->
    
                            <!-- navbar hide start here -->
                            <hr class="hr-horizontal">
    
                            <div data-setting="checkbox">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h6 class="mt-4 mb-3">Navbar Hide</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" value="iq-navbar-none" name="header_navbar_show" id="switch-navbar-show" type="checkbox">
                                    </div>
                                </div>
                            </div>
                            <!-- navbar hide end here -->
    
                            <hr class="hr-horizontal">
    
                            <!-- Navbar style start here -->
                            <div>
                                <h6 class="mt-4 mb-3">Navbar Style</h6>
                                <div class="d-grid gap-3 grid-cols-4 mb-4">
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="nav-glass" class="btn-check" name="header_navbar" id="nav-glass">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="nav-glass">
                                            <img src="./shop-main_files/10(2).png" alt="hover" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/10(3).png" alt="hover" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Glass</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="navs-sticky" class="btn-check" name="header_navbar" id="navs-sticky">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-sticky">
                                            <img src="./shop-main_files/04(2).png" alt="hover" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/04(3).png" alt="hover" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Sticky</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="navs-transparent" class="btn-check" name="header_navbar" id="navs-transparent">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-transparent">
                                            <img src="./shop-main_files/12.png" alt="boxed" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/12(1).png" alt="boxed" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Transparent</span>
                                    </div>
                                    <div data-setting="radio" class="text-center">
                                        <input type="radio" value="navs-default" class="btn-check" name="header_navbar" id="navs-default" checked="">
                                        <label class="btn btn-border p-0 d-block overflow-hidden" for="navs-default">
                                            <img src="./shop-main_files/01(3).png" alt="default" class="mode dark-img img-fluid" width="200" height="200" loading="lazy">
                                            <img src="./shop-main_files/01(4).png" alt="default" class="mode light-img img-fluid" width="200" height="200" loading="lazy">
                                        </label>
                                        <span class="mt-2">Default</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Navbar style end here -->
                            <hr class="hr-horizontal">
                            <!-- Card style start here -->
                            <div class="mb-4">
                                <div class="mt-4 mb-3">
                                    <h6 class="d-inline-block mb-0 me-2">Card Style</h6>
                                    <small class="badge bg-warning rounded-pill">Pro</small>
                                </div>
                                <div class="d-grid gap-3 grid-cols-2 mb-3">
                                    <div data-setting="radio">
                                        <input type="radio" value="card-default" class="btn-check" name="card_color" id="card-default" checked="">
                                        <label class="btn btn-border d-block" for="card-default" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Card White">
                                            <span>Default Style</span>
                                        </label>
                                    </div>
                                    <div data-setting="radio">
                                        <input type="radio" value="card-glass" class="btn-check" name="card_color" id="card-glass">
                                        <label class="btn btn-border d-block" for="card-glass" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Card Glass">
                                            <span>Glass Effect</span>
                                        </label>
                                    </div>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="card-transparent" class="btn-check" name="card_color" id="card-transparent">
                                    <label class="btn btn-border d-block" for="card-transparent" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Card Transparent">
                                        <span>Transparent Style</span>
                                    </label>
                                </div>
                            </div>
                            <!-- Card style end here -->
    
    
                            <hr class="hr-horizontal">
    
                            <!-- Page Animation start here -->
                            <div class="mt-4 mb-3">
                                <h6 class="d-inline-block mb-0 me-2">Footer </h6>
                                <small class="badge bg-warning rounded-pill">Pro</small>
                            </div>
                            <div class="d-grid gap-3 grid-cols-3 mb-4">
                                <div data-setting="radio">
                                    <input type="radio" value="default" class="btn-check" name="footer" id="footer_default" checked="">
                                    <label class="btn btn-border d-block" for="footer_default">Default</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="sticky" class="btn-check" name="footer" id="footer_Sticky">
                                    <label class="btn btn-border d-block" for="footer_Sticky">Sticky</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="glass" class="btn-check" name="footer" id="footer_glass">
                                    <label class="btn btn-border d-block" for="footer_glass">Glass</label>
                                </div>
                            </div>
                            <!-- Page Animation start here -->
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="border border-2 rounded">
                        <div class="px-3 pt-3 d-flex align-items-center justify-content-center gap-2">
                            <h5 class="mb-0">Advanced</h5>
                            <span class="badge rounded-pill bg-warning">Pro</span>
                        </div>
                        <div class="p-3">
                            <h6 class="mb-3 d-inline-block">App Name</h6>
                            <span data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Edit the App Name with your business name to familiarize your audience. " data-bs-original-title="Edit the App Name with your business name to familiarize your audience. ">
                                <svg class="icon-20" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </span>
                            <div class="d-grid gap-3 grid-cols-1 mb-4">
                                <div class="form-group mb-0">
                                    <input type="text" data-setting="input" maxlength="10" name="app_name" class="form-control" value="">
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <h6 class="d-inline-block">Font</h6>
                                <a href="javascript:void(0)" data-reset="body-heading-font">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.4799 12.2424C21.7557 12.2326 21.9886 12.4482 21.9852 12.7241C21.9595 14.8075 21.2975 16.8392 20.0799 18.5506C18.7652 20.3986 16.8748 21.7718 14.6964 22.4612C12.518 23.1505 10.1711 23.1183 8.01299 22.3694C5.85488 21.6205 4.00382 20.196 2.74167 18.3126C1.47952 16.4293 0.875433 14.1905 1.02139 11.937C1.16734 9.68346 2.05534 7.53876 3.55018 5.82945C5.04501 4.12014 7.06478 2.93987 9.30193 2.46835C11.5391 1.99683 13.8711 2.2599 15.9428 3.2175L16.7558 1.91838C16.9822 1.55679 17.5282 1.62643 17.6565 2.03324L18.8635 5.85986C18.945 6.11851 18.8055 6.39505 18.549 6.48314L14.6564 7.82007C14.2314 7.96603 13.8445 7.52091 14.0483 7.12042L14.6828 5.87345C13.1977 5.18699 11.526 4.9984 9.92231 5.33642C8.31859 5.67443 6.8707 6.52052 5.79911 7.74586C4.72753 8.97119 4.09095 10.5086 3.98633 12.1241C3.8817 13.7395 4.31474 15.3445 5.21953 16.6945C6.12431 18.0446 7.45126 19.0658 8.99832 19.6027C10.5454 20.1395 12.2278 20.1626 13.7894 19.6684C15.351 19.1743 16.7062 18.1899 17.6486 16.8652C18.4937 15.6773 18.9654 14.2742 19.0113 12.8307C19.0201 12.5545 19.2341 12.3223 19.5103 12.3125L21.4799 12.2424Z" fill="currentColor"></path>
                                        <path d="M20.0941 18.5594C21.3117 16.848 21.9736 14.8163 21.9993 12.7329C22.0027 12.4569 21.7699 12.2413 21.4941 12.2512L19.5244 12.3213C19.2482 12.3311 19.0342 12.5633 19.0254 12.8395C18.9796 14.283 18.5078 15.6861 17.6628 16.8739C16.7203 18.1986 15.3651 19.183 13.8035 19.6772C12.2419 20.1714 10.5595 20.1483 9.01246 19.6114C7.4654 19.0746 6.13845 18.0534 5.23367 16.7033C4.66562 15.8557 4.28352 14.9076 4.10367 13.9196C4.00935 18.0934 6.49194 21.37 10.008 22.6416C10.697 22.8908 11.4336 22.9852 12.1652 22.9465C13.075 22.8983 13.8508 22.742 14.7105 22.4699C16.8889 21.7805 18.7794 20.4073 20.0941 18.5594Z" fill="currentColor"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="d-grid gap-3 grid-cols-2 mb-4">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <div class="label">
                                            <label class="mb-0 d-inline-block">Body Font</label>
                                        </div>
                                    </div>
                                    <div class="form-group mb-0">
                                        <select name="body_font_family" class="form-control" data-select="font" data-setting="select">
                                            <option value="">Select Body Font</option>
                                        </select>
                                    </div>
                                </div>
    
                                <div>
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <div class="label">
                                            <label class="mb-0 d-inline-block">Heading Font</label>
                                        </div>
                                    </div>
                                    <div class="form-group mb-0">
                                        <select name="heading_font_family" class="form-control" data-select="font" data-setting="select">
                                            <option value="">Select Heading Font</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
    
                            <!-- Page container start here -->
                            <div>
                                <h6 class="d-inline-block mb-3 me-2">Page Style </h6>
                                <small class="badge bg-warning rounded-pill">Pro</small>
                                <span data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Wrap your content layout and select Full Width or Boxed styles.  " data-bs-original-title="Wrap your content layout and select Full Width or Boxed styles.  ">
                                    <svg class="icon-20" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                            </div>
                            <div class="d-grid gap-3 grid-cols-2 mb-4">
                                <div data-setting="radio">
                                    <input type="radio" value="container" class="btn-check" name="page_layout" id="page-layout-boxed">
                                    <label class="btn btn-border d-block" for="page-layout-boxed">Boxed</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="container-fluid" class="btn-check" name="page_layout" id="page-layout-full-width" checked="">
                                    <label class="btn btn-border d-block" for="page-layout-full-width">Full Width</label>
                                </div>
                            </div>
                            <!-- Page container start here -->
    
                            <!-- Style appearance start here -->
    
                            <div>
                                <h6 class="d-inline-block mb-3 me-2">Style Appearance </h6>
                                <small class="badge bg-warning rounded-pill">Pro</small>
                            </div>
                            <div class="d-grid gap-3 grid-cols-3 mb-4">
                                <div data-setting="checkbox">
                                    <input type="checkbox" value="theme-flat" class="btn-check" name="theme_style_appearance" id="theme-style-appearance-flat">
                                    <label class="btn btn-border d-block" for="theme-style-appearance-flat">Flat</label>
                                </div>
                                <div data-setting="checkbox">
                                    <input type="checkbox" value="theme-bordered" class="btn-check" name="theme_style_appearance" id="theme-style-appearance-bordered">
                                    <label class="btn btn-border d-block" for="theme-style-appearance-bordered">Bordered</label>
                                </div>
                                <div data-setting="checkbox">
                                    <input type="checkbox" value="theme-sharp" class="btn-check" name="theme_style_appearance" id="theme-style-appearance-sharp">
                                    <label class="btn btn-border d-block" for="theme-style-appearance-sharp">Sharp</label>
                                </div>
                            </div>
    
                            <!-- Style appearance end here -->
    
                            <!-- Page Animation start here -->
                            <div>
                                <h6 class="d-inline-block mb-3 me-2">Page Transition </h6>
                                <small class="badge bg-warning rounded-pill">Pro</small>
                            </div>
                            <div class="d-grid gap-3 grid-cols-2 mb-4">
                                <div data-setting="radio">
                                    <input type="radio" value="theme-with-animation" class="btn-check" name="theme_transition" id="page-animation" checked="">
                                    <label class="btn btn-border d-block" for="page-animation">Animation</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="theme-without-animation" class="btn-check" name="theme_transition" id="without-page-animation">
                                    <label class="btn btn-border d-block" for="without-page-animation">No Animation</label>
                                </div>
                            </div>
                            <!-- Page Animation start here -->
    
                            <div>
                                <h6 class="mb-3 d-inline-block">Storage</h6>
                                <span data-bs-toggle="tooltip" data-bs-placement="right" aria-label="You can save the setting changes you made for your project on either Local storage, Session storage." data-bs-original-title="You can save the setting changes you made for your project on either Local storage, Session storage.">
                                    <svg class="icon-20" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                            </div>
                            <div class="d-grid gap-3 grid-cols-3 mb-4">
                                <div data-setting="radio">
                                    <input type="radio" value="localStorage" class="btn-check" name="saveLocal" id="save-localstorage">
                                    <label class="btn btn-border d-block" for="save-localstorage">Local</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="sessionStorage" class="btn-check" name="saveLocal" id="save-sessionstorage">
                                    <label class="btn btn-border d-block" for="save-sessionstorage">Session</label>
                                </div>
                                <div data-setting="radio">
                                    <input type="radio" value="none" class="btn-check" name="saveLocal" id="save-none" checked="">
                                    <label class="btn btn-border d-block" for="save-none">None</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Settings sidebar end here -->
    <a class="btn btn-fixed-end btn-warning btn-icon btn-setting" id="settingbutton" data-bs-toggle="offcanvas" data-bs-target="#live-customizer" role="button" aria-controls="live-customizer">
        <svg class="icon-24 animated-rotate" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8064 7.62361L20.184 6.54352C19.6574 5.6296 18.4905 5.31432 17.5753 5.83872V5.83872C17.1397 6.09534 16.6198 6.16815 16.1305 6.04109C15.6411 5.91402 15.2224 5.59752 14.9666 5.16137C14.8021 4.88415 14.7137 4.56839 14.7103 4.24604V4.24604C14.7251 3.72922 14.5302 3.2284 14.1698 2.85767C13.8094 2.48694 13.3143 2.27786 12.7973 2.27808H11.5433C11.0367 2.27807 10.5511 2.47991 10.1938 2.83895C9.83644 3.19798 9.63693 3.68459 9.63937 4.19112V4.19112C9.62435 5.23693 8.77224 6.07681 7.72632 6.0767C7.40397 6.07336 7.08821 5.98494 6.81099 5.82041V5.82041C5.89582 5.29601 4.72887 5.61129 4.20229 6.52522L3.5341 7.62361C3.00817 8.53639 3.31916 9.70261 4.22975 10.2323V10.2323C4.82166 10.574 5.18629 11.2056 5.18629 11.8891C5.18629 12.5725 4.82166 13.2041 4.22975 13.5458V13.5458C3.32031 14.0719 3.00898 15.2353 3.5341 16.1454V16.1454L4.16568 17.2346C4.4124 17.6798 4.82636 18.0083 5.31595 18.1474C5.80554 18.2866 6.3304 18.2249 6.77438 17.976V17.976C7.21084 17.7213 7.73094 17.6516 8.2191 17.7822C8.70725 17.9128 9.12299 18.233 9.37392 18.6717C9.53845 18.9489 9.62686 19.2646 9.63021 19.587V19.587C9.63021 20.6435 10.4867 21.5 11.5433 21.5H12.7973C13.8502 21.5001 14.7053 20.6491 14.7103 19.5962V19.5962C14.7079 19.088 14.9086 18.6 15.2679 18.2407C15.6272 17.8814 16.1152 17.6807 16.6233 17.6831C16.9449 17.6917 17.2594 17.7798 17.5387 17.9394V17.9394C18.4515 18.4653 19.6177 18.1544 20.1474 17.2438V17.2438L20.8064 16.1454C21.0615 15.7075 21.1315 15.186 21.001 14.6964C20.8704 14.2067 20.55 13.7894 20.1108 13.5367V13.5367C19.6715 13.284 19.3511 12.8666 19.2206 12.3769C19.09 11.8873 19.16 11.3658 19.4151 10.928C19.581 10.6383 19.8211 10.3982 20.1108 10.2323V10.2323C21.0159 9.70289 21.3262 8.54349 20.8064 7.63277V7.63277V7.62361Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12.1747" cy="11.8891" r="2.63616" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
        </svg>
    </a>
    <div class="btn-download ">
        <a class="btn btn-success py-2 px-3 d-flex gap-2" href="https://iqonic.design/item/hope-ui-pro/item-checkout/?coupon_code=DROPBY20" target="_blank">
            <svg class="icon-22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
            </svg>
            Buy Now
        </a>
    </div>    <!-- Live Customizer end -->
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <form action="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#" autocomplete="off">
                <h3 class="text-center">Sign In</h3>
                <p class="text-center">Sign in to stay connected</p>
                <div class="form-group">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control mb-0" placeholder="Enter email" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control mb-0" placeholder="Enter password" autocomplete="off">
                </div>
                <div class="d-flex justify-content-between">
                    <div class="form-check d-inline-block mt-2 pt-1">
                        <input type="checkbox" class="form-check-input" id="customCheck11">
                        <label class="form-check-label" for="customCheck11">Remember Me</label>
                    </div>
                    <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#">Forget password</a>
                </div>
                <div class="text-center pb-3">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Sign in</button>
                </div>
                <p class="text-center">Or sign in with other accounts?</p>
                <div class="d-flex justify-content-center">
                    <ul class="list-group list-group-horizontal list-group-flush">
                    <li class="list-group-item border-0 pb-0">
                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/fb.svg" alt="fb" loading="lazy"></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/gm.svg" alt="gm" loading="lazy"></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/im.svg" alt="im" loading="lazy"></a>
                    </li>
                    <li class="list-group-item border-0 pb-0">
                        <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/li.svg" alt="li" loading="lazy"></a>
                    </li>
                    </ul>
                </div>
                <p class="text-center">Don't have account?<a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"> Click here to sign up.</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <form action="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#">
                <h3 class="text-center">Sign Up</h3>
                <p class="text-center">Create your Hope UI account</p>
                <div class="d-flex justify-content-between">
                <div class="form-group me-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control mb-0" placeholder="Enter First Name" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control mb-0" placeholder="Enter Last Name" autocomplete="off">
                </div>
                </div>
                <div class="d-flex justify-content-between">
                <div class="form-group me-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control mb-0" placeholder="Enter Email" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone No.</label>
                    <input type="tel" class="form-control mb-0" placeholder="Enter Phone Number" autocomplete="off">
                </div>
                </div>
                <div class="d-flex justify-content-between">
                <div class="form-group me-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control mb-0" placeholder="Enter Password" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" class="form-control mb-0" placeholder="Enter Confirm Password" autocomplete="off">
                </div>
                </div>
                    <div class="text-center pb-3">
                        <input type="checkbox" class="form-check-input" id="customCheck112">
                        <label class="form-check-label" for="customCheck112">I agree with the terms of use</label>
                    </div>
                <div class="text-center pb-3">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Sign in</button>
                </div>
                <p class="text-center">Or sign in with other accounts?</p>
                <div class="d-flex justify-content-center">
                    <ul class="list-group list-group-horizontal list-group-flush">
                        <li class="list-group-item border-0 pb-0">
                            <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/fb.svg" alt="fb" loading="lazy"></a>
                        </li>
                        <li class="list-group-item border-0 pb-0">
                            <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/gm.svg" alt="gm" loading="lazy"></a>
                        </li>
                        <li class="list-group-item border-0 pb-0">
                            <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/im.svg" alt="im" loading="lazy"></a>
                        </li>
                        <li class="list-group-item border-0 pb-0">
                            <a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#"><img src="./shop-main_files/li.svg" alt="li" loading="lazy"></a>
                        </li>
                    </ul>
                </div>
                <p class="text-center">Already have an Account<a href="https://templates.iqonic.design/hope-ui/pro/html/e-commerce/shop-main.html#">Sign in</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>    <!-- Library Bundle Script -->
    <script src="./shop-main_files/libs.min.js.download"></script>
    <!-- Plugin Scripts -->
    
    
    
    
    <!-- Slider-tab Script -->
    <script src="./shop-main_files/slider-tabs.js.download"></script>
    
    
    <!-- Sweet-alert Script -->
    <script src="./shop-main_files/sweetalert2.min.js.download" async=""></script>
    <script src="./shop-main_files/sweet-alert.js.download" defer=""></script>
    
    
    
    
    
    
    <!-- NoUI Slider Script -->
    <script src="./shop-main_files/nouislider.min.js.download"></script>
    
    
    
    
    
    <!-- SwiperSlider Script -->
    <script src="./shop-main_files/swiper-bundle.min.js.download"></script>
    <!-- Lodash Utility -->
    <script src="./shop-main_files/lodash.min.js.download"></script>
    <!-- Utilities Functions -->
    <script src="./shop-main_files/utility.min.js.download"></script>
    <!-- Settings Script -->
    <script src="./shop-main_files/setting.min.js.download"></script>
    <!-- Settings Init Script -->
    <script src="./shop-main_files/setting-init.js.download"></script>
    <!-- External Library Bundle Script -->
    <script src="./shop-main_files/external.min.js.download"></script>
    <!-- Widgetchart Script -->
    <script src="./shop-main_files/widgetcharts.js.download" defer=""></script>
    <!-- Dashboard Script -->
    <script src="./shop-main_files/dashboard.js.download" defer=""></script>
    <script src="./shop-main_files/alternate-dashboard.js.download" defer=""></script>
    <!-- Hopeui Script -->
    <script src="./shop-main_files/hope-ui.js.download" defer=""></script>
    <script src="./shop-main_files/hope-uipro.js.download" defer=""></script>
    <script src="./shop-main_files/sidebar.js.download" defer=""></script>    <script src="./shop-main_files/ecommerce.js.download" defer=""></script>  

<svg id="SvgjsSvg1001" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;"><defs id="SvgjsDefs1002"></defs><polyline id="SvgjsPolyline1003" points="0,0"></polyline><path id="SvgjsPath1004" d="M0 0 "></path></svg></body></html>