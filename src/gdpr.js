/**
 * A JQuery cookiebanner compliant with current EU Rules
 * 
 * @Author Bob Vrijland
 * 
 */
(function ($, window, document, undefined) {
    $.gdprBanner = function (settings) {
        var defaults = {
            bannerClass: 'gdpr-banner',
            bannerLinkText: {
                nl: 'Lees meer',
                en: 'Learn more',
                de: 'Mehr dazu'
            },
            bannerText: {
                nl: 'Deze website maakt gebruik van cookies. Wij onderscheiden functionele cookies en cookies voor het beheer van webstatistieken, het tonen van videos, het personaliseren van advertenties en het integreren van social media. Wij slaat geen persoonlijke gegevens op.',
                en: 'This website uses cookies (also third-party cookies) to provide you a better navigation experience.',
                de: 'Diese Website verwendet Cookies, auch von Dritten, um Ihre Browser-Erfahrung zu verbessern.'
            },
            blockCookie: true,
            blockCookieAttribute: 'block-src',
            blockCookieClass: 'block-cookie',
            acceptButtonClass: 'gdpr-banner-accept',
            declineButtonClass: 'gdpr-banner-decline',
            acceptButtonText: {
                nl: 'Accepteren',
                en: 'Accept',
                de: 'Akzeptieren'
            },
            declineButtonText: {
                nl: 'Weigeren',
                en: 'Decline',
                de: 'Ablehnen'
            },
            acceptButtonTextClass: 'gdpr-banner-taccept',
            declineButtonTextClass: 'gdpr-banner-tdecline',
            cookieExpiry: 365,
            cookieName: 'cookieConsent',
            cookiePageUrl: {
                nl: '',
                en: '',
                de: ''
            },
            language: 'nl',
            onConsent: function () {},
            onNoConsent: function () {},
            prependBannerTo: 'body',
            reloadPage: false
        };
        $.extend(true, defaults, settings);
        // Create cookie
        function createCookie(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = '; expires=' + date.toGMTString();
            } else {
                expires = '';
            }
            document.cookie = name + '=' + value + expires + '; path=/';
        }
        // Read cookie        
        function readCookie(name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        // Erase (not used)
        function eraseCookie(name) {
            createCookie(name, '', -1);
        }
        // Fade out
        function hideBanner() {
            $('.' + defaults.bannerClass).fadeOut(400, function () {
                $(this).remove();
            });
        }
        // Reload
        function reloadPage() {
            document.location.reload();
        }
        // Create true 
        function createCookieOnConsent() {
            if (readCookie(defaults.cookieName) === null) {
                createCookie(defaults.cookieName, 'true', defaults.cookieExpiry);
                $(document).trigger('onConsent');
                // Run callback
                defaults.onConsent.call();
            }
        }
        // Create false
        function createCookieNoConsent() {
            if (readCookie(defaults.cookieName) === null) {
                createCookie(defaults.cookieName, 'false', defaults.cookieExpiry);
                $(document).trigger('noConsent');
                // Run callback
                defaults.onNoConsent.call();
            }
        }
        // On privacy page
        function isPrivacyPage() {
            if (
                window.location.pathname
                .toLowerCase()
                .split('/')
                .pop() == defaults.cookiePageUrl[defaults.language].toLowerCase()
            ) {
                return true;
            } else {
                return false;
            }
        }
        // Run blocked
        function runBlockedElements(activatorClass) {
            $('.' + activatorClass).each(function () {
                if ($(this).prop('tagName') === 'SCRIPT') {
                    var attr = $(this).attr('src');
                    // Scripts with src
                    if (attr) {
                        $.getScript(attr);
                    } else {
                        // Script inline
                        var scriptText = $(this).html();
                        eval(scriptText);
                    }
                    // Replace type text whith text/javascript
                    $(this).attr('type', 'text/javascript');
                } else {
                    $('.' + activatorClass).each(function () {
                        var attr = $(this).attr(defaults.blockCookieAttribute);
                        if (attr) {
                            // Set src whith data value
                            $(this).attr('src', attr);
                            $(this).removeClass(activatorClass);
                        }
                    });
                }
            });
        }
        // Make banner
        if (readCookie(defaults.cookieName) === null && !isPrivacyPage()) {
            $(defaults.prependBannerTo).prepend(
                '<div class="' +
                defaults.bannerClass +
                '">' +
                '<div class="gdpr-banner-desc">' +
                defaults.bannerText[defaults.language] +
                ' <a class="gdpr-banner-link" href="' +
                defaults.cookiePageUrl[defaults.language] +
                '">' +
                defaults.bannerLinkText[defaults.language] +
                '</a></div>' +
                '<div class="gdpr-banner-right"><a class="' +
                defaults.declineButtonClass +
                '"><span class="' +
                defaults.declineButtonTextClass +
                '">' +
                defaults.declineButtonText[defaults.language] +
                '</span></a><a class="' +
                defaults.acceptButtonClass +
                '"><span class="' +
                defaults.acceptButtonTextClass +
                '">' +
                defaults.acceptButtonText[defaults.language] +
                '</span></a></div></div>'
            );
        }
        // Decline click
        $('body').on('click', '.' + defaults.declineButtonClass, function (e) {
            e.preventDefault();
            if (readCookie(defaults.cookieName) === null) {
                createCookieNoConsent();
            }
            hideBanner();
        });
        // Accept click
        $('body').on('click', '.' + defaults.acceptButtonClass, function (e) {
            e.preventDefault();
            if (readCookie(defaults.cookieName) === null) {
                createCookieOnConsent();
                if (defaults.blockCookie) {
                    runBlockedElements(defaults.blockCookieClass);
                }
            }
            hideBanner();
            if (defaults.reloadPage) {
                reloadPage();
            }
        });
        // Unblock if true
        if (defaults.blockCookie && (readCookie(defaults.cookieName) == 'true')) {
            runBlockedElements(defaults.blockCookieClass);
        }
        // Return consent (true/false or null)
        $.gdprBanner.consent = function () {
            if (readCookie(defaults.cookieName) == 'true') {
                return true;
            } else if (readCookie(defaults.cookieName) == 'false') {
                return false;
            }
        };
        // Manually set cookie (true/false)
        $.gdprBanner.setConsent = function (condition) {
            if (condition == true) {
                createCookieOnConsent();
                if (defaults.blockCookie) {
                    runBlockedElements(defaults.blockCookieClass);
                }
                if (defaults.reloadPage) {
                    reloadPage();
                }
            } else if (condition == false) {
                createCookieNoConsent();
                if (defaults.reloadPage) {
                    reloadPage();
                }
            }
        };
    };
})(jQuery, window, document);