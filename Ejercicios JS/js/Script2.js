function viajarConSuerte() {
    var x = Math.random() * 10;
    var URL;

    if (x <= 3) {
      x = 0;
      URL = 'https://www.hotmail.com/';
    } else if (x <= 6) {
      x = 1;
      URL = 'https://www.gmail.com/';
    } else {
      x = 2;
      URL = 'https://www.yahoo.com/';
    }

    location.assign(URL);
  }