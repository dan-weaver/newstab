var SOURCES_URL = "https://newsapi.org/v1/sources";
var ARTICLES_URL = "https://newsapi.org/v1/articles";
var API_KEY = "b54b01d96a8b4fac8b2e60a8211e8c2c";
var sources = []; // state for the source periodicals
var articles = []; // state for all the articles in the sources selected by user
var currentPeriodicalTitle = '';


function locationInSources(id) {
    console.log("at top of locationInSources");
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].sourceId == id) {
            return i;
        }
    }
    return -1;
}


function locationInArticles(title) {

    for (var y = 0; y < articles.length; y++) {
        if (articles[y].title == title) {
            return y;
        }
    }
    return -1;
}


function returnSources(data) {

    console.log("At top of returnSources");
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
    //  Render the list
    $('#source-container').html(text);
}


$('.js-readinglist').on('click', '.accordion-strip', function(event) {
  event.preventDefault();
  var x = locationInArticles($(this).data('article-id'));
  console.log("clicked on article " + x);
  if (articles[x].status == 0) {
      articles[x].status = 1; //set to expand
      console.log("was collapsed, set to expand");
  } else {
      articles[x].status = 0; //set to collapse
      console.log("was expanded, set to collapse");
  }

  // debugger;
  // $('.panel').toggle('slow');
  renderArticles();
});


function renderArticles() {
    var i;
    var text = '';

    // console.log("at top of renderArticles");

    for (i = 0; i < articles.length; i++) {
        // console.log("in renderArticles loop" + i);
        if (articles[i] != 2) { // if article not deleted
            text = text + '<button class="accordion-strip" data-article-id="' + articles[i].title +
                '"><span class="strip-source">' + articles[i].sourceTitle +
                '</span><p class="strip-title">' + articles[i].title + '</p></button>';
            text = text + '<div class="panel';

            if (articles[i].status == 0) {
                text = text + ' hidden">';
                console.log("in loop " + i + " article set to collapsed");
            }
            if (articles[i].status == 1) {
                text = text + '">';
                console.log("in loop " + i + " article set to expand");
            }
            text = text +
                '<img class="panelURLImage" src="' + articles[i].urlToImage + '">' +
                '<p class="panelDesc">' + articles[i].description + '</p>' +
                '<p class="panelAuthor">By ' + articles[i].author + '</p>' +
                '<div class="button-container">' +
                '<a class="button-left js-discard" type="button">Discard</a>' +
                '<a class="button-right js-keep" type="button">Open in browser tab</a></div>' +
                '</div>';
        }
    }
    // debugger;
    $('.js-readinglist').html(text);

}


function returnArticles(data) {
    var j;
    console.log("top of returnArticles");
    // debugger;
    //  add the returned articles to existing articles state array. Note that
    //  there may be existing articles already in the array
    for (j = 0; j < data.articles.length; j++) {
        articles.push(data.articles[j]);
        articles[articles.length - 1].status = 0; // accordion panel: status 0-collapsed, 1-expanded
        articles[articles.length - 1].sourceTitle = currentPeriodicalTitle;
    }
    console.log("in returnArticles, articles.length now " + articles.length);

    //  Render the articles page in the accordion strip form
    renderArticles();
    console.log('in returnArticles after renderArticles called. Check for article click here');
}


$(function() {
    'use strict';

    //  Get the sources/periodicals and display them
    //  in a vertical menu
    var parms = {
        language: "en" // English language sources only
    };
    $.getJSON(SOURCES_URL, parms, returnSources);
    console.log("got sources, ready for source-click event handler");

    //  event handler for clicking on a periodical in the
    //  vertical menu
    console.log("rendered sources, at sources event handler");
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

        console.log("at event handler for article click");
        $('.js-readinglist').on('click', '.accordion-strip', function(event) {

            event.preventDefault();
            console.log("after article clicked");
        });
    });

    console.log("at mainline outside of periodical check event");
});
