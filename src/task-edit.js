import Util from './util.js';

class TaskEdit {
  constructor(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._dateString = data.dateString;
    this._time = data.time;

    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick() {
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  get hashtagsMarkdown() {
    const hashtags = [...this._tags].map((it) => {
      return `
      <span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
        <button type="button" class="card__hashtag-name">
          #${it}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
      `;
    }).join(``);

    return hashtags;
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>

                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="${this._dateString}" name="date" value="${this._dateString}">
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="${this._time}" name="time" value="${this._time}">
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-4" name="repeat" value="mo">
                    <label class="card__repeat-day" for="repeat-mo-4">mo</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-4" name="repeat" value="tu" checked="">
                    <label class="card__repeat-day" for="repeat-tu-4">tu</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-4" name="repeat" value="we">
                    <label class="card__repeat-day" for="repeat-we-4">we</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-4" name="repeat" value="th">
                    <label class="card__repeat-day" for="repeat-th-4">th</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-4" name="repeat" value="fr" checked="">
                    <label class="card__repeat-day" for="repeat-fr-4">fr</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-4">
                    <label class="card__repeat-day" for="repeat-sa-4">sa</label>
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-4" name="repeat" value="su" checked="">
                    <label class="card__repeat-day" for="repeat-su-4">su</label>
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this.hashtagsMarkdown}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                </label>
              </div>
            </div>

            <label class="card__img-wrap">
              <input type="file" class="card__img-input visually-hidden" name="img">
              <img src="${this._picture}" alt="task picture" class="card__img">
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-4" class="card__color-input card__color-input--black visually-hidden" name="color" value="black">
                <label for="color-black-4" class="card__color card__color--black">black</label>
                <input type="radio" id="color-yellow-4" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" checked="">
                <label for="color-yellow-4" class="card__color card__color--yellow">yellow</label>
                <input type="radio" id="color-blue-4" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
                <label for="color-blue-4" class="card__color card__color--blue">blue</label>
                <input type="radio" id="color-green-4" class="card__color-input card__color-input--green visually-hidden" name="color" value="green">
                <label for="color-green-4" class="card__color card__color--green">green</label>
                <input type="radio" id="color-pink-4" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
                <label for="color-pink-4" class="card__color card__color--pink">pink</label>
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__save`)
    .addEventListener(`click`, this._onSubmitButtonClick.bind(this));
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = Util.createElement(this.template);
    container.appendChild(this._element);

    this.bind();
  }

  unrender() {
    this._element = null;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

}

export {TaskEdit as default};
