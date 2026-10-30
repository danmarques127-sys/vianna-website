"use strict";

/* ============================================================
   VIANNA COMMERCIAL SERVICES
   SHARED INTERNAL-PAGE HEADER
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeSharedHeader();
});

function initializeSharedHeader() {
    const siteHeader = document.getElementById("site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!siteHeader || !menuToggle || !mobileMenu) return;

    const mobileMenuPanel = mobileMenu.querySelector(".mobile-menu-panel");

    const menuCloseElements =
        mobileMenu.querySelectorAll("[data-menu-close]");

    const mobileNavigationLinks =
        mobileMenu.querySelectorAll(
            ".mobile-navigation-link, .mobile-menu-cta"
        );

    const desktopBreakpoint = 1100;

    let isMenuOpen = false;
    let isScrollFrameRequested = false;
    let lastFocusedElement = null;


    /* ========================================================
       HEADER SCROLL STATE
    ======================================================== */

    const updateHeaderScrollState = () => {
        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 8
        );

        isScrollFrameRequested = false;
    };


    const handleWindowScroll = () => {
        if (isScrollFrameRequested) return;

        isScrollFrameRequested = true;

        window.requestAnimationFrame(
            updateHeaderScrollState
        );
    };


    /* ========================================================
       FOCUSABLE MENU ELEMENTS
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
            mobileMenu.querySelectorAll(selector)
        ).filter((element) => {
            return (
                element.offsetWidth > 0 ||
                element.offsetHeight > 0 ||
                element === document.activeElement
            );
        });
    };


    /* ========================================================
       OPEN MOBILE MENU
    ======================================================== */

    const openMobileMenu = () => {
        if (isMenuOpen) return;

        isMenuOpen = true;

        lastFocusedElement =
            document.activeElement;

        document.body.classList.add(
            "menu-open"
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

            (
                focusableElements[0] ||
                mobileMenuPanel
            )?.focus();

        }, 100);
    };


    /* ========================================================
       CLOSE MOBILE MENU
    ======================================================== */

    const closeMobileMenu = ({
        restoreFocus = true
    } = {}) => {

        if (!isMenuOpen) return;

        isMenuOpen = false;

        document.body.classList.remove(
            "menu-open"
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
       FOCUS TRAP
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


        if (!focusableElements.length) {

            event.preventDefault();

            mobileMenuPanel?.focus();

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

        } else if (
            !event.shiftKey &&
            document.activeElement ===
            lastFocusableElement
        ) {

            event.preventDefault();

            firstFocusableElement.focus();

        }
    };


    /* ========================================================
       MENU TOGGLE
    ======================================================== */

    menuToggle.addEventListener(
        "click",
        () => {

            isMenuOpen
                ? closeMobileMenu()
                : openMobileMenu();

        }
    );


    /* ========================================================
       CLOSE ELEMENTS
    ======================================================== */

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


    /* ========================================================
       CLOSE AFTER NAVIGATION
    ======================================================== */

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


    /* ========================================================
       KEYBOARD
    ======================================================== */

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


    /* ========================================================
       SCROLL
    ======================================================== */

    window.addEventListener(
        "scroll",
        handleWindowScroll,
        {
            passive: true
        }
    );


    /* ========================================================
       RESPONSIVE RESET
    ======================================================== */

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


    /* ========================================================
       INITIAL STATE
    ======================================================== */

    updateHeaderScrollState();
}