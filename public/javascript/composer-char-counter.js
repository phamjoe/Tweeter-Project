$(document).ready(() => {
  $('textarea').on('input', function() {
    const elementLength = $(this).val().length;
    const counter = $(this)
      .parent()
      .find('.counter');
    const btn = $(this)
      .parent()
      .find('.btn-send');
    const maxLength = 140;
    const char = maxLength - elementLength;
    if (elementLength > maxLength) {
      counter.html(`${char} you have reached the limit`).addClass('text-msg');
      btn.prop('disabled', true);
    } else {
      counter.html(`${char} characters left`).removeClass('text-msg');
      btn.prop('disabled', false);
    }
  });
});
