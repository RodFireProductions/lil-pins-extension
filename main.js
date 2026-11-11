
;(function main() {
    "use strict"

    let URL;
    browser.storage.local.get("lil-pins-url", (obj) => {
        URL = obj["lil-pins-url"];
        document.getElementById("lil-pins-form").action = URL + "/?p=extension";
    });

    function closeOverlay() {
        let el = document.getElementById("lil-pins");
        document.body.removeChild(el);
    };

    if (document.getElementById("lil-pins")) {
        closeOverlay();
    };

    function setCSS(el, css) {
        for (let i in css) {
            el.style[i] = css[i];
        };
    };

    function createView() {
        let style = document.createElement("style");
        style.innerHTML = `
            label.lil-pins:has(input:checked) {
                border: #EFECEF solid 2px !important;
            }`;

        let base = document.createElement("div");
        base.id = "lil-pins";
        setCSS(base, {
            height: "100%",
            width: "100%",
            top: "0",
            background: "#2E2530",
            position: "absolute",
            "z-index": "100",
            overflow: "auto"
        });

        let form = document.createElement("form");
        form.id = "lil-pins-form";
        form.method = "post";
        form.target = "_blank";
        setCSS(form, {
            width: "90%",
            margin: "auto",
            display: "block"
        });
        let legend = document.createElement("legend");
        legend.innerHTML = "Add image to lil-pins";
        setCSS(legend, {
            color: "#EFECEF",
            "text-align": "center",
            "font-size": "2em",
            "margin": "5px 0px"
        });
        let grid = document.createElement("div");
        setCSS(grid, {
            "column-count": "4",
            "column-gap": "1em"
        });

        for (let img in images) {
            let label = document.createElement("label");
            label.classList.add("lil-pins");
            setCSS(label, {
                cursor: "pointer",
                border: "#8C7B8E solid 2px",
                padding: "5px",
                "break-inside": "avoid",
                display: "block",
                "margin-bottom": "1em"
            });
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "image";
            input.value = images[img];
            input.required = "true";
            setCSS(input, { display: "none" });
            let image = document.createElement("img");
            image.src = images[img];
            image.loading = "lazy";
            setCSS(image, { width: "100%" });

            label.appendChild(input);
            label.appendChild(image);
            grid.appendChild(label);
        };

        let src = document.createElement("input");
        src.value = window.location.href;
        src.name = "source";
        setCSS(src, { display: "none" });

        let submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Submit";
        setCSS(submit, {
            background: "#C2B8C4",
            color: "#2E2530",
            border: "none",
            "border-radius": "15px",
            padding: "5px 10px",
            display: "block",
            margin: "1em auto",
            cursor: "pointer",
            "font-size": "1em"
        });
        let close = document.createElement("button");
        close.innerHTML = "Close";
        close.addEventListener("click", closeOverlay);
        setCSS(close, {
            background: "#C2B8C4",
            color: "#2E2530",
            border: "none",
            "border-radius": "15px",
            padding: "5px 10px",
            display: "block",
            margin: "1em auto",
            cursor: "pointer",
            "font-size": "1em"
        });

        //
        form.appendChild(legend);
        form.appendChild(grid);
        form.appendChild(src);
        form.appendChild(submit);
        base.appendChild(form);
        base.appendChild(close);
        base.appendChild(style);
        document.body.appendChild(base);
    };

    let images = [];
    let regex = /url[(]"([^"]+)"[)]/
    function findImages() {
        let imgs = document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].src != window.location.href) {
                images.push(imgs[i].src);
            };
        };
        ["body", "div", "td"].forEach((item, j) => {
            let el = document.getElementsByTagName(item);
            for (let i = 0; i < el.length; i++) {
                let img = regex.exec(el[i].style.backgroundImage);
                if (img) {
                    images.push(img[1]);
                };
            };
        });
    };

    findImages();
    createView();

})();
