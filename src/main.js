// ----------------------------------------
// Main variables.
// ----------------------------------------

/*
    The following variables are created by the build script:

    - "window._translations" based upon the content of "src/translations.json"
    - "css" based upon the content of "src/main.css"
    - "bookmarkletLang" equals either "fr" or "nl"
*/

// Better Lex version
var version = '1.0.0';

var d = document,
    b = d.body,
    w = window;

var url = d.location.href;

var lang = detectLang(url);
var alternateLang = (lang === 'fr') ? 'nl' : 'fr';

var trans = w._translations[lang];


// ----------------------------------------
// Utility functions.
// ----------------------------------------

// Utility functions are imported by the build script from "src/utility.js"


// ----------------------------------------
// Where the magic happens.
// ----------------------------------------

if ((isOnDocument() || isOnLocal()) && !isAlreadyParsed()) {

    // We first inject the CSS into the page.

    var stylesheet = d.createElement('style');
    stylesheet.innerHTML = css;

    d.head.appendChild(stylesheet);


    // body
    // We clean the body as much as possible.
    // ----------------------------------------

    // <body>'s attributes are removed to avoid any CSS inheritance problem.
    removeAllAttrs(b);

    /*
        1.  Markup homogenization
        2.  New lines are removed to ease later parsing
        3.  <b>, <font> and <span> are removed
        4   <a> linking to "#t" or having a title are deleted. Typically used
            for reference to footnote, useless and would complexify the parsing
        5.  Empty <td> or <tr> elements are removed
        6.  Identifiers and classes are added to every table according to the
            value of the preceding hidden <a> anchor
        7.  Any (misused) <th> is replaced by a <td>
        8.  Typographic improvements
    */
    b.innerHTML = b.innerHTML
    .replace(/(?:<\/?br\/?>\s?)+/gi, '<br>')    // 1
    .replace(/[\n|\r]/gi, '')                   // 2
    .replace(/<\/?b>/gi, '')                    // 3
    .replace(/<\/?(?:font|span)[^>]*?>/gi, '')  // "
    .replace(                                   // 4
        /<a(?: (?:href="#t"|title="[^"]+"))+>([^<]+)<\/a>/gi,
        '$1'
    )
    .replace(/<td[^>]*?>\s*?<\/td>/gi, '')      // 5
    .replace(/<tr[^>]*?>\s*?<\/tr>/gi, '')      // "
    .replace(                                   // 6
        /<a name="([^"]+)">[^>]*?<\/a>(?:<br>|\s)*<table[^>]+>/gi,
        '<table id="$1" class="table-$1">'
    )
    .replace(/<(\/?)th[^>]*?>/gi, '<$1td>')     // 7
    .replace(/CHAPITRE/g, 'Chapitre')           // 8
    .replace(/HOOFDSTUK/g, 'Hoofdstuk')         // "
    .replace(/TITRE/g, 'Titre')                 // "
    .replace(/TITEL/g, 'Titel')                 // "
    .replace(/ANNEXES/g, 'Annexes')             // "
    .replace(/BIJLAGEN/g, 'Bijlagen')           // "
    .replace(/ANNEXE/g, 'Annexe')               // "
    .replace(/BIJLAGE/g, 'Bijlage');            // "

    // Wrap the HTML into two layers of containers.
    b.innerHTML = '<div class="wrapper better-lex"><div class="content">' + b.innerHTML + '</div></div>';


    // .table-titre
    // We clean the 'Titre' table.
    // ----------------------------------------

    var headingsTable = b.getElementsByClassName('table-titre')[0];

    /*
        1.  Titles are wrapped in <span> elements
        2.  In cases where various values are provided and separated by "*",
            "*" is replaced by <br>
        3.  "pdf" class is added to link pointing to an "image", wording
            is fixed, URL is fixed as well
    */
    headingsTable.innerHTML = headingsTable.innerHTML
    .replace(/<br>[^\(]([^:]+ :)/g, '<span>$1</span>')      // 1
    .replace(/(?:&nbsp;| )+[\*]+(?:&nbsp;| )+/g, '<br>')    // 2
    .replace(                                               // 3
        /<a[^>]+href="[^"]+pdf_file=([^"]+\.pdf)"[^>]+>(?:image|beeld)<\/a>/gi,
        '<a href="$1" class="pdf">pdf</a>'
    );


    // .table-text
    // We clean the 'Texte' table.
    // ----------------------------------------

    var textTable = b.getElementsByClassName('table-texte')[0];

    textTable.innerHTML = textTable.innerHTML
    .replace(
        /(?:<br>)*(?: |&nbsp;)*<a name="(Art[^"]+)"[^>]*>[^<]+<\/a>(?: ?<a[^>]+>[^>]+>[. ]+| ?[^ ]+ ?)(?:<br>)*/gi,
        '<a class="article" href="#$1" name="$1">$1</a>&nbsp;&nbsp;'
    )
    .replace(
        /(?:<br>)*(?: |&nbsp;)*(?:<a name="(LN[^"]+)"[^>]*>((?:chapitre|hoofdstuk|annexes?).*?)<\/a>(.*?))(?:<br>|(<a class))/gi,
        '<a class="chapter" href="#$1" name="$1">$2$3</a>$4'
    )
    .replace(
        /(?:<br>)*(?: |&nbsp;)*(?:<a name="(LN[^"]+)"[^>]*>((?:titre|titel).*?)<\/a>([^<]+))/gi,
        '<a class="title" href="#$1" name="$1">$2$3</a>'
    )
    .replace(
        /(?:<br>)*(?: |&nbsp;)*(?:<a name="(LN[^"]+)"[^>]*>((?:section|afdeling).*?)<\/a>(.*?))(?:<br>|(<a class))/gi,
        '<a class="section" href="#$1" name="$1">$2$3</a>$4'
    )
    .replace(
        /(?:<br>)*(?: |&nbsp;)*(?:<a name="(LN[^"]+)"[^>]*>((?:sous-section|onderafdeling).*?)<\/a>(.*?))(?:<br>|(<a class))/gi,
        '<a class="subsection" href="#$1" name="$1">$2$3</a>$4'
    );


    // .table-modification
    // We clean the 'Modifications' table.
    // ----------------------------------------

    var modificationTable = b.getElementsByClassName('table-modification')[0];

    /*
        1.  "pdf" class is added to link pointing to an "image", wording
            is fixed, URL is fixed as well
        2.  Modification details are wrapped in <span>
    */
    if (modificationTable) {

        modificationTable.innerHTML = modificationTable.innerHTML
        .replace(                                                  // 1
            /<a[^>]+href="[^"]+pdf_file=([^"]+\.pdf)"[^>]+>(?:image|beeld)<\/a>/gi,
            '<a href="$1" class="pdf">pdf</a>'
        )
        .replace(/<br>(.*?)<\/li>/gi, '<br><span>$1</span></li>'); // 2
    }


    // Sidebar
    // We then create and inject the sidebar.
    // ----------------------------------------

    var sidebar = d.createElement('div');
    sidebar.setAttribute('class', 'sidebar');

    // The NodeList containing the main tables is converted to an array.
    var mainTables = [].slice.call(d.querySelectorAll('[class^=table]'));

    // Array containing useless tables ids
    var uselessTablesIds = ['hit0', 'end'];

    // Table of contents
    var toc = [];

    mainTables.forEach(function(item) {

        // If the current table is a useful one,
        // we add its title to the table of contents.
        if (uselessTablesIds.indexOf(item.id) === -1) {

            var selector = '#' + item.id + ' > tbody > tr:first-child > td:first-child';

            var li =
                '<li><a href="#' + item.id + '">'
            +       d.querySelector(selector).innerHTML
            +   '</a></li>';

            toc.push(li);
        }
    });

    sidebar.innerHTML =
        '<p class="logo"><a href="#">Better Lex</a></p>'
    +   '<ul>'
    +   '   <li><a href="' + url + '" target="_blank">' + trans.source + '</a></li>'
    +   '   <li><a href="' + reconstructURL(url, alternateLang) + '" class="trans">' + trans.trans + '</a></li>'
    +   '   <li><span class="o">' + trans.nav + '</span>'
    +   '       <ul>' + toc.join('') + '</ul>'
    +   '   </li>'
    +   '   <li><span class="o">' + trans.display + '</span>'
    +   '       <ul>'
    +   '           <li><input type="radio" name="theme" id="dark" /><label for="dark">' + trans.dark + '</label></li>'
    +   '           <li><input type="radio" name="theme" id="light" checked="checked" /><label for="light">' + trans.light + '</label></li>'
    +   '       </ul>'
    +   '   </li>'
    +   '   <li><span class="o">' + trans.font + '</span>'
    +   '       <ul>'
    +   '           <li><input type="radio" name="font" id="serif" checked="checked" /><label for="serif">Serif</label></li>'
    +   '           <li><input type="radio" name="font" id="sans-serif" /><label for="sans-serif">Sans-serif</label></li>'
    +   '       </ul>'
    +   '   </li>'
    +   '</ul>'
    +   '<p class="footer"><a title="Source code on GitHub" href="https://github.com/nurpa/better-lex/">Better Lex</a> version ' + version + '</p>'
    +   '<p class="footer update"><a href="http://nurpa.be/better-lex/?version=' + version + '&lang=' + lang + '">' + trans.update + '</a></p>';

    b.insertBefore(sidebar, b.firstChild);


    // Theme switcher.

    d.getElementById('dark').addEventListener('click', function() {

        b.classList.add('dark');
    });

    d.getElementById('light').addEventListener('click', function() {

        b.classList.remove('dark');
    });


    // Font switcher.

    d.getElementById('serif').addEventListener('click', function() {

        b.classList.remove('sans-serif');
    });

    d.getElementById('sans-serif').addEventListener('click', function() {

        b.classList.add('sans-serif');
    });


    // .info-box
    // We create and inject the info box.
    // ----------------------------------------

    var infoBox = d.createElement('div');
    infoBox.setAttribute('class', 'info-box sans-serif');

    infoBox.innerHTML = '<p>' + trans.infoBox + '</p>';

    b.appendChild(infoBox);


    /*
        Hide the info box:
        - when the sidebar is opened
        - when the info box is clicked upon
        - after 7 seconds
    */

    sidebar.addEventListener('mouseover', function() {

        infoBox.classList.add('hidden');
    });

    infoBox.addEventListener('click', function() {

        infoBox.classList.add('hidden');
    });

    w.setTimeout(function() {

        infoBox.classList.add('hidden');

    }, 7000);


    // Remove the info box if it is not visible anymore.
    infoBox.addEventListener('transitionend', function() {

        infoBox.style.display = 'none';
    });

} else if (isOnBetterLex()) {

    // If the user is on the Better Lex website, we redirect him/her to the
    // homepage passing his/her version and language as parameters.

    d.location = 'http://nurpa.be/better-lex/?version=' + version + '&lang=' + lang;

} else if (isOnFrame()) {

    // If the user is on a page containing a frame, we redirect him/her to the
    // embedded document.

    alert(trans.alertFrame);

    var oldUrl = document.getElementsByTagName('frame')[0].getAttribute('src');
    d.location = reconstructURL(oldUrl);

} else if (isOnTranslation()) {

    // Translation page can only be reached by clicking on the translation link
    // provided on an unparsed page, it contains a frame pointing to a document
    // containing a frame... http://youtu.be/CLDSE7RHvno
    //
    // Rather then trying to deal with all this mess, we reconstruct the URL
    // and redirect the user to it.

    alert(trans.alertTrans);

    d.location = reconstructURL(url);

} else if (isOnSearch() || isAlreadyParsed()) {

    // If the user is on the search form, nothing is done (for the time being).
    // If the document has already been parsed, our job is done.

} else {

    // If the user is not in one of the situations aforementioned, he/she is
    // on a random page on the Interwebs, we redirect him/her to the eJustel
    // search form.
    //
    // Due to browser limitations, it won't work on every website
    // (or on empty tabs).
    //
    // See:
    // - https://bugzilla.mozilla.org/show_bug.cgi?id=866522
    // - https://bugzilla.mozilla.org/show_bug.cgi?id=728313

    alert(trans.alertDefault);

    d.location = 'http://www.ejustice.just.fgov.be/cgi_loi/loi_rech.pl?language=' + bookmarkletLang;
}
