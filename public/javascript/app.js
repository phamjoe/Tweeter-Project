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

  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getMonthName = monthNum => monthList[monthNum - 1];

  const addDaySufix = dayNum => {
    let sufix = 'th';
    if (dayNum === 1 || dayNum === 21 || dayNum === 31) {
      sufix = 'st';
    } else if (dayNum === 2 || dayNum === 22) {
      sufix = 'nd';
    } else if (dayNum === 3 || dayNum === 23) {
      sufix = 'rd';
    }
    return dayNum + sufix;
  };

  const talkingCalendar = date => {
    const givenDate = new Date(date);
    const day = givenDate.getDay();
    const month = givenDate.getMonth();
    const year = givenDate.getFullYear();
    const hours = givenDate.getHours();
    const minutes = givenDate.getMinutes();
    return `${hours}:${minutes} - ${getMonthName(month)} ${addDaySufix(
      day
    )}, ${year}`;
  };

  const escape = str => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const generateHTML = tweet => `
    <article class="tweets__new">
      <header class="tweets__new__hd">
        <img src="${tweet.user.avatars.small}" alt="user profile"/>
        <div class="tweets__new__hd__profile-name">
          <h3>${tweet.user.name}</h3>
          <h4>${tweet.user.handle}</h4>
        </div>
      </header>
      <main class="tweets__new__main-content">
        <p>
        ${escape(tweet.content.text)}
        </p>
        <span class="date">
        ${talkingCalendar(tweet.created_at)}
        </span>
        <hr/>
      </main>
      <footer class="tweets__new__ft">
        <div class="tweets__new__ft__stats">
          <div class="Retweets">
            <strong>0</strong> Retweets
          </div>
          <div class="likes">
            <strong>0</strong> Likes
          </div>
        </div>
        <div class="tweets__new__ft__icons">
          <i class="fas fa-flag"></i>
          <span class="visuallyhidden">Flag</span>
          <i class="fas fa-retweet"></i>
          <span class="visuallyhidden">Retweet</span>
          <i class="fas fa-heart"></i>
          <span class="visuallyhidden">Heart</span>
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
