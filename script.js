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
        this.initDraw(styleClass, blockSize, idSlider);
        this.idSlider = idSlider;
        this.blockSize = blockSize;
        this.styleClass = styleClass;
    }

    initDraw(styleClass, blockSize, idSlider) {
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
            item.classList.add(styleClass);
            item.style.left = offset * blockSize + 'px';
            offset++;
            items.append(item);
        }
        document.getElementById(idSlider).append(items);
        clickEventPhone();
    }

    moveRight(timeSlide, rightBtn) {
        rightBtn.onclick = null;
        const newSlides = document.getElementById('__thisWrapId').children;
        let newOffset = -1;
        Array.from(newSlides).forEach((item) => {
            item.style.left = newOffset * this.blockSize - this.blockSize + 'px';
            newOffset++;
        })
        this.draw();
        newSlides[0].remove();
        setTimeout(() => {
            rightBtn.onclick = this.moveRight.bind(this, timeSlide, rightBtn);
        }, timeSlide);
    }

    moveLeft(timeSlide, leftBtn) {
        leftBtn.onclick = null;
        const newSlides = document.getElementById('__thisWrapId').children;
        let newOffset = 1;
        for (let i = newSlides.length - 1; i >= 0; i--) {
            newSlides[i].style.left = newOffset * this.blockSize + this.blockSize + 'px';
            newOffset--;
        }
        this.draw(-1);
        newSlides[newSlides.length - 1].remove();
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
        item.style.left = direction * this.blockSize + 'px';
        if (direction === 1) {
            document.getElementById('__thisWrapId').append(item);
        } else {
            document.getElementById('__thisWrapId').prepend(item);
        }
        clickEventPhone();
    }
}

const rightBtn = document.getElementById('right');
const leftBtn = document.getElementById('left');
const slider = new Slider('containerSlides', 906, 'slide-item');
rightBtn.onclick = slider.moveRight.bind(slider, 700, rightBtn);
leftBtn.onclick = slider.moveLeft.bind(slider, 700, leftBtn);
