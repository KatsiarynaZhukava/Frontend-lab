window.addEventListener('DOMContentLoaded', (e) => {
    hiddenProducts = localStorage.hiddenProducts !== undefined ? JSON.parse(localStorage.hiddenProducts) : [];
    favouriteProducts = localStorage.favouriteProducts !== undefined ? JSON.parse(localStorage.favouriteProducts) : [];
    comparisonProducts = localStorage.comparisonProducts !== undefined ? JSON.parse(localStorage.comparisonProducts) : [];

    updateIconsState(hiddenProducts, `.${JS_TILE_ICON_DISPLAY_CLASSNAME}`);
    updateIconsState(favouriteProducts, `.${JS_TILE_ICON_FAVOURITE_CLASSNAME}`);
    updateIconsState(comparisonProducts, `.${JS_TILE_ICON_COMPARISON_CLASSNAME}`);

    let selectedFilterBtn = document.querySelector('.filtration__button-selected');
    if (selectedFilterBtn) {
        renderTiles(selectedFilterBtn.dataset.filtertype);
    }

    function updateIconsState(array, iconSelector) {
        let tiles = document.querySelectorAll('.tiles__tile');

        tiles.forEach(function (tile) {
            if (array.includes(tile.dataset.productcode)) {
                let tileIcon = tile.querySelector(iconSelector);
                tileIcon.classList.add('tile__icon_selected');
            }
        });
    }
});

window.addEventListener('unload', (e) => {
    localStorage.hiddenProducts = JSON.stringify(hiddenProducts || []);
    localStorage.favouriteProducts = JSON.stringify(favouriteProducts || []);
    localStorage.comparisonProducts = JSON.stringify(comparisonProducts || []);
});
