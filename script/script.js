const container = document.querySelector('#visit-board');
const modal = document.querySelector('#modal');
let cards = document.getElementsByClassName('card');

class Visit {
    constructor(purpose, date, fullName, comment) {
        this._purpose = purpose;
        this._date = date;
        this._fullName = fullName;
        this._comment = comment;
    }


    createCard() {
        let card = document.createElement('div');
        card.className = 'card';
        let id = parseInt(Math.random()*(999999-100000)+100000);
        card.setAttribute('data-id',id);
        if( this.__proto__.constructor.name === 'Cardiologist'){
            card.innerHTML = `<div class="card-title">
                <p class="card-title-name full-name">${this._fullName}</p>
                <p class="card-title-name doctor">Кардиолог</p>
            </div>
            <div class="close-button">X</div>
            <div class="hidden-text">
                <p class="hidden-text-item">Цель визита: <span class="hidden-text-item-value">${this._purpose}</span></p>
                <p class="hidden-text-item">Дата визита: <span class="hidden-text-item-value">${this._date}</span></p>
                <p class="hidden-text-item">Обычное давление: <span class="hidden-text-item-value">${this._pressure}</span></p>
                <p class="hidden-text-item">Индекс массы тела: <span class="hidden-text-item-value">${this._massIndex}</span></p>
                <p class="hidden-text-item">Перенесенные заболевания сердечно-сосудистой системы: <span class="hidden-text-item-value">${this._diseases}</span></p>
                <p class="hidden-text-item">Возраст: <span class="hidden-text-item-value">${this._age}</span></p>
                <p class="hidden-text-item">Допонительные комментарии: <span class="hidden-text-item-value">${this._comment}</span></p>
            </div>
            <p class="show-more">Показать/Скрыть</p>`;
            container.appendChild(card);
            localStorage.setItem(`${id}`, card.outerHTML);
            dragAndDrop();
            onclickCard();
        }else if( this.__proto__.constructor.name === 'Dentist'){
            card.innerHTML = ` <div class="card-title">
                <p class="card-title-name full-name">${this._fullName}</p>
                <p class="card-title-name doctor">Стоматолог</p>
            </div>
            <div class="close-button">X</div>
            <div class="hidden-text">
                <p class="hidden-text-item">Цель визита: <span class="hidden-text-item-value">${this._purpose}</span></p>
                <p class="hidden-text-item">Дата визита: <span class="hidden-text-item-value">${this._date}</span></p>
                <p class="hidden-text-item">Дата последнего посещения: <span class="hidden-text-item-value">${this._lastVisit}</span></p>
                <p class="hidden-text-item">Допонительные комментарии: <span class="hidden-text-item-value">${this._comment}</span></p>
            </div>
            <p class="show-more">Показать/Скрыть</p>`;
            container.appendChild(card);
            localStorage.setItem(`${id}`, card.outerHTML);
            dragAndDrop();
            onclickCard();
        }else if( this.__proto__.constructor.name === 'Therapist'){
            card.innerHTML = ` <div class="card-title">
                <p class="card-title-name full-name">${this._fullName}</p>
                <p class="card-title-name doctor">Терапевт</p>
            </div>
            <div class="close-button">X</div>
            <div class="hidden-text">
                <p class="hidden-text-item">Цель визита: <span class="hidden-text-item-value">${this._purpose}</span></p>
                <p class="hidden-text-item">Дата визита: <span class="hidden-text-item-value">${this._date}</span></p>
                <p class="hidden-text-item">Возраст: <span class="hidden-text-item-value">${this._age}</span></p>
                <p class="hidden-text-item">Допонительные комментарии: <span class="hidden-text-item-value">${this._comment}</span></p>
            </div>
            <p class="show-more">Показать/Скрыть</p> `;
            container.appendChild(card);
            localStorage.setItem(`${id}`, card.outerHTML);
            dragAndDrop();
            onclickCard();
        }

    }

    static deletingFields() {
        const inputs = document.getElementById("modal-form").getElementsByTagName('P');

        Array.from(inputs).forEach(function (e) {
            e.remove();
        });
    }

