'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    /* remove class "active" from all articles links */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for(let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }

    /* add class "active" to the clicked link */
    clickedElement.classList.add("active");
    
    /* remove class "active" from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
    }
    
    /* get "href" attribute from clicked link */
    let linkHref = clickedElement.getAttribute("href");
    
    /* find the correct article using the selector (value of "href attribute") */
    const correctArticle = document.querySelector(linkHref);
    
    /* add class "active" to the correct article */
    correctArticle.classList.add("active");
}

const titleSpace = document.querySelector(".titles");
const articleList = document.querySelectorAll(".post");

function generateTitleLinks() {
    titleSpace.innerHTML = "";
    let html = "";

    for(let article of articleList) {
        let articleId = article.getAttribute("id");
        let articleTitle = article.querySelector(".post-title").innerHTML;

        let newHtml = '<li><a href=#' + articleId + '><span>' + articleTitle + '</span></a></li>';
        html += newHtml;
    }
    titleSpace.innerHTML = html; 
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");

for(let link of links) {
    link.addEventListener("click", titleClickHandler);
}