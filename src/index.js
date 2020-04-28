/**
 * Build styles
 */
require('./index.css').toString();

const insignia = require("insignia/dist/insignia");

const title = "内容规划";

class SmartContentPlanning {

    static get title() {
        return title;
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
        let main = this._getMain();

        const topics = insignia(main);
        topics.on('add', data => console.log(data)); // listen to an event
        topics.once('invalid', data => {
            throw new Error('invalid data');
        }); // listener discarded after one execution

        topics.on('add', added);
        topics.off('add', added); // removes `added` listener

        function added(data) {
            console.log(data);
        }

        this._finish();

        return this.wrapper.block;
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