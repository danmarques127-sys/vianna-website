"use strict";

/* ============================================================
   VIANNA COMMERCIAL SERVICES
   CONTACT PAGE INTERACTIONS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initializeContactRoutes();
    initializeContactForm();
    initializeContactAccordion();
    initializeScrollReveals();
});


/* ============================================================
   CONTACT ROUTES
   Quote / Current Service / General Inquiry
============================================================ */

function initializeContactRoutes() {

    const routeButtons =
        Array.from(
            document.querySelectorAll(
                "[data-contact-route]"
            )
        );


    const form =
        document.querySelector(
            "[data-contact-form]"
        );


    if (
        !routeButtons.length ||
        !form
    ) {
        return;
    }


    const inquiryTypeInput =
        form.querySelector(
            "[data-inquiry-type]"
        );


    const quoteFields =
        Array.from(
            form.querySelectorAll(
                "[data-quote-field]"
            )
        );


    const quoteRequiredFields =
        Array.from(
            form.querySelectorAll(
                "[data-quote-required]"
            )
        );


    const phoneRequiredIndicator =
        document.querySelector(
            "[data-phone-required]"
        );


    const kicker =
        document.querySelector(
            "[data-contact-form-kicker]"
        );


    const title =
        document.querySelector(
            "[data-contact-form-title]"
        );


    const description =
        document.querySelector(
            "[data-contact-form-description]"
        );


    const submitText =
        form.querySelector(
            "[data-contact-submit-text]"
        );


    const message =
        form.querySelector(
            "[data-contact-message]"
        );


    /* ========================================================
       CONTENT FOR EACH CONTACT TYPE
    ======================================================== */

    const routeContent = {

        quote: {

            inquiryType:
                "Request a Quote",

            kicker:
                "New Service Request",

            title:
                "Tell us about the property.",

            description:
                "Share the details that will help us understand the cleaning service you are looking for.",

            submit:
                "Send My Request",

            placeholder:
                "Tell us about the property, approximate size, preferred schedule, frequency, and anything else we should know.",

            showQuoteFields:
                true,

            requirePhone:
                true

        },


        current: {

            inquiryType:
                "Current Service",

            kicker:
                "Current Service",

            title:
                "Tell us what you need help with.",

            description:
                "Share the service or property context and the question, update, or concern you would like to discuss.",

            submit:
                "Send My Message",

            placeholder:
                "Tell us which property or service this is about and what you would like us to help with.",

            showQuoteFields:
                false,

            requirePhone:
                false

        },


        general: {

            inquiryType:
                "General Inquiry",

            kicker:
                "General Inquiry",

            title:
                "Start the conversation.",

            description:
                "Use this form for a company question, partnership inquiry, or anything that does not fit a cleaning quote request.",

            submit:
                "Send My Message",

            placeholder:
                "Tell us what you are reaching out about and any details that would help us understand your message.",

            showQuoteFields:
                false,

            requirePhone:
                false

        }

    };


    /* ========================================================
       ACTIVATE CONTACT TYPE
    ======================================================== */

    const activateRoute = (
        key,
        {
            focus = false
        } = {}
    ) => {

        const content =
            routeContent[key];


        if (!content) {
            return;
        }


        /* ----------------------------------------------------
           BUTTON ACTIVE STATE
        ---------------------------------------------------- */

        routeButtons.forEach(
            (button) => {

                const isActive =
                    button.dataset.contactRoute ===
                    key;


                button.classList.toggle(
                    "is-active",
                    isActive
                );


                button.setAttribute(
                    "aria-selected",
                    String(isActive)
                );


                button.tabIndex =
                    isActive
                        ? 0
                        : -1;


                if (
                    isActive &&
                    focus
                ) {
                    button.focus();
                }

            }
        );


        /* ----------------------------------------------------
           HIDDEN INQUIRY TYPE
        ---------------------------------------------------- */

        if (
            inquiryTypeInput
        ) {

            inquiryTypeInput.value =
                content.inquiryType;

        }


        /* ----------------------------------------------------
           FORM CONTENT
        ---------------------------------------------------- */

        if (kicker) {

            kicker.textContent =
                content.kicker;

        }


        if (title) {

            title.textContent =
                content.title;

        }


        if (description) {

            description.textContent =
                content.description;

        }


        if (submitText) {

            submitText.textContent =
                content.submit;

        }


        if (message) {

            message.placeholder =
                content.placeholder;

        }


        /* ----------------------------------------------------
           QUOTE-ONLY FIELDS
        ---------------------------------------------------- */

        quoteFields.forEach(
            (field) => {

                field.classList.toggle(
                    "is-route-hidden",
                    !content.showQuoteFields
                );

            }
        );


        /* ----------------------------------------------------
           REQUIRED FIELDS
        ---------------------------------------------------- */

        quoteRequiredFields.forEach(
            (field) => {

                const isPhone =
                    field.id ===
                    "contact-phone";


                if (isPhone) {

                    field.required =
                        content.requirePhone;

                    return;

                }


                field.required =
                    content.showQuoteFields;

            }
        );


        /* ----------------------------------------------------
           PHONE ASTERISK
        ---------------------------------------------------- */

        if (
            phoneRequiredIndicator
        ) {

            phoneRequiredIndicator.hidden =
                !content.requirePhone;

        }

    };


    /* ========================================================
       ROUTE EVENTS
    ======================================================== */

    routeButtons.forEach(
        (
            button,
            index
        ) => {

            button.addEventListener(
                "click",
                () => {

                    activateRoute(
                        button.dataset.contactRoute
                    );

                }
            );


            /* =================================================
               KEYBOARD NAVIGATION
            ================================================= */

            button.addEventListener(
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
                                routeButtons.length
                            ) %
                            routeButtons.length;

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
                            routeButtons.length;

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
                            routeButtons.length -
                            1;

                    }


                    activateRoute(
                        routeButtons[
                            nextIndex
                        ].dataset.contactRoute,
                        {
                            focus:
                                true
                        }
                    );

                }
            );

        }
    );


    /* ========================================================
       INITIAL ROUTE
    ======================================================== */

    const initialButton =
        routeButtons.find(
            (button) =>
                button.classList.contains(
                    "is-active"
                )
        ) ||
        routeButtons[0];


    activateRoute(
        initialButton.dataset.contactRoute
    );
}


