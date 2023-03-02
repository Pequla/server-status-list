export default {
    addToFavourites(addr) {
        if (this.isSaved(addr)) return;

        const fav = localStorage.getItem('favourites');
        let arr = []
        if (fav) arr = JSON.parse(fav);

        arr.push(addr);
        localStorage.setItem('favourites', JSON.stringify(arr));
    },
    removeToFavourites(addr) {
        if (!this.isSaved(addr)) return;

        const fav = localStorage.getItem('favourites');
        let arr = []
        if (fav) arr = JSON.parse(fav);

        arr = arr.filter(item => item !== addr)
        localStorage.setItem('favourites', JSON.stringify(arr));
    },
    isSaved(addr) {
        const fav = localStorage.getItem('favourites');
        return !!(fav && JSON.parse(fav).includes(addr));
    }
}