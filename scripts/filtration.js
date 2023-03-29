function init() {
    filterTypeMap = new Map([['all', hiddenProducts], ['favourite', favouriteProducts], ['comparison', comparisonProducts]]);

    const filtrationBtnAll = document.querySelector(".js-filtration__button-all");
    const filtrationBtnFavourites = document.querySelector(".js-filtration__button-favourites");
    const filtrationBtnComparison = document.querySelector(".js-filtration__button-comparison");
    const showHiddenCheckbox = document.querySelector("#checkbox-show-hidden");

    const filter = (e) => {
        let _target = e.target;

        if (_target.classList.contains('filtration__button') && !_target.classList.contains(FILTRATION_BTN_SELECTED_CLASSNAME)) {
            document.querySelectorAll('[class*=js-filtration__button]').forEach(function (button) {
                if (button.dataset.filtertype === _target.dataset.filtertype) {
                    button.classList.add(FILTRATION_BTN_SELECTED_CLASSNAME);
                } else {
                    button.classList.remove(FILTRATION_BTN_SELECTED_CLASSNAME);
                }
            });

            renderTiles(_target.dataset.filtertype);
        }
    }

    const toggleHiddenTilesVisibility = (e) => {
        document.querySelectorAll('.tiles__tile.' + TILE_TRANSPARENT_CLASSNAME).forEach(function (tile) {
            let selectedFiltrationBtn = document.querySelector(`.${FILTRATION_BTN_SELECTED_CLASSNAME}`);
            if (selectedFiltrationBtn) {
                let productsToDisplay = filterTypeMap.get(selectedFiltrationBtn.dataset.filtertype);
                if (productsToDisplay && productsToDisplay.includes(tile.dataset.productcode)) {
                    tile.classList.toggle(TILE_HIDDEN_CLASSNAME);
                }
            }
        });
    }

    /**
     * Checks if the event target is an icon or its wrapper and if so:
     * 1. modifies corresponding array by adding or removing the product code of the tile from the array
     * 2. modifies icon style to indicate change of its state
     * 3. hide tile in case the clicked icon corresponds to the current filtration type
     * 4. in case the clicked icon is a 'display' one, we make the tile transparent and if checkbox is not checked, hide it
     * @param {Event} e triggered event
     */
    const handleIconBtnClick = (e) => {
        let _target = e.target;

        if (!(_target.classList.contains('js-tile__icon') || _target.parentElement.classList.contains('js-tile__icon'))) {
            return;
        }
        let tileIcon = _target.closest('.js-tile__icon');

        let iconTypeIndicatingClass = Array.from(tileIcon.classList).find((className) => className.startsWith('js-tile__icon-'));
        switch (iconTypeIndicatingClass) {
            case JS_TILE_ICON_DISPLAY_CLASSNAME:
                handleIconBtnClickInner(tileIcon, hiddenProducts);

                let tile = tileIcon.closest('div[class*=tiles__tile]');
                tile.classList.toggle(TILE_TRANSPARENT_CLASSNAME);
                if (!showHiddenCheckbox.checked) {
                    tile.classList.toggle(TILE_HIDDEN_CLASSNAME);
                }
                break;

            case JS_TILE_ICON_FAVOURITE_CLASSNAME:
                handleIconBtnClickInner(tileIcon, favouriteProducts,
                    filtrationBtnFavourites.classList.contains(FILTRATION_BTN_SELECTED_CLASSNAME));
                break;

            case JS_TILE_ICON_COMPARISON_CLASSNAME:
                handleIconBtnClickInner(tileIcon, comparisonProducts,
                    filtrationBtnComparison.classList.contains(FILTRATION_BTN_SELECTED_CLASSNAME));
        }

        function handleIconBtnClickInner(tileIcon, array, shouldHideTile) {
            let tile = tileIcon.closest('div[class*=tiles__tile]');

            modifyCorrespondingArray(array, tile);
            modifyTileIcon(tileIcon);

            if (shouldHideTile) {
                tile.classList.add(TILE_HIDDEN_CLASSNAME);
            }
        }

        /**
         * Adds or removes the product code of the given tile from the given global products array
         * @param array the array to modify
         * @param {Element} tile
         */
        function modifyCorrespondingArray(array, tile) {
            let productCode = tile.dataset.productcode;

            if (array.includes(productCode)) {
                array.splice(array.indexOf(productCode), 1);
            } else {
                array.push(productCode);
            }
        }

        function modifyTileIcon(tileIcon) {
            tileIcon.classList.toggle('tile__icon_selected');
        }
    }

    filtrationBtnAll.addEventListener('click', filter);
    filtrationBtnFavourites.addEventListener('click', filter);
    filtrationBtnComparison.addEventListener('click', filter);
    showHiddenCheckbox.addEventListener('change', toggleHiddenTilesVisibility);

    document.querySelectorAll('.js-tile__icons-container').forEach(
        (iconsContainer) => iconsContainer.addEventListener('click', handleIconBtnClick));
}

window.addEventListener('DOMContentLoaded', (e) => {
    init();
});