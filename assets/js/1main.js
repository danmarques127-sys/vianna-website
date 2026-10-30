"use strict";

/* ============================================================
   VIANNA COMMERCIAL SERVICES
   INDEX PAGE
   HEADER + MOBILE MENU + HERO CAROUSEL
============================================================ */


/* ============================================================
   1. APPLICATION INITIALIZATION
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeHeader();
    initializeHeroCarousel();
});


/* ============================================================
   2. FIXED HEADER AND MOBILE NAVIGATION
============================================================ */

function initializeHeader() {
    const siteHeader =
        document.getElementById(
            "site-header"
        );

    const menuToggle =
        document.getElementById(
            "menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    /*
        Stop this module safely if any required
        element is missing from the document.
    */
    if (
        !siteHeader ||
        !menuToggle ||
        !mobileMenu
    ) {
        return;
    }


    const mobileMenuPanel =
        mobileMenu.querySelector(
            ".mobile-menu-panel"
        );


    const menuCloseElements =
        mobileMenu.querySelectorAll(
            "[data-menu-close]"
        );


    const mobileNavigationLinks =
        mobileMenu.querySelectorAll(
            [
                ".mobile-navigation-link",
                ".mobile-menu-cta"
            ].join(",")
        );


    const desktopBreakpoint = 1020;


    let isMenuOpen = false;

    let isScrollFrameRequested = false;

    let lastFocusedElement = null;


    /* ========================================================
       2.1 UPDATE HEADER AFTER SCROLL
    ======================================================== */

    const updateHeaderScrollState = () => {
        const shouldUseScrolledStyle =
            window.scrollY > 18;


        siteHeader.classList.toggle(
            "is-scrolled",
            shouldUseScrolledStyle
        );


        isScrollFrameRequested = false;
    };


    const handleWindowScroll = () => {
        if (isScrollFrameRequested) {
            return;
        }


        isScrollFrameRequested = true;


        window.requestAnimationFrame(
            updateHeaderScrollState
        );
    };


    /* ========================================================
       2.2 GET FOCUSABLE MOBILE MENU ELEMENTS
    ======================================================== */

    const getFocusableMenuElements = () => {
        const selector = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "textarea:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");


        return Array.from(
            mobileMenu.querySelectorAll(
                selector
            )
        ).filter((element) => {
            return (
                element.offsetWidth > 0 ||
                element.offsetHeight > 0 ||
                element === document.activeElement
            );
        });
    };


    /* ========================================================
       2.3 OPEN MOBILE MENU
    ======================================================== */

    const openMobileMenu = () => {
        if (isMenuOpen) {
            return;
        }


        isMenuOpen = true;


        lastFocusedElement =
            document.activeElement;


        document.body.classList.add(
            "menu-open"
        );


        siteHeader.classList.add(
            "menu-active"
        );


        menuToggle.classList.add(
            "is-active"
        );


        mobileMenu.classList.add(
            "is-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        window.setTimeout(() => {
            const focusableElements =
                getFocusableMenuElements();


            if (focusableElements.length > 0) {
                focusableElements[0].focus();

                return;
            }


            if (mobileMenuPanel) {
                mobileMenuPanel.focus();
            }
        }, 120);
    };


    /* ========================================================
       2.4 CLOSE MOBILE MENU
    ======================================================== */

    const closeMobileMenu = ({
        restoreFocus = true
    } = {}) => {
        if (!isMenuOpen) {
            return;
        }


        isMenuOpen = false;


        document.body.classList.remove(
            "menu-open"
        );


        siteHeader.classList.remove(
            "menu-active"
        );


        menuToggle.classList.remove(
            "is-active"
        );


        mobileMenu.classList.remove(
            "is-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            restoreFocus &&
            lastFocusedElement instanceof HTMLElement
        ) {
            lastFocusedElement.focus();
        }


        lastFocusedElement = null;


        updateHeaderScrollState();
    };


    /* ========================================================
       2.5 KEEP KEYBOARD FOCUS INSIDE MOBILE MENU
    ======================================================== */

    const trapFocusInsideMobileMenu = (
        event
    ) => {
        if (
            !isMenuOpen ||
            event.key !== "Tab"
        ) {
            return;
        }


        const focusableElements =
            getFocusableMenuElements();


        if (focusableElements.length === 0) {
            event.preventDefault();


            if (mobileMenuPanel) {
                mobileMenuPanel.focus();
            }


            return;
        }


        const firstFocusableElement =
            focusableElements[0];


        const lastFocusableElement =
            focusableElements[
                focusableElements.length - 1
            ];


        if (
            event.shiftKey &&
            document.activeElement ===
            firstFocusableElement
        ) {
            event.preventDefault();

            lastFocusableElement.focus();

            return;
        }


        if (
            !event.shiftKey &&
            document.activeElement ===
            lastFocusableElement
        ) {
            event.preventDefault();

            firstFocusableElement.focus();
        }
    };


    /* ========================================================
       2.6 HEADER EVENT LISTENERS
    ======================================================== */

    menuToggle.addEventListener(
        "click",
        () => {
            if (isMenuOpen) {
                closeMobileMenu();

                return;
            }


            openMobileMenu();
        }
    );


    menuCloseElements.forEach(
        (element) => {
            element.addEventListener(
                "click",
                () => {
                    closeMobileMenu();
                }
            );
        }
    );


    mobileNavigationLinks.forEach(
        (link) => {
            link.addEventListener(
                "click",
                () => {
                    closeMobileMenu({
                        restoreFocus: false
                    });
                }
            );
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                isMenuOpen
            ) {
                closeMobileMenu();

                return;
            }


            trapFocusInsideMobileMenu(
                event
            );
        }
    );


    window.addEventListener(
        "scroll",
        handleWindowScroll,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        () => {
            if (
                window.innerWidth >
                desktopBreakpoint &&
                isMenuOpen
            ) {
                closeMobileMenu({
                    restoreFocus: false
                });
            }
        }
    );


    updateHeaderScrollState();
}


