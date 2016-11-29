// ----------------------------------------
// Utility functions.
// ----------------------------------------

/**
 * Check if the document has already been parsed.
 *
 * @return {Boolean}
 */
function isAlreadyParsed() {

    return !!(d.getElementsByClassName('better-lex')[0]);
}

/**
 * Try to detect the language of the document.

 * If none is found, return the value of the
 * global `bookmarkletLang` variable.
 *
 * @param  {string} url
 * @return {string}
 */
function detectLang(url) {

    var lang = url.match(/language=(nl|fr)/i);

    if (lang) return lang[1];

    return bookmarkletLang;
}

/**
 * Check if the person is on the Better Lex website.
 *
 * @return {Boolean}
 */
function isOnBetterLex() {

    var needle = 'https://nurpa.be/betterlex-bookmarklet/';

    return (url.lastIndexOf(needle, 0) === 0);
}

/**
 * Check if the person is on the page of a document.
 *
 * @return {Boolean}
 */
function isOnDocument() {

    var needle = 'http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl';

    return (url.lastIndexOf(needle, 0) === 0);
}

/**
 * Check if the document is contained inside a frame.
 *
 * @return {Boolean}
 */
function isOnFrame() {

    var needle = 'http://www.ejustice.just.fgov.be/cgi_loi/loi_a.pl';

    return (url.lastIndexOf(needle, 0) === 0);
}

/**
 * Check if the page is viewed locally.
 *
 * @return {Boolean}
 */
function isOnLocal() {

    return !!(url.match(/^(file|http:\/\/(127|localhost))/i));
}

/**
 * Check if the person is on the eJustel search page.
 *
 * @return {Boolean}
 */
function isOnSearch() {

    var needle = 'http://www.ejustice.just.fgov.be/cgi_loi/loi_rech.pl';

    return (url.lastIndexOf(needle, 0) === 0);
}

/**
 * Check if the person is on a translation page.
 *
 * @return {Boolean}
 */
function isOnTranslation() {

    var needle = 'http://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl';

    return (url.lastIndexOf(needle, 0) === 0);
}

/**
 * Build a new URL from an URL and, optionally, a language code.
 *
 * @param  {string} url
 * @param  {string} trans
 * @return {string}
 */
function reconstructURL(url, trans) {

    var cn      = url.match(/cn=([^&]+)/i),
        lang    = trans ? trans : detectLang(url),
        fromtab = (lang === 'fr') ? 'loi' : 'wet';

    var target =
        'http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?caller=list'
    +   '&cn=' + cn[1]
    +   '&language=' + lang
    +   '&fromtab=' + fromtab;

    return target;
}

/**
 * Remove all the attributes of an HTML element.
 *
 * @param  {HTMLElement} element
 * @return {void}
 */
function removeAllAttrs(element) {

    for (var i = element.attributes.length; i-- > 0;) {

        element.removeAttribute(element.attributes[i]);
    }
}
