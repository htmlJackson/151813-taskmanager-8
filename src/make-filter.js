export default (caption, amount, isDisabled = false, isChecked = false) =>
  `<input type="radio" id="filter__${caption}" class="filter__input visually-hidden" name="filter" ${isChecked ? ` checked` : ``} ${isDisabled ? ` disabled` : ``}>
   <label for="filter__${caption}" class="filter__label">${caption.toUpperCase()} <span class="filter__all-count">${amount}</span></label>`;
