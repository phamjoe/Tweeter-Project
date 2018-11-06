$(document).ready(() => {
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: {
          small:
            'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
          regular:
            'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
          large:
            'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png',
        },
        handle: '@SirIsaac',
      },
      content: {
        text:
          'If I have seen further it is by standing on the shoulders of giants',
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: 'Descartes',
        avatars: {
          small:
            'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
          regular:
            'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
          large:
            'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png',
        },
        handle: '@rd',
      },
      content: {
        text: 'Je pense , donc je suis',
      },
      created_at: 1461113959088,
    },
    {
      user: {
        name: 'Johann von Goethe',
        avatars: {
          small:
            'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
          regular:
            'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
          large:
            'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png',
        },
        handle: '@johann49',
      },
      content: {
        text: 'Es ist nichts schrecklicher als eine tätige Unwissenheit.',
      },
      created_at: 1461113796368,
    },
  ];

  function generateHTML(tweet) {
    return `
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
        ${tweet.content.text}
        </p>
      </main>
      <footer class="tweets__new__ft">
        <p>${tweet.created_at}</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  }

  const html = data.map(generateHTML).join('');
  const tweets = document.querySelector('.tweets-wrapper');
  tweets.innerHTML = html;
});
