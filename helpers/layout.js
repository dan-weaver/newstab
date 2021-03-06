
var articles = [];
var currentPeriodical = "The Washington Post";

function populateArticles() {

	articles[0] = {
		author: "John Wagner, Robert Costa, Ashley Parker, John Wagner, Robert Costa, Ashley Parker",
		description: "The president and his advisers are looking for ways to recharge their agenda.",
		publishedAt: "2017-05-27T08:14:00Z",
		title: "Trump considers major changes amid escalating Russia crisis",
		url: "https://www.washingtonpost.com/politics/trump-considers-major-changes-amid-escalating-russia-crisis/2017/05/27/44d1a016-4230-11e7-9869-bac8b446820a_story.html",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/28/National-Politics/Images/Botsford170131Trump11055.JPG"
	}

	articles[1] = {
		author: "Michael Kranish, Jonathan O'Connell, Michael Kranish, Jonathan O'Connell",
		description: "He vastly overpaid for the nation’s most expensive office building and struck back at his foes.",
		publishedAt: "2017-05-27T10:38:00Z",
		title: "A high-stakes gamble: How Jared Kushner reacted to previous crises",
		url: "https://www.washingtonpost.com/politics/a-high-stakes-gamble-how-jared-kushner-reacted-to-previous-crises/2017/05/27/d1c16f54-3f2b-11e7-9869-bac8b446820a_story.html",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/27/National-Politics/Images/_SL50788.jpg"
	}

	articles[2] = {
		author: "Philip Rucker, Karen DeYoung, Philip Rucker, Karen DeYoung",
		description: "At palaces and summits, making deals and scolding allies, nine-day foreign tour showcases Trump before the world.",
		publishedAt: "2017-05-27T07:57:00Z",
		title: "Alternately charming and boorish, Trump plays the role of a lifetime overseas",
		url:" https://www.washingtonpost.com/politics/alternately-charming-and-boorish-trump-plays-the-role-of-a-lifetime-overseas/2017/05/27/056ef04a-4230-11e7-9869-bac8b446820a_story.html",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/27/National-Politics/Images/Trump_US_G7_04944-d9ceb-4750.jpg"
	}

	articles[3] = {
		author: "Emma Brown, Emma Brown",
		description: "Ninety-six districts have shortened the school week, nearly triple as many as in 2015.",
		publishedAt: "2017-05-27T09:12:00Z",
		title: "With state budget in crisis, many Oklahoma schools hold classes four days a week",
		url: "https://www.washingtonpost.com/local/education/with-state-budget-in-crisis-many-oklahoma-schools-hold-classes-four-days-a-week/2017/05/27/24f73288-3cb8-11e7-8854-21f359183e8c_story.html",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/27/Education/Images/4DAYWEEK1007.JPG"
	}

	articles[4] = {
		author: "Joby Warrick, Souad Mekhennet, Joby Warrick, Souad Mekhennet",
		description: "The terrorist group’s heir apparent has called for Manchester-style attacks.",
		publishedAt: "2017-05-27T11:10:00Z",
		title: "Bin Laden\’s son steps into father\’s shoes as al-Qaeda attempts a comeback",
		url: "https://www.washingtonpost.com/world/national-security/bin-ladens-son-steps-into-fathers-shoes-as-al-qaeda-attempts-a-comeback/2017/05/27/0c89ffc0-4198-11e7-9869-bac8b446820a_story.html",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/05/27/Others/Images/2017-05-23/AP_01110503115.JPG"
	}

	articles[5] = {
		author: "Matea Gold, Matea Gold",
		description: "By June 1, the administration will publicly post waivers given to appointees who have been exempted from aspects of federal ethics rules.",
		publishedAt: "2017-05-27T13:53:00Z",
		title: "White House relents in fight with ethics office over waiver disclosure",
		url: "https://www.washingtonpost.com/news/post-politics/wp/2017/05/27/white-house-relents-in-fight-with-ethics-office-over-waiver-disclosure/",
		urlToImage: "https://img.washingtonpost.com/rf/image_1484w/2010-2019/Wires/Videos/201705/Reuters/Images/t_1495651519345_name_313774988_0_4.jpg"
	}
}


$(function() {
    'use strict';

    console.log("Document loaded...ready");
    populateArticles();
    for (var i = 0; i < articles.length; i++) {
        console.log("article title: " + i + " " + articles[i].title);
        $('p.periodicalName').text(currentPeriodical);
        $('span.js-count').text((i + 1) + " of " + articles.length);
        $('p.articleTitle').text(articles[i].title);
        $('p.articleAuthor').text("Author(s): " + articles[i].author);
        $('p.articleDesc').text(articles[i].description);
        $('p.articleDate').text("Date: " + articles[i].publishedAt.slice(0, 10));
        $('img.articleURLImage').attr('src', articles[i].urlToImage);

        $('div.button-container').on('click', 'a.js-discard', function(event) {
            event.preventDefault();
            // perform keep or discard action
            // keep = add to reading list, continue to next card
            // discard = continue to next card
            console.log("in button event handler, i= " + i);

        })
        // debugger;
    }
})

