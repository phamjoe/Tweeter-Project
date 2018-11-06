$(document).ready(() => {
  // get DOM elements
  const myForm = $('.new__tweet__form');
  const newTweetSection = myForm.parent();
  const formText = myForm.children('textarea');
  const counter = myForm.find('.counter');
  const errorMsg = myForm.parent().find('#error');
  const tweets = document.querySelector('.tweets-wrapper');
  const composeTweet = $('.btn');

  // Toggle form display
  composeTweet.click(() => {
    newTweetSection.slideToggle();
    // when the page loads focus on the input field
    formText.focus();
  });

  function calcDateDiff(date) {
    const today = new Date();
    const givenDate = new Date(date);
    const timeDiff = Math.abs(today.getTime() - givenDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
  }

  const escape = str => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const generateHTML = tweet => `
    <article class="tweets__new">
      <header class="tweets__new__hd">
        <div class="tweets__new__hd__wrap">
          <img src="${tweet.user.avatars.small}" />
          <h2>${tweet.user.name}</h2>
        </div>
        <p>${tweet.user.handle}</p>
      </header>
      <main class="tweets__new__mn">
        <p>
        ${escape(tweet.content.text)}
        </p>
      </main>
      <footer class="tweets__new__ft">
        <p>
        ${calcDateDiff(tweet.created_at)} days ago
        </p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;

  const loadTweets = () => {
    $.ajax({
      type: 'get',
      url: '/tweets',
      success(res) {
        const html = res.map(generateHTML).join('');
        tweets.innerHTML = html;
      },
    });
  };
  loadTweets();

  // add EventListener on submission
  myForm.submit(function(e) {
    // prevent default submission of the form
    e.preventDefault();
    if (formText.val().trim() !== '') {
      // Hide errorMSg
      errorMsg.hide();
      const serializeData = $(this).serialize();
      $.ajax({
        type: 'post',
        url: '/tweets',
        data: serializeData,
      }).then(result => {
        // Reset the form
        formText.val('');
        counter.html(140);
        loadTweets();
      });
    } else {
      errorMsg.slideDown();
    }
  });
});
