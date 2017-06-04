var SOURCES_URL = "https://newsapi.org/v1/sources";
var ARTICLES_URL = "https://newsapi.org/v1/articles";
var API_KEY = "b54b01d96a8b4fac8b2e60a8211e8c2c";
var sources = [];   // state for the source periodicals
var articles = []; // state for all the articles in the sources selected by user
var currentPeriodicalTitle = '';


function locationInSources(id) {
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].sourceId == id) {
            return i;
        }
    }
    return -1;
}


function locationInArticles(targetURL) {

    for (var y = 0; y < articles.length; y++) {
        if (articles[y].url == targetURL) {
            return y;
        }
    }
    return -1;
}


function dateSpan(pubDate) {

    if (pubDate == null) {
        return "not provided";
    }

    // Normalize publishedAt date and the system date in terms of millisecs 
    // since the epoch date of Jan 1, 1970. Calculate the difference.
    
    var diff = new Date().getTime() - Date.parse(pubDate);

    //  Determine number of days and hours 

    var milliDays = 24 * 60 * 60 * 1000;
    days = Math.floor(diff / milliDays);
    var remainder = diff - (days * milliDays);
    var milliHours = 60 * 60 * 1000;
    hours = Math.floor(remainder / milliHours);

    // Stringify the date span,  e.g., "x days, y hours"

    var text = '';

    if (days == 0 && hours == 0) {
        return "within the hour";
    }

    if (days == 1) {
        text = days + " day";
    } else if (days > 1) {
        text = days + " days";
    }

    if (days > 0 && hours > 0) {
        text = text + ", ";
    }

    if (hours == 1) {
        text = text + hours + " hour ago";
    } else if (hours > 1) {
        text = text + hours + " hours ago";
    }

    return text;
}


function returnSources(data) {

    console.log("Top of returnSources");

    //  save the returned periodicals into the state array

    for (var i = 0; i < data.sources.length; i++) {
        sources[i] = {
            category: data.sources[i].category,
            name: data.sources[i].name,
            sourceId: data.sources[i].id,
            url: data.sources[i].url
        };
    }

    // sort the periodicals array by category

    sources.sort(function(a, b) {
        if (a.category < b.category) {
            return -1;
        } else return 1;
    });

    //  Create the periodicals display. The category heading is first followed by
    //  the periodicals in that category.

    var text = '';
    var catHeader = '';
    for (i = 0; i < sources.length; i++) {
        if (catHeader != sources[i].category) {
            text = text + '<p class="js-category">' + sources[i].category.toUpperCase() + '</p>';
            catHeader = sources[i].category;
        }
        text = text + '<p class="js-periodical" data-source-id="' + sources[i].sourceId + '" id="' + sources[i].sourceId + '">' + sources[i].name + '</p>';
    }
    console.log("writing to DOM");;
    $('.nav').html(text);
}


function renderArticles() {
    console.log("at top of renderArticles");
    var i;
    var text = '';

    for (i = 0; i < articles.length; i++) {
        if (articles[i].status != 2) {            // if article not marked as deleted
            text = text + '<article class="article-container"><div class="title-row" ' +
                'data-article-id="' + articles[i].url + '">' +
                '<span class="article-source">' + articles[i].sourceTitle + ' - ' + dateSpan(articles[i].publishedAt) +
                '</span><div class="button-box" data-row-id="' + i + '">' + 
                '<div class="expand-button"><img src="assets/expand-4.svg" title="Expand/collapse details"></div>' +
                '<div class="tab-button"><img src="assets/opentab.svg" title="Open browser tab"></div>' +
                '<div class="delete-button"><img src="assets/trashcan.svg" title="Delete article"></div>' + 
                '</div></div><p class="article-title">' + articles[i].title + '</p></div>';

            text = text + '<div class="detail';
            if (articles[i].status == 0) {
                text = text + ' hidden">';
            }
            if (articles[i].status == 1) {
                text = text + '">';
            }
            text = text + '<img class="detail-URLImage" src="' + articles[i].urlToImage + '">' +
                '<p class="detail-author">By ' +  articles[i].author + '</p>' +
                '<p class="detail-desc">' + articles[i].description + '</p></div></article>';
        }
    }

    $('.content').html(text);
}


function returnArticles(data) {
    var j;

    //  Add the returned articles to the articles state array. Note that
    //  there may be existing articles already in the array.

    for (j = 0; j < data.articles.length; j++) {
        articles.push(data.articles[j]);
        articles[articles.length - 1].status = 0; // accordion panel: status 0-collapsed, 1-expanded
        articles[articles.length - 1].sourceTitle = currentPeriodicalTitle;
        console.log("articles returned");
    }

    renderArticles();
}


$(function() {
    'use strict';
    console.log("start the ball rolling");

    //  Get the sources/periodicals and display them
    //  in a vertical menu

    var parms = {
        language: "en" // English language sources only
    };
    $.getJSON(SOURCES_URL, parms, returnSources);

    //  event handler for clicking on a periodical in the
    //  vertical menu

    $("#source-container").on('click', '.js-periodical', function(event) {
        event.preventDefault();
        var sourceId = $(this).data('source-id');
        var x = locationInSources(sourceId);
        currentPeriodicalTitle = sources[x].name;
        parms = {
            source: sources[x].sourceId,
            apiKey: API_KEY
        };
        $.getJSON(ARTICLES_URL, parms, returnArticles);
    });

    //  Register the event handler for clicking on a periodical in the
    //  vertical menu. If a periodical is clicked, obtain the articles 

    $(".nav").on('click', '.js-periodical', function(event) {
        event.preventDefault();
        var sourceId = $(this).data('source-id');
        var x = locationInSources(sourceId);
        currentPeriodicalTitle = sources[x].name;
        console.log("Periodical selected: " + currentPeriodicalTitle);
        parms = {
            source: sources[x].sourceId,
            apiKey: API_KEY
        };
        $.getJSON(ARTICLES_URL, parms, returnArticles);
    });

    //  Register event handlers for clicking on an article's button --
    //  the expand or compress button, open in browser tab button, or delete button.

    $('.content').on('click', '.delete-button', function(event) {
        event.preventDefault();
        var x = $(this)["0"].parentNode.attributes[1].value;
        console.log("delete button for article " + x);
        articles[x].status = 2;
        renderArticles();
    });

    $('.content').on('click', '.expand-button', function(event) {
        event.preventDefault();
        var x = $(this)["0"].parentNode.attributes[1].value;
        console.log("expand/compress button for " + x);
        if (articles[x].status == 0) {
            articles[x].status = 1; //set to expand
        } else {
            articles[x].status = 0; //set to collapse
        }
        renderArticles();
    });

    $('.content').on('click', '.tab-button', function(event) {
        event.preventDefault();
        var x = $(this)["0"].parentNode.attributes[1].value;
        console.log("open tab button for article " + x);
        window.open(articles[x].url,'_blank');
        // renderArticles();
    });

})