/* ============================================================
   CONTACT FORM

   CHARACTER COUNTER
   FORMSPREE SUBMISSION
============================================================ */

function initializeContactForm() {

    const form =
        document.querySelector(
            "[data-contact-form]"
        );


    if (!form) {
        return;
    }


    const message =
        form.querySelector(
            "[data-contact-message]"
        );


    const messageCount =
        document.querySelector(
            "[data-message-count]"
        );


    const status =
        form.querySelector(
            "[data-contact-status]"
        );


    const submitButton =
        form.querySelector(
            "[data-contact-submit]"
        );


    const submitText =
        form.querySelector(
            "[data-contact-submit-text]"
        );


    /* ========================================================
       CHARACTER COUNTER
    ======================================================== */

    if (
        message &&
        messageCount
    ) {

        const updateCharacterCount =
            () => {

                messageCount.textContent =
                    String(
                        message.value.length
                    );

            };


        message.addEventListener(
            "input",
            updateCharacterCount
        );


        updateCharacterCount();

    }


    /* ========================================================
       STATUS MESSAGE
    ======================================================== */

    const setStatus = (
        text,
        type = ""
    ) => {

        if (!status) {
            return;
        }


        status.textContent =
            text;


        status.classList.remove(
            "is-success",
            "is-error"
        );


        if (type) {

            status.classList.add(
                `is-${type}`
            );

        }

    };


    /* ========================================================
       FORM SUBMISSION
    ======================================================== */

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* ------------------------------------------------
               HTML VALIDATION
            ------------------------------------------------ */

            if (
                !form.reportValidity()
            ) {
                return;
            }


            const action =
                form.getAttribute(
                    "action"
                ) ||
                "";


            const isPlaceholderEndpoint =
                !action ||
                action.includes(
                    "YOUR_FORM_ID"
                );


            /* ------------------------------------------------
               FORMSPREE IS NOT CONNECTED YET
            ------------------------------------------------ */

            if (
                isPlaceholderEndpoint
            ) {

                setStatus(
                    "The form layout is ready, but Formspree is not connected yet. Replace YOUR_FORM_ID in contact.html with your Formspree form ID.",
                    "error"
                );


                return;
            }


            const originalSubmitText =
                submitText
                    ? submitText.textContent
                    : "Send";


            /* ------------------------------------------------
               LOADING STATE
            ------------------------------------------------ */

            if (
                submitButton
            ) {

                submitButton.disabled =
                    true;

            }


            if (
                submitText
            ) {

                submitText.textContent =
                    "Sending...";

            }


            setStatus("");


            /* ------------------------------------------------
               SEND TO FORMSPREE
            ------------------------------------------------ */

            try {

                const response =
                    await fetch(
                        action,
                        {

                            method:
                                "POST",

                            body:
                                new FormData(
                                    form
                                ),

                            headers: {

                                Accept:
                                    "application/json"

                            }

                        }
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "Form submission failed"
                    );

                }


                /* --------------------------------------------
                   SUCCESS
                -------------------------------------------- */

                form.reset();


                if (
                    messageCount
                ) {

                    messageCount.textContent =
                        "0";

                }


                setStatus(
                    "Thank you. Your message has been sent to Vianna Commercial Services.",
                    "success"
                );

            } catch (
                error
            ) {


                /* --------------------------------------------
                   ERROR
                -------------------------------------------- */

                setStatus(
                    "We could not send the form right now. Please try again in a moment.",
                    "error"
                );

            } finally {


                /* --------------------------------------------
                   RESTORE BUTTON
                -------------------------------------------- */

                if (
                    submitButton
                ) {

                    submitButton.disabled =
                        false;

                }


                if (
                    submitText
                ) {

                    submitText.textContent =
                        originalSubmitText;

                }

            }

        }
    );
}


