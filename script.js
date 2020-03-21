const NAV = document.getElementById('nav');
NAV.addEventListener('click', (e) => {
    const items = document.querySelectorAll('.header__nav_list a');
    items.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
})

const PROJECTS = document.getElementById('projects');
PROJECTS.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        return;
    }
    Array.from(PROJECTS.children).forEach(item => {
        item.classList.remove('project-border');
    });
    e.target.classList.add('project-border');
})

Array.from(document.getElementById('portfolioNav').children).forEach(item => {
    item.addEventListener('focus', () => {
        if (!item.classList.contains('portfolioFocus')) {
            item.classList.add('portfolioFocus');
            const length = PROJECTS.children.length;
            Array.from(PROJECTS.children).forEach(item => {
                item.style.order = Math.floor(Math.random() * length);
            });
        }
    });
    item.addEventListener('blur', () => {
        if (item.classList.contains('portfolioFocus')) {
            item.classList.remove('portfolioFocus');
        }
    })
})

document.getElementById('send').addEventListener('click', () => {
    document.getElementById('popUp').classList.add('pop-up-hidden');
    document.getElementById('theme').innerHTML = `Без темы`;
    document.getElementById('description').innerHTML = `Без описания`;
})

document.getElementById('formSubmit').addEventListener('click', (e) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pattern = /^[-\w.]+@([A-z0-9]){1,}$/;
    if (!name || !pattern.test(email)) {
        return;
    }

    const theme = document.getElementById('subject').value;
    if (theme) {
        document.getElementById('theme').innerHTML = `Тема: ${theme}`;
    }

    const textarea = document.getElementById('textarea').value;
    if (textarea) {
        document.getElementById('description').innerHTML = `Описание: ${textarea}`;
    }

    document.getElementById('popUp').classList.remove('pop-up-hidden');

    document.getElementById('subject').value = '';
    document.getElementById('textarea').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    e.preventDefault();
})

function clickEventPhone() {
    document.querySelectorAll('.vertical').forEach((item) => {
        item.onclick = () => {
            document.querySelectorAll('.vertical-click').forEach((elem) => {
                elem.classList.toggle('show-image');
            })
        }
    })
    document.querySelectorAll('.horizontal').forEach((item) => {
        item.onclick = () => {
            document.querySelectorAll('.horizontal-click').forEach((elem) => {
                elem.classList.toggle('show-image');
            })
        }
    })
}

class Slider {
    constructor(idSlider, blockSize, styleClass) {
        this.currentImg = 0;
        this.slider = [];
        const slides = document.getElementById(idSlider).children;
        Array.from(slides).forEach((item, index) => {
            this.slider[index] = item.innerHTML;
            item.remove();
        });
        this.length = this.slider.length;
        this.idSlider = idSlider;
        this.blockSize = blockSize;
        this.styleClass = styleClass;
        this.initDraw();
    }

    initDraw() {
        const items = document.createElement('div');
        items.id = '__thisWrapId';
        let offset = -1;
        for (let i = 0; i < 3; i++) {
            const item = document.createElement('div');
            if (offset < 0) {
                item.innerHTML = this.slider[this.length - 1];
            } else {
                item.innerHTML = this.slider[offset];
            }
            item.classList.add(this.styleClass);
            item.style.transform = `translate3d(${offset * this.blockSize}px, 0, 0)`;
            offset++;
            items.append(item);
        }
        document.getElementById(this.idSlider).append(items);
        clickEventPhone();
    }

    moveRight(timeSlide, rightBtn) {
        rightBtn.onclick = null;
        const newSlides = document.getElementById('__thisWrapId').children;
        let newOffset = -1;
        Array.from(newSlides).forEach((item) => {
            item.style.transform = `translate3d(${newOffset * this.blockSize - this.blockSize}px, 0, 0)`;
            newOffset++;
        })
        this.draw();
        newSlides[0].remove();
        newSlides[0].style.zIndex = 99;
        newSlides[1].style.zIndex = 9999;
        newSlides[2].style.zIndex = 99;
        setTimeout(() => {
            rightBtn.onclick = this.moveRight.bind(this, timeSlide, rightBtn);
        }, timeSlide);
    }

    moveLeft(timeSlide, leftBtn) {
        leftBtn.onclick = null;
        const newSlides = document.getElementById('__thisWrapId').children;
        let newOffset = 1;
        for (let i = newSlides.length - 1; i >= 0; i--) {
            newSlides[i].style.transform = `translate3d(${newOffset * this.blockSize + this.blockSize}px, 0, 0)`;
            newOffset--;
        }
        this.draw(-1);
        newSlides[newSlides.length - 1].remove();
        newSlides[0].style.zIndex = 99;
        newSlides[1].style.zIndex = 9999;
        newSlides[2].style.zIndex = 99;
        setTimeout(() => {
            leftBtn.onclick = this.moveLeft.bind(this, timeSlide, leftBtn);
        }, timeSlide);
    }

    draw(direction = 1) {
        const item = document.createElement('div');
        if (direction === 1) {
            this.currentImg++;
            if (this.currentImg >= this.length) {
                this.currentImg = 0;
            }
            if (this.currentImg + 1 === this.length) {
                item.innerHTML = this.slider[0];
            } else {
                item.innerHTML = this.slider[this.currentImg + 1];
            }
        } else {
            this.currentImg--;
            if (this.currentImg < 0) {
                this.currentImg = this.length - 1;
            }
            if (this.currentImg - 1 < 0) {
                item.innerHTML = this.slider[this.length - 1];
            } else {
                item.innerHTML = this.slider[this.currentImg - 1];
            }
        }
        item.classList.add(this.styleClass);
        item.style.transform = `translate3d(${direction * this.blockSize}px, 0, 0)`;
        if (direction === 1) {
            document.getElementById('__thisWrapId').append(item);
        } else {
            document.getElementById('__thisWrapId').prepend(item);
        }
        clickEventPhone();
    }

    setBlockSize(value) {
        this.blockSize = value;
        const newSlides = document.getElementById('__thisWrapId').children;
        newSlides[0].style.transform = `translate3d(${-value}px, 0, 0)`;
        newSlides[2].style.transform = `translate3d(${value}px, 0, 0)`;
    }
}

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
let slider = new Slider('containerSlides', 906, 'slide-item');
rightBtn.onclick = slider.moveRight.bind(slider, 700, rightBtn);
leftBtn.onclick = slider.moveLeft.bind(slider, 700, leftBtn);

window.onresize = () => {
    const curWidth = window.innerWidth;
    let widthSlider = 906;
    if (curWidth < 1020 && curWidth >= 768) {
        widthSlider = 700;
    } else if (curWidth < 768) {
        widthSlider = 360;
    }

    slider.setBlockSize(widthSlider);
}

const btnMenu = document.getElementById('menu');
const wrapNav = document.getElementById('wrapNav');
const nav = document.getElementById('nav');
const h1 = document.getElementById('h1');
btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('header__menu_click');
    wrapNav.classList.toggle('header__nav_click');
    nav.classList.toggle('header__nav_list_click');
    h1.classList.toggle('header__title_click');
})
