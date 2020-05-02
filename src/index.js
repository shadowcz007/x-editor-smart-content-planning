/**
 * Build styles
 */
require('./index.css').toString();

const insignia = require("insignia/dist/insignia");
const Tagify = require("@yaireo/tagify");


const title = "内容规划";

class SmartContentPlanning {

    static get title() {
        return title;
    }

    static get enableLineBreaks() {
        return true;
    }

    static get toolbox() {
        return {
            title: title,
            icon: require('./../assets/icon.svg').default,
        };
    }

    constructor({ data, api }) {

        //定义数据结构
        this.data = data || {

        };

        this.api = api;
        this.wrapper = {
            block: document.createElement('div'),
            renderSettings: document.createElement('div')
        };

        this.index = this.api.blocks.getCurrentBlockIndex() + 1;

        this.tags = null;
        this.input = null;
        // this.settings = [{
        //     name: '图片描述',
        //     icon: require('./../assets/image.svg').default,
        //     action: () => {
        //         this.index = this.api.blocks.getCurrentBlockIndex();
        //         this.api.blocks.delete(this.index);
        //         this.api.blocks.insert("image", {
        //             url: this.data.url,
        //             caption: this.data.labels.length > 0 ? this.data.labels.join(",") : "",
        //             quote: true
        //         });
        //     }
        // }, ];


        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            button: this.api.styles.button,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,

            wrapperBlock: "smart-content-planning",
            tag: "tag",
            main: "main",
            addButton: "add",
            topic: "topic",

        }

    }

    render() {
        this.wrapper.block = this._createBlock();
        this._loading();
        this._finish();
        setTimeout(() => {
            this.api.blocks.insertNewBlock();
        }, 500);
        return this.wrapper.block;
    }

    _getRandomColor() {
        var rand = function(min, max) {
            return min + Math.random() * (max - min);
        }

        var h = rand(1, 360) | 0,
            s = rand(40, 70) | 0,
            l = rand(65, 72) | 0;

        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }

    renderSettings() {
        //console.log(this.renderSettings)
        this.wrapper.renderSettings = document.createElement('div');

        // let canvas = this.wrapper.block.querySelector("canvas");
        // // console.log(imgs)
        // if (canvas) {

        //     this.settings.forEach(item => {
        //         let button = document.createElement('div');
        //         button.classList.add(this.api.styles.settingsButton);

        //         button.innerHTML = item.icon;
        //         this.wrapper.renderSettings.appendChild(button);

        //         button.addEventListener('click', (e) => {
        //             e.preventDefault();
        //             item.action();
        //         });
        //     });

        // };

        return this.wrapper.renderSettings;
    }

    save(blockContent) {
        // let frames = [...blockContent.querySelectorAll('.frame img')];

        return this.data
    }

    validate(savedData) {
        if (!(savedData.url && savedData.width && savedData.height)) {
            return false;
        }
        return true;
    }


    _createBlock() {
        let block = document.createElement('div');
        block.classList.add(this.CSS.wrapperBlock);
        block.classList.add(this.CSS.tag);
        block.setAttribute("data-title", title);

        let div = document.createElement("div");
        div.classList.add(this.CSS.main);
        block.appendChild(div);

        this.input = document.createElement('input');
        div.appendChild(this.input);
        this.tags = insignia(this.input);
        this.api.listeners.on(this.input, "keypress", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault(); // prevent form submission
                e.stopPropagation();
                //console.log(this.tags.allValues())
                if (this.input.value.trim()) {
                    this.tags.addItem(this.input.value.trim());
                    this.input.value = "";
                };
            }
        });

        return block;
    }

    _getMain() {
        return this.wrapper.block.querySelector("." + this.CSS.main);
    }

    _loading() {
        let main = this._getMain();
        if (main) main.classList.add(this.CSS.loading);
    }

    _finish() {
        let main = this._getMain();
        if (main) main.classList.remove(this.CSS.loading);
    }

    _createTopic(keyword = "") {
        let div = document.createElement("span");
        div.classList.add(this.CSS.topic);
        div.setAttribute("contenteditable", true);


        if (keyword == "") {

            div.setAttribute("place-holder", "输入关键词");
        } else {
            div.innerText = keyword;
        }

        this.api.listeners.on(div, 'click', (e) => {
            //console.log(e);
            e.preventDefault();

            div.focus();
        });
        return div;
    }



}


module.exports = SmartContentPlanning;