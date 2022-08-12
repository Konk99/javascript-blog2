'use strict';

function titleClickHandler(event) {
    /* remove class "active" from all articles links */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for(let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }
    
    /* add class "active" to the clicked link */
    const activeArticles = document.querySelectorAll(".posts article.active");

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
    }
    
    /* remove class "active" from all articles */

    
    /* get "hred" attribute from clicked link */

    
    /* find the correct article using the selector (value of "href attribute") */

    
    /* add class "active" to the correct article */
}

const links = document.querySelectorAll(".titles a");

for(let link of links) {
    link.addEventListener("click", titleClickHandler);
}