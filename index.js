let username = localStorage.getItem('username');
let interest = localStorage.getItem('interest');
const inputInterest = document.querySelector('.interest');
const inputUser = document.querySelector('.username')
const greeting = document.querySelector('.greeting');
const btnChange = document.querySelector('.change-btn');
const ACCESS_KEY = '';

//current time
//update every 10 seconds;
setCurrentTime();
  setInterval(function(){
    setCurrentTime();
  }, 10*1000);

if (username) {
  // There's already an username
  greeting.style.display = 'inline-block';
  inputUser.style.display = 'none';

  if (interest) {
    // There's an interest
    let picture_url = localStorage.getItem('picture');
    let photo_by_name = localStorage.getItem('photo-by-name');
    let photo_by_url = localStorage.getItem('photo-by-url');
    inputInterest.style.display = 'none';
    document.querySelector('.interest-text').innerText = interest;
    greeting.innerHTML = `Hello <span class='stored-name'>${username}</span>`;

    if(!picture_url){
      newimage(interest);
      picture_url = localStorage.getItem('picture');
    }
    document.querySelector('.photoby').innerText = photo_by_name;
    document.querySelector('.photoby').href = photo_by_url;
    document.querySelector('body').style.backgroundImage = `url(${picture_url})`;
    document.querySelector('.change-btn').style.display = 'block';
  } else {
    // There's no interest
    greeting.innerText = `What's your interest?`;
    inputInterest.style.display = 'inline-block';
  }
} else {
  // There's no username
  inputInterest.style.display = `none`;
  inputUser.style.display = `inline-block`;
  greeting.innerText = `What's your name?`;
  greeting.style.display = `inline-block`;
}

inputUser.addEventListener('keypress', (e) => {
  if(e.which == 13) {
    let username = e.target.value;
    if(!username) {
      return;
    } else {
      localStorage.setItem('username', username);
      inputUser.style.display = `none`;
      greeting.innerHTML = `What's your interest?`;
      inputInterest.style.display = 'inline-block'
    }
  }
});

inputInterest.addEventListener('keypress', (e) => {
  if(e.which == 13) {
    let interest = e.target.value;
    if(!interest) {
      return;
    } else {
      newimage(interest);
      let username = localStorage.getItem('username');
      inputInterest.style.display = `none`;
      greeting.innerText = `Hello ${username}`;
      localStorage.setItem('interest', interest);
    }
  }
});

btnChange.addEventListener('click', () => {
  document.querySelector('.greeting').innerText = `What's your interest?`;
  document.querySelector('.interest').style.display = 'inline-block';
  document.querySelector('.interest').focus();
});

function newimage (keyword) {
  const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&orientation=landscape&client_id=${ACCESS_KEY}`;
  if(!ACCESS_KEY){
    alert('Please update your access key');
    return;
  }

  fetch(url)
    .then(blob => blob.json())
    .then(data => {
      let randomNumber = Math.floor(Math.random() * data.results.length);
      let picture = data.results[randomNumber];
      let picture_url = picture.urls.raw;
      let photo_by_name = picture.user.name;
      let photo_by_url = picture.user.links.html;
      localStorage.setItem('picture',picture_url);
      localStorage.setItem('photo-by-name',photo_by_name);
      localStorage.setItem('photo-by-url',photo_by_url);
      document.querySelector('.interest-text').innerText = keyword;
      document.querySelector('.photoby').innerHTML = photo_by_name;
      document.querySelector('.photoby').href = photo_by_url;
      document.querySelector('body').style.backgroundImage = `url(${picture_url})`;
      document.querySelector('.change-btn').style.display = 'block';
    });
}


function setCurrentTime(){
  let now = new Date();
  document.querySelector('.time').innerHTML = now.getHours()+':'+ (now.getMinutes()<10?'0':'') + now.getMinutes();
  document.querySelector('.date').innerHTML = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}
