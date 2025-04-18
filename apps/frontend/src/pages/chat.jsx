const Chat  = memo(() => {
    return (
        <>
        <div class="content-inner p-0 container-fluid" id="page_layout">
        <div class="tab-content" id="myTabContent">
            <div class="card tab-pane mb-0 fade show active" id="user-content-101" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/03.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-success"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Ellyse Perry</h5>
                            <small class="text-capitalize">Online</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, I am looking for the best dashboard template. Could you please help me to find it out?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Absolutely Yes! Hope-UI is the Responsive Bootstrap 5 Admin Dashboard Template.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Looks clean and fresh UI.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I will purchase it for sure.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Ok Cool!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This are nice pics.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Yes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/03.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ellyse Perry, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-102" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/01.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-danger"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Faf Du Plessis</h5>
                            <small class="text-capitalize">Last seen 10 min ago</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" /> 
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">How can we help? We're here for you! </p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Lorem ipsum dolor sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Howz this all images??</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice place for holiday.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Where is this place came?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This place name is devi pada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/01.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Faf Du Plessis, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Okay, I will visit this place.</p>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-103" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/04.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-danger"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Brendon McCullum</h5>
                            <small class="text-capitalize">last seen 2 min ago</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, I am looking for the best dashboard template. Could you please help me to find it out?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Absolutely Yes! Hope-UI is the Responsive Bootstrap 5 Admin Dashboard Template.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Looks clean and fresh UI.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I will purchase it for sure.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Ok Cool!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This are nice pics.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Yes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/04.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Brendon McCullum, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-104" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/06.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-danger"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Wade Johnson</h5>
                            <small class="text-capitalize">last seen 15 min ago</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, I am looking for the best dashboard template. Could you please help me to find it out?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Absolutely Yes! Hope-UI is the Responsive Bootstrap 5 Admin Dashboard Template.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Looks clean and fresh UI.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I will purchase it for sure.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Ok Cool!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" /> 
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This are nice pics.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Yes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/06.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Wade Johnson, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-105" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/05.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-success"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Arlene Cyrus</h5>
                            <small class="text-capitalize">Online</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">How can we help? We're here for you! </p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Lorem ipsum dolor sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Howz this all images??</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice place for holiday.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Where is this place came?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This place name is devi pada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/05.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Arlene Cyrus, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Okay, I will visit this place.</p>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" /> 
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-106" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/09.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-success"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Darlene Warner</h5>
                            <small class="text-capitalize">Online</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, I am looking for the best dashboard template. Could you please help me to find it out?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Absolutely Yes! Hope-UI is the Responsive Bootstrap 5 Admin Dashboard Template.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Looks clean and fresh UI.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I will purchase it for sure.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Ok Cool!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This are nice pics.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Yes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/09.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Darlene Warner, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" /> 
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-107" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/11.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-danger"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Jenny Wilson</h5>
                            <small class="text-capitalize">last seen 1hr ago</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">How can we help? We're here for you! </p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Lorem ipsum dolor sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" /> 
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Howz this all images??</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice place for holiday.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Where is this place came?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This place name is devi pada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/11.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Jenny Wilson, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Okay, I will visit this place.</p>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-108" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/12.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-success"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Devon Lane</h5>
                            <small class="text-capitalize">Online</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">How can we help? We're here for you! </p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Lorem ipsum dolor sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Howz this all images??</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice place for holiday.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Where is this place came?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This place name is devi pada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/12.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Devon Lane, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Okay, I will visit this place.</p>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-109" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/08.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-danger"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Christopher</h5>
                            <small class="text-capitalize">Last seen 29 Jan,2021</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, I am looking for the best dashboard template. Could you please help me to find it out?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Absolutely Yes! Hope-UI is the Responsive Bootstrap 5 Admin Dashboard Template.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Looks clean and fresh UI.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I will purchase it for sure.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Ok Cool!!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This are nice pics.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Yes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/08.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Christopher, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
            <div class="card tab-pane mb-0 fade" id="user-content-110" role="tabpanel">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center rounded-0 p-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="d-block d-xl-none">
                            <button class="btn btn-sm btn-primary rounded-pill btn-icon" data-toggle="sidebar" data-active="true">
                                <span class="btn-inner">
                                    <svg width="20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="position-relative">
                            <img src="../chat/assets/images/avatar/07.png" alt="users" class="img-fluid avatar-50 rounded-pill" loading="lazy" />
                
                            <div class="iq-profile-badge  bg-success"></div>
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="mb-0">Rachel Green</h5>
                            <small class="text-capitalize">Online</small>
                        </div>
                    </div>
                    <div class="dropdown d-inline-flex ms-auto">
                        <span class="text-body d-inline-flex" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg class="icon-24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20.6788C10 21.9595 11.0378 23 12.3113 23C13.5868 23 14.6265 21.9595 14.6265 20.6788C14.6265 19.3981 13.5868 18.3576 12.3113 18.3576C11.0378 18.3576 10 19.3981 10 20.6788ZM10 12.0005C10 13.2812 11.0378 14.3217 12.3113 14.3217C13.5868 14.3217 14.6265 13.2812 14.6265 12.0005C14.6265 10.7198 13.5868 9.67929 12.3113 9.67929C11.0378 9.67929 10 10.7198 10 12.0005ZM12.3113 5.64239C11.0378 5.64239 10 4.60192 10 3.3212C10 2.04047 11.0378 1 12.3113 1C13.5868 1 14.6265 2.04047 14.6265 3.3212C14.6265 4.60192 13.5868 5.64239 12.3113 5.64239Z" fill="#8A92A6"></path>
                            </svg>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.3309 7.44251C20.9119 7.17855 20.3969 7.1552 19.9579 7.37855L18.4759 8.12677C17.9279 8.40291 17.5879 8.96129 17.5879 9.58261V15.4161C17.5879 16.0374 17.9279 16.5948 18.4759 16.873L19.9569 17.6202C20.1579 17.7237 20.3729 17.7735 20.5879 17.7735C20.8459 17.7735 21.1019 17.7004 21.3309 17.5572C21.7499 17.2943 21.9999 16.8384 21.9999 16.339V8.66179C21.9999 8.1623 21.7499 7.70646 21.3309 7.44251Z" fill="currentColor"></path>
                                            <path d="M11.9051 20H6.11304C3.69102 20 2 18.3299 2 15.9391V9.06091C2 6.66904 3.69102 5 6.11304 5H11.9051C14.3271 5 16.0181 6.66904 16.0181 9.06091V15.9391C16.0181 18.3299 14.3271 20 11.9051 20Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Video Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor"></path>
                                            <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Voice Calling
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex gap-2" href="#" data-bs-toggle="modal" data-bs-target="#add-group-modal">
                                    <span class="d-flex align-items-center">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M12.02 2C6.21 2 2 6.74 2 12C2 13.68 2.49 15.41 3.35 16.99C3.51 17.25 3.53 17.58 3.42 17.89L2.75 20.13C2.6 20.67 3.06 21.07 3.57 20.91L5.59 20.31C6.14 20.13 6.57 20.36 7.081 20.67C8.541 21.53 10.36 21.97 12 21.97C16.96 21.97 22 18.14 22 11.97C22 6.65 17.7 2 12.02 2Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9807 13.2901C11.2707 13.2801 10.7007 12.7101 10.7007 12.0001C10.7007 11.3001 11.2807 10.7201 11.9807 10.7301C12.6907 10.7301 13.2607 11.3001 13.2607 12.0101C13.2607 12.7101 12.6907 13.2901 11.9807 13.2901ZM7.37033 13.2901C6.67033 13.2901 6.09033 12.7101 6.09033 12.0101C6.09033 11.3001 6.66033 10.7301 7.37033 10.7301C8.08033 10.7301 8.65033 11.3001 8.65033 12.0101C8.65033 12.7101 8.08033 13.2801 7.37033 13.2901ZM15.3105 12.0101C15.3105 12.7101 15.8805 13.2901 16.5905 13.2901C17.3005 13.2901 17.8705 12.7101 17.8705 12.0101C17.8705 11.3001 17.3005 10.7301 16.5905 10.7301C15.8805 10.7301 15.3105 11.3001 15.3105 12.0101Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    Add to Group
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>        <div class="card-body chat-body bg-body">
                    <div class="chat-day-title">
                        <span class="main-title">Feb 1,2021</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:34</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Hey, how are you??</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">I want some teachnic for fast code can you help?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 16:40</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">How can we help? We're here for you! </p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 16:42</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Lorem ipsum dolor sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 17:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="d-grid iq-group-image gap-3">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/01.png">
                                                <img src="../chat/assets/images/01.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/02.png">
                                                <img src="../chat/assets/images/02.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/03.png">
                                                <img src="../chat/assets/images/03.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                            <a data-fslightbox="gallery" href="../chat/assets/images/04.png">
                                                <img src="../chat/assets/images/04.png" class="avatar-130 rounded" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 17:01</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Howz this all images??</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 17:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-day-title">
                        <span class="main-title">Today</span>
                    </div>
                    <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 08:00</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center  iq-image ">
                                    <p class="mr-2 mb-0"></p>
                                        <div class="">
                                            <a data-fslightbox="gallery" href="../chat/assets/images/05.png">
                                                <img src="../chat/assets/images/05.png" class="rounded iq-single-image" alt="chat-user" loading="lazy" />
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 12:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Nice place for holiday.</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 12:05</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Where is this place came?</p>
                                </div>
                            </div>
                        </div>
                    </div>            <div class="iq-message-body iq-current-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/02.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Ross Taylor, 13:10</small>
                            <div class="d-flex align-items-center justify-content-end">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">This place name is devi pada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="iq-message-body iq-other-user">
                        <div class="chat-profile">
                            <img src="../chat/assets/images/avatar/07.png" alt="chat-user" class="avatar-40 rounded-pill" loading="lazy" />
                        </div>
                        <div class="iq-chat-text">
                            <small class="iq-chating p-0">Rachel Green, 15:00</small>
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="iq-chating-content d-flex align-items-center ">
                                    <p class="mr-2 mb-0">Okay, I will visit this place.</p>
                                </div>
                            </div>
                        </div>
                    </div>        </div>
                <div class="card-footer px-3 py-3 border-top rounded-0">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control chat-input" placeholder="Write a message" aria-label="Recipient's username" />
                            <span class="input-group-text mgs-icon emoji-icon">
                                <svg class="icon-24" width="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_156_599)">
                                        <path d="M20.4853 4.01473C18.2188 1.74823 15.2053 0.5 12 0.5C8.79469 0.5 5.78119 1.74823 3.51473 4.01473C1.24819 6.28119 0 9.29469 0 12.5C0 15.7053 1.24819 18.7188 3.51473 20.9853C5.78119 23.2518 8.79469 24.5 12 24.5C15.2053 24.5 18.2188 23.2518 20.4853 20.9853C22.7518 18.7188 24 15.7053 24 12.5C24 9.29469 22.7518 6.28119 20.4853 4.01473ZM12 23.0714C6.17091 23.0714 1.42856 18.3291 1.42856 12.5C1.42856 6.67091 6.17091 1.92856 12 1.92856C17.8291 1.92856 22.5714 6.67091 22.5714 12.5C22.5714 18.3291 17.8291 23.0714 12 23.0714Z" fill="currentcolor"></path>
                                        <path d="M9.40398 9.3309C8.23431 8.16114 6.33104 8.16123 5.16136 9.3309C4.88241 9.60981 4.88241 10.0621 5.16136 10.3411C5.44036 10.62 5.89266 10.62 6.17157 10.3411C6.78432 9.72836 7.78126 9.7284 8.39392 10.3411C8.53342 10.4806 8.71618 10.5503 8.89895 10.5503C9.08171 10.5503 9.26457 10.4806 9.40398 10.3411C9.68293 10.0621 9.68293 9.60986 9.40398 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.8384 9.3309C17.6688 8.16123 15.7655 8.16114 14.5958 9.3309C14.3169 9.60981 14.3169 10.0621 14.5958 10.3411C14.8748 10.62 15.3271 10.62 15.606 10.3411C16.2187 9.72836 17.2156 9.72831 17.8284 10.3411C17.9679 10.4806 18.1506 10.5503 18.3334 10.5503C18.5162 10.5503 18.699 10.4806 18.8384 10.3411C19.1174 10.0621 19.1174 9.60986 18.8384 9.3309Z" fill="currentcolor"></path>
                                        <path d="M18.3335 13.024H5.6668C5.2723 13.024 4.95251 13.3438 4.95251 13.7383C4.95251 17.6243 8.11409 20.7859 12.0001 20.7859C15.8862 20.7859 19.0477 17.6243 19.0477 13.7383C19.0477 13.3438 18.728 13.024 18.3335 13.024ZM12.0001 19.3573C9.14366 19.3573 6.77816 17.215 6.42626 14.4525H17.574C17.2221 17.215 14.8566 19.3573 12.0001 19.3573Z" fill="currentcolor"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon attachment-icon">
                                <svg class="icon-20" width="19" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.15518 17.0987L13.1405 8.64034C13.66 8.09001 13.66 7.19775 13.1405 6.64743C12.6209 6.0971 11.7785 6.0971 11.259 6.64742L1.77933 16.6887C0.740224 17.7893 0.740225 19.5738 1.77933 20.6745C2.81843 21.7752 4.50314 21.7752 5.54225 20.6745L16.831 8.717C18.3897 7.06601 18.3897 4.38923 16.831 2.73824C15.2724 1.08725 12.7453 1.08725 11.1866 2.73824L3.55224 10.8249" stroke="currentcolor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon voice-icon">
                                <svg class="icon-24" width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00021 21.5V18.3391" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00021 14.3481V14.3481C6.75611 14.3481 4.9384 12.5218 4.9384 10.2682V5.58095C4.9384 3.32732 6.75611 1.5 9.00021 1.5C11.2433 1.5 13.061 3.32732 13.061 5.58095V10.2682C13.061 12.5218 11.2433 14.3481 9.00021 14.3481Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17 10.3006C17 14.7394 13.418 18.3383 9 18.3383C4.58093 18.3383 1 14.7394 1 10.3006" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M11.0689 6.25579H13.0585" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M10.0704 9.59344H13.0605" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <span class="input-group-text mgs-icon send-icon">
                                <svg class="icon-24" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>    </div>
        </div>
        </div>
        </>
        );
}) 
export default Chat