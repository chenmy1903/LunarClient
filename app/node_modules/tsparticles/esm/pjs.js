const initPjs = (main) => {
    const particlesJS = (tagId, options) => {
        return main.load(tagId, options);
    };
    particlesJS.load = (tagId, pathConfigJson, callback) => {
        main.loadJSON(tagId, pathConfigJson)
            .then((container) => {
            if (container) {
                callback(container);
            }
        })
            .catch(() => {
            callback(undefined);
        });
    };
    particlesJS.setOnClickHandler = (callback) => {
        main.setOnClickHandler(callback);
    };
    const pJSDom = main.dom();
    return { particlesJS, pJSDom };
};
export { initPjs };