    static ModalFields (fields) {

        const form = document.getElementById('modal-form');

        this.deletingFields();

        for (let field in fields) {
            const para = document.createElement("p");
            para.className = 'input-wrapper';

            const node = document.createTextNode(fields[field].content);
            para.appendChild(node);

            let input;
            if (fields[field].type === 'input') {
                input = document.createElement("INPUT");
                input.setAttribute("type", "text");
                input.setAttribute("required", fields[field].required);
                input.className = 'active';
            } else {
                input = document.createElement('textarea');
                input.setAttribute("maxlength", fields[field].maxlength);
                input.setAttribute("rows", fields[field].rows);
                input.className = 'active';
            }
            para.appendChild(input);
            form.appendChild(para);
        }

        if (fields.length) {
            const para = document.createElement("p");
            para.className = 'input-wrapper';

            let input = document.createElement("INPUT");
            input.setAttribute("type", "submit");
            input.setAttribute("value", "Create");
            input.setAttribute("id", "submitButton");
            input.setAttribute("name", "createCardBtn");
            input.setAttribute("required", "true");
            input.className = 'active';

            input.addEventListener("click", this.createVisit, false);

            para.appendChild(input);
            form.appendChild(para);
        }
    }

    static getFieldValues () {
        let values = [];
        const fields = document.getElementById("modal-form").elements;

        for (let field in fields) {
            if (fields[field].id === 'submitButton') continue;
            if (fields[field].value === undefined || fields[field].value === '') continue;

            values.push(fields[field].value);
        }
        return values;
    }

    static createVisit = () => {

        let newVisit;
        let values = this.getFieldValues();

        if (this._select.value === 'cardiologist') {
            if (values.length === Cardiologist.FIELDS.length) {
                newVisit = new Cardiologist(
                    values[0],
                    values[1],
                    values[2],
                    values[3],
                    values[4],
                    values[5],
                    values[6],
                    values[7]
                );
            }
        } else if (this._select.value === 'dentist') {
            if (values.length === Dentist.FIELDS.length) {
                newVisit = new Dentist(
                    values[0],
                    values[1],
                    values[2],
                    values[3],
                    values[4]
                );
            }

        } else if (this._select.value === 'therapist') {
            if (values.length === Therapist.FIELDS.length) {
                newVisit = new Therapist(
                    values[0],
                    values[1],
                    values[2],
                    values[3],
                    values[4]
                );
            }
        }

        if (newVisit) {
            newVisit.createCard();
            closeModalWindow();
        }
        return false;
    };

    static createModal() {

        const modal = document.querySelector('#modal');
        modal.className = "modal active";

        this._select = document.getElementById('modalSelect');

        this._select.onchange = () => {
            if (this._select.value === 'cardiologist') {
                this.ModalFields(Cardiologist.FIELDS)
            } else if (this._select.value === 'dentist') {
                this.ModalFields(Dentist.FIELDS);
            } else if (this._select.value === 'therapist') {
                this.ModalFields(Therapist.FIELDS);
            } else {
                this.ModalFields([]);
            }
        };


    };
}


class Cardiologist extends Visit{

    constructor(purpose, date, fullName, pressure, massIndex, diseases, age, comment) {
        super(purpose, date, fullName, comment);

        this._pressure = pressure;
        this._massIndex = massIndex;
        this._diseases = diseases;
        this._age = age;
    }


    static FIELDS = [
        {type:'input', content: 'Цель визита', required: true},
        {type:'input', content: 'Дата визита', required: true},
        {type:'input', content: 'ФИО пациента', required: true},

        {type:'input', content: 'Обычное давление', required: true},
        {type:'input', content: 'Индекс массы тела', required: true},
        {type:'input', content: 'Перенесенные заболевания сердечно-сосудистой системы', required: true},
        {type:'input', content: 'Возраст', required: true},
        {type:'textarea', maxlength: '400', rows: 5, content: 'Допонительные комментарии', required: true}

    ]

}

class Dentist extends Visit{
    constructor(purpose, date, fullName, lastVisit, comment = '') {
        super(purpose, date, fullName, comment);

        this._lastVisit = lastVisit;
    }

    static FIELDS = [
        {type:'input', content: 'Цель визита', required: true},
        {type:'input', content: 'Дата визита', required: true},
        {type:'input', content: 'ФИО пациента', required: true},

        {type:'input', content: 'Дата последнего посещения', required: true},
        {type:'textarea', maxlength: '400', rows: 5, content: 'Допонительные комментарии', required: true}
    ]

}

