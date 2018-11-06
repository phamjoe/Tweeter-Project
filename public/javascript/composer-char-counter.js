$(document).ready(() => {
  $('textarea').on('input', function() {
    const elementLength = $(this).val().length;
    const counter = $(this)
      .parent()
      .find('.counter');
    const btn = $(this)
      .parent()
      .find('.btn-send');
    const maxLenght = 140;
    const char = maxLenght - elementLength;
    if (elementLength >= maxLenght) {
      counter.html(`${char} you have reached the limit`).addClass('text-msg');
      btn.prop('disabled', true);
    } else {
      counter.html(`${char} characters left`).removeClass('text-msg');
      btn.prop('disabled', false);
    }
  });
});
