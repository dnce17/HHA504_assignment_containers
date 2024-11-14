let jsonData;

function main() {
    getJsonData();
    toggleNav();
    toggleGamesSelection();
    addSelectionEvts();
}

function changeText(variable, desiredText) {
    variable.textContent = desiredText;
}

function getJsonData() {
    fetch("/static/games.json")
        .then(response => response.json())
        .then(data => {
            jsonData = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function toggleNav() {
    const navToggle = document.querySelector(".nav__toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("visible");
    })
}

function toggleGamesSelection() {
    const btn = document.querySelector(".games__released-btn");
    const selections = document.querySelectorAll(".games__released-selection");
    
    btn.addEventListener("click", () => {
        for (let i = 1; i < selections.length; i++) {
            selections[i].classList.toggle("visible-inline-block");
        }
        
        if (btn.textContent.toLowerCase() == "show more") {
            changeText(btn, "Hide");
        } 
        else {
            changeText(btn, "Show More");
        }
    })
}

function addSelectionEvts() {
    const selections = document.querySelectorAll(".games__released-selection");

    for (let i = 0; i < selections.length; i++) {
        selections[i].addEventListener("click", () => {
            // Uses img src as comparison to grab correct info from JSON data
            selectionImgSrc = selections[i].firstElementChild.src.match("img.*")[0].trim();
            changeGameInfo(selectionImgSrc);
        });
    }
}

function changeGameInfo(selectionImgSrc) {
    for (const game of jsonData) {
        if (selectionImgSrc == game.imgSelection) {
            changeGameImg(game)
            changeGameVersion(game.versions, game.colors)
            changeCategoryInfo(game.releaseYrs, game.consoles, game.text)
        }
    }
}

function changeGameImg(game) {
    let gameImg = document.querySelector(".games__info-img");
    gameImg.src = "/static/" + game.imgSrc;
    gameImg.alt = game.title;
    gameImg.target = "_blank";

    changeLearnMoreLink(game);
}

function changeLearnMoreLink(game) {
    let learnMoreBtn = document.querySelector(".learn_more_btn");
    learnMoreBtn.href = game.moreInfo;
    console.log(learnMoreBtn);
}

function changeGameVersion(versions, colors) {
    // Target games__info-item via games__info-text (parent) b/c games__info-item not unique
    let gameInfo = document.querySelector(".games__info-text").firstElementChild;
    removeChildren(gameInfo);

    // PSMD is a special case since it's title is not PMD, but issue is resolved with createVersion() later
    if (versions[0].toLowerCase() != "pokemon super mystery dungeon") {
        // Create brand
        let p = createItem("Pokemon Mystery Dungeon", "games__info-brand", "p");
        gameInfo.appendChild(p);
    }

    // Create and add version(s) of the game selected
    for (let i = 0; i < versions.length; i++) {
        // Create version - add the version, color, and text for each new element made
        let p = createItem(versions[i], "games__info-version", "p", colors[i]);

        // Insert into parent
        gameInfo.appendChild(p);
    }
}

function removeChildren(parent) {
    while (parent.lastElementChild) {
        parent.removeChild(parent.lastElementChild);
    }
}

function createItem(name, className, tag, color="none") {
    let elem = document.createElement(tag);
    if (color == "none") {
        // Create brand
        elem.classList.add(className);
    }
    else {
        // Create version
        elem.classList.add(className, `${className}--${color}`);
    }

    elem.textContent = name;

    return elem;
}

function changeCategoryInfo(releaseYrs, consoles, text) {
    let infoArr = [releaseYrs, consoles, text];
    let categoryInfo = document.querySelectorAll(".category-info");
    
    for (let i = 0; i < categoryInfo.length; i++) {
        categoryInfo[i].textContent = infoArr[i];
    }
}

main();