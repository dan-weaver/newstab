var SOURCES_BASE_URL = "https://newsapi.org/v1/sources";
var ARTICLES_BASE_URL = " https://newsapi.org/v1/articles";



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

function returnSources(data) {

    //  save the returned periodicals 
    var sources = [];
    for (var i = 0; i < data.sources.length; i++) {
        sources[i] = {
            category: data.sources[i].category,
            name: data.sources[i].name,
            sourceId: data.sources[i].id,
            url: data.sources[i].url
        };
    };

    // sort array by category
    sources.sort(function(a, b) {
        if (a.category < b.category) {
            return -1
        } else return 1;
    });

    //  render the periodials, first with a category header followed 
    //  by the periodicals in that category
    var text = '';
    var catHeader = '';
    for (i = 0; i < sources.length; i++) {
        if (catHeader != sources[i].category) {
            text = text + '<h3 class="heading">' + sources[i].category + '</h3>';
            catHeader = sources[i].category;
        }
        // text = text + '<p class="source-title">' + sources[i].name + '</p>';
        text = text + '<div class="source-checkbox"><input type="checkbox" name="' +
            sources[i].id + '"><label class="source-title">' + sources[i].name + '</label></div>';
    }
    $('#periodicals').html(text);
}

$(function() {
    'use strict';

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    //  get the sources/periodicals and render the page
    var parms = {
        language: "en"  // English language sources only
    }
    $.getJSON(SOURCES_BASE_URL, parms, returnSources);

})
