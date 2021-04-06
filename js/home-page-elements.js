function addPageElements() {
    tools['AnySection'] = new WebToolFrame('AnySection');
    tools['AnySection'].banner = "images/Anysection.png";
    tools['AnySection'].captions = [
        'A powerful web tool for calculating phisical and mechanical properties of standard geometry bars.',
        'Can be used by designers and engineers as a quick estimation tool, as well as by students as a geometry tool, or simply to find material data from the database'
    ];
    tools['AnySection'].link = 'https://terriblecoding.github.io/AnySection';
    tools['AnySection'].images.path = 'images/';
    tools['AnySection'].images.prefix = 'Anysection-screenshot-';
    tools['AnySection'].images.name = ['01', '02', '03'];
    tools['AnySection'].images.extension = 'png';
    tools['AnySection'].generate(document.getElementById('web-tools-container'));
}

class WebToolFrame {
    constructor(name) {
        this.name = name; //string
        this.banner = ''; //percorso banner tool
        this.captions = []; //paragrafi di descrizione
        this.link = ''; //link al tool
        this.images = {
            path: '', //percorso comune screenshot (controllare '/' quando si unisce)
            prefix: '', //prefisso immagini (se è comune per tutte le immagini)
            name: [], //array con i vari identificativi dell'immagine
            extension: '' //estensione (se è comune per tutte le immagini) - controllare se c'è il .
        }
        this.slideshow;
    }

    generate(parent, inverted = false) {
        // contenitore di tutto il frame
        let container = createDiv();
        container.addClass('container');
        if (parent != null) { container.parent(parent) }

        // elemento contenitore descrizioni
        let captions = createDiv();
        captions.addClass('child');
        captions.parent(container);
        let banner = createImg(this.banner, this.name);
        banner.addClass('tool-logo');
        banner.parent(captions);
        for (let capt of this.captions) {
            let p = createP(capt);
            p.parent(captions);
        }
        let link = createA(this.link, '', '_blank');
        link.parent(captions);
        let button = createButton('Use tool!');
        button.parent(link);

        // elemento contenitore slideshow
        let imagesSide = createDiv();
        imagesSide.addClass('child');
        if (inverted) { imagesSide.style('order', '-1') }
        imagesSide.parent(container);
        this.slideshow = new HybridSlideshow(this.name, this.combinePaths());
        this.slideshow.generate(imagesSide);
        this.slideshow.updateAll();
    }

    combinePaths() { // funzione che restituisce un array dei percorsi delle immagini
        if (this.images.path.split('')[this.images.path.length - 1] != '/') { this.images.path += '/'; }
        if (this.images.extension.split('')[0] != '.') { this.images.extension = '.' + this.images.extension; }
        let result = [];
        for (let image of this.images.name) {
            let string = this.images.path + this.images.prefix + image + this.images.extension;
            result.push(string);
        }
        return result;
    }
}

class HybridSlideshow {
    constructor(name, paths) {
        this.name = name;
        this.paths = paths; //array
        this.pics = [];
        this.counter = 0;
        this.radioButtons = [];
        this.lArrow, this.rArrow;
    }

    generate(parent) {
        let imgContainer = createDiv();
        imgContainer.addClass('img-container');
        imgContainer.parent(parent);
        this.lArrow = createImg('icons/arrow.svg', 'back');
        // this.lArrow.addClass('slide');
        this.lArrow.attribute('onclick', 'tools["' + this.name + '"].slideshow.prev()');
        imgContainer.child(this.lArrow);
        for (let path of this.paths) {
            let pic = createImg(path, '');
            pic.addClass('slide');
            pic.parent(imgContainer);
            this.pics.push(pic);
        }
        this.rArrow = createImg('icons/arrow.svg', 'next');
        // this.rArrow.addClass('slide');
        this.rArrow.attribute('onclick', 'tools["' + this.name + '"].slideshow.next()');
        this.rArrow.style('transform', 'rotate(180deg)');
        imgContainer.child(this.rArrow);

        let radioContainer = createDiv();
        radioContainer.addClass('radio-container');
        radioContainer.parent(parent);
        for (let i = 0; i < this.pics.length; i++) {
            let radio = createDiv();
            radio.addClass('radio-child');
            // radio.attribute('index', i);
            radio.attribute('onclick', 'tools["' + this.name + '"].slideshow.goToPic(' + i + ')');
            radio.parent(radioContainer);
            this.radioButtons[i] = radio;
        }
    }

    updateAll() {
        tools[this.name].slideshow.updateImage();
        tools[this.name].slideshow.updateRadio();
        if (tools[this.name].slideshow.counter == 0) {
            tools[this.name].slideshow.lArrow.style('visibility', 'hidden');
        } else {
            tools[this.name].slideshow.lArrow.style('visibility', 'visible');
        }
        if (tools[this.name].slideshow.counter == this.pics.length - 1) {
            tools[this.name].slideshow.rArrow.style('visibility', 'hidden');
        } else {
            tools[this.name].slideshow.rArrow.style('visibility', 'visible');
        }
    }

    updateImage() {
        for (let e of this.pics) { e.hide(); }
        this.pics[this.counter].show();
    }

    updateRadio() {
        for (let e of this.radioButtons) { e.removeClass('selected'); }
        this.radioButtons[this.counter].addClass('selected');
    }

    next() {
        tools[this.name].slideshow.counter++;
        tools[this.name].slideshow.updateAll();
    }

    prev() {
        tools[this.name].slideshow.counter--;
        tools[this.name].slideshow.updateAll();
    }

    goToPic(index) {
        tools[this.name].slideshow.counter = index;
        tools[this.name].slideshow.updateAll();
    }
}