"use strict";

/* ============================================================
   VIANNA COMMERCIAL SERVICES
   ABOUT PAGE INTERACTIONS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeManifestoSwitcher();
    initializeMobileCarousels();
    initializeScrollReveals();
});


/* ============================================================
   ABOUT MANIFESTO SWITCHER
============================================================ */

function initializeManifestoSwitcher() {

    const manifesto =
        document.querySelector(
            "[data-about-manifesto]"
        );


    if (!manifesto) {
        return;
    }


    const tabs =
        Array.from(
            manifesto.querySelectorAll(
                "[data-manifesto-tab]"
            )
        );


    const panels =
        Array.from(
            manifesto.querySelectorAll(
                "[data-manifesto-panel]"
            )
        );


    if (
        !tabs.length ||
        !panels.length
    ) {
        return;
    }


    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* ========================================================
       ACTIVATE MANIFESTO ITEM
    ======================================================== */

    const activate = (
        key,
        {
            focus = false
        } = {}
    ) => {

        tabs.forEach(
            (tab) => {

                const isActive =
                    tab.dataset.manifestoTab ===
                    key;


                tab.classList.toggle(
                    "is-active",
                    isActive
                );


                tab.setAttribute(
                    "aria-selected",
                    String(isActive)
                );


                tab.tabIndex =
                    isActive
                        ? 0
                        : -1;


                if (
                    isActive &&
                    focus
                ) {
                    tab.focus();
                }

            }
        );


        panels.forEach(
            (panel) => {

                const isActive =
                    panel.dataset.manifestoPanel ===
                    key;


                panel.classList.toggle(
                    "is-active",
                    isActive
                );


                panel.hidden =
                    !isActive;

            }
        );


        const activeTab =
            tabs.find(
                (tab) =>
                    tab.dataset.manifestoTab ===
                    key
            );


        if (
            activeTab &&
            window.innerWidth <= 640
        ) {

            activeTab.scrollIntoView({

                behavior:
                    reducedMotionQuery.matches
                        ? "auto"
                        : "smooth",

                block:
                    "nearest",

                inline:
                    "center"

            });

        }

    };


    /* ========================================================
       TAB EVENTS
    ======================================================== */

    tabs.forEach(
        (
            tab,
            index
        ) => {

            tab.addEventListener(
                "click",
                () => {

                    activate(
                        tab.dataset.manifestoTab
                    );

                }
            );


            tab.addEventListener(
                "keydown",
                (event) => {

                    if (
                        ![
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
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
                            "ArrowLeft" ||
                        event.key ===
                            "ArrowUp"
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
                            "ArrowRight" ||
                        event.key ===
                            "ArrowDown"
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

                        nextIndex =
                            0;

                    }


                    if (
                        event.key ===
                        "End"
                    ) {

                        nextIndex =
                            tabs.length -
                            1;

                    }


                    activate(
                        tabs[
                            nextIndex
                        ].dataset.manifestoTab,
                        {
                            focus: true
                        }
                    );

                }
            );

        }
    );


    /* ========================================================
       INITIAL ACTIVE ITEM
    ======================================================== */

    const initialTab =
        tabs.find(
            (tab) =>
                tab.classList.contains(
                    "is-active"
                )
        ) ||
        tabs[0];


    activate(
        initialTab.dataset.manifestoTab
    );
}


/* ============================================================
   MOBILE CARD CAROUSELS

   ONE FULL CENTERED CARD AT A TIME
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


            let activeIndex =
                0;


            let frameRequested =
                false;


            /* =================================================
               TOTAL COUNTER
            ================================================= */

            if (
                totalElement
            ) {

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

                        const disabled =
                            activeIndex ===
                            0;


                        previousButton.disabled =
                            disabled;


                        previousButton.setAttribute(
                            "aria-disabled",
                            String(
                                disabled
                            )
                        );

                    }


                    if (
                        nextButton
                    ) {

                        const disabled =
                            activeIndex ===
                            items.length -
                            1;


                        nextButton.disabled =
                            disabled;


                        nextButton.setAttribute(
                            "aria-disabled",
                            String(
                                disabled
                            )
                        );

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
               GET CENTERED CARD
            ================================================= */

            const getCenteredIndex =
                () => {

                    const trackRectangle =
                        track.getBoundingClientRect();


                    const trackCenter =
                        trackRectangle.left +
                        (
                            trackRectangle.width /
                            2
                        );


                    let closestIndex =
                        0;


                    let closestDistance =
                        Number.POSITIVE_INFINITY;


                    items.forEach(
                        (
                            item,
                            index
                        ) => {

                            const itemRectangle =
                                item.getBoundingClientRect();


                            const itemCenter =
                                itemRectangle.left +
                                (
                                    itemRectangle.width /
                                    2
                                );


                            const distance =
                                Math.abs(
                                    itemCenter -
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
               SYNCHRONIZE ACTIVE CARD
            ================================================= */

            const synchronizeActiveIndex =
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
               GO TO CARD
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
                                items.length -
                                1
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
               PREVIOUS
            ================================================= */

            previousButton?.addEventListener(
                "click",
                () => {

                    goToItem(
                        activeIndex -
                        1
                    );

                }
            );


            /* =================================================
               NEXT
            ================================================= */

            nextButton?.addEventListener(
                "click",
                () => {

                    goToItem(
                        activeIndex +
                        1
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
                        synchronizeActiveIndex
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
                            activeIndex -
                            1
                        );

                    } else if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        event.preventDefault();


                        goToItem(
                            activeIndex +
                            1
                        );

                    } else if (
                        event.key ===
                        "Home"
                    ) {

                        event.preventDefault();


                        goToItem(
                            0
                        );

                    } else if (
                        event.key ===
                        "End"
                    ) {

                        event.preventDefault();


                        goToItem(
                            items.length -
                            1
                        );

                    }

                }
            );


            /* =================================================
               VIEWPORT RESET
            ================================================= */

            const resetForViewport =
                () => {

                    activeIndex =
                        0;


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
                    resetForViewport
                );

            } else if (
                typeof mobileQuery.addListener ===
                "function"
            ) {

                mobileQuery.addListener(
                    resetForViewport
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
   SCROLL REVEALS
============================================================ */

function initializeScrollReveals() {

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (
        !revealElements.length
    ) {
        return;
    }


    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* ========================================================
       REDUCED MOTION / FALLBACK
    ======================================================== */

    if (
        reducedMotionQuery.matches ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
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

    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );
}