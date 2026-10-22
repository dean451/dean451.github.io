(function () {
  var overlay = document.getElementById('term');
  var output = document.getElementById('term-output');
  var input = document.getElementById('term-input');
  var promptEl = document.getElementById('term-prompt');
  var inRails = false;

  function print(text) {
    var line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function hex(n) {
    var s = '';
    while (s.length < n) { s += Math.floor(Math.random() * 16).toString(16); }
    return s;
  }

  function setRails(on) {
    inRails = on;
    promptEl.textContent = on ? 'prod(main)> ' : 'dean@portfolio:~$ ';
  }

  var commands = {
    help: function () {
      print('whoami | ls | cat about.txt | docker ps | docker run --rm | rails c | rake db:cleanup | theme dark|light | clear | exit');
    },
    whoami: function () { print('dean palm - support engineer, ephemeral container enthusiast'); },
    ls: function () { print('about.txt  projects/  databases-i-have-cleaned/  ephemeral-containers/'); },
    'cat about.txt': function () { print('tracks down nil errors, cleans databases for breakfast, ships screenshots with URLs.'); },
    'docker ps': function () {
      print('CONTAINER ID   IMAGE          STATUS          NAMES');
      print(hex(12).slice(0, 12) + '   rails:latest   Up 3 seconds    app');
      print(hex(12).slice(0, 12) + '   mysql:8        Up 3 seconds    db');
      print(hex(12).slice(0, 12) + '   redis:7        Up 3 seconds    cache');
    },
    'docker run --rm': function () {
      var id = hex(12);
      print('Unable to find image locally... pulling');
      print('container ' + id + ' started');
      print('doing the thing...');
      print('container ' + id + ' removed (--rm). no evidence remains.');
    },
    'rails c': function () {
      print('Loading production environment (Rails 7.1)');
      print('WARNING: you are in production. read twice, run once.');
      print('type exit to leave.');
      setRails(true);
    },
    'rake db:cleanup': function () {
      print('Deleting orphaned rows... 0 deleted (dry run by default, I am not an animal)');
    },
    clear: function () { output.textContent = ''; },
    exit: function () {
      if (inRails) {
        setRails(false);
      } else {
        close();
      }
    }
  };

  function run(raw) {
    var cmd = raw.trim();
    print(promptEl.textContent + raw);
    if (!cmd) { return; }
    if (cmd.indexOf('theme ') === 0) {
      var theme = cmd.slice(6).trim();
      if (theme === 'dark' || theme === 'light') {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
      } else {
        print('theme: dark or light');
      }
    } else if (inRails && cmd !== 'exit') {
      print('=> nil  (dry run, nothing was harmed)');
    } else if (cmd.indexOf('sudo') === 0) {
      print('dean is not in the sudoers file. this incident will be reported.');
    } else if (commands[cmd]) {
      commands[cmd]();
    } else {
      print(cmd + ': command not found (try help)');
    }
  }

  function open() {
    overlay.hidden = false;
    input.focus();
    if (!output.childNodes.length) {
      print('welcome. type help.');
    }
  }

  function close() {
    overlay.hidden = true;
    setRails(false);
  }

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
    if (e.key === '`' && !typing) {
      e.preventDefault();
      open();
    } else if (e.key === 'Escape' && !overlay.hidden) {
      close();
    }
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
    } else if (e.key === '`') {
      e.preventDefault();
      close();
    }
  });

  console.log('psst: press ` on the page for a console. try rails c.');
})();
