"use strict";

/* ============================================================
   VIANNA COMMERCIAL SERVICES
   SERVICES PAGE INTERACTIONS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeServiceExplorer();
    initializeMobileCarousels();
    initializeScrollReveals();
});


/* ============================================================
   SERVICE TRACK EXPLORER
============================================================ */

function initializeServiceExplorer() {

    const explorer =
        document.querySelector(
            "[data-service-explorer]"
        );


    if (!explorer) {
        return;
    }


    const tabs =
        Array.from(
            explorer.querySelectorAll(
                "[data-service-tab]"
            )
        );


    const panels =
        Array.from(
            explorer.querySelectorAll(
                "[data-service-panel]"
            )
        );


    if (
        !tabs.length ||
        !panels.length
    ) {
        return;
    }


    /* ========================================================
       ACTIVATE CATEGORY
    ======================================================== */

    const activate = (
        key,
        {
            focus = false
        } = {}
    ) => {

        tabs.forEach(
            (tab) => {

                const active =
                    tab.dataset.serviceTab ===
                    key;


                tab.classList.toggle(
                    "is-active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    String(active)
                );


                tab.tabIndex =
                    active
                        ? 0
                        : -1;


                if (
                    active &&
                    focus
                ) {
                    tab.focus();
                }

            }
        );


        panels.forEach(
            (panel) => {

                const active =
                    panel.dataset.servicePanel ===
                    key;


                panel.classList.toggle(
                    "is-active",
                    active
                );


                panel.hidden =
                    !active;

            }
        );

    };


    /* ========================================================
       TAB EVENTS
    ======================================================== */

    tabs.forEach(
        (
            tab,
            index
        ) => {

            /* CLICK */

            tab.addEventListener(
                "click",
                () => {

                    activate(
                        tab.dataset.serviceTab
                    );

                }
            );


            /* KEYBOARD */

            tab.addEventListener(
                "keydown",
                (event) => {

                    if (
                        ![
                            "ArrowLeft",
                            "ArrowRight",
                            "Home",
                            "End"
                        ].includes(
                            event.key
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();


                    let nextIndex =
                        index;


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        nextIndex =
                            (
                                index -
                                1 +
                                tabs.length
                            ) %
                            tabs.length;

                    }


                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        nextIndex =
                            (
                                index +
                                1
                            ) %
                            tabs.length;

                    }


                    if (
                        event.key ===
                        "Home"
                    ) {

                        nextIndex = 0;

                    }


                    if (
                        event.key ===
                        "End"
                    ) {

                        nextIndex =
                            tabs.length - 1;

                    }


                    activate(
                        tabs[
                            nextIndex
                        ].dataset.serviceTab,
                        {
                            focus: true
                        }
                    );


                    tabs[
                        nextIndex
                    ].scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "nearest",

                        inline:
                            "center"

                    });

                }
            );

        }
    );


    /* ========================================================
       INITIAL ACTIVE CATEGORY
    ======================================================== */

    const initial =
        tabs.find(
            (tab) => {
                return tab.classList.contains(
                    "is-active"
                );
            }
        ) ||
        tabs[0];


    activate(
        initial.dataset.serviceTab
    );
}


/* ============================================================
   MOBILE CARD CAROUSELS

   ONE FULL CARD AT A TIME
   CENTERED
============================================================ */