/* ============================================================
   3. HERO IMAGE CAROUSEL
============================================================ */

function initializeHeroCarousel() {
    const carousel =
        document.querySelector(
            "[data-hero-carousel]"
        );


    if (!carousel) {
        return;
    }


    const slides =
        Array.from(
            carousel.querySelectorAll(
                "[data-hero-slide]"
            )
        );


    const dots =
        Array.from(
            carousel.querySelectorAll(
                "[data-hero-dot]"
            )
        );


    const carouselControls =
        carousel.querySelector(
            ".hero-carousel-ui"
        );


    const statusElement =
        document.getElementById(
            "hero-carousel-status"
        );


    /*
        The carousel requires at least one slide and one dot.
    */
    if (
        slides.length === 0 ||
        dots.length === 0
    ) {
        return;
    }


    /*
        Both collections must represent the same number
        of carousel items.
    */
    const totalItems =
        Math.min(
            slides.length,
            dots.length
        );


    /* ========================================================
       3.1 CAROUSEL CONFIGURATION
    ======================================================== */

    const autoplayDuration = 6500;

    const swipeThreshold = 48;


    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    let activeIndex = 0;

    let animationFrameId = null;

    let cycleStartTime = null;

    let elapsedCycleTime = 0;

    let isInteractionPaused = false;

    let pointerStartX = null;

    let pointerStartY = null;


    /* ========================================================
       3.2 GENERAL HELPERS
    ======================================================== */

    const normalizeIndex = (index) => {
        return (
            index + totalItems
        ) % totalItems;
    };


    const getSlideLabel = (index) => {
        return (
            slides[index]?.dataset.slideLabel ||
            `Hero image ${index + 1}`
        );
    };


    /* ========================================================
       3.3 PROGRESS INDICATOR HELPERS
    ======================================================== */

    const setDotProgress = (
        index,
        progressRatio
    ) => {
        const dot = dots[index];


        if (!dot) {
            return;
        }


        const safeRatio =
            Math.min(
                Math.max(progressRatio, 0),
                1
            );


        const degrees =
            safeRatio * 360;


        dot.style.setProperty(
            "--carousel-progress",
            `${degrees}deg`
        );
    };


    const resetAllDotProgress = () => {
        dots.forEach(
            (dot, index) => {
                setDotProgress(
                    index,
                    0
                );
            }
        );
    };


    /* ========================================================
       3.4 AUTOPLAY CONDITIONS
    ======================================================== */

    const canAutoplay = () => {
        return (
            totalItems > 1 &&
            !isInteractionPaused &&
            !document.hidden &&
            !reducedMotionQuery.matches
        );
    };


    const cancelProgressAnimation = () => {
        if (animationFrameId === null) {
            return;
        }


        window.cancelAnimationFrame(
            animationFrameId
        );


        animationFrameId = null;
    };


    /* ========================================================
       3.5 UPDATE SLIDES, DOTS AND ACCESSIBILITY
    ======================================================== */

    const updateCarouselState = ({
        announce = true
    } = {}) => {
        slides.forEach(
            (slide, index) => {
                const isActive =
                    index === activeIndex;


                slide.classList.toggle(
                    "is-active",
                    isActive
                );


                slide.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );
            }
        );


        dots.forEach(
            (dot, index) => {
                const isActive =
                    index === activeIndex;


                dot.classList.toggle(
                    "is-active",
                    isActive
                );


                dot.setAttribute(
                    "aria-current",
                    String(isActive)
                );


                /*
                    Ensure every dot remains clickable,
                    including the fifth dot.
                */
                dot.disabled = false;


                dot.removeAttribute(
                    "aria-disabled"
                );
            }
        );


        resetAllDotProgress();


        /*
            Reduced-motion users do not receive autoplay.
            The active dot remains filled to identify it.
        */
        if (reducedMotionQuery.matches) {
            setDotProgress(
                activeIndex,
                1
            );
        }


        if (
            announce &&
            statusElement
        ) {
            statusElement.textContent =
                `Showing image ${activeIndex + 1} ` +
                `of ${totalItems}: ` +
                `${getSlideLabel(activeIndex)}.`;
        }
    };


    /* ========================================================
       3.6 CHANGE CURRENT SLIDE
    ======================================================== */

    const goToSlide = (
        requestedIndex,
        {
            announce = true,
            restartCycle = true
        } = {}
    ) => {
        const nextIndex =
            normalizeIndex(
                requestedIndex
            );


        activeIndex =
            nextIndex;


        elapsedCycleTime = 0;

        cycleStartTime = null;


        updateCarouselState({
            announce
        });


        if (restartCycle) {
            startAutoplayCycle({
                preserveElapsedTime: false
            });
        }
    };


    const showNextSlide = ({
        announce = false
    } = {}) => {
        goToSlide(
            activeIndex + 1,
            {
                announce,
                restartCycle: true
            }
        );
    };


    const showPreviousSlide = ({
        announce = true
    } = {}) => {
        goToSlide(
            activeIndex - 1,
            {
                announce,
                restartCycle: true
            }
        );
    };


    /* ========================================================
       3.7 ANIMATED PIE-STYLE PROGRESS
    ======================================================== */

    const runProgressFrame = (
        currentTimestamp
    ) => {
        if (!canAutoplay()) {
            animationFrameId = null;

            return;
        }


        if (cycleStartTime === null) {
            cycleStartTime =
                currentTimestamp -
                elapsedCycleTime;
        }


        elapsedCycleTime =
            currentTimestamp -
            cycleStartTime;


        const progressRatio =
            elapsedCycleTime /
            autoplayDuration;


        setDotProgress(
            activeIndex,
            progressRatio
        );


        if (progressRatio >= 1) {
            elapsedCycleTime = 0;

            cycleStartTime = null;


            showNextSlide({
                announce: false
            });


            return;
        }


        animationFrameId =
            window.requestAnimationFrame(
                runProgressFrame
            );
    };


    function startAutoplayCycle({
        preserveElapsedTime = false
    } = {}) {
        cancelProgressAnimation();


        if (!preserveElapsedTime) {
            elapsedCycleTime = 0;

            cycleStartTime = null;


            setDotProgress(
                activeIndex,
                0
            );
        }


        if (!canAutoplay()) {
            return;
        }


        animationFrameId =
            window.requestAnimationFrame(
                runProgressFrame
            );
    }


    const pauseAutoplayCycle = () => {
        if (cycleStartTime !== null) {
            elapsedCycleTime =
                Math.min(
                    performance.now() -
                    cycleStartTime,
                    autoplayDuration
                );
        }


        cycleStartTime = null;


        cancelProgressAnimation();
    };


    const resumeAutoplayCycle = () => {
        if (!canAutoplay()) {
            return;
        }


        startAutoplayCycle({
            preserveElapsedTime: true
        });
    };


    /* ========================================================
       3.8 DOT CLICK EVENTS
    ======================================================== */

    dots.forEach(
        (dot, index) => {
            /*
                Ignore any accidental extra dot that does not
                have a matching background slide.
            */
            if (index >= totalItems) {
                dot.hidden = true;

                return;
            }


            dot.disabled = false;


            dot.removeAttribute(
                "aria-disabled"
            );


            dot.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();


                    goToSlide(
                        index,
                        {
                            announce: true,
                            restartCycle: true
                        }
                    );
                }
            );
        }
    );


    /* ========================================================
       3.9 PAUSE WHILE USER INTERACTS WITH DOTS
    ======================================================== */

    if (carouselControls) {
        carouselControls.addEventListener(
            "mouseenter",
            () => {
                isInteractionPaused = true;


                pauseAutoplayCycle();
            }
        );


        carouselControls.addEventListener(
            "mouseleave",
            () => {
                isInteractionPaused = false;


                resumeAutoplayCycle();
            }
        );


        carouselControls.addEventListener(
            "focusin",
            () => {
                isInteractionPaused = true;


                pauseAutoplayCycle();
            }
        );


        carouselControls.addEventListener(
            "focusout",
            (event) => {
                const nextFocusedElement =
                    event.relatedTarget;


                if (
                    nextFocusedElement instanceof Node &&
                    carouselControls.contains(
                        nextFocusedElement
                    )
                ) {
                    return;
                }


                isInteractionPaused = false;


                resumeAutoplayCycle();
            }
        );
    }


    /* ========================================================
       3.10 KEYBOARD NAVIGATION
    ======================================================== */

    carousel.addEventListener(
        "keydown",
        (event) => {
            const control =
                event.target.closest(
                    "[data-hero-dot]"
                );


            if (!control) {
                return;
            }


            if (
                event.key ===
                "ArrowRight"
            ) {
                event.preventDefault();


                showNextSlide({
                    announce: true
                });


                dots[activeIndex]?.focus();
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {
                event.preventDefault();


                showPreviousSlide({
                    announce: true
                });


                dots[activeIndex]?.focus();
            }


            if (
                event.key ===
                "Home"
            ) {
                event.preventDefault();


                goToSlide(
                    0,
                    {
                        announce: true,
                        restartCycle: true
                    }
                );


                dots[0]?.focus();
            }


            if (
                event.key ===
                "End"
            ) {
                event.preventDefault();


                goToSlide(
                    totalItems - 1,
                    {
                        announce: true,
                        restartCycle: true
                    }
                );


                dots[
                    totalItems - 1
                ]?.focus();
            }
        }
    );


    /* ========================================================
       3.11 TOUCH AND PEN SWIPE SUPPORT
    ======================================================== */

    carousel.addEventListener(
        "pointerdown",
        (event) => {
            /*
                Mouse dragging is ignored.
                Swipe is intended for touch and pen.
            */
            if (
                event.pointerType ===
                "mouse"
            ) {
                return;
            }


            pointerStartX =
                event.clientX;


            pointerStartY =
                event.clientY;
        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "pointerup",
        (event) => {
            if (
                pointerStartX === null ||
                pointerStartY === null
            ) {
                return;
            }


            const horizontalDistance =
                event.clientX -
                pointerStartX;


            const verticalDistance =
                event.clientY -
                pointerStartY;


            pointerStartX = null;

            pointerStartY = null;


            const isHorizontalGesture =
                Math.abs(horizontalDistance) >
                Math.abs(verticalDistance);


            const passedSwipeThreshold =
                Math.abs(horizontalDistance) >=
                swipeThreshold;


            if (
                !isHorizontalGesture ||
                !passedSwipeThreshold
            ) {
                return;
            }


            if (horizontalDistance < 0) {
                showNextSlide({
                    announce: true
                });


                return;
            }


            showPreviousSlide({
                announce: true
            });
        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "pointercancel",
        () => {
            pointerStartX = null;

            pointerStartY = null;
        }
    );


    /* ========================================================
       3.12 PAGE VISIBILITY HANDLING
    ======================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                pauseAutoplayCycle();

                return;
            }


            resumeAutoplayCycle();
        }
    );


    /* ========================================================
       3.13 REDUCED MOTION CHANGES
    ======================================================== */

    const handleReducedMotionChange = () => {
        cancelProgressAnimation();


        if (reducedMotionQuery.matches) {
            resetAllDotProgress();


            setDotProgress(
                activeIndex,
                1
            );


            return;
        }


        elapsedCycleTime = 0;

        cycleStartTime = null;


        resetAllDotProgress();


        startAutoplayCycle({
            preserveElapsedTime: false
        });
    };


    if (
        typeof
        reducedMotionQuery.addEventListener ===
        "function"
    ) {
        reducedMotionQuery.addEventListener(
            "change",
            handleReducedMotionChange
        );
    } else if (
        typeof
        reducedMotionQuery.addListener ===
        "function"
    ) {
        /*
            Compatibility fallback for older Safari.
        */
        reducedMotionQuery.addListener(
            handleReducedMotionChange
        );
    }


    /* ========================================================
       3.14 IMAGE ERROR HANDLING
    ======================================================== */

    slides.forEach(
        (slide, index) => {
            const image =
                slide.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            const handleImageError = () => {
                /*
                    Keep the slide and its dot available.

                    Previously the corresponding dot was disabled,
                    which caused the fifth dot to stop working when
                    its image path was incorrect.
                */
                slide.classList.add(
                    "has-image-error"
                );


                if (dots[index]) {
                    dots[index].disabled = false;


                    dots[index].removeAttribute(
                        "aria-disabled"
                    );


                    dots[index].setAttribute(
                        "title",
                        "Image unavailable — check the image file path"
                    );
                }
            };


            image.addEventListener(
                "error",
                handleImageError
            );


            /*
                Detect an image that had already failed before
                DOMContentLoaded finished.
            */
            if (
                image.complete &&
                image.naturalWidth === 0
            ) {
                handleImageError();
            }
        }
    );


    /* ========================================================
       3.15 PRELOAD REMAINING HERO IMAGES
    ======================================================== */

    const preloadRemainingImages = () => {
        slides
            .slice(1, totalItems)
            .forEach((slide) => {
                const image =
                    slide.querySelector(
                        "img"
                    );


                if (!image) {
                    return;
                }


                const source =
                    image.currentSrc ||
                    image.src;


                if (!source) {
                    return;
                }


                const preloadImage =
                    new Image();


                preloadImage.decoding =
                    "async";


                preloadImage.src =
                    source;
            });
    };


    /* ========================================================
       3.16 INITIAL CAROUSEL STATE
    ======================================================== */

    slides.forEach(
        (slide, index) => {
            slide.setAttribute(
                "aria-hidden",
                String(
                    index !== activeIndex
                )
            );
        }
    );


    dots.forEach(
        (dot) => {
            dot.disabled = false;


            dot.removeAttribute(
                "aria-disabled"
            );
        }
    );


    updateCarouselState({
        announce: false
    });


    preloadRemainingImages();


    startAutoplayCycle({
        preserveElapsedTime: false
    });
}