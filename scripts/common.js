const TILE_HIDDEN_CLASSNAME = 'tile-hidden';
const TILE_TRANSPARENT_CLASSNAME = 'tile-transparent';
const FILTRATION_BTN_SELECTED_CLASSNAME = 'filtration__button-selected';

const JS_TILE_ICON_DISPLAY_CLASSNAME = 'js-tile__icon-display';
const JS_TILE_ICON_FAVOURITE_CLASSNAME = 'js-tile__icon-favourite';
const JS_TILE_ICON_COMPARISON_CLASSNAME = 'js-tile__icon-comparison';

const FILTER_OPTION_ALL = 'all';
const FILTER_OPTION_FAVOURITE = 'favourite';
const FILTER_OPTION_COMPARISON = 'comparison';

let hiddenProducts;
let favouriteProducts;
let comparisonProducts;
let filterTypeMap;

const renderTiles = (filterType) => {
    let tiles = document.querySelectorAll('.tiles__tile');
    let productsToDisplay;

    switch (filterType) {
        case FILTER_OPTION_ALL:
            productsToDisplay = Array.from(tiles, tile => tile.dataset.productcode);
            break;
        case FILTER_OPTION_FAVOURITE:
            productsToDisplay = favouriteProducts;
            break;
        case FILTER_OPTION_COMPARISON:
            productsToDisplay = comparisonProducts;
            break;
    }

    tiles.forEach(function (tile) {
        let productCode = tile.dataset.productcode;

        if (productsToDisplay.includes(productCode)) {
            if (hiddenProducts.includes(productCode)) {
                tile.classList.add(TILE_TRANSPARENT_CLASSNAME);
                let showHiddenCheckbox = document.querySelector("#checkbox-show-hidden");
                if (showHiddenCheckbox && !showHiddenCheckbox.checked) {
                    tile.classList.add(TILE_HIDDEN_CLASSNAME);
                } else {
                    tile.classList.remove(TILE_HIDDEN_CLASSNAME);
                }
            } else {
                tile.classList.remove(TILE_TRANSPARENT_CLASSNAME, TILE_HIDDEN_CLASSNAME);
            }
        } else {
            tile.classList.add(TILE_HIDDEN_CLASSNAME);
        }
    });
}