function initializeMobileCarousels() {

    const carousels =
        document.querySelectorAll(
            "[data-mobile-carousel]"
        );


    const mobileQuery =
        window.matchMedia(
            "(max-width: 640px)"
        );


    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    carousels.forEach(
        (carousel) => {

            const track =
                carousel.querySelector(
                    "[data-carousel-track]"
                );


            const items =
                Array.from(
                    carousel.querySelectorAll(
                        "[data-carousel-item]"
                    )
                );


            const previousButton =
                carousel.querySelector(
                    "[data-carousel-prev]"
                );


            const nextButton =
                carousel.querySelector(
                    "[data-carousel-next]"
                );


            const currentElement =
                carousel.querySelector(
                    "[data-carousel-current]"
                );


            const totalElement =
                carousel.querySelector(
                    "[data-carousel-total]"
                );


            if (
                !track ||
                !items.length
            ) {
                return;
            }


            let activeIndex = 0;

            let frameRequested =
                false;


            /* =================================================
               TOTAL COUNTER
            ================================================= */

            if (totalElement) {

                totalElement.textContent =
                    String(
                        items.length
                    ).padStart(
                        2,
                        "0"
                    );

            }


            /* =================================================
               UPDATE CONTROLS
            ================================================= */

            const updateControls =
                () => {

                    if (
                        currentElement
                    ) {

                        currentElement.textContent =
                            String(
                                activeIndex +
                                1
                            ).padStart(
                                2,
                                "0"
                            );

                    }


                    if (
                        previousButton
                    ) {

                        previousButton.disabled =
                            activeIndex === 0;

                    }


                    if (
                        nextButton
                    ) {

                        nextButton.disabled =
                            activeIndex ===
                            items.length - 1;

                    }


                    items.forEach(
                        (
                            item,
                            index
                        ) => {

                            item.setAttribute(
                                "aria-current",
                                String(
                                    index ===
                                    activeIndex
                                )
                            );

                        }
                    );

                };


            /* =================================================
               FIND CENTERED CARD
            ================================================= */

            const getCenteredIndex =
                () => {

                    const trackRect =
                        track.getBoundingClientRect();


                    const trackCenter =
                        trackRect.left +
                        (
                            trackRect.width /
                            2
                        );


                    let closestIndex =
                        0;


                    let closestDistance =
                        Infinity;


                    items.forEach(
                        (
                            item,
                            index
                        ) => {

                            const rect =
                                item.getBoundingClientRect();


                            const center =
                                rect.left +
                                (
                                    rect.width /
                                    2
                                );


                            const distance =
                                Math.abs(
                                    center -
                                    trackCenter
                                );


                            if (
                                distance <
                                closestDistance
                            ) {

                                closestDistance =
                                    distance;


                                closestIndex =
                                    index;

                            }

                        }
                    );


                    return closestIndex;

                };


            /* =================================================
               SYNC ACTIVE INDEX
            ================================================= */

            const syncIndex =
                () => {

                    frameRequested =
                        false;


                    if (
                        !mobileQuery.matches
                    ) {
                        return;
                    }


                    const centeredIndex =
                        getCenteredIndex();


                    if (
                        centeredIndex !==
                        activeIndex
                    ) {

                        activeIndex =
                            centeredIndex;


                        updateControls();

                    }

                };


            /* =================================================
               GO TO ITEM
            ================================================= */

            const goToItem =
                (
                    requestedIndex
                ) => {

                    if (
                        !mobileQuery.matches
                    ) {
                        return;
                    }


                    const nextIndex =
                        Math.max(
                            0,
                            Math.min(
                                requestedIndex,
                                items.length - 1
                            )
                        );


                    const item =
                        items[
                            nextIndex
                        ];


                    const left =
                        item.offsetLeft -
                        (
                            (
                                track.clientWidth -
                                item.clientWidth
                            ) /
                            2
                        );


                    activeIndex =
                        nextIndex;


                    updateControls();


                    track.scrollTo({

                        left,

                        behavior:
                            reducedMotionQuery.matches
                                ? "auto"
                                : "smooth"

                    });

                };


            /* =================================================
               ARROWS
            ================================================= */

            previousButton?.addEventListener(
                "click",
                () => {

                    goToItem(
                        activeIndex - 1
                    );

                }
            );


            nextButton?.addEventListener(
                "click",
                () => {

                    goToItem(
                        activeIndex + 1
                    );

                }
            );


            /* =================================================
               SWIPE / SCROLL
            ================================================= */

            track.addEventListener(
                "scroll",
                () => {

                    if (
                        frameRequested
                    ) {
                        return;
                    }


                    frameRequested =
                        true;


                    window.requestAnimationFrame(
                        syncIndex
                    );

                },
                {
                    passive: true
                }
            );


            /* =================================================
               KEYBOARD
            ================================================= */

            track.addEventListener(
                "keydown",
                (event) => {

                    if (
                        !mobileQuery.matches
                    ) {
                        return;
                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        event.preventDefault();

                        goToItem(
                            activeIndex - 1
                        );

                    } else if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        event.preventDefault();

                        goToItem(
                            activeIndex + 1
                        );

                    } else if (
                        event.key ===
                        "Home"
                    ) {

                        event.preventDefault();

                        goToItem(0);

                    } else if (
                        event.key ===
                        "End"
                    ) {

                        event.preventDefault();

                        goToItem(
                            items.length - 1
                        );

                    }

                }
            );


            /* =================================================
               VIEWPORT RESET
            ================================================= */

            const reset =
                () => {

                    activeIndex = 0;

                    updateControls();


                    if (
                        mobileQuery.matches
                    ) {

                        track.scrollLeft =
                            0;

                    }

                };


            if (
                typeof mobileQuery.addEventListener ===
                "function"
            ) {

                mobileQuery.addEventListener(
                    "change",
                    reset
                );

            } else if (
                typeof mobileQuery.addListener ===
                "function"
            ) {

                mobileQuery.addListener(
                    reset
                );

            }


            /* =================================================
               INITIAL STATE
            ================================================= */

            updateControls();

        }
    );
}


/* ============================================================
   SUBTLE SCROLL REVEALS
============================================================ */

function initializeScrollReveals() {

    const elements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        !elements.length
    ) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* ========================================================
       ACCESSIBILITY FALLBACK
    ======================================================== */

    if (
        reducedMotion.matches ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );


        return;
    }


    /* ========================================================
       OBSERVER
    ======================================================== */

    const observer =
        new IntersectionObserver(
            (
                entries,
                instance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        instance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {

                threshold:
                    0.12,

                rootMargin:
                    "0px 0px -6% 0px"

            }
        );


    /* ========================================================
       OBSERVE ELEMENTS
    ======================================================== */

    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );
}