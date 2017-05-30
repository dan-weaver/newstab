var SOURCES_URL = "https://newsapi.org/v1/sources";
var ARTICLES_URL = "https://newsapi.org/v1/articles";
var API_KEY = "b54b01d96a8b4fac8b2e60a8211e8c2c";
var sources = [];  // state for the source periodicals
var articles = []; // state for all the articles in the sources selected by user
var currentPeriodicalTitle = '';


function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function locationInSources(id) {
    for (var i = 0; i < sources.length; i++) {
        if (sources[i].sourceId == id) {
            return i;
        }
    }
    return -1;
}

function returnSources(data) {

    //  save the returned periodicals into the state array
    for (var i = 0; i < data.sources.length; i++) {
        sources[i] = {
            category: data.sources[i].category,
            name: data.sources[i].name,
            sourceId: data.sources[i].id,
            url: data.sources[i].url,
        };
    };

    // sort the periodicals array by category
    sources.sort(function(a, b) {
        if (a.category < b.category) {
            return -1
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


function returnArticles(data) {
    var text;

    //  update the articles in the articles state array
    for (var j = 0; j < data.articles.length; j++) {
        articles.push(data.articles[j]);
    }
    console.log("just added articles, length now " + articles.length);
    //  now display the new articles

    // temp - print out the article list for layout development
    text = "currentPeriodical = " + currentPeriodicalTitle;
    console.log(text);
    for (j=0; j < articles.length; j++) {
        text = 'articles[' + j + '].author = ' + articles[j].author;
        console.log(text);
        text = 'articles[' + j + '].description = ' + articles[j].description;
        console.log(text);
        text = 'articles[' + j + '].publishedAt = ' + articles[j].publishedAT;
        console.log(text);
        text = 'articles[' + j + '].title = ' + articles[j].title;
        console.log(text);
        text = 'articles[' + j + '].url = ' + articles[j].url;
        console.log(text);
        text = 'articles[' + j + '].urlToImage = ' + articles[j].urlToImage;
        console.log(text);
    }
}



$(function() {
    'use strict';

    //  Get the sources/periodicals and display them
    //  in a vertical menu
    var parms = {
        language: "en" // English language sources only
    }
    $.getJSON(SOURCES_URL, parms, returnSources);
    console.log("sources page rendered");

    //  event handler for clicking on a periodical in the
    //  vertical menu
    $(".app-container").on('click', '.js-periodical', function(event) {
        event.preventDefault();
        // event.stopPropagation()
        console.log("event handler for a selected periodical");
        console.log("sourceId: " + $(this).data('source-id'));
        var sourceId = $(this).data('source-id');
        var x = locationInSources(sourceId);
        console.log("x " + x);
        console.log("name: " + sources[x].name + " " + sources[x].category);
        debugger;
        //
        //  check for either click-on or click-off
        //
        if (sources[x].clicked) {
            // source clicked off after previously been on, so remove articles
            console.log("was already clicked on, now off");
        } else {
            //  this source just clicked on so find the articles associated
            //  with this source
            currentPeriodicalTitle = sources[x].name;
            sources[x].clicked = true;
            parms = {
                source: sources[x].sourceId,
                apiKey: API_KEY
            }
            $.getJSON(ARTICLES_URL, parms, returnArticles);
        }

    });

})
