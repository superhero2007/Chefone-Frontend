//@flow

function storageMock() {
  var storage = {};

  return {
    setItem: function(key: string, value: string) {
      storage[key] = value || '';
    },
    getItem: function(key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key: string) {
      delete storage[key];
    },
    //$FlowIssue
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i: number) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

var CookieStorage = function(type) {
  function createCookie(name, value, days) {
    var date, expires;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      //$FlowIssue
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=',
      ca = document.cookie.split(';'),
      i,
      c;

    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  function setData(data) {
    // Convert data into JSON and encode to accommodate for special characters.
    data = encodeURIComponent(JSON.stringify(data));
    // Create cookie.
    if (type == 'session') {
      createCookie(getSessionName(), data, 365);
    } else {
      createCookie('localStorage', data, 365);
    }
  }

  function clearData() {
    if (type == 'session') {
      createCookie(getSessionName(), '', 365);
    } else {
      createCookie('localStorage', '', 365);
    }
  }

  function getData() {
    // Get cookie data.
    var data =
      type == 'session'
        ? readCookie(getSessionName())
        : readCookie('localStorage');
    // If we have some data decode, parse and return it.
    return data ? JSON.parse(decodeURIComponent(data)) : {};
  }

  function getSessionName() {
    // If there is no name for this window, set one.
    // To ensure it's unquie use the current timestamp.
    if (!window.name) {
      window.name = new Date().getTime();
    }
    return 'sessionStorage' + window.name;
  }

  // Initialise if there's already data.
  var data = getData();

  return {
    length: 0,
    clear: function() {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: function(key: string) {
      return data[key] === undefined ? null : data[key];
    },
    key: function(i: number) {
      // not perfect, but works
      var ctr = 0;
      for (var k in data) {
        if (ctr == i) return k;
        else ctr++;
      }
      return null;
    },
    removeItem: function(key: string) {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: function(key: string, value: any) {
      data[key] = value + ''; // forces the value to a string
      this.length++;
      setData(data);
    },
  };
};

let res;
if (__SERVER__) {
  res = storageMock();
} else {
  try {
    // Test webstorage existence.
    if (!window.localStorage || !window.sessionStorage) throw 'exception';
    // Test webstorage accessibility - Needed for Safari private browsing.

    //$FlowIssue
    localStorage.setItem('storage_test', 1);

    //$FlowIssue
    localStorage.removeItem('storage_test');

    res = window.localStorage;
  } catch (e) {
    // Replace window.localStorage and window.sessionStorage with out custom
    // implementation.

    var localStorage = new CookieStorage('local');

    res = localStorage;
  }
}

export default res;
