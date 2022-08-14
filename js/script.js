/* eslint-disable no-undef */
'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authotLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
};

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    /* remove class "active" from all articles links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* add class "active" to the clicked link */
    clickedElement.classList.add('active');
    
    /* remove class "active" from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    
    /* get "href" attribute from clicked link */
    let linkHref = clickedElement.getAttribute('href');
    
    /* find the correct article using the selector (value of "href attribute") */
    const correctArticle = document.querySelector(linkHref);
    
    /* add class "active" to the correct article */
    correctArticle.classList.add('active');
}

const titleSpace = document.querySelector('.titles'),
    articleList = '.post',
    cloudClassCount = 5,
    cloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {
    titleSpace.innerHTML = '';
    let html = '';

    const articles = document.querySelectorAll(articleList + customSelector);

    for(let article of articles) {
        let articleId = article.getAttribute('id');
        let articleTitle = article.querySelector('.post-title').innerHTML;

        //let newHtml = '<li><a href=#' + articleId + '><span>' + articleTitle + '</span></a></li>';
        const newHTMLData = {id: articleId, title: articleTitle};
        const newHtml = templates.articleLink(newHTMLData);
        html += newHtml;
    }
    titleSpace.innerHTML = html; 
    addClickListenerToArticles();
}

generateTitleLinks();

function addClickListenerToArticles() {
    const links = document.querySelectorAll('.titles a');

    for(let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
addClickListenerToArticles();

function calculateTagsParams(tags) {
    let minMax = {min:9999, max:0};

    for(let tag in tags) {
        minMax.max = Math.max(tags[tag], minMax.max);
        minMax.min = Math.min(tags[tag], minMax.min);
    }
    return minMax;
}

function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (cloudClassCount - 1) + 1);

    return classNumber;
}

function generateTags() {
    /* create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const allArticles = document.querySelectorAll('.post');
    /* STAR LOOP: for every article */
    for(let article of allArticles) {
        /* find tags wrapper */
        let wrapper = article.querySelector('.post-tags .list');
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        let tags = article.getAttribute('data-tags');
        /* split tags into array */
        tags = tags.split(' ');
        /* STAR LOOP: for each tag */
        for(let tag of tags) {
            /* generate HTML of the link */
            //let newHtml = '<li><a href="#tag-' + tag + '"><span>' + tag + '</a>&nbsp&nbsp</span></li>';
            const newHtmlData = {id: tag, title: tag};
            const newHtml = templates.tagLink(newHtmlData);
            /* add generated code to html varaible */
            html += newHtml;
            /* check if this link is NOT already in allTags */
            // eslint-disable-next-line no-prototype-builtins
            if(!allTags.hasOwnProperty(tag)) {
                /* add generated code to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        wrapper.innerHTML = html;
    /* END LOOP: for every article */
    }
    /* find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);

    let allTagsData = {tags: []};
    /* START LOOP: for each tag in allTags */
    for(let tag in allTags){
        /* generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<li style="display:inline-block"><a class="' + cloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) 
        //+ '" href="#tag-' + tag + '"><span>'+ tag + '</a>&nbsp&nbsp</span></li>';
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });
    /* END LOOP: for each tag in allTags */
    }
    /* add html from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the valuer of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constat */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active active tag link */
    for(let activeTagLink of activeTagLinks) {
        /* remove class active */
        activeTagLink.classList.remove('.active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let correctTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let correctTag of correctTags) {
        /* add class active */
        correctTag.classList.add('.active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenerToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"');
    /* START LOOP: for each link */
    for(let tagLink of tagLinks) {
        /* add tagClickHamdler as event listener for that link */
        tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
}

addClickListenerToTags();

function generateAuthors() {
    let allAuthors = {};
    /* find all articles */
    const allArticles = document.querySelectorAll('.post');
    /* STAR LOOP: for every article */
    for(let article of allArticles) {
        /* find tags wrapper */
        let wrapper = article.querySelector('.post-author');
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        let author = article.getAttribute('data-author');
        /* generate HTML of the link */
        //let newHtml = 'by <a href=#' + author + '>' + author.replace('-', ' ');
        const newHTMLData = {id: author, title: author};
        const newHtml = templates.authotLink(newHTMLData);
        // eslint-disable-next-line no-prototype-builtins
        if(!allAuthors.hasOwnProperty(author)) {
            /* add generated code to allTags object */
            allAuthors[author] = 1;
        } else {
            allAuthors[author]++;
        }
        /* add generated code to html varaible */
        html += newHtml;
        /* insert HTML of all the links into the tags wrapper */
        wrapper.innerHTML = html;
    /* END LOOP: for every article */
    }
    /* find list of tags in right column */
    const authorList = document.querySelector('.authors');
    /* create variable for all links HTML code */
    const authorsParams = calculateTagsParams(allAuthors);
    
    let allAuthorsData = {authors: []};
    /* START LOOP: for each tag in allTags */
    for(let author in allAuthors){
        /* generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<li style="display:inline-block"><a class="' + cloudClassPrefix + calculateTagClass(allAuthors[author], tagsParams) 
        //+ '" href="#' + author + '"><span>'+ author + '</a>&nbsp&nbsp</span></li>';
        allAuthorsData.authors.push({
            author: author,
            count: allAuthors[author],
            className: calculateTagClass(allAuthors[author], authorsParams)
        });
    /* END LOOP: for each tag in allTags */
    }
    /* add html from allTagsHTML to tagList */
    //authorList.innerHTML = allTagsHTML;
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the valuer of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract tag from the "href" constat */
    const author = href.replace('#aut-', '');
    /* find all tag links with class active */
    let activeAuthorLinks = document.querySelectorAll('a.active[href^="#aut"]');
    /* START LOOP: for each active active tag link */
    for(let activeTagLink of activeAuthorLinks) {
        /* remove class active */
        activeTagLink.classList.remove('.active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let correctAuthors = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let correctAuthor of correctAuthors) {
        /* add class active */
        correctAuthor.classList.add('.active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenerToAuthors() {
    /* find all links to tags */
    const authorLinks = document.querySelectorAll('a[href^="#aut"]');
    /* START LOOP: for each link */
    for(let authorLink of authorLinks) {
        /* add tagClickHamdler as event listener for that link */
        authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
}

addClickListenerToAuthors();