/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/ajax.js":
/*!******************************!*\
  !*** ./resources/js/ajax.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function swp() {
  var checkbox = document.querySelector('#swap');

  if (checkbox.checked) {
    document.getElementById('resultWork').hidden = true;
    document.getElementById('resultNonWork').hidden = false;
  } else {
    document.getElementById('resultWork').hidden = false;
    document.getElementById('resultNonWork').hidden = true;
  }
}

function sendJSON() {
  // с помощью jQuery обращаемся к элементам на странице по их именам
  var startDate = document.querySelector('#startDate');
  var endDate = document.querySelector('#endDate');
  var userId = document.querySelector('#userId'); // создаём новый экземпляр запроса

  var xhr = new XMLHttpRequest(); // адрес, куда мы отправим нашу JSON-строку

  var url = "/calculate?data=" + encodeURIComponent(JSON.stringify({
    "startDate": startDate.value,
    "endDate": endDate.value,
    "userId": userId.value
  })); // открываем соединение

  xhr.open("GET", url, true); // устанавливаем заголовок

  xhr.setRequestHeader("Content-Type", "application/json"); // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь

  xhr.onreadystatechange = function () {
    // если запрос принят и сервер ответил, что всё в порядке
    if (xhr.readyState === 4 && xhr.status === 200) {
      // парсим json
      var json = JSON.parse(this.responseText); //фукция генерации html

      responseWork(json.schedule);
      responseNonWork(json.nonworking);
    }
  }; // отправляем JSON на сервер


  xhr.send();
}

function responseWork(schedule) {
  var resultWork = document.querySelector('.resultWork');
  var htmlTextWork = '<tr><th>День</th><th>Рабочий график</th></tr>';

  for (var i = 0; i < schedule.length; i++) {
    htmlTextWork += '<tr>' + '<td>' + schedule[i].day + '</td>' + '<td>' + schedule[i].timeRanges['am']['start'] + '-' + schedule[i].timeRanges['am']['end'] + '<br>' + schedule[i].timeRanges['pm']['start'] + '-' + schedule[i].timeRanges['pm']['end'] + '</td></tr>';
  }

  resultWork.innerHTML = htmlTextWork;
}

function responseNonWork(nonworking) {
  var resultNonWork = document.querySelector('.resultNonWork');
  var htmlTextWork = '<tr><th>День</th><th>Нерабочий график</th></tr>';

  for (var i = 0; i < nonworking.length; i++) {
    if (typeof nonworking[i].timeRanges['pm'] !== 'undefined') {
      htmlTextWork += '<tr>' + '<td>' + nonworking[i].day + '</td>' + '<td>00:00-' + nonworking[i].timeRanges['am']['start'] + '<br>' + nonworking[i].timeRanges['am']['end'] + '-' + nonworking[i].timeRanges['pm']['start'] + '<br>' + nonworking[i].timeRanges['pm']['end'] + '-23:59</td></tr>';
    } else {
      htmlTextWork += '<tr>' + '<td>' + nonworking[i].day + '</td>' + '<td>00:00-23:59</td></tr>';
    }
  }

  resultNonWork.innerHTML = htmlTextWork;
}

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/ajax.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! c:\composer\WorkingTime\resources\js\ajax.js */"./resources/js/ajax.js");


/***/ })

/******/ });