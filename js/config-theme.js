/* --------------------------------------------------------------------------
 * File        : config-theme.js
 * Author      : indonez
 * Author URI  : http://www.indonez.com
 *
 * Indonez Copyright 2020 All Rights Reserved.
 * -------------------------------------------------------------------------- 
 * javascript handle initialization
    1. Slideshow
    2. Counter
    3. Mobile nav button
 * -------------------------------------------------------------------------- */

    'use strict';

    const HomepageApp = {
        //----------- 1. Slideshow -----------
        theme_slideshow: function() {
            if (typeof window.CarouselConfig !== 'function') {
                return;
            }

            new CarouselConfig({
                element: '#slideshow',              // carousel element id
                fadeTransition: false,              // default is slide, use 'true' if want use fade effect
                interval: 6000,                     // interval between change slide
                control: {
                    type: 'button',                 // the options is: 'button', 'indicator' and 'both'
                    onHover: true                   // control appears when hover in careousel element
                },
                height: {                           // height for every devices
                    desktop: '700px',
                    tablet: '480px',
                    phone: '580px'
                }
            }).init();
        },
        //---------- 3. Mobile nav button -----------
        theme_mobilenav: function() {
            if (typeof window.MobileNavbar !== 'function') {
                return;
            }

            new MobileNavbar({
                addonButtons: true,                 // options to use addon buttons, set it "false" if you won't use addon buttons
                buttons: [
                    {
                        name: 'Login',              // button name
                        url: 'signin.html',         // button url
                        type: 'primary',            // button type (default, primary, secondary, danger, text)
                        icon: 'sign-in-alt'         // button icon, you can use all icons from here : https://fontawesome.com/icons?d=gallery&s=solid&m=free
                    },
                ]
            }).init();
        },
        theme_navsubmenu: function() {
            const toggles = document.querySelectorAll('.fbk-header .submenu-toggle');
            if (!toggles.length) {
                return;
            }

            const CollapseClass = window.bootstrap && window.bootstrap.Collapse ? window.bootstrap.Collapse : null;
            const submenus = [];

            const closeAll = (exceptToggle) => {
                submenus.forEach((item) => {
                    if (exceptToggle && item.toggle === exceptToggle) {
                        return;
                    }

                    if (item.collapse) {
                        item.collapse.hide();
                    } else {
                        item.target.classList.remove('show');
                        item.toggle.classList.remove('is-open');
                        item.toggle.classList.add('collapsed');
                        item.toggle.setAttribute('aria-expanded', 'false');
                    }
                });
            };

            toggles.forEach((toggle) => {
                const targetSelector = toggle.getAttribute('data-bs-target');
                if (!targetSelector) {
                    return;
                }

                const target = document.querySelector(targetSelector);
                if (!target) {
                    return;
                }

                if (CollapseClass) {
                    const collapse = CollapseClass.getOrCreateInstance(target, { toggle: false });
                    submenus.push({ toggle, target, collapse });

                    toggle.addEventListener('click', (event) => {
                        event.preventDefault();
                        const isOpen = target.classList.contains('show');
                        closeAll(toggle);
                        if (isOpen) {
                            collapse.hide();
                        } else {
                            collapse.show();
                        }
                    });

                    target.addEventListener('shown.bs.collapse', () => {
                        toggle.classList.add('is-open');
                        toggle.classList.remove('collapsed');
                        toggle.setAttribute('aria-expanded', 'true');
                    });

                    target.addEventListener('hidden.bs.collapse', () => {
                        toggle.classList.remove('is-open');
                        toggle.classList.add('collapsed');
                        toggle.setAttribute('aria-expanded', 'false');
                    });
                } else {
                    submenus.push({ toggle, target, collapse: null });
                    target.classList.remove('show');
                    toggle.classList.add('collapsed');
                    toggle.setAttribute('aria-expanded', 'false');

                    toggle.addEventListener('click', (event) => {
                        event.preventDefault();
                        const isOpen = target.classList.contains('show');
                        closeAll(toggle);
                        if (isOpen) {
                            target.classList.remove('show');
                            toggle.classList.remove('is-open');
                            toggle.classList.add('collapsed');
                            toggle.setAttribute('aria-expanded', 'false');
                        } else {
                            target.classList.add('show');
                            toggle.classList.add('is-open');
                            toggle.classList.remove('collapsed');
                            toggle.setAttribute('aria-expanded', 'true');
                        }
                    });
                }
            });

            const navCollapse = document.getElementById('primaryNav');
            if (navCollapse) {
                if (CollapseClass) {
                    navCollapse.addEventListener('hide.bs.collapse', () => {
                        closeAll();
                    });
                }

                const navToggler = document.querySelector('[data-bs-target="#primaryNav"]');
                if (navToggler) {
                    navToggler.addEventListener('click', () => {
                        if (CollapseClass) {
                            return;
                        }

                        setTimeout(() => {
                            if (!navCollapse.classList.contains('show')) {
                                closeAll();
                            }
                        }, 200);
                    });
                }
            }
        },
        theme_dropdowns: function() {
            const toggles = document.querySelectorAll('.fbk-header .dropdown-toggle:not(.submenu-toggle)');
            if (!toggles.length) {
                return;
            }

            const dropdowns = [];

            toggles.forEach((toggle) => {
                const root = toggle.closest('.dropdown');
                const menu = root ? root.querySelector('.dropdown-menu') : null;

                if (!root || !menu) {
                    return;
                }

                dropdowns.push({ toggle, root, menu });

                toggle.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('show');
                root.classList.remove('show');
            });

            if (!dropdowns.length) {
                return;
            }

            const closeAll = (except) => {
                dropdowns.forEach((item) => {
                    if (except && item === except) {
                        return;
                    }

                    item.root.classList.remove('show');
                    item.menu.classList.remove('show');
                    item.toggle.classList.remove('show');
                    item.toggle.setAttribute('aria-expanded', 'false');
                });
            };

            dropdowns.forEach((item) => {
                item.toggle.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const isOpen = item.root.classList.contains('show');

                    if (isOpen) {
                        closeAll();
                    } else {
                        closeAll(item);
                        item.root.classList.add('show');
                        item.menu.classList.add('show');
                        item.toggle.classList.add('show');
                        item.toggle.setAttribute('aria-expanded', 'true');
                    }
                });

                item.menu.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });

            document.addEventListener('click', () => closeAll());

            const navCollapse = document.getElementById('primaryNav');
            if (navCollapse) {
                if (window.bootstrap && window.bootstrap.Collapse) {
                    navCollapse.addEventListener('hide.bs.collapse', () => closeAll());
                }

                const navToggler = document.querySelector('[data-bs-target="#primaryNav"]');
                if (navToggler) {
                    navToggler.addEventListener('click', () => {
                        setTimeout(() => {
                            if (!navCollapse.classList.contains('show')) {
                                closeAll();
                            }
                        }, 200);
                    });
                }
            }
        },
        //---------- 5. Ensure About Us menu exists -----------
        theme_aboutus_menu: function() {
            const navList = document.getElementById('primaryNavList');
            if (!navList) return;
            if (document.getElementById('navAboutDesktop')) return; // already exists

            const tradingItem = navList.querySelector('.nav-item.dropdown');
            const li = document.createElement('li');
            li.className = 'nav-item dropdown';

            li.innerHTML = `
                <a class="nav-link dropdown-toggle d-none d-lg-flex align-items-center gap-1" href="#" id="navAboutDesktop" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">About Us</a>
                <button class="nav-link submenu-toggle d-lg-none d-flex align-items-center justify-content-between w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mobileAbout" aria-expanded="false" aria-controls="mobileAbout">
                    <span>About Us</span>
                    <i class="fas fa-chevron-down submenu-caret ms-2"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="navAboutDesktop">
                    <li><a class="dropdown-item d-flex align-items-center gap-2" href="who-we-are.html"><i class="fas fa-info-circle"></i><span>What is FBK Markets</span></a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-2" href="advantages.html"><i class="fas fa-thumbs-up"></i><span>Advantages of FBK Markets</span></a></li>
                </ul>
                <div class="collapse navbar-submenu d-lg-none" id="mobileAbout" data-bs-parent="#primaryNavList">
                    <a class="dropdown-item d-flex align-items-center gap-2" href="who-we-are.html"><i class="fas fa-info-circle"></i><span>What is FBK Markets</span></a>
                    <a class="dropdown-item d-flex align-items-center gap-2" href="advantages.html"><i class="fas fa-thumbs-up"></i><span>Advantages of FBK Markets</span></a>
                </div>
            `;

            if (tradingItem) {
                navList.insertBefore(li, tradingItem);
            } else {
                navList.prepend(li);
            }
        },
        //---------- 3. Tradingview widget -----------
        theme_tradingview: function() {
            if(window.hasOwnProperty('TradingviewWidget')) {
                new TradingviewWidget({
                    element: "#tradingview-widget",
                    height: 378,
                    type: "market-overview",
                    theme: "light",
                    symbol: [                       // array of instruments symbol based on Tradingview
                        {s: "FX:EURUSD"},
                        {s: "FX:GBPUSD"},
                        {s: "FX:USDJPY"},
                        {s: "FX:USDCHF"},
                        {s: "FX:AUDUSD"},
                        {s: "FX:USDCAD"}
                    ]
                }).init()
            }
        },
        //---------- 4. Step hover animations -----------
        theme_stephover: function() {
            if(document.querySelector('.in-stena-3') !== null) {
                const stepsEl = document.querySelectorAll('.invest-step')

                stepsEl[0].classList.add('active')
                stepsEl.forEach(el => {
                    el.addEventListener('mouseover', () => {
                        stepsEl[0].classList.remove('active')
                        el.classList.add('active')
                    })
                    el.addEventListener('mouseout', () => {
                        el.classList.remove('active')
                        stepsEl[0].classList.add('active')
                    })
                })
            }
        },
        //---------- 5. Counters on view -----------
        theme_counters: function() {
            const els = document.querySelectorAll('.js-counter[data-count-to]');
            if (!els.length) return;

            const animate = (el) => {
                const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
                const duration = parseInt(el.getAttribute('data-duration') || '1500', 10);
                const start = performance.now();

                const step = (ts) => {
                    const progress = Math.min(1, (ts - start) / duration);
                    const value = Math.floor(progress * target);
                    el.textContent = value.toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            };

            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        if (!el.__counted) {
                            el.__counted = true;
                            animate(el);
                        }
                    }
                });
            }, { threshold: 0.4 });

            els.forEach((el) => io.observe(el));
        },
        theme_init: function() {
            HomepageApp.theme_slideshow();
            HomepageApp.theme_mobilenav();
            HomepageApp.theme_navsubmenu();
            HomepageApp.theme_dropdowns();
            HomepageApp.theme_tradingview();
            HomepageApp.theme_stephover();
            HomepageApp.theme_counters();
            HomepageApp.theme_aboutus_menu();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        HomepageApp.theme_init();
    });