class Therapist extends Visit{
        constructor(purpose, date, fullName, age, comment = '') {
        super(purpose, date, fullName, comment);

        this._age = age;
    }
    static FIELDS = [
        {type:'input', content: 'Цель визита', required: true},
        {type:'input', content: 'Дата визита', required: true},
        {type:'input', content: 'ФИО пациента', required: true},

        {type:'input', content: 'Возраст', required: true},
        {type:'textarea', maxlength: '400', rows: 5, content: 'Допонительные комментарии', required: true}
    ]
}

const ready = function() {

    modal.onclick =function (e) {
        if (e.target.id === 'modalCloseBtn') {
            closeModalWindow();
        }
    };

    document.addEventListener("click", function(event) {
        if (event.target.id !== 'createBtn' && event.target.closest(".modal") === null) {
            modal.className = 'modal';
        }
    });

    const createBtn = document.querySelector('#createBtn');
    createBtn.onclick = function () {
        Visit.createModal();
    };
    showReloadCard();
    dragAndDrop();
    onclickCard();
};

ready();

function showReloadCard() {
    let length = localStorage.length;
    if(!length){
        document.querySelector('.empty-board.hidden').className = 'empty-board';
    }
    for (let i=0; i<length; i++){
        let key = localStorage.key(i);
        let card = localStorage.getItem(key);
        container.innerHTML +=card;

    }

}


function onclickCard(){
    let card = document.querySelectorAll('.card');
    if(cards.length){
        for (let i = 0; i<cards.length; i++){
            cards[i].onclick = function (e) {
                if(e.target.className ==="close-button"){
                    let selectCard = e.target.parentNode;
                    localStorage.removeItem(selectCard.dataset.id);
                    selectCard.remove();
                    if(!cards.length) {
                        let empty = document.querySelector('.empty-board.hidden');
                        empty.className = 'empty-board';
                    }
                }
                if (e.target.className === 'show-more'){
                    let hiddenText = e.currentTarget.children[2];
                    if(hiddenText.className === "hidden-text"){
                        hiddenText.className = "hidden-text show-text"
                    }else if(hiddenText.className === "hidden-text show-text"){
                        hiddenText.className = "hidden-text"
                    }

                }
            };

        }
    }

}

function closeModalWindow(){
    modal.className = 'modal';
}


function dragAndDrop(){
    let cardRowMargins = [20, 205, 385, 565];
    let j = 0, topMargin = 10;
    let cardWidth = 0;
    let cardHeight = 0;


    if (cards.length) {
        let emptyBoard = document.getElementsByClassName('empty-board');
        let visitBoard = document.getElementsByClassName('visit-board');

        cardWidth = cards[0].offsetWidth;
        cardHeight = cards[0].offsetHeight;

        if (emptyBoard.length) {
            emptyBoard[0].className = 'empty-board hidden';
        }
        if (visitBoard.length) {
            let x = Math.ceil(cards.length/4);
            visitBoard[0].style = 'height:' + ((x*360)+x*40) + 'px;';
        }

    }

    Array.from(cards).forEach(function (card, i) {
        if (i > 0 && i%4 === 0) {
            j = 0;
            topMargin += 200;
        }
        card.style = 'top: ' + topMargin + 'px;left: '+ cardRowMargins[j] + 'px;';
        j++;
        dragElement(card);


        card.addEventListener("mousedown", function(){
            Array.from(cards).forEach(function (card) {
                card.style = card.style.cssText + ';z-index:2;';
            });
            this.style = card.style.cssText + '; z-index:5;';
        }, false)
    });

    const leftBorder = 0;
    const rightBorder = leftBorder + document.getElementById("visit-board").offsetWidth;

    const topBorder = 0;
    const downBorder = topBorder + document.getElementById("visit-board").offsetHeight;


    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let left = (elmnt.offsetLeft - pos1);
            let right = left + cardWidth;
            let top = (elmnt.offsetTop - pos2);
            let down = top + cardHeight;

            if (left > leftBorder && right < rightBorder && top > topBorder && down < downBorder) {
                elmnt.style.top = top + "px";
                elmnt.style.left = left + "px";
            }
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


}