/* ============================================================
   FAQ ACCORDION
============================================================ */

function initializeContactAccordion() {

    const accordion =
        document.querySelector(
            "[data-contact-accordion]"
        );


    if (!accordion) {
        return;
    }


    const items =
        Array.from(
            accordion.querySelectorAll(
                ".contact-accordion-item"
            )
        );


    items.forEach(
        (item) => {

            const trigger =
                item.querySelector(
                    ".contact-accordion-trigger"
                );


            const panel =
                item.querySelector(
                    ".contact-accordion-panel"
                );


            if (
                !trigger ||
                !panel
            ) {
                return;
            }


            trigger.addEventListener(
                "click",
                () => {

                    const willOpen =
                        trigger.getAttribute(
                            "aria-expanded"
                        ) !==
                        "true";


                    /* =========================================
                       CLOSE ALL
                    ========================================= */

                    items.forEach(
                        (
                            otherItem
                        ) => {

                            const otherTrigger =
                                otherItem.querySelector(
                                    ".contact-accordion-trigger"
                                );


                            const otherPanel =
                                otherItem.querySelector(
                                    ".contact-accordion-panel"
                                );


                            if (
                                !otherTrigger ||
                                !otherPanel
                            ) {
                                return;
                            }


                            otherTrigger.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            otherPanel.hidden =
                                true;

                        }
                    );


                    /* =========================================
                       OPEN SELECTED ITEM
                    ========================================= */

                    if (
                        willOpen
                    ) {

                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );


                        panel.hidden =
                            false;

                    }

                }
            );

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
       ACCESSIBILITY FALLBACK
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
       OBSERVE
    ======================================================== */

    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );
}