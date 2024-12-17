// ==UserScript==
// @name         Remove LinkedIn Suggested Content
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove LinkedIn suggested posts from the feed
// @author       You
// @match        https://www.linkedin.com/*
// @icon         https://www.google.com/s2/favicons?domain=linkedin.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeSuggestedContent();
            }
        });
    });

    function removeSuggestedContent() {
        document.querySelectorAll('.update-components-header__text-view').forEach(element => {
            if (element.textContent.trim() === 'Suggested') {
                let postContainer = element.closest('.feed-shared-update-v2');
                if (postContainer) {
                    postContainer.remove();
                    console.log('Removed a suggested post');
                }
            }
        });
    }

    // Initial cleanup when the script loads
    removeSuggestedContent();

    // Observe changes in the body
    observer.observe(document.body, { childList: true, subtree: true });
})();
