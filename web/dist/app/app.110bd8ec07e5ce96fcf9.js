/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/web/app";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("rVcD");


/***/ }),

/***/ "2oKY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vOnD");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("K0cP");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border: none;\n  border-bottom:  ", ";\n  box-sizing: border-box;\n  color: ", ";\n  cursor: pointer;\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: ", ";\n  margin: 0;\n  outline: none;\n  padding: 0 16px;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n\n  &:hover {\n    background:  ", ";\n    border-bottom:  ", ";\n  }\n\n  &:active, {\n    background:  ", ";\n    color: ", ";\n    border-bottom:  ", ";\n  }\n\n  &.active {\n    color: ", ";\n    line-height: 68px;\n    border-bottom: ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



/**
 * TopNavItem
 */

var TopNavItem = styled_components__WEBPACK_IMPORTED_MODULE_0__[/* default */ "c"].button(_templateObject(), function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.active ? "4px solid ".concat(props.theme.colors.accent) : 'none';
}, function (props) {
  return props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)';
}, function (props) {
  return props.active ? '68px' : '72px';
}, function (props) {
  return props.active ? props.theme.background.secondary : 'rgba(255, 255, 255, .06)';
}, function (props) {
  return props.active ? "4px solid ".concat(props.theme.colors.accent) : 'none';
}, function (props) {
  return props.active ? props.theme.background.secondary : props.theme.background.primary;
}, function (props) {
  return props.theme.colors.light;
}, function (props) {
  return props.active ? "4px solid ".concat(props.theme.colors.accent) : 'none';
}, function (props) {
  return props.theme.colors.light;
}, function (props) {
  return "4px solid ".concat(props.theme.colors.accent);
});
TopNavItem.displayName = 'TopNavItem';
TopNavItem.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"]
};
/* harmony default export */ __webpack_exports__["a"] = (TopNavItem);

/***/ }),

/***/ "2qgS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return connect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/LiH");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var Provider =
/*#__PURE__*/
function (_Component) {
  _inherits(Provider, _Component);

  _createClass(Provider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        reactor: this.reactor
      };
    }
  }]);

  function Provider(props, context) {
    var _this;

    _classCallCheck(this, Provider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props, context));
    _this.reactor = props.reactor;
    return _this;
  }

  _createClass(Provider, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["Children"].only(this.props.children);
    }
  }]);

  return Provider;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
Provider.propTypes = {
  reactor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element.isRequired
};
Provider.childContextTypes = {
  reactor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
var reactorShape = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  evaluate: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  evaluateToJS: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  observe: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function connect(mapFluxToProps, mapStateToProps) {
  mapStateToProps = mapStateToProps ? mapStateToProps : function () {
    return {};
  };
  return function wrapWithConnect(WrappedComponent) {
    var Connect =
    /*#__PURE__*/
    function (_Component2) {
      _inherits(Connect, _Component2);

      function Connect(props, context) {
        var _this2;

        _classCallCheck(this, Connect);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Connect).call(this, props, context));
        _this2.reactor = props.reactor || context.reactor;
        _this2.unsubscribeFns = [];

        _this2.updatePropMap(props);

        return _this2;
      }

      _createClass(Connect, [{
        key: "resubscribe",
        value: function resubscribe(props) {
          this.unsubscribe();
          this.updatePropMap(props);
          this.updateState();
          this.subscribe();
        }
      }, {
        key: "UNSAFE_componentWillMount",
        value: function UNSAFE_componentWillMount() {
          this.updateState();
          this.subscribe(this.props);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.unsubscribe();
        }
      }, {
        key: "updatePropMap",
        value: function updatePropMap(props) {
          this.propMap = mapFluxToProps ? mapFluxToProps(props) : {};
        }
      }, {
        key: "updateState",
        value: function updateState() {
          var propMap = this.propMap;
          var stateToSet = {};

          for (var key in propMap) {
            var getter = propMap[key];
            stateToSet[key] = this.reactor.evaluate(getter);
          }

          this.setState(stateToSet);
        }
      }, {
        key: "subscribe",
        value: function subscribe() {
          var _this3 = this;

          var propMap = this.propMap;

          var _loop = function _loop(key) {
            var getter = propMap[key];

            var unsubscribeFn = _this3.reactor.observe(getter, function (val) {
              _this3.setState(_defineProperty({}, key, val));
            });

            _this3.unsubscribeFns.push(unsubscribeFn);
          };

          for (var key in propMap) {
            _loop(key);
          }
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          if (this.unsubscribeFns.length === 0) {
            return;
          }

          while (this.unsubscribeFns.length > 0) {
            this.unsubscribeFns.shift()();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var stateProps = mapStateToProps(this.props);
          return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(WrappedComponent, _objectSpread({
            reactor: this.reactor
          }, stateProps, this.props, this.state));
        }
      }]);

      return Connect;
    }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

    Connect.displayName = "Connect(".concat(getDisplayName(WrappedComponent), ")");
    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = {
      reactor: reactorShape
    };
    Connect.propTypes = {
      reactor: reactorShape
    };
    return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1___default()(Connect, WrappedComponent);
  };
}

/***/ }),

/***/ "9dLc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/assets/img/img-a9859b.png";

/***/ }),

/***/ "DeKp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/app/reactor.js
var reactor = __webpack_require__("xSHT");

// EXTERNAL MODULE: ./src/app/services/api.js
var api = __webpack_require__("Z9Rw");

// EXTERNAL MODULE: ./src/app/config.js
var config = __webpack_require__("LMli");

// EXTERNAL MODULE: ./node_modules/u2f-api-polyfill/u2f-api-polyfill.js
var u2f_api_polyfill = __webpack_require__("KDbw");

// CONCATENATED MODULE: ./src/app/services/auth.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var auth = {
  login: function login(email, password, token) {
    var data = {
      user: email,
      pass: password,
      second_factor_token: token
    };
    return api["a" /* default */].post(config["a" /* default */].api.sessionPath, data, false);
  },
  loginWithU2f: function loginWithU2f(name, password) {
    var data = {
      user: name,
      pass: password
    };
    return api["a" /* default */].post(config["a" /* default */].api.u2fSessionChallengePath, data, false).then(function (data) {
      var promise = new Promise(function (resolve, reject) {
        window.u2f.sign(data.appId, data.challenge, [data], function (res) {
          if (res.errorCode) {
            var err = auth._getU2fErr(res.errorCode);

            reject(err);
            return;
          }

          var response = {
            user: name,
            u2f_sign_response: res
          };
          api["a" /* default */].post(config["a" /* default */].api.u2fSessionPath, response, false).then(function (data) {
            resolve(data);
          }).catch(function (data) {
            reject(data);
          });
        });
      });
      return promise;
    });
  },
  acceptInvite: function acceptInvite(name, password, token, inviteToken) {
    var data = {
      invite_token: inviteToken,
      pass: password,
      second_factor_token: token,
      user: name
    };
    return api["a" /* default */].post(config["a" /* default */].api.createUserPath, data, false);
  },
  acceptInviteWithU2f: function acceptInviteWithU2f(name, password, inviteToken) {
    return api["a" /* default */].get(config["a" /* default */].api.getU2fCreateUserChallengeUrl(inviteToken)).then(function (data) {
      return new Promise(function (resolve, reject) {
        window.u2f.register(data.appId, [data], [], function (res) {
          if (res.errorCode) {
            var err = auth._getU2fErr(res.errorCode);

            reject(err);
            return;
          }

          var response = {
            user: name,
            pass: password,
            u2f_register_response: res,
            invite_token: inviteToken
          };
          api["a" /* default */].post(config["a" /* default */].api.u2fCreateUserPath, response, false).then(function (data) {
            resolve(data);
          }).catch(function (err) {
            reject(err);
          });
        });
      });
    });
  },
  changePassword: function changePassword(oldPass, newPass, token) {
    var data = {
      old_password: window.btoa(oldPass),
      new_password: window.btoa(newPass),
      second_factor_token: token
    };
    return api["a" /* default */].put(config["a" /* default */].api.changeUserPasswordPath, data);
  },
  changePasswordWithU2f: function changePasswordWithU2f(oldPass, newPass) {
    var data = {
      user: name,
      pass: oldPass
    };
    return api["a" /* default */].post(config["a" /* default */].api.u2fChangePassChallengePath, data).then(function (data) {
      return new Promise(function (resolve, reject) {
        window.u2f.sign(data.appId, data.challenge, [data], function (res) {
          if (res.errorCode) {
            var err = auth._getU2fErr(res.errorCode);

            reject(err);
            return;
          }

          var data = {
            new_password: window.btoa(newPass),
            u2f_sign_response: res
          };
          api["a" /* default */].put(config["a" /* default */].api.changeUserPasswordPath, data).then(function (data) {
            resolve(data);
          }).catch(function (data) {
            reject(data);
          });
        });
      });
    });
  },
  _getU2fErr: function _getU2fErr(errorCode) {
    var errorMsg = ""; // lookup error message...

    for (var msg in window.u2f.ErrorCodes) {
      if (window.u2f.ErrorCodes[msg] == errorCode) {
        errorMsg = msg;
      }
    }

    var message = "Please check your U2F settings, make sure it is plugged in and you are using the supported browser.\nU2F error: ".concat(errorMsg);
    return {
      responseJSON: {
        message: message
      }
    };
  }
};
/* harmony default export */ var services_auth = (auth);
// EXTERNAL MODULE: ./src/app/services/history.js
var services_history = __webpack_require__("yaYm");

// EXTERNAL MODULE: ./src/app/services/session.js
var session = __webpack_require__("cGG6");

// EXTERNAL MODULE: ./src/app/lib/logger.js
var logger = __webpack_require__("lZJN");

// EXTERNAL MODULE: ./src/app/flux/status/actions.js
var actions = __webpack_require__("ksSu");

// EXTERNAL MODULE: ./src/app/flux/user/actionTypes.js
var actionTypes = __webpack_require__("owjQ");

// CONCATENATED MODULE: ./src/app/flux/user/actions.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fetchInvite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actions_acceptInvite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return actions_acceptInviteWithU2f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return loginWithSso; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return actions_loginWithU2f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return actions_login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return logout; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









var actions_logger = logger["a" /* default */].create('flux/user/actions');
function fetchInvite(inviteToken) {
  var path = config["a" /* default */].api.getInviteUrl(inviteToken);
  actions["a" /* fetchInviteStatus */].start();
  return api["a" /* default */].get(path).then(function (invite) {
    actions["a" /* fetchInviteStatus */].success();
    reactor["a" /* default */].dispatch(actionTypes["a" /* RECEIVE_INVITE */], invite);
  }).catch(function (err) {
    actions["a" /* fetchInviteStatus */].fail(err.message);
  });
}
function actions_acceptInvite(name, psw, token, inviteToken) {
  var promise = services_auth.acceptInvite(name, psw, token, inviteToken);
  return _handleAcceptInvitePromise(promise);
}
function actions_acceptInviteWithU2f(name, psw, inviteToken) {
  var promise = services_auth.acceptInviteWithU2f(name, psw, inviteToken);
  return _handleAcceptInvitePromise(promise);
}
function loginWithSso(providerName, providerUrl) {
  var entryUrl = _getEntryRoute();

  services_history["a" /* default */].push(config["a" /* default */].api.getSsoUrl(providerUrl, providerName, entryUrl), true);
}
function actions_loginWithU2f(user, password) {
  var promise = services_auth.loginWithU2f(user, password);
  return _handleLoginPromise(promise);
}
function actions_login(user, password, token) {
  var promise = services_auth.login(user, password, token);
  return _handleLoginPromise(promise);
}
function logout() {
  session["a" /* default */].logout();
}

function _handleAcceptInvitePromise(promise) {
  actions["d" /* signupStatus */].start();
  return promise.then(function () {
    services_history["a" /* default */].push(config["a" /* default */].routes.app, true);
  }).catch(function (err) {
    actions_logger.error('accept invite', err);
    actions["d" /* signupStatus */].fail(err.message);
  });
}

function _handleLoginPromise(promise) {
  actions["c" /* loginStatus */].start();
  return promise.then(function () {
    var url = _getEntryRoute();

    services_history["a" /* default */].push(url, true);
  }).catch(function (err) {
    actions_logger.error('login', err);
    actions["c" /* loginStatus */].fail(err.message);
  });
}

function _getEntryRoute() {
  var entryUrl = services_history["a" /* default */].getRedirectParam();

  if (entryUrl) {
    entryUrl = services_history["a" /* default */].ensureSafeRoute(entryUrl);
  } else {
    entryUrl = config["a" /* default */].routes.app;
  }

  return services_history["a" /* default */].ensureBaseUrl(entryUrl);
}

/***/ }),

/***/ "F86T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./src/app/components/nuclear.jsx
var nuclear = __webpack_require__("2qgS");

// EXTERNAL MODULE: ./src/app/flux/user/actions.js + 1 modules
var actions = __webpack_require__("DeKp");

// EXTERNAL MODULE: ./src/app/flux/user/index.js
var flux_user = __webpack_require__("S+Ht");

// EXTERNAL MODULE: ./src/app/config.js
var config = __webpack_require__("LMli");

// EXTERNAL MODULE: ./src/shared/components/index.js + 22 modules
var components = __webpack_require__("ryey");

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/styled-system/dist/index.esm.js + 1 modules
var index_esm = __webpack_require__("za5s");

// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var theme = __webpack_require__("K0cP");

// CONCATENATED MODULE: ./src/shared/components/Alerts/index.jsx
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-width: 2px;\n  border-style: solid;\n  border-radius: 8px;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 24px;\n  margin: 0 0 16px 0;\n  padding: 8px 16px;\n  text-align: center;\n  -webkit-font-smoothing: antialiased;\n  word-break: break-all;\n\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Alerts_alertType = function alertType(props) {
  switch (props.type) {
    case 'danger':
      return {
        background: theme["a" /* background */].error,
        borderColor: theme["b" /* colors */].error,
        color: theme["b" /* colors */].error
      };

    case 'info':
      return {
        background: theme["a" /* background */].error,
        color: theme["b" /* colors */].text
      };

    case 'warning':
      return {
        background: theme["a" /* background */].error,
        color: theme["b" /* colors */].text
      };

    case 'success':
      return {
        background: theme["a" /* background */].error,
        color: theme["b" /* colors */].text
      };

    default:
      return {
        background: theme["a" /* background */].error,
        color: theme["b" /* colors */].text
      };
  }
};

var Alert = styled_components_browser_esm["c" /* default */].div(_templateObject(), index_esm["k" /* space */], Alerts_alertType);
var numberStringOrArray = prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string, prop_types_default.a.array]);
Alert.propTypes = {
  /** Size */
  type: prop_types_default.a.oneOf(['danger', 'info', 'warning', 'success']),

  /** Margin */
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray
};
Alert.defaultProps = {
  size: 'danger'
};
Alert.displayName = 'Alert';
/* harmony default export */ var Alerts = (Alert);
var Alerts_Danger = function Danger(props) {
  return react_default.a.createElement(Alert, {
    type: "danger"
  }, props.children);
};
var Alerts_Warning = function Warning(props) {
  return react_default.a.createElement(Alert, {
    type: "warning"
  }, props.children);
};
var Alerts_Info = function Info(props) {
  return react_default.a.createElement(Alert, {
    type: "info"
  }, props.children);
};
var Alerts_Success = function Success(props) {
  return react_default.a.createElement(Alert, {
    type: "success"
  }, props.children);
};
// EXTERNAL MODULE: ./src/app/services/enums.js
var enums = __webpack_require__("l3S1");

// CONCATENATED MODULE: ./src/app/components/Login/SsoButton/SsoButton.jsx
function _templateObject2() {
  var data = SsoButton_taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 32px;\n  font-size: 1.6em;\n  text-align: center;\n  border-right: 1px solid rgba(0,0,0,.2);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function SsoButton_templateObject() {
  var data = SsoButton_taggedTemplateLiteral(["\n  background-color: ", ";\n  position: relative;\n  box-sizing: border-box;\n  margin: 32px 0 0 0;\n"]);

  SsoButton_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function SsoButton_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var pickSso = function pickSso(type) {
  switch (type) {
    case 'microsoft':
      return {
        color: '#2672ec',
        className: 'fa fa-windows'
      };

    case 'github':
      return {
        color: '#444444',
        className: 'fa fa-github'
      };

    case 'bitbucket':
      return {
        color: '#205081',
        className: 'fa fa-bitbucket'
      };

    case 'google':
      return {
        color: '#dd4b39',
        className: 'fa fa-google'
      };

    case 'btn-openid':
      return {
        color: '#f7931e',
        className: 'fa fa-openid'
      };

    default:
      return {
        color: '#f7931e'
      };
  }
};

var SsoButton_SsoButton = function SsoButton(props) {
  var iconClass = pickSso(props.type).className;
  return react_default.a.createElement(components["b" /* Button */], _extends({
    block: true,
    size: "large"
  }, props, {
    color: "light"
  }), iconClass && react_default.a.createElement(Icon, null, react_default.a.createElement("span", {
    className: iconClass
  })), props.children);
};

var StyledSsoButton = Object(styled_components_browser_esm["c" /* default */])(SsoButton_SsoButton)(SsoButton_templateObject(), function (props) {
  return pickSso(props.type).color;
});
var Icon = styled_components_browser_esm["c" /* default */].div(_templateObject2());
/* harmony default export */ var Login_SsoButton_SsoButton = (StyledSsoButton);
// CONCATENATED MODULE: ./src/app/components/Login/SsoButton/index.jsx
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var Login_SsoButton = (Login_SsoButton_SsoButton);
// CONCATENATED MODULE: ./src/app/components/Login/LoginForm/SsoButtons.jsx
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




function guessProviderType(name, type) {
  name = name.toLowerCase();

  if (name.indexOf('microsoft') !== -1) {
    return 'microsoft';
  }

  if (name.indexOf('bitbucket') !== -1) {
    return 'bitbucket';
  }

  if (name.indexOf('google') !== -1) {
    return 'google';
  }

  if (name.indexOf('github') !== -1 || type === enums["b" /* AuthProviderTypeEnum */].GITHUB) {
    return 'github';
  }

  if (type === enums["b" /* AuthProviderTypeEnum */].OIDC) {
    return 'openid';
  }

  return '--unknown';
}

var SsoButtons_SsoBtnList = function SsoBtnList(_ref) {
  var providers = _ref.providers,
      prefixText = _ref.prefixText,
      isDisabled = _ref.isDisabled,
      _onClick = _ref.onClick;
  var $btns = providers.map(function (item, index) {
    var name = item.name,
        type = item.type,
        displayName = item.displayName;
    displayName = displayName || name;
    var title = "".concat(prefixText, " ").concat(displayName);
    var ssoType = guessProviderType(displayName, type);
    return react_default.a.createElement(Login_SsoButton, {
      key: index,
      type: ssoType,
      disabled: isDisabled,
      onClick: function onClick(e) {
        e.preventDefault();

        _onClick(item);
      }
    }, title);
  });

  if ($btns.length === 0) {
    return react_default.a.createElement("h4", null, " You have no SSO providers configured ");
  }

  return $btns;
};

/* harmony default export */ var SsoButtons = (SsoButtons_SsoBtnList);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 2 modules
var formik_esm = __webpack_require__("KYPV");

// CONCATENATED MODULE: ./src/app/components/Login/LoginForm/LoginForm.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/







var LoginForm_LoginForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialValues", {
      password: '',
      user: '',
      token: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onValidate", function (values) {
      var errors = {};

      if (!values.user) {
        errors.user = ' is required';
      }

      if (!values.password) {
        errors.password = ' is required';
      }

      if (_this.isOTP() && !values.token) {
        errors.token = ' is required';
      }

      return errors;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogin", function (values) {
      var user = values.user,
          password = values.password,
          token = values.token;

      if (_this.props.auth2faType === enums["a" /* Auth2faTypeEnum */].UTF) {
        _this.props.onLoginWithU2f(user, password);
      } else {
        _this.props.onLogin(user, password, token);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLoginWithSso", function (ssoProvider) {
      _this.props.onLoginWithSso(ssoProvider);
    });

    return _this;
  }

  _createClass(LoginForm, [{
    key: "needs2fa",
    value: function needs2fa() {
      return !!this.props.auth2faType && this.props.auth2faType !== enums["a" /* Auth2faTypeEnum */].DISABLED;
    }
  }, {
    key: "needsSso",
    value: function needsSso() {
      return this.props.authProviders && this.props.authProviders.length > 0;
    }
  }, {
    key: "isOTP",
    value: function isOTP() {
      return this.needs2fa() && this.props.auth2faType === enums["a" /* Auth2faTypeEnum */].OTP;
    }
  }, {
    key: "renderLoginBtn",
    value: function renderLoginBtn(onClick) {
      var isProcessing = this.props.attempt.isProcessing;
      var $helpBlock = isProcessing && this.props.auth2faType === enums["a" /* Auth2faTypeEnum */].UTF ? "Insert your U2F key and press the button on the key" : null;
      var isDisabled = isProcessing;
      return react_default.a.createElement("div", null, react_default.a.createElement(components["b" /* Button */], {
        block: true,
        disabled: isDisabled,
        size: "large",
        type: "submit",
        onClick: onClick,
        mt: 4
      }, "LOGIN WITH EMAIL"), $helpBlock);
    }
  }, {
    key: "renderSsoBtns",
    value: function renderSsoBtns() {
      var _this$props = this.props,
          authProviders = _this$props.authProviders,
          attempt = _this$props.attempt;

      if (!this.needsSso()) {
        return null;
      }

      return react_default.a.createElement(SsoButtons, {
        prefixText: "Login with ",
        isDisabled: attempt.isProcessing,
        providers: authProviders,
        onClick: this.onLoginWithSso
      });
    }
  }, {
    key: "renderInputFields",
    value: function renderInputFields(_ref) {
      var values = _ref.values,
          errors = _ref.errors,
          touched = _ref.touched,
          handleChange = _ref.handleChange;
      var userError = Boolean(errors.user && touched.user);
      var passError = Boolean(errors.password && touched.password);
      var tokenError = Boolean(errors.token && touched.token);
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components["h" /* Label */], {
        mb: 1,
        hasError: userError
      }, "Email", userError && errors.user), react_default.a.createElement(components["g" /* Input */], {
        id: "user",
        fontSize: 0,
        autoFocus: true,
        value: values.user,
        hasError: userError,
        onChange: handleChange,
        placeholder: "User name",
        name: "user"
      }), react_default.a.createElement(components["h" /* Label */], {
        hasError: passError
      }, "Password", passError && errors.password), react_default.a.createElement(components["g" /* Input */], {
        id: "password",
        hasError: passError,
        value: values.password,
        onChange: handleChange,
        type: "password",
        name: "password",
        placeholder: "Password"
      }), this.isOTP() && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components["h" /* Label */], {
        mt: 3,
        mb: 1,
        hasError: tokenError
      }, "Two factor token", tokenError && errors.token), react_default.a.createElement(components["g" /* Input */], {
        id: "token",
        fontSize: 0,
        hasError: tokenError,
        autoComplete: "off",
        value: values.token,
        onChange: handleChange,
        placeholder: "Two factor token (Google Authenticator)"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$attempt = this.props.attempt,
          isFailed = _this$props$attempt.isFailed,
          message = _this$props$attempt.message;
      return react_default.a.createElement("div", null, react_default.a.createElement(formik_esm["a" /* Formik */], {
        validate: this.onValidate,
        onSubmit: this.onLogin,
        initialValues: this.initialValues
      }, function (props) {
        return react_default.a.createElement(components["c" /* Card */], {
          bg: "secondary",
          mt: "4",
          mb: "4",
          mr: "auto",
          ml: "auto",
          width: "456px",
          p: "5"
        }, react_default.a.createElement(components["e" /* Heading */].h5, {
          textAlign: "center",
          mb: "3",
          color: "light"
        }, "SIGN INTO TELEPORT"), isFailed && react_default.a.createElement(Alerts_Danger, null, " ", message, " "), _this2.renderInputFields(props), _this2.renderLoginBtn(props.handleSubmit), _this2.renderSsoBtns());
      }));
    }
  }]);

  return LoginForm;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/app/components/Login/LoginForm/index.jsx
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var Login_LoginForm = (LoginForm_LoginForm);
// EXTERNAL MODULE: ./src/app/components/documentTitle.jsx
var documentTitle = __webpack_require__("tq85");

// EXTERNAL MODULE: ./src/shared/components/Logo/index.js + 1 modules
var Logo = __webpack_require__("QmW9");

// EXTERNAL MODULE: ./src/shared/assets/images/teleport-medallion.svg
var teleport_medallion = __webpack_require__("BszX");
var teleport_medallion_default = /*#__PURE__*/__webpack_require__.n(teleport_medallion);

// CONCATENATED MODULE: ./src/app/components/Login/Login.jsx
function Login_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Login_typeof = function _typeof(obj) { return typeof obj; }; } else { Login_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Login_typeof(obj); }

function Login_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Login_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Login_createClass(Constructor, protoProps, staticProps) { if (protoProps) Login_defineProperties(Constructor.prototype, protoProps); if (staticProps) Login_defineProperties(Constructor, staticProps); return Constructor; }

function Login_possibleConstructorReturn(self, call) { if (call && (Login_typeof(call) === "object" || typeof call === "function")) { return call; } return Login_assertThisInitialized(self); }

function Login_getPrototypeOf(o) { Login_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Login_getPrototypeOf(o); }

function Login_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Login_setPrototypeOf(subClass, superClass); }

function Login_setPrototypeOf(o, p) { Login_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Login_setPrototypeOf(o, p); }

function Login_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Login_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









var Login_Login =
/*#__PURE__*/
function (_React$Component) {
  Login_inherits(Login, _React$Component);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    Login_classCallCheck(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Login_possibleConstructorReturn(this, (_getPrototypeOf2 = Login_getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Login_defineProperty(Login_assertThisInitialized(Login_assertThisInitialized(_this)), "onLoginWithSso", function (ssoProvider) {
      _this.props.onLoginWithSso(ssoProvider.name, ssoProvider.url);
    });

    Login_defineProperty(Login_assertThisInitialized(Login_assertThisInitialized(_this)), "onLoginWithU2f", function (username, password) {
      _this.props.onLoginWithU2f(username, password);
    });

    Login_defineProperty(Login_assertThisInitialized(Login_assertThisInitialized(_this)), "onLogin", function (username, password, token) {
      _this.props.onLogin(username, password, token);
    });

    return _this;
  }

  Login_createClass(Login, [{
    key: "render",
    value: function render() {
      var attempt = this.props.attempt;
      var authProviders = config["a" /* default */].getAuthProviders();
      var auth2faType = config["a" /* default */].getAuth2faType();
      return react_default.a.createElement("div", null, react_default.a.createElement(Logo["a" /* default */], {
        src: teleport_medallion_default.a
      }), react_default.a.createElement(Login_LoginForm, {
        authProviders: authProviders,
        auth2faType: auth2faType,
        onLoginWithSso: this.onLoginWithSso,
        onLoginWithU2f: this.onLoginWithU2f,
        onLogin: this.onLogin,
        attempt: attempt
      }));
    }
  }]);

  return Login;
}(react_default.a.Component);

function mapStoreToProps() {
  return {
    attempt: flux_user["a" /* getters */].loginAttemp
  };
}

function mapActionsToProps() {
  return {
    onLogin: actions["d" /* login */],
    onLoginWithU2f: actions["f" /* loginWithU2f */],
    onLoginWithSso: actions["e" /* loginWithSso */]
  };
}

/* harmony default export */ var components_Login_Login = (Object(documentTitle["a" /* withDocTitle */])("Login", Object(nuclear["b" /* connect */])(mapStoreToProps, mapActionsToProps)(Login_Login)));
// CONCATENATED MODULE: ./src/app/components/Login/index.jsx
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var components_Login = __webpack_exports__["a"] = (components_Login_Login);

/***/ }),

/***/ "FCiP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_SITE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_NAV_ITEM; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var SET_SITE_ID = 'TLPT_APP_SET_SITE_ID';
var ADD_NAV_ITEM = 'TLPT_APP_ADD_NAV_ITEM';

/***/ }),

/***/ "K0cP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/shared/components/utils/platform.js
function getPlatform() {
  var userAgent = window.navigator.userAgent;
  return {
    isWin: userAgent.indexOf('Windows') >= 0,
    isMac: userAgent.indexOf('Macintosh') >= 0,
    isLinux: userAgent.indexOf('Linux') >= 0
  };
}

var platform = getPlatform();
// CONCATENATED MODULE: ./src/shared/components/theme.js
/* unused harmony export font */
/* unused harmony export fonts */
/* unused harmony export regular */
/* unused harmony export bold */
/* unused harmony export fontSizes */
/* unused harmony export fontWeights */
/* unused harmony export space */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return background; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return colors; });
/* unused harmony export borders */

var fontMonoLinux = "\"Droid Sans Mono\", \"monospace\", monospace, \"Droid Sans Fallback";
var fontMonoWin = "Consolas, \"Courier New\", monospace";
var fontMonoMac = "Menlo, Monaco, \"Courier New\", monospace";
var font = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";";
var fonts = {
  sansSerif: font,
  mono: getMonoFont()
};
var regular = 400;
var bold = 600;
var fontSizes = [12, 14, 16, 20, 24, 32, 48];
var fontWeights = {
  regular: regular,
  bold: bold
};
var space = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
var background = {
  light: '#FFFFFF',
  primary: '#0C143D',
  secondary: '#222C59',
  error: '#FEE5ED'
};
var colors = {
  accent: '#FA2A6A',
  dark: '#000',
  light: '#fff',
  error: '#FA2A6A',
  warning: '#FA2A6A',
  subtle: '#EDF0F2',
  highlight: '#E1F5FE',
  link: '#039BE5',
  primary: '#00BFA5',
  primaryLight: '#00EAC3',
  primaryDark: '#008A7E',
  secondary: '#0C143D',
  secondaryLight: '#222C59',
  text: '#263238',
  lightBlue: '#cdf',
  blue: '#007aff',
  darkBlue: '#049',
  lightGreen: '#cec',
  green: '#0a0',
  darkGreen: '#060'
};
var borders = [0, '1px solid', '2px solid', '4px solid', '8px solid', '16px solid', '32px solid'];
var theme = {
  colors: colors,
  background: background,
  fontSizes: fontSizes,
  font: font,
  fontWeights: fontWeights,
  space: space,
  borders: borders,
  regular: regular,
  bold: bold
};
/* harmony default export */ var components_theme = __webpack_exports__["c"] = (theme);

function getMonoFont() {
  if (platform.isLinux) {
    return fontMonoLinux;
  }

  if (platform.isMac) {
    return fontMonoMac;
  }

  if (platform.isWin) {
    return fontMonoWin;
  }

  return fontMonoLinux;
}

/***/ }),

/***/ "KdfW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysEnum; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var KeysEnum = {
  TOKEN: 'grv_teleport_token',
  TOKEN_RENEW: 'grv_teleport_token_renew'
};
var storage = {
  clear: function clear() {
    window.localStorage.clear();
  },
  subscribe: function subscribe(fn) {
    window.addEventListener('storage', fn);
  },
  unsubscribe: function unsubscribe(fn) {
    window.removeEventListener('storage', fn);
  },
  setBearerToken: function setBearerToken(token) {
    window.localStorage.setItem(KeysEnum.TOKEN, JSON.stringify(token));
  },
  getBearerToken: function getBearerToken() {
    var item = window.localStorage.getItem(KeysEnum.TOKEN);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  },
  broadcast: function broadcast(messageType, messageBody) {
    window.localStorage.setItem(messageType, messageBody);
    window.localStorage.removeItem(messageType);
  }
};
/* harmony default export */ __webpack_exports__["b"] = (storage);

/***/ }),

/***/ "LMli":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("l1PF");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cIpc");
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("gOk0");
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var baseUrl = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__[/* isTestEnv */ "a"])() ? 'localhost' : window.location.origin;
var cfg = {
  baseUrl: baseUrl,
  helpUrl: 'https://gravitational.com/teleport/docs/quickstart/',
  maxSessionLoadSize: 50,
  displayDateFormat: 'MM/DD/YYYY HH:mm:ss',
  auth: {},
  canJoinSessions: true,
  routes: {
    app: '/web',
    login: '/web/login',
    nodes: '/web/nodes',
    cluster: '/web/cluster/:clusterId',
    clusterNodes: '/web/cluster/:clusterId',
    clusterSessions: '/web/cluster/:clusterId/sessions',
    currentSession: '/web/cluster/:siteId/sessions/:sid',
    sessions: '/web/sessions',
    newUser: '/web/newuser/:inviteToken',
    error: '/web/msg/error(/:type)',
    info: '/web/msg/info(/:type)',
    pageNotFound: '/web/notfound',
    terminal: '/web/cluster/:siteId/node/:serverId/:login(/:sid)',
    player: '/web/player/cluster/:siteId/sid/:sid',
    webApi: '/v1/webapi/*',
    settingsBase: '/web/settings',
    settingsAccount: '/web/settings/account'
  },
  api: {
    scp: '/v1/webapi/sites/:siteId/nodes/:serverId/:login/scp?location=:location&filename=:filename',
    ssoOidc: '/v1/webapi/oidc/login/web?redirect_url=:redirect&connector_id=:providerName',
    ssoSaml: '/v1/webapi/saml/sso?redirect_url=:redirect&connector_id=:providerName',
    renewTokenPath: '/v1/webapi/sessions/renew',
    sessionPath: '/v1/webapi/sessions',
    userContextPath: '/v1/webapi/user/context',
    userStatusPath: '/v1/webapi/user/status',
    invitePath: '/v1/webapi/users/invites/:inviteToken',
    createUserPath: '/v1/webapi/users',
    changeUserPasswordPath: '/v1/webapi/users/password',
    u2fCreateUserChallengePath: '/v1/webapi/u2f/signuptokens/:inviteToken',
    u2fCreateUserPath: '/v1/webapi/u2f/users',
    u2fSessionChallengePath: '/v1/webapi/u2f/signrequest',
    u2fChangePassChallengePath: '/v1/webapi/u2f/password/changerequest',
    u2fChangePassPath: '/v1/webapi/u2f/password',
    u2fSessionPath: '/v1/webapi/u2f/sessions',
    sitesBasePath: '/v1/webapi/sites',
    sitePath: '/v1/webapi/sites/:siteId',
    nodesPath: '/v1/webapi/sites/:siteId/nodes',
    siteSessionPath: '/v1/webapi/sites/:siteId/sessions',
    sessionEventsPath: '/v1/webapi/sites/:siteId/sessions/:sid/events',
    siteEventSessionFilterPath: "/v1/webapi/sites/:siteId/sessions",
    siteEventsFilterPath: "/v1/webapi/sites/:siteId/events?event=session.start&event=session.end&from=:start&to=:end",
    ttyWsAddr: ':fqdm/v1/webapi/sites/:cluster/connect?access_token=:token&params=:params',
    getSiteUrl: function getSiteUrl(siteId) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.sitePath, {
        siteId: siteId
      });
    },
    getSiteNodesUrl: function getSiteNodesUrl() {
      var siteId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-current-';
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.nodesPath, {
        siteId: siteId
      });
    },
    getSiteSessionUrl: function getSiteSessionUrl() {
      var siteId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-current-';
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.siteSessionPath, {
        siteId: siteId
      });
    },
    getSsoUrl: function getSsoUrl(providerUrl, providerName, redirect) {
      return cfg.baseUrl + Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(providerUrl, {
        redirect: redirect,
        providerName: providerName
      });
    },
    getSiteEventsFilterUrl: function getSiteEventsFilterUrl(_ref) {
      var start = _ref.start,
          end = _ref.end,
          siteId = _ref.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.siteEventsFilterPath, {
        start: start,
        end: end,
        siteId: siteId
      });
    },
    getSessionEventsUrl: function getSessionEventsUrl(_ref2) {
      var sid = _ref2.sid,
          siteId = _ref2.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.sessionEventsPath, {
        sid: sid,
        siteId: siteId
      });
    },
    getScpUrl: function getScpUrl(_ref3) {
      var siteId = _ref3.siteId,
          serverId = _ref3.serverId,
          login = _ref3.login,
          location = _ref3.location,
          filename = _ref3.filename;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.scp, {
        siteId: siteId,
        serverId: serverId,
        login: login,
        location: location,
        filename: filename
      });
    },
    getFetchSessionsUrl: function getFetchSessionsUrl(siteId) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.siteEventSessionFilterPath, {
        siteId: siteId
      });
    },
    getFetchSessionUrl: function getFetchSessionUrl(_ref4) {
      var sid = _ref4.sid,
          siteId = _ref4.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.siteSessionPath + '/:sid', {
        sid: sid,
        siteId: siteId
      });
    },
    getInviteUrl: function getInviteUrl(inviteToken) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.invitePath, {
        inviteToken: inviteToken
      });
    },
    getU2fCreateUserChallengeUrl: function getU2fCreateUserChallengeUrl(inviteToken) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.api.u2fCreateUserChallengePath, {
        inviteToken: inviteToken
      });
    }
  },
  getPlayerUrl: function getPlayerUrl(_ref5) {
    var siteId = _ref5.siteId,
        sid = _ref5.sid;
    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.routes.player, {
      siteId: siteId,
      sid: sid
    });
  },
  getTerminalLoginUrl: function getTerminalLoginUrl(_ref6) {
    var siteId = _ref6.siteId,
        serverId = _ref6.serverId,
        login = _ref6.login,
        sid = _ref6.sid;

    if (!sid) {
      var url = this.stripOptionalParams(cfg.routes.terminal);
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(url, {
        siteId: siteId,
        serverId: serverId,
        login: login
      });
    }

    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.routes.terminal, {
      siteId: siteId,
      serverId: serverId,
      login: login,
      sid: sid
    });
  },
  getCurrentSessionRouteUrl: function getCurrentSessionRouteUrl(_ref7) {
    var sid = _ref7.sid,
        siteId = _ref7.siteId;
    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__[/* formatPattern */ "a"])(cfg.routes.currentSession, {
      sid: sid,
      siteId: siteId
    });
  },
  getAuthProviders: function getAuthProviders() {
    return cfg.auth && cfg.auth.providers ? cfg.auth.providers : [];
  },
  getAuth2faType: function getAuth2faType() {
    return cfg.auth ? cfg.auth.second_factor : null;
  },
  getU2fAppId: function getU2fAppId() {
    return cfg.auth && cfg.auth.u2f ? cfg.auth.u2f.app_id : null;
  },
  getWsHostName: function getWsHostName() {
    var prefix = location.protocol === 'https:' ? 'wss://' : 'ws://';
    var hostport = location.hostname + (location.port ? ':' + location.port : '');
    return "".concat(prefix).concat(hostport);
  },
  init: function init() {
    var newConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object(lodash__WEBPACK_IMPORTED_MODULE_1__["merge"])(this, newConfig);
  },
  getClusterUrl: function getClusterUrl(clusterId) {
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(cfg.routes.cluster, {
      clusterId: clusterId
    });
  },
  getClusterNodesUrl: function getClusterNodesUrl(clusterId) {
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(cfg.routes.clusterNodes, {
      clusterId: clusterId
    });
  },
  getClusterSessionsUrl: function getClusterSessionsUrl(clusterId) {
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(cfg.routes.clusterSessions, {
      clusterId: clusterId
    });
  },
  stripOptionalParams: function stripOptionalParams(pattern) {
    return pattern.replace(/\(.*\)/, '');
  }
};
/* harmony default export */ __webpack_exports__["a"] = (cfg);

/***/ }),

/***/ "LYgY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TRYING_TO_SIGN_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TRYING_TO_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCHING_INVITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TRYING_TO_INIT_APP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TRYING_TO_INIT_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TRYING_TO_CHANGE_PSW; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var TRYING_TO_SIGN_UP = 'TRYING_TO_SIGN_UP';
var TRYING_TO_LOGIN = 'TRYING_TO_LOGIN';
var FETCHING_INVITE = 'FETCHING_INVITE';
var TRYING_TO_INIT_APP = 'TRYING_TO_INIT_APP';
var TRYING_TO_INIT_SETTINGS = 'TRYING_TO_INIT_SETTINGS';
var TRYING_TO_CHANGE_PSW = 'TRYING_TO_CHANGE_PSW';

/***/ }),

/***/ "PVWJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackRec; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("L7e8");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tGXY");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("JPcv");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var TrackRec = new immutable__WEBPACK_IMPORTED_MODULE_2__["Record"]({
  isProcessing: false,
  isFailed: false,
  isSuccess: false,
  message: ''
});
/* harmony default export */ __webpack_exports__["b"] = (Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* START */ "c"], start);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* FAIL */ "b"], fail);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* SUCCESS */ "d"], success);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* CLEAR */ "a"], clear);
  }
}));

function start(state, request) {
  return state.set(request.type, new TrackRec({
    isProcessing: true
  }));
}

function fail(state, request) {
  return state.set(request.type, new TrackRec({
    isFailed: true,
    message: request.message
  }));
}

function success(state, request) {
  return state.set(request.type, new TrackRec({
    isSuccess: true,
    message: request.message
  }));
}

function clear(state, request) {
  return state.set(request.type, new TrackRec());
}

/***/ }),

/***/ "QmW9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./src/shared/components/Logo/Logo.jsx
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  outline: none;\n  margin: 32px auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var Logo_Logo = function Logo(_ref) {
  var src = _ref.src;
  return react_default.a.createElement(StyledImg, {
    src: src
  });
};

Logo_Logo.propTypes = {
  /** Image Src */
  src: prop_types_default.a.string
};
Logo_Logo.displayName = 'Logo';
/* harmony default export */ var components_Logo_Logo = (Logo_Logo);
var StyledImg = styled_components_browser_esm["c" /* default */].img(_templateObject());
// CONCATENATED MODULE: ./src/shared/components/Logo/index.js

/* harmony default export */ var components_Logo = __webpack_exports__["a"] = (components_Logo_Logo);

/***/ }),

/***/ "RnhZ":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "S+Ht":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getUser */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getters; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xSHT");
/* harmony import */ var app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("oHDm");
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var STORE_NAME = 'tlpt_user';
function getUser() {
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].evaluate([STORE_NAME]);
}
var invite = [['tlpt_user_invite'], function (invite) {
  return invite;
}];
var userName = [STORE_NAME, 'name'];
var getters = {
  userName: userName,
  invite: invite,
  pswChangeAttempt: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__[/* changePasswordAttempt */ "a"],
  loginAttemp: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__[/* loginAttempt */ "d"],
  attemp: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__[/* signupAttempt */ "e"],
  fetchingInvite: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__[/* fetchInviteAttempt */ "b"]
};

/***/ }),

/***/ "SwYS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/nuclear-js/dist/nuclear.js
var nuclear = __webpack_require__("L7e8");

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("JPcv");

// CONCATENATED MODULE: ./src/app/flux/sshHistory/actionTypes.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var ADD_ITEM = 'TLPT_SSH_HISTORY';
// CONCATENATED MODULE: ./src/app/flux/sshHistory/store.js
/* unused harmony export SshHistoryRec */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getters; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var STORE_NAME = 'tlpt_ssh_history';
var SshHistoryRec =
/*#__PURE__*/
function (_Record) {
  _inherits(SshHistoryRec, _Record);

  function SshHistoryRec(params) {
    _classCallCheck(this, SshHistoryRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(SshHistoryRec).call(this, params));
  }

  _createClass(SshHistoryRec, [{
    key: "getPrevLogins",
    value: function getPrevLogins(siteId) {
      return this.clusterLogins.get(siteId) || [];
    }
  }, {
    key: "addLoginString",
    value: function addLoginString(_ref) {
      var login = _ref.login,
          serverId = _ref.serverId,
          siteId = _ref.siteId;
      var logins = this.getIn(['clusterLogins', siteId]);

      if (!logins) {
        logins = [];
      }

      var loginStr = "".concat(login, "@").concat(serverId);
      var exists = logins.some(function (i) {
        return i === loginStr;
      });

      if (exists) {
        return this;
      }

      logins.unshift(loginStr);
      return this.setIn(['clusterLogins', siteId], logins);
    }
  }]);

  return SshHistoryRec;
}(Object(immutable["Record"])({
  clusterLogins: new immutable["Map"]()
}));
var store = Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new SshHistoryRec();
  },
  initialize: function initialize() {
    this.on(ADD_ITEM, function (state, params) {
      return state.addLoginString(params);
    });
  }
});
var register = function register(reactor) {
  reactor.registerStores(_defineProperty({}, STORE_NAME, store));
};
var getters = {
  store: [STORE_NAME]
};

/***/ }),

/***/ "Z9Rw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHeaders */
/* unused harmony export getNoCacheHeaders */
/* unused harmony export getXCSRFToken */
/* unused harmony export getAccessToken */
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bZMm");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KdfW");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LMli");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var defaultCfg = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};
var api = {
  get: function get(url) {
    return api.ajax(url);
  },
  post: function post(url, data) {
    return api.ajax(url, {
      body: JSON.stringify(data),
      method: 'POST'
    });
  },
  delete: function _delete(url, data) {
    return api.ajax(url, {
      body: JSON.stringify(data),
      method: 'DELETE'
    });
  },
  put: function put(url, data) {
    return api.ajax(url, {
      body: JSON.stringify(data),
      method: 'PUT'
    });
  },
  ajax: function ajax(url, params) {
    url = _config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].baseUrl + url;

    var options = _objectSpread({}, defaultCfg, params);

    options.headers = _objectSpread({}, options.headers, getAuthHeaders());
    return new Promise(function (resolve, reject) {
      fetch(url, options).then(parseJSON).then(function (response) {
        if (response.ok) {
          return resolve(response.json);
        }

        var err = new Error(getErrorText(response.json));
        err.status = response.status;
        return reject(err);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};

function parseJSON(response) {
  return new Promise(function (resolve, reject) {
    return response.json().then(function (json) {
      return resolve({
        status: response.status,
        ok: response.ok,
        json: json
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
}

function getAuthHeaders() {
  var accessToken = getAccessToken();
  var csrfToken = getXCSRFToken();
  return {
    'X-CSRF-Token': csrfToken,
    'Authorization': "Bearer ".concat(accessToken)
  };
}
function getNoCacheHeaders() {
  return {
    'cache-control': 'max-age=0',
    'expires': '0',
    'pragma': 'no-cache'
  };
}
var getXCSRFToken = function getXCSRFToken() {
  var metaTag = document.querySelector('[name=grv_csrf_token]');
  return metaTag ? metaTag.content : '';
};
function getAccessToken() {
  var bearerToken = _localStorage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"].getBearerToken() || {};
  return bearerToken.accessToken;
}

function getErrorText(json) {
  var msg = 'Unknown error';

  if (json && json.error) {
    return json.error.message || msg;
  }

  if (json && json.message) {
    return json.message;
  }

  if (json && json.error) {
    return json.error.message || msg;
  }

  if (json.responseText) {
    return json.responseText;
  }

  return msg;
}

/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),

/***/ "ausB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TLPT_NODES_RECEIVE; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var TLPT_NODES_RECEIVE = 'TLPT_NODES_RECEIVE';

/***/ }),

/***/ "c877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./src/app/components/nuclear.jsx
var nuclear = __webpack_require__("2qgS");

// EXTERNAL MODULE: ./src/app/config.js
var config = __webpack_require__("LMli");

// EXTERNAL MODULE: ./src/app/flux/user/actions.js + 1 modules
var actions = __webpack_require__("DeKp");

// EXTERNAL MODULE: ./src/app/flux/user/index.js
var flux_user = __webpack_require__("S+Ht");

// EXTERNAL MODULE: ./src/app/components/documentTitle.jsx
var documentTitle = __webpack_require__("tq85");

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./src/app/services/enums.js
var enums = __webpack_require__("l3S1");

// EXTERNAL MODULE: ./src/shared/components/index.js + 22 modules
var components = __webpack_require__("ryey");

// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 2 modules
var formik_esm = __webpack_require__("KYPV");

// CONCATENATED MODULE: ./src/app/components/Invite/InviteForm/TwoFaInfo.jsx
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var U2F_HELP_URL = 'https://support.google.com/accounts/answer/6103523?hl=en';
function Invite2faData(props) {
  var auth2faType = props.auth2faType,
      qr = props.qr;

  if (auth2faType === enums["a" /* Auth2faTypeEnum */].OTP) {
    return react_default.a.createElement("div", {
      className: "grv-flex-column grv-invite-barcode"
    }, react_default.a.createElement("h4", null, "Scan bar code for auth token ", react_default.a.createElement("br", null), react_default.a.createElement("small", null, "Scan below to generate your two factor token")), react_default.a.createElement("img", {
      className: "img-thumbnail",
      src: "data:image/png;base64,".concat(qr)
    }));
  }

  if (auth2faType === enums["a" /* Auth2faTypeEnum */].UTF) {
    return react_default.a.createElement("div", {
      className: "grv-flex-column"
    }, react_default.a.createElement("h3", null, "Insert your U2F key "), react_default.a.createElement("div", {
      className: "m-t-md"
    }, "Press the button on the U2F key after you press the sign up button"), react_default.a.createElement("div", {
      className: "m-t text-muted"
    }, react_default.a.createElement("small", null, "Click", react_default.a.createElement("a", {
      a: true,
      target: "_blank",
      href: U2F_HELP_URL
    }, " here "), "to learn more about U2F 2-Step Verification.")));
  }

  return null;
}
// CONCATENATED MODULE: ./src/app/components/Invite/InviteForm/InviteForm.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 20px;\n  font-weight: bold;\n  line-height: 40px;\n  margin: 0 0 16px 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/







var U2F_ERROR_CODES_URL = 'https://developers.yubico.com/U2F/Libraries/Client_error_codes.html';

var InviteForm_needs2fa = function needs2fa(auth2faType) {
  return !!auth2faType && auth2faType !== enums["a" /* Auth2faTypeEnum */].DISABLED;
};

var InviteForm_InviteForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InviteForm, _React$Component);

  function InviteForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InviteForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InviteForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialValues", {
      password: '',
      passwordConfirmed: '',
      token: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onValidate", function (values) {
      var password = values.password,
          passwordConfirmed = values.passwordConfirmed;
      var errors = {};

      if (!password) {
        errors.password = 'Password is required';
      } else if (password.length < 6) {
        errors.password = 'Enter at least 6 characters';
      }

      if (!passwordConfirmed) {
        errors.passwordConfirmed = 'Please confirm your password';
      } else if (passwordConfirmed !== password) {
        errors.passwordConfirmed = 'Password does not match';
      }

      if (_this.isOTP() && !values.token) {
        errors.token = 'Token is required';
      }

      return errors;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (values) {
      var user = values.user,
          password = values.password,
          token = values.token;

      if (_this.props.auth2faType === enums["a" /* Auth2faTypeEnum */].UTF) {
        _this.props.onSubmitWithU2f(user, password);
      } else {
        _this.props.onSubmit(user, password, token);
      }
    });

    return _this;
  }

  _createClass(InviteForm, [{
    key: "renderNameAndPassFields",
    value: function renderNameAndPassFields(_ref) {
      var values = _ref.values,
          errors = _ref.errors,
          touched = _ref.touched,
          handleChange = _ref.handleChange;
      var passError = touched.password && errors.password;
      var passConfirmedError = touched.passwordConfirmed && errors.passwordConfirmed;
      var tokenError = errors.token && touched.token;
      var user = this.props.invite.user;
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(UserName, null, user), react_default.a.createElement(components["h" /* Label */], {
        hasError: passError
      }, passError || "Password"), react_default.a.createElement(components["g" /* Input */], {
        hasError: passError,
        value: values.password,
        onChange: handleChange,
        type: "password",
        name: "password",
        placeholder: "Password"
      }), react_default.a.createElement(components["h" /* Label */], {
        hasError: passConfirmedError
      }, passConfirmedError || "Confirm Password"), react_default.a.createElement(components["g" /* Input */], {
        hasError: passConfirmedError,
        value: values.passwordConfirmed,
        onChange: handleChange,
        type: "password",
        name: "passwordConfirmed",
        placeholder: "Password"
      }), this.isOTP() && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components["h" /* Label */], {
        mt: 3,
        mb: 1,
        hasError: tokenError
      }, tokenError && errors.token || "Two factor token"), react_default.a.createElement(components["g" /* Input */], {
        id: "token",
        fontSize: 0,
        hasError: tokenError,
        autoComplete: "off",
        value: values.token,
        onChange: handleChange,
        placeholder: "Two factor token (Google Authenticator)"
      })));
    }
  }, {
    key: "isOTP",
    value: function isOTP() {
      var auth2faType = this.props.auth2faType;
      return InviteForm_needs2fa(auth2faType) && auth2faType === enums["a" /* Auth2faTypeEnum */].OTP;
    }
  }, {
    key: "render2faFields",
    value: function render2faFields() {
      var _this2 = this;

      var auth2faType = this.props.auth2faType;

      if (InviteForm_needs2fa(auth2faType) && auth2faType === enums["a" /* Auth2faTypeEnum */].OTP) {
        return react_default.a.createElement("div", {
          className: "form-group"
        }, react_default.a.createElement("input", {
          autoComplete: "off",
          value: this.state.token,
          onChange: function onChange(e) {
            return _this2.onChangeState('token', e.target.value);
          },
          className: "form-control required",
          name: "token",
          placeholder: "Two factor token (Google Authenticator)"
        }));
      }

      return null;
    }
  }, {
    key: "renderSubmitBtn",
    value: function renderSubmitBtn(onClick) {
      var isProcessing = this.props.attempt.isProcessing;
      var $helpBlock = isProcessing && this.props.auth2faType === enums["a" /* Auth2faTypeEnum */].UTF ? "Insert your U2F key and press the button on the key" : null;
      var isDisabled = isProcessing;
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(components["b" /* Button */], {
        block: true,
        disabled: isDisabled,
        size: "large",
        type: "submit",
        onClick: onClick,
        mt: 4
      }, "Create My Teleport Account"), $helpBlock);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          auth2faType = _this$props.auth2faType,
          invite = _this$props.invite,
          attempt = _this$props.attempt;
      var isFailed = attempt.isFailed,
          message = attempt.message;
      var $error = isFailed ? react_default.a.createElement(InviteForm_ErrorMessage, {
        message: message
      }) : null;
      var has2FA = InviteForm_needs2fa(auth2faType);
      return react_default.a.createElement(formik_esm["a" /* Formik */], {
        validate: this.onValidate,
        onSubmit: this.onSubmit,
        initialValues: this.initialValues
      }, function (props) {
        return react_default.a.createElement(components["c" /* Card */], {
          bg: "secondary",
          mt: "4",
          mb: "4",
          mr: "auto",
          ml: "auto",
          width: "456px",
          p: "5"
        }, _this3.renderNameAndPassFields(props), _this3.renderSubmitBtn(props.handleSubmit), $error, has2FA && react_default.a.createElement(Invite2faData, {
          auth2faType: auth2faType,
          qr: invite.qr
        }));
      });
    }
  }]);

  return InviteForm;
}(react_default.a.Component);

_defineProperty(InviteForm_InviteForm, "propTypes", {
  auth2faType: prop_types_default.a.string,
  authType: prop_types_default.a.string,
  onSubmitWithU2f: prop_types_default.a.func.isRequired,
  onSubmit: prop_types_default.a.func.isRequired,
  attempt: prop_types_default.a.object.isRequired
});

var InviteForm_ErrorMessage = function ErrorMessage(_ref2) {
  var message = _ref2.message;
  message = message || '';

  if (message.indexOf('U2F') !== -1) {
    return react_default.a.createElement("label", {
      className: "grv-invite-login-error"
    }, message, react_default.a.createElement("br", null), react_default.a.createElement("small", {
      className: "grv-invite-login-error-u2f-codes"
    }, react_default.a.createElement("span", null, "click ", react_default.a.createElement("a", {
      target: "_blank",
      href: U2F_ERROR_CODES_URL
    }, "here"), " to learn more about U2F error codes")));
  }

  return react_default.a.createElement("label", {
    className: "error"
  }, message, " ");
};
var UserName = styled_components_browser_esm["c" /* default */].div(_templateObject());
/* harmony default export */ var Invite_InviteForm_InviteForm = (InviteForm_InviteForm);
// CONCATENATED MODULE: ./src/app/components/Invite/InviteForm/index.js

/* harmony default export */ var Invite_InviteForm = (Invite_InviteForm_InviteForm);
// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var theme = __webpack_require__("K0cP");

// CONCATENATED MODULE: ./src/app/components/Invite/InviteForm/ExpiredInvite.jsx
function _templateObject2() {
  var data = ExpiredInvite_taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 8px;\n  box-sizing: border-box;\n  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);\n  color: ", ";\n  margin: 32px auto;\n  padding: 40px;\n  width: 540px;\n\n  h1 {\n    color: ", ";\n    font-size: 20px;\n    margin: 0;\n    text-align: center;\n    text-transform: uppercase;\n  }\n\n  p {\n    line-height: 32px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ExpiredInvite_templateObject() {
  var data = ExpiredInvite_taggedTemplateLiteral(["\n  color: ", ";\n  margin: 0 0 0 8px;\n\n  &:visted {\n    color: ", ";\n  }\n"]);

  ExpiredInvite_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ExpiredInvite_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ExpiredInvite_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ExpiredInvite_typeof = function _typeof(obj) { return typeof obj; }; } else { ExpiredInvite_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ExpiredInvite_typeof(obj); }

function ExpiredInvite_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ExpiredInvite_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ExpiredInvite_createClass(Constructor, protoProps, staticProps) { if (protoProps) ExpiredInvite_defineProperties(Constructor.prototype, protoProps); if (staticProps) ExpiredInvite_defineProperties(Constructor, staticProps); return Constructor; }

function ExpiredInvite_possibleConstructorReturn(self, call) { if (call && (ExpiredInvite_typeof(call) === "object" || typeof call === "function")) { return call; } return ExpiredInvite_assertThisInitialized(self); }

function ExpiredInvite_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ExpiredInvite_getPrototypeOf(o) { ExpiredInvite_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ExpiredInvite_getPrototypeOf(o); }

function ExpiredInvite_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ExpiredInvite_setPrototypeOf(subClass, superClass); }

function ExpiredInvite_setPrototypeOf(o, p) { ExpiredInvite_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ExpiredInvite_setPrototypeOf(o, p); }

/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/





var ExpiredInvite_ExpiredInvite =
/*#__PURE__*/
function (_React$Component) {
  ExpiredInvite_inherits(ExpiredInvite, _React$Component);

  function ExpiredInvite(props) {
    ExpiredInvite_classCallCheck(this, ExpiredInvite);

    return ExpiredInvite_possibleConstructorReturn(this, ExpiredInvite_getPrototypeOf(ExpiredInvite).call(this, props));
  }

  ExpiredInvite_createClass(ExpiredInvite, [{
    key: "renderGithubLink",
    value: function renderGithubLink() {
      var product = this.props.product;
      var message = react_default.a.createElement("p", null, "If you believe this is an issue with Teleport, please create a", react_default.a.createElement(GithubLink, {
        href: "https://github.com/gravitational/teleport/issues/new"
      }, "GitHub issue"), ".");

      if (product === 'gravity') {
        message = react_default.a.createElement("p", null, "If you believe this is an issue with Gravity, please create a", react_default.a.createElement(GithubLink, {
          href: "https://github.com/gravitational/gravity/issues/new"
        }, "GitHub issue"), ".");
      }

      return message;
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(ExpiredCard, null, react_default.a.createElement("h1", null, "Invite code has expired"), react_default.a.createElement("p", null, "It appears that your invite code isn't valid anymore. Please contact your account administrator and request another invite."), this.renderGithubLink());
    }
  }]);

  return ExpiredInvite;
}(react_default.a.Component);

var GithubLink = styled_components_browser_esm["c" /* default */].a(ExpiredInvite_templateObject(), theme["b" /* colors */].link, theme["b" /* colors */].link);
var ExpiredCard = styled_components_browser_esm["c" /* default */].div(_templateObject2(), theme["a" /* background */].light, theme["b" /* colors */].text, theme["b" /* colors */].text); // https://github.com/gravitational/teleport/issues/new

ExpiredInvite_ExpiredInvite.propTypes = {
  /** The name of the product (gravity, teleport) */
  product: prop_types_default.a.oneOf(['gravity', 'teleport'])
};
ExpiredInvite_ExpiredInvite.defaultProps = {
  product: 'teleport'
};
/* harmony default export */ var InviteForm_ExpiredInvite = (ExpiredInvite_ExpiredInvite);
// EXTERNAL MODULE: ./src/shared/components/Logo/index.js + 1 modules
var Logo = __webpack_require__("QmW9");

// EXTERNAL MODULE: ./src/shared/assets/images/teleport-medallion.svg
var teleport_medallion = __webpack_require__("BszX");
var teleport_medallion_default = /*#__PURE__*/__webpack_require__.n(teleport_medallion);

// CONCATENATED MODULE: ./src/app/components/Invite/Invite.jsx
function Invite_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Invite_typeof = function _typeof(obj) { return typeof obj; }; } else { Invite_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Invite_typeof(obj); }

function Invite_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Invite_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Invite_createClass(Constructor, protoProps, staticProps) { if (protoProps) Invite_defineProperties(Constructor.prototype, protoProps); if (staticProps) Invite_defineProperties(Constructor, staticProps); return Constructor; }

function Invite_possibleConstructorReturn(self, call) { if (call && (Invite_typeof(call) === "object" || typeof call === "function")) { return call; } return Invite_assertThisInitialized(self); }

function Invite_getPrototypeOf(o) { Invite_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Invite_getPrototypeOf(o); }

function Invite_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Invite_setPrototypeOf(subClass, superClass); }

function Invite_setPrototypeOf(o, p) { Invite_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Invite_setPrototypeOf(o, p); }

function Invite_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Invite_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/










var Invite_Invite =
/*#__PURE__*/
function (_React$Component) {
  Invite_inherits(Invite, _React$Component);

  function Invite() {
    var _getPrototypeOf2;

    var _this;

    Invite_classCallCheck(this, Invite);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Invite_possibleConstructorReturn(this, (_getPrototypeOf2 = Invite_getPrototypeOf(Invite)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Invite_defineProperty(Invite_assertThisInitialized(Invite_assertThisInitialized(_this)), "onSubmitWithU2f", function (username, password) {
      _this.props.acceptInviteWithU2f(username, password, _this.props.params.inviteToken);
    });

    Invite_defineProperty(Invite_assertThisInitialized(Invite_assertThisInitialized(_this)), "onSubmit", function (username, password, token) {
      _this.props.acceptInvite(username, password, token, _this.props.params.inviteToken);
    });

    return _this;
  }

  Invite_createClass(Invite, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchInvite(this.props.params.inviteToken);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fetchingInvite = _this$props.fetchingInvite,
          invite = _this$props.invite,
          attempt = _this$props.attempt;
      var auth2faType = config["a" /* default */].getAuth2faType();

      if (fetchingInvite.isFailed) {
        return react_default.a.createElement("div", null, react_default.a.createElement(Logo["a" /* default */], {
          src: teleport_medallion_default.a
        }), react_default.a.createElement(InviteForm_ExpiredInvite, null));
      }

      if (!invite) {
        return null;
      }

      return react_default.a.createElement("div", null, react_default.a.createElement(Logo["a" /* default */], {
        src: teleport_medallion_default.a
      }), react_default.a.createElement(Invite_InviteForm, {
        auth2faType: auth2faType,
        attempt: attempt,
        invite: invite,
        onSubmitWithU2f: this.onSubmitWithU2f,
        onSubmit: this.onSubmit
      }));
    }
  }]);

  return Invite;
}(react_default.a.Component);

function mapStateToProps() {
  return {
    invite: flux_user["a" /* getters */].invite,
    attempt: flux_user["a" /* getters */].attemp,
    fetchingInvite: flux_user["a" /* getters */].fetchingInvite
  };
}

function mapActionsToProps() {
  return {
    fetchInvite: actions["c" /* fetchInvite */],
    acceptInviteWithU2f: actions["b" /* acceptInviteWithU2f */],
    acceptInvite: actions["a" /* acceptInvite */]
  };
}

/* harmony default export */ var components_Invite_Invite = (Object(documentTitle["a" /* withDocTitle */])("Invite", Object(nuclear["b" /* connect */])(mapStateToProps, mapActionsToProps)(Invite_Invite)));
// CONCATENATED MODULE: ./src/app/components/Invite/index.jsx
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var components_Invite = __webpack_exports__["a"] = (components_Invite_Invite);

/***/ }),

/***/ "cGG6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BearerToken */
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lZJN");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("LMli");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("yaYm");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("KdfW");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Z9Rw");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/





var EMPTY_TOKEN_CONTENT_LENGTH = 20;
var TOKEN_CHECKER_INTERVAL = 15 * 1000; //  every 15 sec

var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].create('services/sessions');
var BearerToken = function BearerToken(json) {
  _classCallCheck(this, BearerToken);

  this.accessToken = json.token;
  this.expiresIn = json.expires_in;
  this.created = new Date().getTime();
};
var sesstionCheckerTimerId = null;
var session = {
  logout: function logout() {
    var _this = this;

    var rememberLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return _api__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].delete(app_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api.sessionPath).finally(function () {
      _this.clear();

      _history__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].goToLogin(rememberLocation);
    });
  },
  clear: function clear() {
    this._stopSessionChecker();

    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].unsubscribe(receiveMessage);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].setBearerToken(null);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].clear();
  },
  ensureSession: function ensureSession() {
    var _this2 = this;

    var rememberLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this._stopSessionChecker();

    this._ensureLocalStorageSubscription();

    var token = this._getBearerToken();

    if (!token) {
      this.logout(rememberLocation);
      return Promise.reject("missing bearer token");
    }

    if (this._shouldRenewToken()) {
      return this._renewToken().then(this._startSessionChecker.bind(this)).catch(function () {
        return _this2.logout(rememberLocation);
      });
    } else {
      this._startSessionChecker();

      return Promise.resolve(token);
    }
  },
  _getBearerToken: function _getBearerToken() {
    var token = null;

    try {
      token = this._extractBearerTokenFromHtml();

      if (token) {
        _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].setBearerToken(token);
      } else {
        token = _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].getBearerToken();
      }
    } catch (err) {
      logger.error('Cannot find bearer token', err);
    }

    return token;
  },
  _extractBearerTokenFromHtml: function _extractBearerTokenFromHtml() {
    var el = document.querySelector('[name=grv_bearer_token]');
    var token = null;

    if (el !== null) {
      var encodedToken = el.content || '';

      if (encodedToken.length > EMPTY_TOKEN_CONTENT_LENGTH) {
        var decoded = window.atob(encodedToken);
        var json = JSON.parse(decoded);
        token = new BearerToken(json);
      } // remove initial data from HTML as it will be renewed with a time


      el.parentNode.removeChild(el);
    }

    return token;
  },
  _shouldRenewToken: function _shouldRenewToken() {
    if (this._getIsRenewing()) {
      return false;
    }

    return this._timeLeft() < TOKEN_CHECKER_INTERVAL * 1.5;
  },
  _shouldCheckStatus: function _shouldCheckStatus() {
    if (this._getIsRenewing()) {
      return false;
    }
    /*
    * double the threshold value for slow connections to avoid
    * access-denied response due to concurrent renew token request
    * made from other tab
    */


    return this._timeLeft() > TOKEN_CHECKER_INTERVAL * 2;
  },
  _renewToken: function _renewToken() {
    var _this3 = this;

    this._setAndBroadcastIsRenewing(true);

    return _api__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].post(app_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api.renewTokenPath).then(this._receiveBearerToken.bind(this)).finally(function () {
      _this3._setAndBroadcastIsRenewing(false);
    });
  },
  _receiveBearerToken: function _receiveBearerToken(json) {
    var token = new BearerToken(json);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].setBearerToken(token);
  },
  _fetchStatus: function _fetchStatus() {
    var _this4 = this;

    _api__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].get(app_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].api.userStatusPath).catch(function (err) {
      // indicates that session is no longer valid (caused by server restarts or updates)
      if (err.status == 403) {
        _this4.logout();
      }
    });
  },
  _setAndBroadcastIsRenewing: function _setAndBroadcastIsRenewing(value) {
    this._setIsRenewing(value);

    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].broadcast(_localStorage__WEBPACK_IMPORTED_MODULE_3__[/* KeysEnum */ "a"].TOKEN_RENEW, value);
  },
  _setIsRenewing: function _setIsRenewing(value) {
    this._isRenewing = value;
  },
  _getIsRenewing: function _getIsRenewing() {
    return !!this._isRenewing;
  },
  _timeLeft: function _timeLeft() {
    var token = this._getBearerToken();

    if (!token) {
      return 0;
    }

    var expiresIn = token.expiresIn,
        created = token.created;

    if (!created || !expiresIn) {
      return 0;
    }

    expiresIn = expiresIn * 1000;
    var delta = created + expiresIn - new Date().getTime();
    return delta;
  },
  // detects localStorage changes from other tabs
  _ensureLocalStorageSubscription: function _ensureLocalStorageSubscription() {
    _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].subscribe(receiveMessage);
  },
  _startSessionChecker: function _startSessionChecker() {
    var _this5 = this;

    this._stopSessionChecker();

    sesstionCheckerTimerId = setInterval(function () {
      // calling ensureSession() will again invoke _startSessionChecker
      _this5.ensureSession(); // check if server has a valid session in case of server restarts


      if (_this5._shouldCheckStatus()) {
        _this5._fetchStatus();
      }
    }, TOKEN_CHECKER_INTERVAL);
  },
  _stopSessionChecker: function _stopSessionChecker() {
    clearInterval(sesstionCheckerTimerId);
    sesstionCheckerTimerId = null;
  }
};

function receiveMessage(event) {
  var key = event.key,
      newValue = event.newValue; // check if local storage has been cleared from another tab

  if (_localStorage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].getBearerToken() === null) {
    session.logout();
  } // renewToken has been invoked from another tab


  if (key === _localStorage__WEBPACK_IMPORTED_MODULE_3__[/* KeysEnum */ "a"].TOKEN_RENEW && !!newValue) {
    session._setIsRenewing(JSON.parse(newValue));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (session);

/***/ }),

/***/ "cIpc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export compilePattern */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return matchPattern; });
/* unused harmony export getParamNames */
/* unused harmony export getParams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatPattern; });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QLaP");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);
/*
 *  The MIT License (MIT)
 *  Copyright (c) 2015 Ryan Florence, Michael Jackson
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeSource(string) {
  return escapeRegExp(string).replace(/\/+/g, '/+');
}

function _compilePattern(pattern) {
  var regexpSource = '';
  var paramNames = [];
  var tokens = [];
  var match,
      lastIndex = 0,
      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
  /*eslint no-cond-assign: 0*/

  while (match = matcher.exec(pattern)) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index));
      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
    }

    if (match[1]) {
      regexpSource += '([^/?#]+)';
      paramNames.push(match[1]);
    } else if (match[0] === '**') {
      regexpSource += '([\\s\\S]*)';
      paramNames.push('splat');
    } else if (match[0] === '*') {
      regexpSource += '([\\s\\S]*?)';
      paramNames.push('splat');
    } else if (match[0] === '(') {
      regexpSource += '(?:';
    } else if (match[0] === ')') {
      regexpSource += ')?';
    }

    tokens.push(match[0]);
    lastIndex = matcher.lastIndex;
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length));
    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
  }

  return {
    pattern: pattern,
    regexpSource: regexpSource,
    paramNames: paramNames,
    tokens: tokens
  };
}

var CompiledPatternsCache = {};
function compilePattern(pattern) {
  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);
  return CompiledPatternsCache[pattern];
}
/**
 * Attempts to match a pattern on the given pathname. Patterns may use
 * the following special characters:
 *
 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
 *                  captured string is considered a "param"
 * - ()             Wraps a segment of the URL that is optional
 * - *              Consumes (non-greedy) all characters up to the next
 *                  character in the pattern, or to the end of the URL if
 *                  there is none
 * - **             Consumes (greedy) all characters up to the next character
 *                  in the pattern, or to the end of the URL if there is none
 *
 * The return value is an object with the following properties:
 *
 * - remainingPathname
 * - paramNames
 * - paramValues
 */

function matchPattern(pattern, pathname) {
  // Make leading slashes consistent between pattern and pathname.
  if (pattern.charAt(0) !== '/') {
    pattern = "/".concat(pattern);
  }

  if (pathname.charAt(0) !== '/') {
    pathname = "/".concat(pathname);
  }

  var _compilePattern2 = compilePattern(pattern),
      regexpSource = _compilePattern2.regexpSource,
      paramNames = _compilePattern2.paramNames,
      tokens = _compilePattern2.tokens;

  regexpSource += '/*'; // Capture path separators
  // Special-case patterns like '*' for catch-all routes.

  var captureRemaining = tokens[tokens.length - 1] !== '*';

  if (captureRemaining) {
    // This will match newlines in the remaining path.
    regexpSource += '([\\s\\S]*?)';
  }

  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));
  var remainingPathname, paramValues;

  if (match != null) {
    if (captureRemaining) {
      remainingPathname = match.pop();
      var matchedPath = match[0].substr(0, match[0].length - remainingPathname.length); // If we didn't match the entire pathname, then make sure that the match
      // we did get ends at a path separator (potentially the one we added
      // above at the beginning of the path, if the actual match was empty).

      if (remainingPathname && matchedPath.charAt(matchedPath.length - 1) !== '/') {
        return {
          remainingPathname: null,
          paramNames: paramNames,
          paramValues: null
        };
      }
    } else {
      // If this matched at all, then the match was the entire pathname.
      remainingPathname = '';
    }

    paramValues = match.slice(1).map(function (v) {
      return v != null ? decodeURIComponent(v) : v;
    });
  } else {
    remainingPathname = paramValues = null;
  }

  return {
    remainingPathname: remainingPathname,
    paramNames: paramNames,
    paramValues: paramValues
  };
}
function getParamNames(pattern) {
  return compilePattern(pattern).paramNames;
}
function getParams(pattern, pathname) {
  var _matchPattern = matchPattern(pattern, pathname),
      paramNames = _matchPattern.paramNames,
      paramValues = _matchPattern.paramValues;

  if (paramValues != null) {
    return paramNames.reduce(function (memo, paramName, index) {
      memo[paramName] = paramValues[index];
      return memo;
    }, {});
  }

  return null;
}
/**
 * Returns a version of the given pattern with params interpolated. Throws
 * if there is a dynamic segment of the pattern for which there is no param.
 */

function formatPattern(pattern, params) {
  params = params || {};

  var _compilePattern3 = compilePattern(pattern),
      tokens = _compilePattern3.tokens;

  var parenCount = 0,
      pathname = '',
      splatIndex = 0;
  var token, paramName, paramValue;

  for (var i = 0, len = tokens.length; i < len; ++i) {
    token = tokens[i];

    if (token === '*' || token === '**') {
      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
      invariant__WEBPACK_IMPORTED_MODULE_0___default()(paramValue != null || parenCount > 0, 'Missing splat #%s for path "%s"', splatIndex, pattern);
      if (paramValue != null) pathname += encodeURI(paramValue);
    } else if (token === '(') {
      parenCount += 1;
    } else if (token === ')') {
      parenCount -= 1;
    } else if (token.charAt(0) === ':') {
      paramName = token.substring(1);
      paramValue = params[paramName];
      invariant__WEBPACK_IMPORTED_MODULE_0___default()(paramValue != null || parenCount > 0, 'Missing "%s" parameter for path "%s"', paramName, pattern);
      if (paramValue != null) pathname += encodeURIComponent(paramValue);
    } else {
      pathname += token;
    }
  }

  return pathname.replace(/\/+/g, '/');
}

/***/ }),

/***/ "eowl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nr6O");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("jKe7");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2INN");
/* harmony import */ var _components_nuclear__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2qgS");
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("F86T");
/* harmony import */ var _components_Invite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c877");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("LMli");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("jP+w");
/* harmony import */ var _shared_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("s1C8");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("0cfB");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_10__);
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/










Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_10__["setConfig"])({
  logLevel: 'no-errors-please'
});

var Root = function Root(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    history: props.history
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_nuclear__WEBPACK_IMPORTED_MODULE_4__[/* Provider */ "a"], {
    reactor: props.reactor
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    path: _config__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].routes.login,
    component: _components_Login__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    path: _config__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].routes.newUser,
    component: _components_Invite__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    path: _config__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].routes.app,
    component: _components_App__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]
  })))));
};

/* harmony default export */ __webpack_exports__["a"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_10__["hot"])(module)(Root));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("3UD+")(module)))

/***/ }),

/***/ "frOc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/styled-system/dist/index.esm.js + 1 modules
var index_esm = __webpack_require__("za5s");

// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var theme = __webpack_require__("K0cP");

// CONCATENATED MODULE: ./src/shared/components/Button/Button.jsx
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border: none;\n  border-radius: 4px;\n  color: ", ";\n  cursor: pointer;\n  font-family: inherit;\n  font-weight: bold;\n  display: inline-block;\n  line-height: 40px;\n  outline: none;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n\n  &:hover {\n    background: ", ";\n  }\n\n  &:active {\n    background: ", ";\n    color: rgba(255, 255, 255, .24);\n    box-shadow: none;\n  }\n\n  &:disabled {\n    background: rgba(255, 255, 255, .24);\n    color: rgba(0, 0, 0, .24);\n  }\n\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var size = function size(props) {
  switch (props.size) {
    case 'small':
      return {
        fontSize: '10px',
        lineHeight: '24px',
        padding: '0 8px'
      };

    case 'medium':
      return {
        fontSize: "12px",
        lineHeight: '40px',
        padding: '0 24px'
      };

    case 'large':
      return {
        fontSize: '14px',
        lineHeight: '56px',
        padding: '0 40px'
      };

    default:
      return {
        fontSize: "10px",
        lineHeight: '40px',
        padding: '0 24px'
      };
  }
};

var color = function color(props) {
  var color = {
    background: props.theme.colors.primary
  };

  if (props.secondary) {
    color = {
      background: props.theme.colors.secondary,
      '&:hover': {
        background: props.theme.colors.secondaryLight
      }
    };
  }

  return color;
};

var block = function block(props) {
  return props.block ? {
    boxSizing: 'border-box',
    display: 'block',
    width: '100%'
  } : null;
};

var Button = styled_components_browser_esm["c" /* default */].button(_templateObject(), function (props) {
  return props.theme.colors.primary;
}, function (props) {
  return props.theme.colors.light;
}, function (props) {
  return props.theme.colors.primaryLight;
}, function (props) {
  return props.theme.colors.primaryDark;
}, color, block, size, index_esm["k" /* space */]);
var numberStringOrArray = prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string, prop_types_default.a.array]);
Button.propTypes = {
  /** Size */
  size: prop_types_default.a.oneOf(['small', 'medium', 'large']),
  block: prop_types_default.a.bool,
  secondary: prop_types_default.a.bool,

  /** Margin */
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray
};
Button.defaultProps = {
  size: 'medium',
  theme: theme["c" /* default */]
};
Button.displayName = 'Button';
/* harmony default export */ var Button_Button = (Button);
// CONCATENATED MODULE: ./src/shared/components/Button/index.js

/* harmony default export */ var components_Button = __webpack_exports__["a"] = (Button_Button);

/***/ }),

/***/ "gC4k":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RECEIVE_USERACL; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var RECEIVE_USERACL = 'TLPT_USERACL_RECEIVE';

/***/ }),

/***/ "gOk0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export isDevEnv */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isTestEnv; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var isDevEnv = function isDevEnv() {
  return "production" === 'development';
};
var isTestEnv = function isTestEnv() {
  return process.env.NODE_ENV_TYPE === 'test';
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("KCCg")))

/***/ }),

/***/ "jP+w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__("jKe7");

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js + 1 modules
var Route = __webpack_require__("2INN");

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./src/app/components/nuclear.jsx
var nuclear = __webpack_require__("2qgS");

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/NavLink.js + 9 modules
var NavLink = __webpack_require__("uNOt");

// EXTERNAL MODULE: ./src/app/flux/user/index.js
var flux_user = __webpack_require__("S+Ht");

// EXTERNAL MODULE: ./src/app/config.js
var config = __webpack_require__("LMli");

// EXTERNAL MODULE: ./src/app/flux/user/actions.js + 1 modules
var actions = __webpack_require__("DeKp");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./src/shared/components/TopNav/TopNavItem.jsx
var TopNavItem = __webpack_require__("2oKY");

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("i8i4");
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/dom-helpers/util/scrollbarSize.js
var scrollbarSize = __webpack_require__("xUaa");
var scrollbarSize_default = /*#__PURE__*/__webpack_require__.n(scrollbarSize);

// CONCATENATED MODULE: ./src/shared/components/Popover/Transition.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Transition_Transition =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition() {
    _classCallCheck(this, Transition);

    return _possibleConstructorReturn(this, _getPrototypeOf(Transition).apply(this, arguments));
  }

  _createClass(Transition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var node = react_dom_default.a.findDOMNode(this);
      this.props.onEntering(node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          childProps = _objectWithoutProperties(_this$props, ["children"]);

      delete childProps.onEntering;
      var child = react_default.a.Children.only(children);
      return react_default.a.cloneElement(child, childProps);
    }
  }]);

  return Transition;
}(react_default.a.Component);

/* harmony default export */ var Popover_Transition = (Transition_Transition);
// EXTERNAL MODULE: ./node_modules/dom-helpers/query/offset.js
var offset = __webpack_require__("A63a");
var offset_default = /*#__PURE__*/__webpack_require__.n(offset);

// EXTERNAL MODULE: ./node_modules/dom-helpers/query/position.js
var position = __webpack_require__("fpU1");
var position_default = /*#__PURE__*/__webpack_require__.n(position);

// EXTERNAL MODULE: ./node_modules/dom-helpers/query/scrollTop.js
var scrollTop = __webpack_require__("ZfQF");
var scrollTop_default = /*#__PURE__*/__webpack_require__.n(scrollTop);

// CONCATENATED MODULE: ./src/shared/components/utils/index.js




function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
}
function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return react_dom_default.a.findDOMNode(container) || defaultContainer;
}

function getContainerDimensions(containerNode) {
  var width, height, scroll;

  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scroll = scrollTop_default()(ownerDocument(containerNode).documentElement) || scrollTop_default()(containerNode);
  } else {
    var _getOffset = offset_default()(containerNode);

    width = _getOffset.width;
    height = _getOffset.height;
    scroll = scrollTop_default()(containerNode);
  }

  return {
    width: width,
    height: height,
    scroll: scroll
  };
}

function getTopDelta(top, overlayHeight, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var containerScroll = containerDimensions.scroll;
  var containerHeight = containerDimensions.height;
  var topEdgeOffset = top - padding - containerScroll;
  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  } else {
    return 0;
  }
}

function getLeftDelta(left, overlayWidth, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var containerWidth = containerDimensions.width;
  var leftEdgeOffset = left - padding;
  var rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  }

  return 0;
}

function calculatePosition(placement, overlayNode, target, container, padding) {
  var childOffset = container.tagName === 'BODY' ? offset_default()(target) : position_default()(target, container);

  var _getOffset2 = offset_default()(overlayNode),
      overlayHeight = _getOffset2.height,
      overlayWidth = _getOffset2.width;

  var positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop;

  if (placement === 'left' || placement === 'right') {
    positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

    if (placement === 'left') {
      positionLeft = childOffset.left - overlayWidth;
    } else {
      positionLeft = childOffset.left + childOffset.width;
    }

    var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);
    positionTop += topDelta;
    arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
    arrowOffsetLeft = void 0;
  } else if (placement === 'top' || placement === 'bottom') {
    positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

    if (placement === 'top') {
      positionTop = childOffset.top - overlayHeight;
    } else {
      positionTop = childOffset.top + childOffset.height;
    }

    var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
    positionLeft += leftDelta;
    arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
    arrowOffsetTop = void 0;
  } else {
    throw new Error("calcOverlayPosition(): No such placement of \"".concat(placement, "\" found."));
  }

  return {
    positionLeft: positionLeft,
    positionTop: positionTop,
    arrowOffsetLeft: arrowOffsetLeft,
    arrowOffsetTop: arrowOffsetTop
  };
}
// EXTERNAL MODULE: ./node_modules/keycode/index.js
var keycode = __webpack_require__("3zPy");
var keycode_default = /*#__PURE__*/__webpack_require__.n(keycode);

// CONCATENATED MODULE: ./src/shared/components/Modal/Portal.jsx
function Portal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Portal_typeof = function _typeof(obj) { return typeof obj; }; } else { Portal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Portal_typeof(obj); }

function Portal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Portal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Portal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Portal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Portal_defineProperties(Constructor, staticProps); return Constructor; }

function Portal_possibleConstructorReturn(self, call) { if (call && (Portal_typeof(call) === "object" || typeof call === "function")) { return call; } return Portal_assertThisInitialized(self); }

function Portal_getPrototypeOf(o) { Portal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Portal_getPrototypeOf(o); }

function Portal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Portal_setPrototypeOf(subClass, superClass); }

function Portal_setPrototypeOf(o, p) { Portal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Portal_setPrototypeOf(o, p); }

function Portal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */

var Portal_Portal =
/*#__PURE__*/
function (_React$Component) {
  Portal_inherits(Portal, _React$Component);

  function Portal() {
    var _getPrototypeOf2;

    var _this;

    Portal_classCallCheck(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Portal_possibleConstructorReturn(this, (_getPrototypeOf2 = Portal_getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(Portal_assertThisInitialized(Portal_assertThisInitialized(_this)), "getMountNode", function () {
      return _this.mountNode;
    });

    return _this;
  }

  Portal_createClass(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setMountNode(this.props.container); // Only rerender if needed

      if (!this.props.disablePortal) {
        this.forceUpdate(this.props.onRendered);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.container !== this.props.container || prevProps.disablePortal !== this.props.disablePortal) {
        this.setMountNode(this.props.container); // Only rerender if needed

        if (!this.props.disablePortal) {
          this.forceUpdate(this.props.onRendered);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mountNode = null;
    }
  }, {
    key: "setMountNode",
    value: function setMountNode(container) {
      if (this.props.disablePortal) {
        this.mountNode = react_dom_default.a.findDOMNode(this).parentElement;
        return;
      }

      this.mountNode = Portal_getContainer(container, getOwnerDocument(this).body);
    }
    /**
     * @public
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          disablePortal = _this$props.disablePortal;

      if (disablePortal) {
        return children;
      }

      return this.mountNode ? react_dom_default.a.createPortal(children, this.mountNode) : null;
    }
  }]);

  return Portal;
}(react_default.a.Component);

Portal_Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: prop_types_default.a.node.isRequired,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.func]),

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: prop_types_default.a.bool,

  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: prop_types_default.a.func
};
Portal_Portal.defaultProps = {
  disablePortal: false
};

function Portal_getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return react_dom_default.a.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(react_dom_default.a.findDOMNode(element));
}

/* harmony default export */ var Modal_Portal = (Portal_Portal);
// CONCATENATED MODULE: ./src/shared/components/Modal/RootRef.jsx
function RootRef_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { RootRef_typeof = function _typeof(obj) { return typeof obj; }; } else { RootRef_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return RootRef_typeof(obj); }

function RootRef_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RootRef_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RootRef_createClass(Constructor, protoProps, staticProps) { if (protoProps) RootRef_defineProperties(Constructor.prototype, protoProps); if (staticProps) RootRef_defineProperties(Constructor, staticProps); return Constructor; }

function RootRef_possibleConstructorReturn(self, call) { if (call && (RootRef_typeof(call) === "object" || typeof call === "function")) { return call; } return RootRef_assertThisInitialized(self); }

function RootRef_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RootRef_getPrototypeOf(o) { RootRef_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RootRef_getPrototypeOf(o); }

function RootRef_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) RootRef_setPrototypeOf(subClass, superClass); }

function RootRef_setPrototypeOf(o, p) { RootRef_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RootRef_setPrototypeOf(o, p); }





var RootRef_RootRef =
/*#__PURE__*/
function (_React$Component) {
  RootRef_inherits(RootRef, _React$Component);

  function RootRef() {
    RootRef_classCallCheck(this, RootRef);

    return RootRef_possibleConstructorReturn(this, RootRef_getPrototypeOf(RootRef).apply(this, arguments));
  }

  RootRef_createClass(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = react_dom_default.a.findDOMNode(this);
      setRef(this.props.rootRef, this.ref);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = react_dom_default.a.findDOMNode(this);

      if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
        if (prevProps.rootRef !== this.props.rootRef) {
          setRef(prevProps.rootRef, null);
        }

        this.ref = ref;
        setRef(this.props.rootRef, this.ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ref = null;
      setRef(this.props.rootRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return RootRef;
}(react_default.a.Component);

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

RootRef_RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: prop_types_default.a.element.isRequired,

  /**
   * Provide a way to access the DOM node of the wrapped element.
   * You can provide a callback ref or a `React.createRef()` ref.
   */
  rootRef: prop_types_default.a.oneOfType([prop_types_default.a.func, prop_types_default.a.object]).isRequired
};
/* harmony default export */ var Modal_RootRef = (RootRef_RootRef);
// CONCATENATED MODULE: ./src/shared/components/Modal/Modal.jsx
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  z-index: 1200;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  z-index: -1;\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  background-color: ", ";\n  opacity: 1;\n  touch-action: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Modal_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Modal_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Modal_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Modal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Modal_typeof = function _typeof(obj) { return typeof obj; }; } else { Modal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Modal_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Modal_defineProperties(Constructor, staticProps); return Constructor; }

function Modal_possibleConstructorReturn(self, call) { if (call && (Modal_typeof(call) === "object" || typeof call === "function")) { return call; } return Modal_assertThisInitialized(self); }

function Modal_getPrototypeOf(o) { Modal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Modal_getPrototypeOf(o); }

function Modal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Modal_setPrototypeOf(subClass, superClass); }

function Modal_setPrototypeOf(o, p) { Modal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Modal_setPrototypeOf(o, p); }

function Modal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

var Modal_Modal =
/*#__PURE__*/
function (_React$Component) {
  Modal_inherits(Modal, _React$Component);

  function Modal(props) {
    var _this;

    Modal_classCallCheck(this, Modal);

    _this = Modal_possibleConstructorReturn(this, Modal_getPrototypeOf(Modal).call(this));

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "mounted", false);

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleOpen", function () {
      var doc = ownerDocument(_this.mountNode); //const container = getContainer(this.props.container, doc.body);
      //this.props.manager.add(this, container);

      doc.addEventListener('keydown', _this.handleDocumentKeyDown);
      doc.addEventListener('focus', _this.enforceFocus, true);

      if (_this.dialogRef) {
        _this.handleOpened();
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleOpened", function () {
      _this.autoFocus(); // Fix a bug on Chrome where the scroll isn't initially 0.


      _this.modalRef.scrollTop = 0;
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleClose", function () {
      var doc = ownerDocument(_this.mountNode);
      doc.removeEventListener('keydown', _this.handleDocumentKeyDown);
      doc.removeEventListener('focus', _this.enforceFocus, true);

      _this.restoreLastFocus();
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleExited", function () {
      _this.setState({
        exited: true
      });
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleBackdropClick", function (event) {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (_this.props.onBackdropClick) {
        _this.props.onBackdropClick(event);
      }

      if (!_this.props.disableBackdropClick && _this.props.onClose) {
        _this.props.onClose(event, 'backdropClick');
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleDocumentKeyDown", function (event) {
      // Ignore events that have been `event.preventDefault()` marked.
      if (keycode_default()(event) !== 'esc' || !_this.isTopModal() || event.defaultPrevented) {
        return;
      }

      if (_this.props.onEscapeKeyDown) {
        _this.props.onEscapeKeyDown(event);
      }

      if (!_this.props.disableEscapeKeyDown && _this.props.onClose) {
        _this.props.onClose(event, 'escapeKeyDown');
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "enforceFocus", function () {
      // The Modal might not already be mounted.
      if (!_this.isTopModal() || _this.props.disableEnforceFocus || !_this.mounted || !_this.dialogRef) {
        return;
      }

      var currentActiveElement = ownerDocument(_this.mountNode).activeElement;

      if (!_this.dialogRef.contains(currentActiveElement)) {
        _this.dialogRef.focus();
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handlePortalRef", function (ref) {
      _this.mountNode = ref ? ref.getMountNode() : ref;
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleModalRef", function (ref) {
      _this.modalRef = ref;
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "onRootRef", function (ref) {
      _this.dialogRef = ref;
    });

    _this.state = {
      exited: !props.open
    };
    return _this;
  }

  Modal_createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;

      if (this.props.open) {
        this.handleOpen();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.open && !this.props.open) {
        this.handleClose();
      } else if (!prevProps.open && this.props.open) {
        this.lastFocus = ownerDocument(this.mountNode).activeElement;
        this.handleOpen();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.props.open || getHasTransition(this.props) && !this.state.exited) {
        this.handleClose();
      }
    }
  }, {
    key: "restoreLastFocus",
    value: function restoreLastFocus() {
      if (this.props.disableRestoreFocus || !this.lastFocus) {
        return;
      } // Not all elements in IE 11 have a focus method.
      // Because IE 11 market share is low, we accept the restore focus being broken
      // and we silent the issue.


      if (this.lastFocus.focus) {
        this.lastFocus.focus();
      }

      this.lastFocus = null;
    }
  }, {
    key: "isTopModal",
    value: function isTopModal() {//return this.props.manager.isTopModal(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          BackdropProps = _this$props.BackdropProps,
          children = _this$props.children,
          container = _this$props.container,
          disablePortal = _this$props.disablePortal,
          modalCss = _this$props.modalCss,
          open = _this$props.open;
      var childProps = {};

      if (!open) {
        return null;
      }

      return react_default.a.createElement(Modal_Portal, {
        ref: this.handlePortalRef,
        container: container,
        disablePortal: disablePortal,
        onRendered: this.handleRendered
      }, react_default.a.createElement(StyledModal, {
        modalCss: modalCss,
        "data-mui-test": "Modal",
        ref: this.handleModalRef
      }, react_default.a.createElement(Modal_Backdrop, _extends({
        onClick: this.handleBackdropClick
      }, BackdropProps)), react_default.a.createElement(Modal_RootRef, {
        rootRef: this.onRootRef
      }, react_default.a.cloneElement(children, childProps))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if (nextProps.open) {
        return {
          exited: false
        };
      }

      return null;
    }
  }]);

  return Modal;
}(react_default.a.Component);

Modal_Modal.propTypes = {
  /**
   * A backdrop component. This property enables custom backdrop rendering.
   */

  /**
   * Properties applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: prop_types_default.a.object,

  /**
   * A single child content element.
   */
  children: prop_types_default.a.element,

  /**
   * @ignore
   */
  className: prop_types_default.a.string,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   */
  container: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: prop_types_default.a.bool,

  /**
   * If `true`, clicking the backdrop will not fire any callback.
   */
  disableBackdropClick: prop_types_default.a.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: prop_types_default.a.bool,

  /**
   * If `true`, hitting escape will not fire any callback.
   */
  disableEscapeKeyDown: prop_types_default.a.bool,

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: prop_types_default.a.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: prop_types_default.a.bool,

  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop: prop_types_default.a.bool,

  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: prop_types_default.a.bool,

  /**
   * A modal manager used to track and manage the state of open
   * Modals. This enables customizing how modals interact within a container.
   */
  manager: prop_types_default.a.object,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: prop_types_default.a.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: prop_types_default.a.func,

  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown: prop_types_default.a.func,

  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` property took effect.
   */
  onRendered: prop_types_default.a.func,

  /**
   * If `true`, the modal is open.
   */
  open: prop_types_default.a.bool.isRequired
};
Modal_Modal.defaultProps = {
  BackdropComponent: Modal_Backdrop,
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disablePortal: false,
  disableRestoreFocus: false,
  hideBackdrop: false,
  keepMounted: false
};
/* harmony default export */ var components_Modal_Modal = (Modal_Modal);

var Modal_Backdrop = function Backdrop(props) {
  var invisible = props.invisible,
      rest = Modal_objectWithoutProperties(props, ["invisible"]);

  return react_default.a.createElement(StyledBackdrop, _extends({
    "aria-hidden": "true",
    invisible: invisible
  }, rest));
};

var StyledBackdrop = styled_components_browser_esm["c" /* default */].div(_templateObject(), function (props) {
  return props.invisible ? 'transparent' : "rgba(0, 0, 0, 0.5)";
});
var StyledModal = styled_components_browser_esm["c" /* default */].div(_templateObject2(), function (props) {
  return props.modalCss && props.modalCss(props);
});
// CONCATENATED MODULE: ./src/shared/components/Modal/index.js

/* harmony default export */ var components_Modal = (components_Modal_Modal);
// CONCATENATED MODULE: ./src/shared/components/Popover/Popover.jsx
function Popover_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Popover_typeof = function _typeof(obj) { return typeof obj; }; } else { Popover_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Popover_typeof(obj); }

function Popover_extends() { Popover_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Popover_extends.apply(this, arguments); }

function Popover_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Popover_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Popover_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Popover_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Popover_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Popover_createClass(Constructor, protoProps, staticProps) { if (protoProps) Popover_defineProperties(Constructor.prototype, protoProps); if (staticProps) Popover_defineProperties(Constructor, staticProps); return Constructor; }

function Popover_possibleConstructorReturn(self, call) { if (call && (Popover_typeof(call) === "object" || typeof call === "function")) { return call; } return Popover_assertThisInitialized(self); }

function Popover_getPrototypeOf(o) { Popover_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Popover_getPrototypeOf(o); }

function Popover_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Popover_setPrototypeOf(subClass, superClass); }

function Popover_setPrototypeOf(o, p) { Popover_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Popover_setPrototypeOf(o, p); }

function Popover_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Popover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Popover_templateObject() {
  var data = Popover_taggedTemplateLiteral(["\n  position: absolute;\n  overflowY: auto;\n  overflowX: hidden;\n  min-width: 16px;\n  min-height: 16px;\n  max-width: calc(100% - 32px);\n  maxHeight: calc(100% - 32px);\n  outline: none;\n  ", "\n"]);

  Popover_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Popover_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// @inheritedComponent Modal







var StyledPopover = styled_components_browser_esm["c" /* default */].div(Popover_templateObject(), function (props) {
  return props.popoverCss && props.popoverCss(props);
});

function getOffsetTop(rect, vertical) {
  var offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  var offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(function (n) {
    return typeof n === 'number' ? "".concat(n, "px") : n;
  }).join(' ');
} // Sum the scrollTop between two elements.


function getScrollParent(parent, child) {
  var element = child;
  var scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }

  return scrollTop;
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

var Popover_Popover =
/*#__PURE__*/
function (_React$Component) {
  Popover_inherits(Popover, _React$Component);

  function Popover() {
    var _this;

    Popover_classCallCheck(this, Popover);

    _this = Popover_possibleConstructorReturn(this, Popover_getPrototypeOf(Popover).call(this));

    Popover_defineProperty(Popover_assertThisInitialized(Popover_assertThisInitialized(_this)), "handleGetOffsetTop", getOffsetTop);

    Popover_defineProperty(Popover_assertThisInitialized(Popover_assertThisInitialized(_this)), "handleGetOffsetLeft", getOffsetLeft);

    Popover_defineProperty(Popover_assertThisInitialized(Popover_assertThisInitialized(_this)), "setPositioningStyles", function (element) {
      var positioning = _this.getPositioningStyle(element);

      if (positioning.top !== null) {
        element.style.top = positioning.top;
      }

      if (positioning.left !== null) {
        element.style.left = positioning.left;
      }

      element.style.transformOrigin = positioning.transformOrigin;
    });

    Popover_defineProperty(Popover_assertThisInitialized(Popover_assertThisInitialized(_this)), "getPositioningStyle", function (element) {
      var _this$props = _this.props,
          anchorEl = _this$props.anchorEl,
          anchorReference = _this$props.anchorReference,
          marginThreshold = _this$props.marginThreshold; // Check if the parent has requested anchoring on an inner content node

      var contentAnchorOffset = _this.getContentAnchorOffset(element);

      var elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight
      }; // Get the transform origin point on the element itself

      var transformOrigin = _this.getTransformOrigin(elemRect, contentAnchorOffset);

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(transformOrigin)
        };
      } // Get the offset of of the anchoring element


      var anchorOffset = _this.getAnchorOffset(contentAnchorOffset); // Calculate element positioning


      var top = anchorOffset.top - transformOrigin.vertical;
      var left = anchorOffset.left - transformOrigin.horizontal;
      var bottom = top + elemRect.height;
      var right = left + elemRect.width; // Use the parent window of the anchorEl if provided

      var containerWindow = ownerWindow(getAnchorEl(anchorEl)); // Window thresholds taking required margin into account

      var heightThreshold = containerWindow.innerHeight - marginThreshold;
      var widthThreshold = containerWindow.innerWidth - marginThreshold; // Check if the vertical axis needs shifting

      if (top < marginThreshold) {
        var diff = top - marginThreshold;
        top -= diff;
        transformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        var _diff = bottom - heightThreshold;

        top -= _diff;
        transformOrigin.vertical += _diff;
      } // Check if the horizontal axis needs shifting


      if (left < marginThreshold) {
        var _diff2 = left - marginThreshold;

        left -= _diff2;
        transformOrigin.horizontal += _diff2;
      } else if (right > widthThreshold) {
        var _diff3 = right - widthThreshold;

        left -= _diff3;
        transformOrigin.horizontal += _diff3;
      }

      return {
        top: "".concat(top, "px"),
        left: "".concat(left, "px"),
        transformOrigin: getTransformOriginValue(transformOrigin)
      };
    });

    Popover_defineProperty(Popover_assertThisInitialized(Popover_assertThisInitialized(_this)), "handleEntering", function (element) {
      if (_this.props.onEntering) {
        _this.props.onEntering(element);
      }

      _this.setPositioningStyles(element);
    });

    if (typeof window !== 'undefined') {
      _this.handleResize = function () {
        // Because we debounce the event, the open property might no longer be true
        // when the callback resolves.
        if (!_this.props.open) {
          return;
        }

        _this.setPositioningStyles(_this.paperRef);
      };
    }

    return _this;
  }

  Popover_createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.action) {
        this.props.action({
          updatePosition: this.handleResize
        });
      }
    }
  }, {
    key: "getAnchorOffset",
    // Returns the top/left offset of the position
    // to attach to on the anchor element (or body if none is provided)
    value: function getAnchorOffset(contentAnchorOffset) {
      var _this$props2 = this.props,
          anchorEl = _this$props2.anchorEl,
          anchorOrigin = _this$props2.anchorOrigin; // If an anchor element wasn't provided, just use the parent body element of this Popover

      var anchorElement = getAnchorEl(anchorEl) || ownerDocument(this.paperRef).body;
      var anchorRect = anchorElement.getBoundingClientRect();
      var anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';
      return {
        top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
        left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal)
      };
    } // Returns the vertical offset of inner content to anchor the transform on if provided

  }, {
    key: "getContentAnchorOffset",
    value: function getContentAnchorOffset(element) {
      var _this$props3 = this.props,
          getContentAnchorEl = _this$props3.getContentAnchorEl,
          anchorReference = _this$props3.anchorReference;
      var contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        var contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && element.contains(contentAnchorEl)) {
          var scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset = contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
        }
      }

      return contentAnchorOffset;
    } // Return the base transform origin using the element
    // and taking the content anchor offset into account if in use

  }, {
    key: "getTransformOrigin",
    value: function getTransformOrigin(elemRect) {
      var contentAnchorOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var transformOrigin = this.props.transformOrigin;
      return {
        vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
        horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          anchorEl = _this$props4.anchorEl,
          children = _this$props4.children,
          containerProp = _this$props4.container,
          open = _this$props4.open,
          popoverCss = _this$props4.popoverCss,
          other = Popover_objectWithoutProperties(_this$props4, ["anchorEl", "children", "container", "open", "popoverCss"]); // If the container prop is provided, use that
      // If the anchorEl prop is provided, use its parent body element as the container
      // If neither are provided let the Modal take care of choosing the container


      var container = containerProp || (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);
      return react_default.a.createElement(components_Modal, Popover_extends({
        container: container,
        open: open,
        BackdropProps: {
          invisible: true
        }
      }, other), react_default.a.createElement(Popover_Transition, {
        onEntering: this.handleEntering
      }, react_default.a.createElement(StyledPopover, {
        popoverCss: popoverCss,
        "data-mui-test": "Popover",
        ref: function ref(_ref) {
          _this2.paperRef = react_dom_default.a.findDOMNode(_ref);
        }
      }, children)));
    }
  }]);

  return Popover;
}(react_default.a.Component);

Popover_Popover.propTypes = {
  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updatePosition() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action: prop_types_default.a.func,

  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   */
  anchorEl: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.func]),

  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: prop_types_default.a.shape({
    horizontal: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.oneOf(['left', 'center', 'right'])]).isRequired,
    vertical: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.oneOf(['top', 'center', 'bottom'])]).isRequired
  }),

  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: prop_types_default.a.shape({
    left: prop_types_default.a.number.isRequired,
    top: prop_types_default.a.number.isRequired
  }),

  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: prop_types_default.a.oneOf(['anchorEl', 'anchorPosition', 'none']),

  /**
   * The content of the component.
   */
  children: prop_types_default.a.node,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.func]),

  /**
   * The elevation of the popover.
   */
  elevation: prop_types_default.a.number,

  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` property.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: prop_types_default.a.func,

  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: prop_types_default.a.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: prop_types_default.a.func,

  /**
   * Callback fired before the component is entering.
   */
  onEnter: prop_types_default.a.func,

  /**
   * Callback fired when the component has entered.
   */
  onEntered: prop_types_default.a.func,

  /**
   * Callback fired when the component is entering.
   */
  onEntering: prop_types_default.a.func,

  /**
   * Callback fired before the component is exiting.
   */
  onExit: prop_types_default.a.func,

  /**
   * Callback fired when the component has exited.
   */
  onExited: prop_types_default.a.func,

  /**
   * Callback fired when the component is exiting.
   */
  onExiting: prop_types_default.a.func,

  /**
   * If `true`, the popover is visible.
   */
  open: prop_types_default.a.bool.isRequired,

  /**
   * Properties applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: prop_types_default.a.object,

  /**
   * @ignore
   */
  role: prop_types_default.a.string,

  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: prop_types_default.a.shape({
    horizontal: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.oneOf(['left', 'center', 'right'])]).isRequired,
    vertical: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.oneOf(['top', 'center', 'bottom'])]).isRequired
  }),

  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: prop_types_default.a.object
};
Popover_Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  elevation: 8,
  marginThreshold: 16,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  }
};
/* harmony default export */ var components_Popover_Popover = (Popover_Popover);
// CONCATENATED MODULE: ./src/shared/components/Popover/index.js

/* harmony default export */ var components_Popover = (components_Popover_Popover);

// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var theme = __webpack_require__("K0cP");

// CONCATENATED MODULE: ./src/shared/components/Menu/MenuList.jsx
function MenuList_templateObject() {
  var data = MenuList_taggedTemplateLiteral(["\n  background-color: ", ";\n  box-shadow: 0 8px 24px rgba(0, 0, 0, .24);\n  max-height: calc(100% - 96px);\n  position: relative;\n  width: 200px;\n\n  ", "\n"]);

  MenuList_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function MenuList_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function MenuList_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MenuList_typeof = function _typeof(obj) { return typeof obj; }; } else { MenuList_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MenuList_typeof(obj); }

function MenuList_extends() { MenuList_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return MenuList_extends.apply(this, arguments); }

function MenuList_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = MenuList_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function MenuList_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function MenuList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MenuList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MenuList_createClass(Constructor, protoProps, staticProps) { if (protoProps) MenuList_defineProperties(Constructor.prototype, protoProps); if (staticProps) MenuList_defineProperties(Constructor, staticProps); return Constructor; }

function MenuList_possibleConstructorReturn(self, call) { if (call && (MenuList_typeof(call) === "object" || typeof call === "function")) { return call; } return MenuList_assertThisInitialized(self); }

function MenuList_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MenuList_getPrototypeOf(o) { MenuList_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MenuList_getPrototypeOf(o); }

function MenuList_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MenuList_setPrototypeOf(subClass, superClass); }

function MenuList_setPrototypeOf(o, p) { MenuList_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MenuList_setPrototypeOf(o, p); }






var MenuList_MenuList =
/*#__PURE__*/
function (_React$Component) {
  MenuList_inherits(MenuList, _React$Component);

  function MenuList() {
    MenuList_classCallCheck(this, MenuList);

    return MenuList_possibleConstructorReturn(this, MenuList_getPrototypeOf(MenuList).apply(this, arguments));
  }

  MenuList_createClass(MenuList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          other = MenuList_objectWithoutProperties(_this$props, ["children"]);

      return react_default.a.createElement(StyledMenuList, MenuList_extends({
        role: "menu",
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur
      }, other), children);
    }
  }]);

  return MenuList;
}(react_default.a.Component);

MenuList_MenuList.defaultProps = {
  theme: theme["c" /* default */]
};
MenuList_MenuList.propTypes = {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: prop_types_default.a.node,

  /**
   * @ignore
   */
  menuListCss: prop_types_default.a.func
};
var StyledMenuList = styled_components_browser_esm["c" /* default */].div(MenuList_templateObject(), function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.menuListCss && props.menuListCss(props);
});
/* harmony default export */ var Menu_MenuList = (MenuList_MenuList);
// CONCATENATED MODULE: ./src/shared/components/Menu/Menu.jsx
function Menu_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Menu_typeof = function _typeof(obj) { return typeof obj; }; } else { Menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Menu_typeof(obj); }

function Menu_extends() { Menu_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Menu_extends.apply(this, arguments); }

function Menu_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Menu_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Menu_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Menu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Menu_createClass(Constructor, protoProps, staticProps) { if (protoProps) Menu_defineProperties(Constructor.prototype, protoProps); if (staticProps) Menu_defineProperties(Constructor, staticProps); return Constructor; }

function Menu_possibleConstructorReturn(self, call) { if (call && (Menu_typeof(call) === "object" || typeof call === "function")) { return call; } return Menu_assertThisInitialized(self); }

function Menu_getPrototypeOf(o) { Menu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Menu_getPrototypeOf(o); }

function Menu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Menu_setPrototypeOf(subClass, superClass); }

function Menu_setPrototypeOf(o, p) { Menu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Menu_setPrototypeOf(o, p); }

function Menu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var POSITION = {
  vertical: 'top',
  horizontal: 'right'
};

var Menu_Menu =
/*#__PURE__*/
function (_React$Component) {
  Menu_inherits(Menu, _React$Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    Menu_classCallCheck(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Menu_possibleConstructorReturn(this, (_getPrototypeOf2 = Menu_getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Menu_defineProperty(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)), "getContentAnchorEl", function () {
      if (_this.menuListRef.selectedItemRef) {
        return react_dom_default.a.findDOMNode(_this.menuListRef.selectedItemRef);
      }

      return react_dom_default.a.findDOMNode(_this.menuListRef).firstChild;
    });

    Menu_defineProperty(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)), "handleMenuListRef", function (ref) {
      _this.menuListRef = ref;
    });

    Menu_defineProperty(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)), "handleEntering", function (element) {
      var menuList = react_dom_default.a.findDOMNode(_this.menuListRef); // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.

      if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
        var size = "".concat(scrollbarSize_default()(), "px");
        menuList.style['paddingRight'] = size;
        menuList.style.width = "calc(100% + ".concat(size, ")");
      }

      if (_this.props.onEntering) {
        _this.props.onEntering(element);
      }
    });

    return _this;
  }

  Menu_createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          popoverCss = _this$props.popoverCss,
          menuListCss = _this$props.menuListCss,
          MenuListProps = _this$props.MenuListProps,
          other = Menu_objectWithoutProperties(_this$props, ["children", "popoverCss", "menuListCss", "MenuListProps"]);

      return react_default.a.createElement(components_Popover, Menu_extends({
        popoverCss: popoverCss,
        getContentAnchorEl: this.getContentAnchorEl,
        onEntering: this.handleEntering,
        anchorOrigin: POSITION,
        transformOrigin: POSITION
      }, other), react_default.a.createElement(Menu_MenuList, Menu_extends({
        menuListCss: menuListCss
      }, MenuListProps, {
        ref: this.handleMenuListRef
      }), children));
    }
  }]);

  return Menu;
}(react_default.a.Component);

Menu_Menu.propTypes = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl: prop_types_default.a.oneOfType([prop_types_default.a.object, prop_types_default.a.func]),

  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: prop_types_default.a.node,

  /**
   * Properties applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps: prop_types_default.a.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`
   */
  onClose: prop_types_default.a.func,

  /**
   * Callback fired when the Menu has entered.
   */
  onEntered: prop_types_default.a.func,

  /**
   * Callback fired when the Menu is entering.
   */
  onEntering: prop_types_default.a.func,

  /**
   * If `true`, the menu is visible.
   */
  open: prop_types_default.a.bool.isRequired,

  /**
   * `popoverCss` property applied to the [`Popover`] css.
   */
  popoverCss: prop_types_default.a.func,

  /**
   * `menuListCss` property applied to the [`MenuList`] css.
   */
  menuListCss: prop_types_default.a.func
};
/* harmony default export */ var components_Menu_Menu = (Menu_Menu);
// EXTERNAL MODULE: ./src/shared/components/TopNav/TopNavUserMenu/avatar.png
var TopNavUserMenu_avatar = __webpack_require__("9dLc");
var avatar_default = /*#__PURE__*/__webpack_require__.n(TopNavUserMenu_avatar);

// CONCATENATED MODULE: ./src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx
function TopNavUserMenu_templateObject() {
  var data = TopNavUserMenu_taggedTemplateLiteral(["\n  img {\n    display: inline-block;\n    float: right;\n    height: 24px;\n    margin: 24px 8px 24px 16px;\n  }\n\n  em {\n    font-size: 10px;\n    font-weight: bold\n    font-style: normal;\n    margin: 0;\n  }\n"]);

  TopNavUserMenu_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function TopNavUserMenu_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function TopNavUserMenu_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { TopNavUserMenu_typeof = function _typeof(obj) { return typeof obj; }; } else { TopNavUserMenu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return TopNavUserMenu_typeof(obj); }

function TopNavUserMenu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TopNavUserMenu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TopNavUserMenu_createClass(Constructor, protoProps, staticProps) { if (protoProps) TopNavUserMenu_defineProperties(Constructor.prototype, protoProps); if (staticProps) TopNavUserMenu_defineProperties(Constructor, staticProps); return Constructor; }

function TopNavUserMenu_possibleConstructorReturn(self, call) { if (call && (TopNavUserMenu_typeof(call) === "object" || typeof call === "function")) { return call; } return TopNavUserMenu_assertThisInitialized(self); }

function TopNavUserMenu_getPrototypeOf(o) { TopNavUserMenu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return TopNavUserMenu_getPrototypeOf(o); }

function TopNavUserMenu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) TopNavUserMenu_setPrototypeOf(subClass, superClass); }

function TopNavUserMenu_setPrototypeOf(o, p) { TopNavUserMenu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return TopNavUserMenu_setPrototypeOf(o, p); }

function TopNavUserMenu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function TopNavUserMenu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var TopNavUserMenu_TopNavUserMenu =
/*#__PURE__*/
function (_React$Component) {
  TopNavUserMenu_inherits(TopNavUserMenu, _React$Component);

  function TopNavUserMenu() {
    var _getPrototypeOf2;

    var _this;

    TopNavUserMenu_classCallCheck(this, TopNavUserMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = TopNavUserMenu_possibleConstructorReturn(this, (_getPrototypeOf2 = TopNavUserMenu_getPrototypeOf(TopNavUserMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    TopNavUserMenu_defineProperty(TopNavUserMenu_assertThisInitialized(TopNavUserMenu_assertThisInitialized(_this)), "setRef", function (e) {
      _this.btnRef = e;
    });

    return _this;
  }

  TopNavUserMenu_createClass(TopNavUserMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          user = _this$props.user,
          onClose = _this$props.onClose,
          onShow = _this$props.onShow,
          open = _this$props.open,
          avatar = _this$props.avatar,
          anchorOrigin = _this$props.anchorOrigin,
          transformOrigin = _this$props.transformOrigin,
          children = _this$props.children;
      var anchorEl = open ? this.btnRef : null;
      return react_default.a.createElement(TopNavItem["a" /* default */], {
        style: {
          marginLeft: "auto"
        }
      }, react_default.a.createElement(AvatarButton, {
        ref: this.setRef,
        onClick: onShow
      }, react_default.a.createElement("em", null, user), react_default.a.createElement("img", {
        src: avatar
      })), react_default.a.createElement(components_Menu_Menu, {
        menuListCss: TopNavUserMenu_menuListCss,
        anchorOrigin: anchorOrigin,
        transformOrigin: transformOrigin,
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: onClose
      }, children));
    }
  }]);

  return TopNavUserMenu;
}(react_default.a.Component);

TopNavUserMenu_defineProperty(TopNavUserMenu_TopNavUserMenu, "displayName", 'TopNavMenu');

TopNavUserMenu_defineProperty(TopNavUserMenu_TopNavUserMenu, "defaultProps", {
  avatar: avatar_default.a,
  open: false
});

TopNavUserMenu_defineProperty(TopNavUserMenu_TopNavUserMenu, "propTypes", {
  /** Callback fired when the component requests to be closed. */
  onClose: prop_types_default.a.func,

  /** Callback fired when the component requests to be open. */
  onShow: prop_types_default.a.func,

  /** If true the menu is visible */
  open: prop_types_default.a.bool
});

/* harmony default export */ var TopNav_TopNavUserMenu_TopNavUserMenu = (TopNavUserMenu_TopNavUserMenu);
var AvatarButton = styled_components_browser_esm["c" /* default */].div(TopNavUserMenu_templateObject());
/** Custom css styles for MenuList */

var TopNavUserMenu_menuListCss = function menuListCss() {
  return "\n\n";
};
// CONCATENATED MODULE: ./src/shared/components/TopNav/TopNavUserMenu/index.js

/* harmony default export */ var TopNav_TopNavUserMenu = (TopNav_TopNavUserMenu_TopNavUserMenu);
// EXTERNAL MODULE: ./src/shared/components/index.js + 22 modules
var components = __webpack_require__("ryey");

// EXTERNAL MODULE: ./src/shared/assets/images/teleport-logo.svg
var teleport_logo = __webpack_require__("aY1S");
var teleport_logo_default = /*#__PURE__*/__webpack_require__.n(teleport_logo);

// CONCATENATED MODULE: ./src/shared/components/Menu/MenuItem.jsx
function MenuItem_templateObject() {
  var data = MenuItem_taggedTemplateLiteral(["\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  box-sizing: content-box;\n  color: ", ";\n  cursor: pointer;\n  display: block;\n  font-size: 11px;\n  font-weight: bold;\n  line-height: 48px;\n  line-height: 48px;\n  overflow: hidden;\n  padding: 0 32px;\n  text-align: inherit;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: all .3s;\n  white-space: nowrap;\n  white-space: nowrap;\n  width: auto;\n\n  &:hover,\n  &:focus {\n    color: ", ";\n    text-decoration: none;\n    background-color: #f8f9fa;\n  }\n\n  &:last-child {\n    border-radius: 0 0 4px 4px;\n    border: none;\n  }\n\n  &:first-child {\n    border-radius: 4px 4px 0 0;\n  }\n\n"]);

  MenuItem_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function MenuItem_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function MenuItem_extends() { MenuItem_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return MenuItem_extends.apply(this, arguments); }





function MenuItem(props) {
  return react_default.a.createElement(StyledMenuItem, MenuItem_extends({
    tabIndex: -1
  }, props));
}

MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: prop_types_default.a.node,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */

  /**
   * @ignore
   */
  role: prop_types_default.a.string,

  /**
   * @ignore
   */
  selected: prop_types_default.a.bool
};
MenuItem.defaultProps = {
  component: 'li',
  disableGutters: false,
  role: 'menuitem'
};
var StyledMenuItem = styled_components_browser_esm["c" /* default */].div(MenuItem_templateObject(), function (props) {
  return props.theme.background.light;
}, function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.text;
}, function (props) {
  return props.theme.colors.link;
});
/* harmony default export */ var Menu_MenuItem = (MenuItem);
// EXTERNAL MODULE: ./src/shared/components/Button/index.js + 1 modules
var Button = __webpack_require__("frOc");

// CONCATENATED MODULE: ./src/app/components/App/AppBar/AppBar.jsx
function AppBar_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { AppBar_typeof = function _typeof(obj) { return typeof obj; }; } else { AppBar_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return AppBar_typeof(obj); }

function AppBar_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AppBar_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function AppBar_createClass(Constructor, protoProps, staticProps) { if (protoProps) AppBar_defineProperties(Constructor.prototype, protoProps); if (staticProps) AppBar_defineProperties(Constructor, staticProps); return Constructor; }

function AppBar_possibleConstructorReturn(self, call) { if (call && (AppBar_typeof(call) === "object" || typeof call === "function")) { return call; } return AppBar_assertThisInitialized(self); }

function AppBar_getPrototypeOf(o) { AppBar_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return AppBar_getPrototypeOf(o); }

function AppBar_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) AppBar_setPrototypeOf(subClass, superClass); }

function AppBar_setPrototypeOf(o, p) { AppBar_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return AppBar_setPrototypeOf(o, p); }

function AppBar_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function AppBar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var AppBar_AppBar =
/*#__PURE__*/
function (_React$Component) {
  AppBar_inherits(AppBar, _React$Component);

  function AppBar() {
    var _getPrototypeOf2;

    var _this;

    AppBar_classCallCheck(this, AppBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = AppBar_possibleConstructorReturn(this, (_getPrototypeOf2 = AppBar_getPrototypeOf(AppBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    AppBar_defineProperty(AppBar_assertThisInitialized(AppBar_assertThisInitialized(_this)), "state", {
      open: false
    });

    AppBar_defineProperty(AppBar_assertThisInitialized(AppBar_assertThisInitialized(_this)), "onShowMenu", function () {
      _this.setState({
        open: true
      });
    });

    AppBar_defineProperty(AppBar_assertThisInitialized(AppBar_assertThisInitialized(_this)), "onCloseMenu", function () {
      _this.setState({
        open: false
      });
    });

    AppBar_defineProperty(AppBar_assertThisInitialized(AppBar_assertThisInitialized(_this)), "onItemClick", function () {
      _this.onClose();
    });

    AppBar_defineProperty(AppBar_assertThisInitialized(AppBar_assertThisInitialized(_this)), "onLogout", function () {
      _this.props.onLogout();

      _this.onClose();
    });

    return _this;
  }

  AppBar_createClass(AppBar, [{
    key: "render",
    value: function render() {
      var username = this.props.username;
      return react_default.a.createElement(components["k" /* TopNav */], {
        logoSrc: teleport_logo_default.a,
        version: "v3.2.0-alpha.1"
      }, react_default.a.createElement(components["l" /* TopNavItem */], {
        as: function as(props) {
          return react_default.a.createElement(NavLink["a" /* default */], {
            className: props.className,
            to: config["a" /* default */].routes.app
          }, "Clusters");
        }
      }), react_default.a.createElement(TopNav_TopNavUserMenu, {
        open: this.state.open,
        onShow: this.onShowMenu,
        onClose: this.onCloseMenu,
        user: username
      }, react_default.a.createElement(Menu_MenuItem, {
        onClick: this.onLogout
      }, react_default.a.createElement(Button["a" /* default */], {
        size: "small"
      }, "Logout"))));
    }
  }]);

  return AppBar;
}(react_default.a.Component);

function mapStoreToProps() {
  return {
    username: flux_user["a" /* getters */].userName
  };
}

function mapActionsToProps() {
  return {
    onLogout: actions["g" /* logout */]
  };
}

/* harmony default export */ var App_AppBar_AppBar = (Object(nuclear["b" /* connect */])(mapStoreToProps, mapActionsToProps)(AppBar_AppBar));
// CONCATENATED MODULE: ./src/app/components/App/AppBar/index.js
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var App_AppBar = (App_AppBar_AppBar);
// EXTERNAL MODULE: ./src/app/flux/status/getters.js
var getters = __webpack_require__("oHDm");

// CONCATENATED MODULE: ./src/app/flux/app/getters.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var app_getters = ({
  initAttempt: getters["c" /* initAppAttempt */],
  siteId: ['tlpt', 'siteId']
});
// EXTERNAL MODULE: ./src/app/components/documentTitle.jsx
var documentTitle = __webpack_require__("tq85");

// CONCATENATED MODULE: ./src/app/components/msgPage.jsx
function msgPage_extends() { msgPage_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return msgPage_extends.apply(this, arguments); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var MSG_INFO_LOGIN_SUCCESS = 'Login was successful, you can close this window and continue using tsh.';
var MSG_ERROR_LOGIN_FAILED = 'Login unsuccessful. Please try again, if the problem persists, contact your system administrator.';
var MSG_ERROR_DEFAULT = 'Internal Error';
var MSG_ERROR_NOT_FOUND = '404 Not Found';
var MSG_ERROR_NOT_FOUND_DETAILS = "Looks like the page you are looking for isn't here any longer.";
var MSG_ERROR_EXPIRED_INVITE = 'Invite code has expired.';
var MSG_ERROR_EXPIRED_INVITE_DETAILS = "Looks like your invite code isn't valid anymore.";
var MSG_ERROR_ACCESS_DENIED = 'Access denied';
var ErrorPageEnum = {
  FAILED_TO_LOGIN: 'login_failed',
  EXPIRED_INVITE: 'expired_invite',
  NOT_FOUND: 'not_found',
  ACCESS_DENIED: 'access_denied'
};
var InfoPageEnum = {
  LOGIN_SUCCESS: 'login_success'
};
var InfoPage = Object(documentTitle["a" /* withDocTitle */])("Info", function (_ref) {
  var params = _ref.params;
  var type = params.type;

  if (type === InfoPageEnum.LOGIN_SUCCESS) {
    return react_default.a.createElement(msgPage_SuccessfulLogin, null);
  }

  return react_default.a.createElement(msgPage_InfoBox, null);
});
var ErrorPage = Object(documentTitle["a" /* withDocTitle */])("Error", function (_ref2) {
  var params = _ref2.params,
      location = _ref2.location;
  var type = params.type;
  var details = location.query.details;

  switch (type) {
    case ErrorPageEnum.FAILED_TO_LOGIN:
      return react_default.a.createElement(msgPage_LoginFailed, {
        message: details
      });

    case ErrorPageEnum.EXPIRED_INVITE:
      return react_default.a.createElement(msgPage_ExpiredLink, null);

    case ErrorPageEnum.NOT_FOUND:
      return react_default.a.createElement(msgPage_NotFound, null);

    case ErrorPageEnum.ACCESS_DENIED:
      return react_default.a.createElement(msgPage_AccessDenied, {
        message: details
      });

    default:
      return react_default.a.createElement(msgPage_Failed, {
        message: details
      });
  }
});

var msgPage_Box = function Box(props) {
  return react_default.a.createElement("div", {
    className: "grv-msg-page"
  }, react_default.a.createElement("div", {
    className: "grv-header"
  }, react_default.a.createElement("i", {
    className: props.iconClass
  })), props.children);
};

var msgPage_InfoBox = function InfoBox(props) {
  return react_default.a.createElement(msgPage_Box, msgPage_extends({
    iconClass: "fa fa-smile-o"
  }, props));
};

var msgPage_ErrorBox = function ErrorBox(props) {
  return react_default.a.createElement(msgPage_Box, msgPage_extends({
    iconClass: "fa fa-frown-o"
  }, props));
};

var msgPage_ErrorBoxDetails = function ErrorBoxDetails(_ref3) {
  var _ref3$message = _ref3.message,
      message = _ref3$message === void 0 ? '' : _ref3$message;
  return react_default.a.createElement("div", {
    className: "m-t text-muted"
  }, react_default.a.createElement("small", {
    className: "grv-msg-page-details-text"
  }, message), react_default.a.createElement("p", null, react_default.a.createElement("small", {
    className: "contact-section"
  }, "If you believe this is an issue with Teleport, please ", react_default.a.createElement("a", {
    href: "https://github.com/gravitational/teleport/issues/new"
  }, "create a GitHub issue."))));
};

var msgPage_NotFound = function NotFound() {
  return react_default.a.createElement(msgPage_ErrorBox, null, react_default.a.createElement("h1", null, MSG_ERROR_NOT_FOUND), react_default.a.createElement(msgPage_ErrorBoxDetails, {
    message: MSG_ERROR_NOT_FOUND_DETAILS
  }));
};

var NotFoundPage = Object(documentTitle["a" /* withDocTitle */])("Not Found", msgPage_NotFound);

var msgPage_AccessDenied = function AccessDenied(_ref4) {
  var message = _ref4.message;
  return react_default.a.createElement(msgPage_Box, {
    iconClass: "fa fa-frown-o"
  }, react_default.a.createElement("h1", null, MSG_ERROR_ACCESS_DENIED), react_default.a.createElement(msgPage_ErrorBoxDetails, {
    message: message
  }));
};

var msgPage_Failed = function Failed(_ref5) {
  var message = _ref5.message;
  return react_default.a.createElement(msgPage_ErrorBox, null, react_default.a.createElement("h1", null, MSG_ERROR_DEFAULT), react_default.a.createElement(msgPage_ErrorBoxDetails, {
    message: message
  }));
};

var msgPage_ExpiredLink = function ExpiredLink() {
  return react_default.a.createElement(msgPage_ErrorBox, null, react_default.a.createElement("h1", null, MSG_ERROR_EXPIRED_INVITE), react_default.a.createElement(msgPage_ErrorBoxDetails, {
    message: MSG_ERROR_EXPIRED_INVITE_DETAILS
  }));
};

var msgPage_LoginFailed = function LoginFailed(_ref6) {
  var message = _ref6.message;
  return react_default.a.createElement(msgPage_ErrorBox, null, react_default.a.createElement("h1", null, MSG_ERROR_LOGIN_FAILED), react_default.a.createElement(msgPage_ErrorBoxDetails, {
    message: message
  }));
};

var msgPage_SuccessfulLogin = function SuccessfulLogin() {
  return react_default.a.createElement(msgPage_InfoBox, null, react_default.a.createElement("h1", null, MSG_INFO_LOGIN_SUCCESS));
};


// EXTERNAL MODULE: ./src/app/reactor.js
var reactor = __webpack_require__("xSHT");

// EXTERNAL MODULE: ./src/app/flux/app/actionTypes.js
var actionTypes = __webpack_require__("FCiP");

// EXTERNAL MODULE: ./src/app/flux/sites/actionTypes.js
var sites_actionTypes = __webpack_require__("qDpX");

// EXTERNAL MODULE: ./src/app/flux/user/actionTypes.js
var user_actionTypes = __webpack_require__("owjQ");

// EXTERNAL MODULE: ./src/app/flux/userAcl/actionTypes.js
var userAcl_actionTypes = __webpack_require__("gC4k");

// EXTERNAL MODULE: ./src/app/services/api.js
var api = __webpack_require__("Z9Rw");

// EXTERNAL MODULE: ./src/app/flux/status/actions.js
var status_actions = __webpack_require__("ksSu");

// EXTERNAL MODULE: ./src/app/flux/nodes/actionTypes.js
var nodes_actionTypes = __webpack_require__("ausB");

// EXTERNAL MODULE: ./src/app/lib/logger.js
var logger = __webpack_require__("lZJN");

// CONCATENATED MODULE: ./src/app/flux/nodes/actions.js






var actions_logger = logger["a" /* default */].create('flux/nodes');
function fetchNodes() {
  var siteId = reactor["a" /* default */].evaluate(app_getters.siteId);
  return api["a" /* default */].get(config["a" /* default */].api.getSiteNodesUrl(siteId)).then(function (res) {
    return res.items || [];
  }).then(function (items) {
    return reactor["a" /* default */].dispatch(nodes_actionTypes["a" /* TLPT_NODES_RECEIVE */], items);
  }).catch(function (err) {
    actions_logger.error('fetchNodes', err);
    throw err;
  });
}
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("wd/R");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./src/app/flux/sessions/actionTypes.js
var sessions_actionTypes = __webpack_require__("zMbK");

// CONCATENATED MODULE: ./src/app/flux/sessions/actions.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/







var sessions_actions_logger = logger["a" /* default */].create('flux/sessions');
function fetchStoredSession(sid, siteId) {
  siteId = siteId || reactor["a" /* default */].evaluate(app_getters.siteId);
  return api["a" /* default */].get(config["a" /* default */].api.getSessionEventsUrl({
    siteId: siteId,
    sid: sid
  })).then(function (json) {
    if (json && json.events) {
      reactor["a" /* default */].dispatch(sessions_actionTypes["b" /* RECEIVE_SITE_EVENTS */], {
        siteId: siteId,
        json: json.events
      });
    }
  });
}
function fetchSiteEvents(start, end) {
  // default values
  start = start || moment_default()(new Date()).endOf('day').toDate();
  end = end || moment_default()(end).subtract(3, 'day').startOf('day').toDate();
  start = start.toISOString();
  end = end.toISOString();
  var siteId = reactor["a" /* default */].evaluate(app_getters.siteId);
  return api["a" /* default */].get(config["a" /* default */].api.getSiteEventsFilterUrl({
    start: start,
    end: end,
    siteId: siteId
  })).then(function (json) {
    if (json && json.events) {
      reactor["a" /* default */].dispatch(sessions_actionTypes["b" /* RECEIVE_SITE_EVENTS */], {
        siteId: siteId,
        json: json.events
      });
    }
  }).catch(function (err) {
    sessions_actions_logger.error('fetchSiteEvents', err);
    throw err;
  });
}
function fetchActiveSessions() {
  var siteId = reactor["a" /* default */].evaluate(app_getters.siteId);
  return api["a" /* default */].get(config["a" /* default */].api.getFetchSessionsUrl(siteId)).then(function (json) {
    var sessions = json.sessions || [];
    reactor["a" /* default */].dispatch(sessions_actionTypes["a" /* RECEIVE_ACTIVE_SESSIONS */], {
      siteId: siteId,
      json: sessions
    });
  }).catch(function (err) {
    sessions_actions_logger.error('fetchActiveSessions', err);
    throw err;
  });
}
// CONCATENATED MODULE: ./src/app/flux/app/actions.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/











var app_actions_logger = logger["a" /* default */].create('flux/app');
function addNavItem(item) {
  reactor["a" /* default */].dispatch(actionTypes["a" /* ADD_NAV_ITEM */], item);
}
function setSiteId(siteId) {
  reactor["a" /* default */].dispatch(actionTypes["b" /* SET_SITE_ID */], siteId);
}
function initApp(siteId, featureActivator) {
  status_actions["b" /* initAppStatus */].start(); // get the list of available clusters

  return fetchInitData(siteId).then(function () {
    featureActivator.onload();
    status_actions["b" /* initAppStatus */].success();
  }).catch(function (err) {
    status_actions["b" /* initAppStatus */].fail(err.message);
  });
}
function refresh() {
  return Promise.all([fetchActiveSessions(), fetchNodes()]);
}
function fetchInitData(siteId) {
  return Promise.all([fetchSites(), fetchUserContext()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        masterSiteId = _ref2[0];

    var selectedCluster = siteId || masterSiteId;
    setSiteId(selectedCluster);
    return Promise.all([fetchNodes(), fetchActiveSessions()]);
  });
}
function fetchSites() {
  return api["a" /* default */].get(config["a" /* default */].api.sitesBasePath).then(function (json) {
    var trusted = json.trusted || [];
    var allClusters = [json.current].concat(_toConsumableArray(trusted));
    reactor["a" /* default */].dispatch(sites_actionTypes["a" /* RECEIVE_CLUSTERS */], allClusters);
    return json.current.name;
  }).catch(function (err) {
    app_actions_logger.error('fetchSites', err);
  });
}
function fetchUserContext() {
  return api["a" /* default */].get(config["a" /* default */].api.userContextPath).then(function (json) {
    reactor["a" /* default */].dispatch(user_actionTypes["b" /* RECEIVE_USER */], {
      name: json.userName,
      authType: json.authType
    });
    reactor["a" /* default */].dispatch(userAcl_actionTypes["a" /* RECEIVE_USERACL */], json.userAcl);
    app_actions_logger.info("Teleport ver:", json.version);
  });
}
// EXTERNAL MODULE: ./src/app/services/session.js
var session = __webpack_require__("cGG6");

// CONCATENATED MODULE: ./src/app/components/withAuth.jsx
function withAuth_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { withAuth_typeof = function _typeof(obj) { return typeof obj; }; } else { withAuth_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return withAuth_typeof(obj); }

function withAuth_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function withAuth_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function withAuth_createClass(Constructor, protoProps, staticProps) { if (protoProps) withAuth_defineProperties(Constructor.prototype, protoProps); if (staticProps) withAuth_defineProperties(Constructor, staticProps); return Constructor; }

function withAuth_possibleConstructorReturn(self, call) { if (call && (withAuth_typeof(call) === "object" || typeof call === "function")) { return call; } return withAuth_assertThisInitialized(self); }

function withAuth_getPrototypeOf(o) { withAuth_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return withAuth_getPrototypeOf(o); }

function withAuth_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) withAuth_setPrototypeOf(subClass, superClass); }

function withAuth_setPrototypeOf(o, p) { withAuth_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return withAuth_setPrototypeOf(o, p); }

function withAuth_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function withAuth_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var withAuth_withAuth = function withAuth(component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    withAuth_inherits(WithAuthWrapper, _React$Component);

    function WithAuthWrapper() {
      var _getPrototypeOf2;

      var _this;

      withAuth_classCallCheck(this, WithAuthWrapper);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = withAuth_possibleConstructorReturn(this, (_getPrototypeOf2 = withAuth_getPrototypeOf(WithAuthWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

      withAuth_defineProperty(withAuth_assertThisInitialized(withAuth_assertThisInitialized(_this)), "state", {
        hasUser: false
      });

      return _this;
    }

    withAuth_createClass(WithAuthWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        session["a" /* default */].ensureSession(true).then(function () {
          _this2.setState({
            hasUser: true
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.hasUser) {
          return react_default.a.createElement(component, this.props);
        }

        return null;
      }
    }]);

    return WithAuthWrapper;
  }(react_default.a.Component), withAuth_defineProperty(_class, "displayName", "WithAuthWrapper"), _temp;
};

/* harmony default export */ var components_withAuth = (withAuth_withAuth);
// CONCATENATED MODULE: ./src/app/featureActivator.js
function featureActivator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function featureActivator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function featureActivator_createClass(Constructor, protoProps, staticProps) { if (protoProps) featureActivator_defineProperties(Constructor.prototype, protoProps); if (staticProps) featureActivator_defineProperties(Constructor, staticProps); return Constructor; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var featureActivator_logger = logger["a" /* default */].create('featureActivator');
/**
 * Invokes methods on a group of registered features.
 *
 */

var FeactureActivator =
/*#__PURE__*/
function () {
  function FeactureActivator() {
    featureActivator_classCallCheck(this, FeactureActivator);

    this._features = [];
  }

  featureActivator_createClass(FeactureActivator, [{
    key: "register",
    value: function register(feature) {
      if (!feature) {
        throw Error('Feature is undefined');
      }

      this._features.push(feature);
    }
    /**
     * to be called during app initialization. Becomes useful if feature wants to be
     * part of app initialization flow.
     */

  }, {
    key: "preload",
    value: function preload(context) {
      var promises = this._features.map(function (f) {
        return new Promise(function (resolve) {
          // feature should handle failed promises thus always resolve.
          f.init(context).finally(function () {
            resolve();
          });
        });
      });

      return Promise.all(promises);
    }
  }, {
    key: "onload",
    value: function onload(context) {
      var _this = this;

      this._features.forEach(function (f) {
        _this._invokeOnload(f, context);
      });
    }
  }, {
    key: "getFirstAvailable",
    value: function getFirstAvailable() {
      return this._features.find(function (f) {
        return !f.isFailed();
      });
    }
  }, {
    key: "getFeatures",
    value: function getFeatures() {
      return this._features;
    }
  }, {
    key: "_invokeOnload",
    value: function _invokeOnload(f) {
      try {
        for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          props[_key - 1] = arguments[_key];
        }

        f.onload.apply(f, props);
      } catch (err) {
        featureActivator_logger.error('failed to invoke feature onload()', err);
      }
    }
  }]);

  return FeactureActivator;
}();

/* harmony default export */ var app_featureActivator = (FeactureActivator);
// CONCATENATED MODULE: ./src/app/flux/sites/getters.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var SiteStatusEnum = {
  ONLINE: 'online',
  OFFLINE: 'offline'
};

var onlyOnline = function onlyOnline(s) {
  return s.status === SiteStatusEnum.ONLINE;
};

var getters_sites = [['tlpt_sites'], function (siteList) {
  return siteList.filter(onlyOnline).toArray();
}];
/* harmony default export */ var sites_getters = ({
  sites: getters_sites
});
// CONCATENATED MODULE: ./src/app/components/Clusters/CardCluster/CardCluster.jsx
function CardCluster_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CardCluster_typeof = function _typeof(obj) { return typeof obj; }; } else { CardCluster_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CardCluster_typeof(obj); }

function CardCluster_templateObject() {
  var data = CardCluster_taggedTemplateLiteral(["\n  &:hover {\n    background:  ", ";\n    cursor: pointer;\n  }\n"]);

  CardCluster_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function CardCluster_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { CardCluster_defineProperty(target, key, source[key]); }); } return target; }

function CardCluster_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = CardCluster_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function CardCluster_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CardCluster_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CardCluster_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CardCluster_createClass(Constructor, protoProps, staticProps) { if (protoProps) CardCluster_defineProperties(Constructor.prototype, protoProps); if (staticProps) CardCluster_defineProperties(Constructor, staticProps); return Constructor; }

function CardCluster_possibleConstructorReturn(self, call) { if (call && (CardCluster_typeof(call) === "object" || typeof call === "function")) { return call; } return CardCluster_assertThisInitialized(self); }

function CardCluster_getPrototypeOf(o) { CardCluster_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CardCluster_getPrototypeOf(o); }

function CardCluster_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CardCluster_setPrototypeOf(subClass, superClass); }

function CardCluster_setPrototypeOf(o, p) { CardCluster_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CardCluster_setPrototypeOf(o, p); }

function CardCluster_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CardCluster_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var CardCluster_CardCluster =
/*#__PURE__*/
function (_React$Component) {
  CardCluster_inherits(CardCluster, _React$Component);

  function CardCluster() {
    var _getPrototypeOf2;

    var _this;

    CardCluster_classCallCheck(this, CardCluster);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = CardCluster_possibleConstructorReturn(this, (_getPrototypeOf2 = CardCluster_getPrototypeOf(CardCluster)).call.apply(_getPrototypeOf2, [this].concat(args)));

    CardCluster_defineProperty(CardCluster_assertThisInitialized(CardCluster_assertThisInitialized(_this)), "onClick", function () {
      _this.props.onClick(_this.props.name);
    });

    return _this;
  }

  CardCluster_createClass(CardCluster, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          status = _this$props.status,
          connectedAt = _this$props.connectedAt,
          rest = CardCluster_objectWithoutProperties(_this$props, ["name", "status", "connectedAt"]);

      var props = _objectSpread({
        p: 4,
        bg: "secondaryLight"
      }, rest, {
        onClick: this.onClick
      });

      return react_default.a.createElement(StyledCardCluster, props, react_default.a.createElement("div", null, " Name: ", name, " "), react_default.a.createElement("div", null, " Status: ", status, " "), react_default.a.createElement("div", null, " Joined: ", connectedAt, " "));
    }
  }]);

  return CardCluster;
}(react_default.a.Component);
var StyledCardCluster = Object(styled_components_browser_esm["c" /* default */])(components["a" /* Box */])(CardCluster_templateObject(), function (props) {
  return props.theme.background.primary;
});
/* harmony default export */ var Clusters_CardCluster_CardCluster = (CardCluster_CardCluster);
// CONCATENATED MODULE: ./src/app/components/Clusters/CardCluster/index.js

/* harmony default export */ var Clusters_CardCluster = (Clusters_CardCluster_CardCluster);
// EXTERNAL MODULE: ./node_modules/react-router/es/matchPath.js
var matchPath = __webpack_require__("SsKX");

// EXTERNAL MODULE: ./src/app/services/history.js
var services_history = __webpack_require__("yaYm");

// CONCATENATED MODULE: ./src/app/flux/sites/actions.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



function showCluster(clusterId) {
  var route = config["a" /* default */].getClusterUrl(clusterId);
  services_history["a" /* default */].push(route);
}
function changeCluster(clusterId) {
  var nodesUrl = config["a" /* default */].getClusterNodesUrl(clusterId);
  var sessionsUrl = config["a" /* default */].getClusterSessionsUrl(clusterId);
  var currentRoute = services_history["a" /* default */].original().location.pathname;
  var isNodeRoute = Object(matchPath["a" /* default */])(currentRoute, {
    path: config["a" /* default */].routes.clusterNodes,
    exact: true
  });
  var isSessionRoute = Object(matchPath["a" /* default */])(currentRoute, {
    path: config["a" /* default */].routes.clusterSessions,
    exact: true
  });

  if (isNodeRoute) {
    services_history["a" /* default */].push(nodesUrl);
  }

  if (isSessionRoute) {
    services_history["a" /* default */].push(sessionsUrl);
  }
}
// CONCATENATED MODULE: ./src/app/components/Clusters/Clusters.jsx
function Clusters_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Clusters_typeof = function _typeof(obj) { return typeof obj; }; } else { Clusters_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Clusters_typeof(obj); }

function Clusters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Clusters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Clusters_createClass(Constructor, protoProps, staticProps) { if (protoProps) Clusters_defineProperties(Constructor.prototype, protoProps); if (staticProps) Clusters_defineProperties(Constructor, staticProps); return Constructor; }

function Clusters_possibleConstructorReturn(self, call) { if (call && (Clusters_typeof(call) === "object" || typeof call === "function")) { return call; } return Clusters_assertThisInitialized(self); }

function Clusters_getPrototypeOf(o) { Clusters_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Clusters_getPrototypeOf(o); }

function Clusters_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Clusters_setPrototypeOf(subClass, superClass); }

function Clusters_setPrototypeOf(o, p) { Clusters_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Clusters_setPrototypeOf(o, p); }

function Clusters_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Clusters_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/






var Clusters_Clusters =
/*#__PURE__*/
function (_React$Component) {
  Clusters_inherits(Clusters, _React$Component);

  function Clusters() {
    var _getPrototypeOf2;

    var _this;

    Clusters_classCallCheck(this, Clusters);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Clusters_possibleConstructorReturn(this, (_getPrototypeOf2 = Clusters_getPrototypeOf(Clusters)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Clusters_defineProperty(Clusters_assertThisInitialized(Clusters_assertThisInitialized(_this)), "onSelectCluster", function (clusterId) {
      _this.props.onSelectCluster(clusterId);
    });

    return _this;
  }

  Clusters_createClass(Clusters, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var clusters = this.props.clusters;
      var $clusters = clusters.map(function (cluster, index) {
        var name = cluster.name,
            connectedAt = cluster.connectedAt,
            status = cluster.status;
        var key = "".concat(name, "-").concat(index);
        return react_default.a.createElement(Clusters_CardCluster, {
          m: 2,
          key: key,
          onClick: _this2.onSelectCluster,
          name: name,
          connectedAt: connectedAt,
          status: status
        });
      });
      return react_default.a.createElement(components["d" /* Flex */], {
        style: {
          overflow: "auto"
        }
      }, react_default.a.createElement(components["a" /* Box */], {
        m: 4
      }, react_default.a.createElement(components["e" /* Heading */].h2, null, "Clusters"), react_default.a.createElement(components["d" /* Flex */], {
        flexWrap: "wrap"
      }, $clusters)));
    }
  }]);

  return Clusters;
}(react_default.a.Component);

function Clusters_mapStoreToProps() {
  return {
    clusters: sites_getters.sites
  };
}

function Clusters_mapActionsToProps() {
  return {
    onSelectCluster: showCluster
  };
}

/* harmony default export */ var components_Clusters_Clusters = (Object(nuclear["b" /* connect */])(Clusters_mapStoreToProps, Clusters_mapActionsToProps)(Clusters_Clusters));
// CONCATENATED MODULE: ./src/app/components/Clusters/index.js

/* harmony default export */ var components_Clusters = (components_Clusters_Clusters);
// CONCATENATED MODULE: ./src/app/flux/userAcl/getters.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var userAcl = ['tlpt_user_acl'];
/* harmony default export */ var userAcl_getters = ({
  userAcl: userAcl
});
// CONCATENATED MODULE: ./src/app/flux/nodes/getters.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var siteNodes = [['tlpt_nodes'], ['tlpt', 'siteId'], function (nodeStore, siteId) {
  return nodeStore.getSiteServers(siteId);
}];
/* harmony default export */ var nodes_getters = ({
  siteNodes: siteNodes,
  nodesByCluster: function nodesByCluster(clusterId) {
    return [['tlpt_nodes'], function (nodeStore) {
      return nodeStore.getSiteServers(clusterId);
    }];
  }
});
// EXTERNAL MODULE: ./src/app/flux/sshHistory/store.js + 1 modules
var store = __webpack_require__("SwYS");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("LvDl");

// CONCATENATED MODULE: ./src/app/lib/objectUtils.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};
var PORT_REGEX = /:\d+$/;
function parseIp(addr) {
  addr = addr || '';
  return addr.replace(PORT_REGEX, '');
}
function isMatch(obj, searchValue, _ref) {
  var searchableProps = _ref.searchableProps,
      cb = _ref.cb;
  searchValue = searchValue.toLocaleUpperCase();
  var propNames = searchableProps || Object.getOwnPropertyNames(obj);

  for (var i = 0; i < propNames.length; i++) {
    var targetValue = obj[propNames[i]];

    if (targetValue) {
      if (typeof cb === 'function') {
        var result = cb(targetValue, searchValue, propNames[i]);

        if (result === true) {
          return result;
        }
      }

      if (targetValue.toString().toLocaleUpperCase().indexOf(searchValue) !== -1) {
        return true;
      }
    }
  }

  return false;
}
function isUUID(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  var pattern = uuid[version];
  return pattern && pattern.test(str);
}
// CONCATENATED MODULE: ./src/shared/components/DataTable/StyledTable.jsx
function StyledTable_templateObject2() {
  var data = StyledTable_taggedTemplateLiteral(["\n  font-size: 17px;\n"]);

  StyledTable_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function StyledTable_templateObject() {
  var data = StyledTable_taggedTemplateLiteral(["\n  background-color: rgba(0,0,0,0);\n  border-collapse: collapse;\n  border-spacing: 0;\n  display: table;\n  margin-bottom: 20px;\n  max-width: 100%;\n  width: 100%;\n\n  & > thead > tr > th,\n  & > tbody > tr > th,\n  & > tfoot > tr > th,\n  & > thead > tr > td,\n  & > tbody > tr > td,\n  & > tfoot > tr > td {\n    line-height: 1.42857;\n    padding: 8px;\n    vertical-align: top;\n  }\n\n  & > thead > tr > th {\n    border-bottom: 1px solid #DDDDDD;\n  }\n\n  & > thead> tr > th,\n  & > tbody> tr > th,\n  & > tfoot> tr > th,\n  & > thead> tr > td,\n  & > tbody> tr > td,\n  & > tfoot> tr > td {\n    border-top: 1px solid #e7eaec;\n    line-height: 1.42857;\n    padding: 8px;\n    vertical-align: top;\n  }\n"]);

  StyledTable_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function StyledTable_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var StyledTable = styled_components_browser_esm["c" /* default */].table(StyledTable_templateObject());
var StyledEmptyIndicator = styled_components_browser_esm["c" /* default */].div(StyledTable_templateObject2());
// EXTERNAL MODULE: ./src/shared/assets/icomoon/style.css
var style = __webpack_require__("ec++");

// CONCATENATED MODULE: ./src/shared/components/Icon/Icon.jsx


var fontIconClasses = {
  "Windows": 'icon-windows',
  "Github": 'icon-github',
  "Google": 'google-plus2',
  "SortDesc": 'icon-chevron-down',
  "SortAsc": 'icon-chevron-up',
  "Sort": 'icon-chevrons-expand-vertical'
};

function makeFontIcon(kind) {
  var className = fontIconClasses[kind];

  var Icon = function Icon() {
    return react_default.a.createElement("span", {
      className: "icon ".concat(className)
    });
  };

  Icon.displayName = "Icon.".concat(kind);
  return Icon;
}

var Microsoft = makeFontIcon('Windows');
var Google = makeFontIcon('Google');
var Github = makeFontIcon('Github');
var SortDesc = makeFontIcon('SortDesc');
var SortAsc = makeFontIcon('SortAsc');
var Sort = makeFontIcon('Sort');
// CONCATENATED MODULE: ./src/shared/components/DataTable/Table.jsx
function Table_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Table_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Table_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Table_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Table_typeof = function _typeof(obj) { return typeof obj; }; } else { Table_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Table_typeof(obj); }

function Table_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Table_defineProperty(target, key, source[key]); }); } return target; }

function Table_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Table_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Table_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Table_createClass(Constructor, protoProps, staticProps) { if (protoProps) Table_defineProperties(Constructor.prototype, protoProps); if (staticProps) Table_defineProperties(Constructor, staticProps); return Constructor; }

function Table_possibleConstructorReturn(self, call) { if (call && (Table_typeof(call) === "object" || typeof call === "function")) { return call; } return Table_assertThisInitialized(self); }

function Table_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Table_getPrototypeOf(o) { Table_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Table_getPrototypeOf(o); }

function Table_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Table_setPrototypeOf(subClass, superClass); }

function Table_setPrototypeOf(o, p) { Table_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Table_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



/**
* Sort indicator used by SortHeaderCell
*/

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

var Table_Table =
/*#__PURE__*/
function (_React$Component) {
  Table_inherits(Table, _React$Component);

  function Table() {
    Table_classCallCheck(this, Table);

    return Table_possibleConstructorReturn(this, Table_getPrototypeOf(Table).apply(this, arguments));
  }

  Table_createClass(Table, [{
    key: "renderHeader",
    value: function renderHeader(children) {
      var _this = this;

      var data = this.props.data;
      var cells = children.map(function (item, index) {
        return _this.renderCell(item.props.header, Table_objectSpread({
          index: index,
          key: index,
          isHeader: true,
          data: data
        }, item.props));
      });
      return react_default.a.createElement("thead", null, react_default.a.createElement("tr", null, cells));
    }
  }, {
    key: "renderBody",
    value: function renderBody(children) {
      var _this2 = this;

      var data = this.props.data;
      var count = this.props.rowCount;
      var rows = [];

      for (var i = 0; i < count; i++) {
        var cells = children.map(function (item, index) {
          return _this2.renderCell(item.props.cell, Table_objectSpread({
            rowIndex: i,
            key: index,
            isHeader: false,
            data: data
          }, item.props));
        });
        rows.push(react_default.a.createElement("tr", {
          key: i
        }, cells));
      }

      return react_default.a.createElement("tbody", null, rows);
    }
  }, {
    key: "renderCell",
    value: function renderCell(cell, cellProps) {
      var content = null;

      if (react_default.a.isValidElement(cell)) {
        content = react_default.a.cloneElement(cell, cellProps);
      } else if (typeof cell === 'function') {
        content = cell(cellProps);
      }

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var children = [];
      react_default.a.Children.forEach(this.props.children, function (child) {
        if (child == null) {
          return;
        }

        if (!child.props._isColumn) {
          throw 'Should be Column';
        }

        children.push(child);
      });
      return react_default.a.createElement(StyledTable, null, this.renderHeader(children), this.renderBody(children));
    }
  }]);

  return Table;
}(react_default.a.Component);

var Table_SortIndicator = function SortIndicator(_ref) {
  var sortDir = _ref.sortDir;

  if (sortDir === SortTypes.DESC) {
    return react_default.a.createElement(SortDesc, null);
  }

  if (sortDir === SortTypes.ASC) {
    return react_default.a.createElement(SortAsc, null);
  }

  return react_default.a.createElement(Sort, null);
};

var Column =
/*#__PURE__*/
function (_React$Component2) {
  Table_inherits(Column, _React$Component2);

  function Column() {
    Table_classCallCheck(this, Column);

    return Table_possibleConstructorReturn(this, Table_getPrototypeOf(Column).apply(this, arguments));
  }

  Table_createClass(Column, [{
    key: "render",
    value: function render() {
      throw new Error('Component <Column /> should never render');
    }
  }]);

  return Column;
}(react_default.a.Component);

Table_defineProperty(Column, "defaultProps", {
  _isColumn: true
});

var Table_Cell = function Cell(props) {
  var isHeader = props.isHeader,
      children = props.children;
  return isHeader ? react_default.a.createElement("th", null, children) : react_default.a.createElement("td", null, children);
};

var Table_TextCell = function TextCell(_ref2) {
  var rowIndex = _ref2.rowIndex,
      data = _ref2.data,
      columnKey = _ref2.columnKey,
      props = Table_objectWithoutProperties(_ref2, ["rowIndex", "data", "columnKey"]);

  return react_default.a.createElement(Table_Cell, props, data[rowIndex][columnKey]);
};

var Table_SortHeaderCell =
/*#__PURE__*/
function (_React$Component3) {
  Table_inherits(SortHeaderCell, _React$Component3);

  function SortHeaderCell() {
    var _getPrototypeOf2;

    var _this3;

    Table_classCallCheck(this, SortHeaderCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = Table_possibleConstructorReturn(this, (_getPrototypeOf2 = Table_getPrototypeOf(SortHeaderCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this3)), "onSortChange", function (e) {
      e.preventDefault();

      if (!_this3.props.onSortChange) {
        return;
      }

      var _this3$props = _this3.props,
          sortDir = _this3$props.sortDir,
          columnKey = _this3$props.columnKey; // default

      var newDir = SortTypes.DESC;

      if (sortDir) {
        newDir = sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
      }

      _this3.props.onSortChange(columnKey, newDir);
    });

    return _this3;
  }

  Table_createClass(SortHeaderCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sortDir = _this$props.sortDir,
          title = _this$props.title,
          props = Table_objectWithoutProperties(_this$props, ["sortDir", "title"]);

      return react_default.a.createElement(Table_Cell, props, react_default.a.createElement("a", {
        onClick: this.onSortChange
      }, title), react_default.a.createElement(Table_SortIndicator, {
        sortDir: sortDir
      }));
    }
  }]);

  return SortHeaderCell;
}(react_default.a.Component);


// CONCATENATED MODULE: ./src/shared/components/DataTable/index.js


// CONCATENATED MODULE: ./src/app/components/InputSearch/InputSearch.jsx
function InputSearch_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { InputSearch_typeof = function _typeof(obj) { return typeof obj; }; } else { InputSearch_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return InputSearch_typeof(obj); }

function InputSearch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function InputSearch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function InputSearch_createClass(Constructor, protoProps, staticProps) { if (protoProps) InputSearch_defineProperties(Constructor.prototype, protoProps); if (staticProps) InputSearch_defineProperties(Constructor, staticProps); return Constructor; }

function InputSearch_possibleConstructorReturn(self, call) { if (call && (InputSearch_typeof(call) === "object" || typeof call === "function")) { return call; } return InputSearch_assertThisInitialized(self); }

function InputSearch_getPrototypeOf(o) { InputSearch_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return InputSearch_getPrototypeOf(o); }

function InputSearch_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) InputSearch_setPrototypeOf(subClass, superClass); }

function InputSearch_setPrototypeOf(o, p) { InputSearch_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return InputSearch_setPrototypeOf(o, p); }

function InputSearch_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function InputSearch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var InputSearch_InputSearch =
/*#__PURE__*/
function (_React$Component) {
  InputSearch_inherits(InputSearch, _React$Component);

  function InputSearch(props) {
    var _this;

    InputSearch_classCallCheck(this, InputSearch);

    _this = InputSearch_possibleConstructorReturn(this, InputSearch_getPrototypeOf(InputSearch).call(this, props));

    InputSearch_defineProperty(InputSearch_assertThisInitialized(InputSearch_assertThisInitialized(_this)), "onChange", function (e) {
      _this.setState({
        value: e.target.value
      });

      _this.debouncedNotify();
    });

    _this.debouncedNotify = Object(lodash["debounce"])(function () {
      _this.props.onChange(_this.state.value);
    }, 200);
    var value = props.value || '';
    _this.state = {
      value: value
    };
    return _this;
  }

  InputSearch_createClass(InputSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // set cursor
      var $el = react_dom_default.a.findDOMNode(this);

      if ($el) {
        var $input = $el.querySelector('input');
        var length = $input.value.length;
        $input.selectionEnd = length;
        $input.selectionStart = length;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          _this$props$autoFocus = _this$props.autoFocus,
          autoFocus = _this$props$autoFocus === void 0 ? false : _this$props$autoFocus;
      className = "grv-search input-group-sm ".concat(className);
      return react_default.a.createElement("div", {
        className: className
      }, react_default.a.createElement("input", {
        placeholder: "Search...",
        className: "form-control",
        autoFocus: autoFocus,
        value: this.state.value,
        onChange: this.onChange
      }));
    }
  }]);

  return InputSearch;
}(react_default.a.Component);

/* harmony default export */ var components_InputSearch_InputSearch = (InputSearch_InputSearch);
// CONCATENATED MODULE: ./src/app/components/InputSearch/index.js
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* harmony default export */ var components_InputSearch = (components_InputSearch_InputSearch);
// CONCATENATED MODULE: ./src/app/components/ClusterNodes/NodeList/NodeList.jsx
function NodeList_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { NodeList_typeof = function _typeof(obj) { return typeof obj; }; } else { NodeList_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return NodeList_typeof(obj); }

function NodeList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NodeList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NodeList_createClass(Constructor, protoProps, staticProps) { if (protoProps) NodeList_defineProperties(Constructor.prototype, protoProps); if (staticProps) NodeList_defineProperties(Constructor, staticProps); return Constructor; }

function NodeList_possibleConstructorReturn(self, call) { if (call && (NodeList_typeof(call) === "object" || typeof call === "function")) { return call; } return NodeList_assertThisInitialized(self); }

function NodeList_getPrototypeOf(o) { NodeList_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return NodeList_getPrototypeOf(o); }

function NodeList_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) NodeList_setPrototypeOf(subClass, superClass); }

function NodeList_setPrototypeOf(o, p) { NodeList_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return NodeList_setPrototypeOf(o, p); }

function NodeList_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function NodeList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function NodeList_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = NodeList_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function NodeList_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









var NodeList_EmptyValue = function EmptyValue(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Empty' : _ref$text;
  return react_default.a.createElement("small", {
    className: "text-muted"
  }, react_default.a.createElement("span", null, text));
};

var NodeList_TagCell = function TagCell(_ref2) {
  var rowIndex = _ref2.rowIndex,
      data = _ref2.data,
      props = NodeList_objectWithoutProperties(_ref2, ["rowIndex", "data"]);

  var tags = data[rowIndex].tags;
  var $content = tags.map(function (item, index) {
    return react_default.a.createElement("span", {
      key: index,
      title: "".concat(item.name, ":").concat(item.value),
      className: "label label-default grv-nodes-table-label"
    }, item.name, " ", react_default.a.createElement("li", {
      className: "fa fa-long-arrow-right m-r-xs"
    }), item.value);
  });

  if ($content.length === 0) {
    $content = react_default.a.createElement(NodeList_EmptyValue, {
      text: "No assigned labels"
    });
  }

  return react_default.a.createElement(Table_Cell, props, $content);
};

var NodeList_LoginCell =
/*#__PURE__*/
function (_React$Component) {
  NodeList_inherits(LoginCell, _React$Component);

  function LoginCell() {
    var _getPrototypeOf2;

    var _this;

    NodeList_classCallCheck(this, LoginCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = NodeList_possibleConstructorReturn(this, (_getPrototypeOf2 = NodeList_getPrototypeOf(LoginCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this)), "onKeyPress", function (e) {
      if (e.key === 'Enter' && e.target.value) {
        var url = _this.makeUrl(e.target.value);

        services_history["a" /* default */].push(url);
      }
    });

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this)), "onShowLoginsClick", function () {
      _this.refs.customLogin.focus();
    });

    return _this;
  }

  NodeList_createClass(LoginCell, [{
    key: "makeUrl",
    value: function makeUrl(login) {
      var _this$props = this.props,
          data = _this$props.data,
          rowIndex = _this$props.rowIndex;
      var _data$rowIndex = data[rowIndex],
          siteId = _data$rowIndex.siteId,
          id = _data$rowIndex.id;
      return config["a" /* default */].getTerminalLoginUrl({
        siteId: siteId,
        serverId: id,
        login: login
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          logins = _this$props2.logins,
          props = NodeList_objectWithoutProperties(_this$props2, ["logins"]);

      var $lis = [];
      var defaultLogin = logins[0] || '';
      var defaultTermUrl = this.makeUrl(defaultLogin);

      for (var i = 0; i < logins.length; i++) {
        var termUrl = this.makeUrl(logins[i]);
        $lis.push(react_default.a.createElement("li", {
          key: i
        }, react_default.a.createElement(NavLink["a" /* default */], {
          to: termUrl
        }, logins[i])));
      }

      return react_default.a.createElement(Table_Cell, props, react_default.a.createElement("div", {
        style: {
          display: "flex"
        }
      }, logins.length === 0 && react_default.a.createElement(NodeList_EmptyValue, {
        text: "No assigned logins"
      }), logins.length > 0 && react_default.a.createElement("div", {
        style: {
          display: "flex"
        },
        className: "btn-group"
      }, react_default.a.createElement(NavLink["a" /* default */], {
        to: defaultTermUrl
      }, defaultLogin), react_default.a.createElement("button", {
        "data-toggle": "dropdown",
        onClick: this.onShowLoginsClick,
        className: "btn btn-default btn-xs dropdown-toggle"
      }, react_default.a.createElement("span", {
        className: "caret"
      })), react_default.a.createElement("ul", {
        className: "dropdown-menu pull-right"
      }, react_default.a.createElement("li", null, react_default.a.createElement("div", {
        className: "input-group-sm grv-nodes-custom-login"
      }, react_default.a.createElement("input", {
        className: "form-control",
        ref: "customLogin",
        placeholder: "Enter login name...",
        onKeyPress: this.onKeyPress
      }))), $lis))));
    }
  }]);

  return LoginCell;
}(react_default.a.Component);

var NodeList_NodeList =
/*#__PURE__*/
function (_React$Component2) {
  NodeList_inherits(NodeList, _React$Component2);

  function NodeList(props) {
    var _this2;

    NodeList_classCallCheck(this, NodeList);

    _this2 = NodeList_possibleConstructorReturn(this, NodeList_getPrototypeOf(NodeList).call(this, props));

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this2)), "storageKey", 'NodeList');

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this2)), "searchableProps", ['addr', 'hostname', 'tags']);

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this2)), "onSortChange", function (columnKey, sortDir) {
      _this2.state.colSortDirs = NodeList_defineProperty({}, columnKey, sortDir);

      _this2.setState(_this2.state);
    });

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this2)), "onFilterChange", function (value) {
      _this2.state.filter = value;

      _this2.setState(_this2.state);
    });

    NodeList_defineProperty(NodeList_assertThisInitialized(NodeList_assertThisInitialized(_this2)), "onSshInputEnter", function (login, host) {
      var url = config["a" /* default */].getTerminalLoginUrl({
        siteId: _this2.props.siteId,
        serverId: host,
        login: login
      });
      services_history["a" /* default */].push(url);
    });

    if (props.storage) {
      _this2.state = props.storage.findByKey(_this2.storageKey);
    }

    if (!_this2.state) {
      _this2.state = {
        filter: '',
        colSortDirs: {
          hostname: SortTypes.DESC
        }
      };
    }

    return _this2;
  }

  NodeList_createClass(NodeList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.storage) {
        this.props.storage.save(this.storageKey, this.state);
      }
    }
  }, {
    key: "searchAndFilterCb",
    value: function searchAndFilterCb(targetValue, searchValue, propName) {
      if (propName === 'tags') {
        return targetValue.some(function (item) {
          var name = item.name,
              value = item.value;
          return name.toLocaleUpperCase().indexOf(searchValue) !== -1 || value.toLocaleUpperCase().indexOf(searchValue) !== -1;
        });
      }
    }
  }, {
    key: "sortAndFilter",
    value: function sortAndFilter(data) {
      var _this3 = this;

      var colSortDirs = this.state.colSortDirs;
      var filtered = data.filter(function (obj) {
        return isMatch(obj, _this3.state.filter, {
          searchableProps: _this3.searchableProps,
          cb: _this3.searchAndFilterCb
        });
      });
      var columnKey = Object.getOwnPropertyNames(colSortDirs)[0];
      var sortDir = colSortDirs[columnKey];
      var sorted = Object(lodash["sortBy"])(filtered, columnKey);

      if (sortDir === SortTypes.ASC) {
        sorted = sorted.reverse();
      }

      return sorted;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          nodeRecords = _this$props3.nodeRecords,
          logins = _this$props3.logins,
          onLoginClick = _this$props3.onLoginClick;
      var searchValue = this.state.filter;
      var data = this.sortAndFilter(nodeRecords);
      return react_default.a.createElement("div", null, react_default.a.createElement("div", null, react_default.a.createElement("h2", null, " Nodes "), react_default.a.createElement("div", null, react_default.a.createElement(components_InputSearch, {
        value: searchValue,
        onChange: this.onFilterChange
      }))), react_default.a.createElement("div", null, data.length === 0 && this.state.filter.length > 0 ? react_default.a.createElement(StyledEmptyIndicator, {
        text: "No matching nodes found"
      }) : react_default.a.createElement(Table_Table, {
        rowCount: data.length,
        data: data
      }, react_default.a.createElement(Column, {
        columnKey: "hostname",
        header: react_default.a.createElement(Table_SortHeaderCell, {
          sortDir: this.state.colSortDirs.hostname,
          onSortChange: this.onSortChange,
          title: "Hostname"
        }),
        cell: react_default.a.createElement(Table_TextCell, null)
      }), react_default.a.createElement(Column, {
        columnKey: "addr",
        header: react_default.a.createElement(Table_SortHeaderCell, {
          sortDir: this.state.colSortDirs.addr,
          onSortChange: this.onSortChange,
          title: "Address"
        }),
        cell: react_default.a.createElement(Table_TextCell, null)
      }), react_default.a.createElement(Column, {
        header: react_default.a.createElement(Table_Cell, null, "Labels"),
        cell: react_default.a.createElement(NodeList_TagCell, null)
      }), react_default.a.createElement(Column, {
        onLoginClick: onLoginClick,
        header: react_default.a.createElement(Table_Cell, null, "Login as"),
        cell: react_default.a.createElement(NodeList_LoginCell, {
          logins: logins
        })
      }))));
    }
  }]);

  return NodeList;
}(react_default.a.Component);

/* harmony default export */ var ClusterNodes_NodeList_NodeList = (NodeList_NodeList);
// CONCATENATED MODULE: ./src/app/components/ClusterNodes/NodeList/index.js

/* harmony default export */ var ClusterNodes_NodeList = (ClusterNodes_NodeList_NodeList);
// CONCATENATED MODULE: ./src/app/components/ClusterNodes/ClusterNodes.jsx
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/








var ClusterNodes_ClusterNodes = function ClusterNodes(_ref) {
  var nodes = _ref.nodes,
      sshHistory = _ref.sshHistory,
      aclStore = _ref.aclStore,
      sites = _ref.sites,
      siteId = _ref.siteId,
      storage = _ref.storage;
  var logins = aclStore.getSshLogins().toJS();
  var nodeRecords = nodes.toJS();
  return react_default.a.createElement(components["d" /* Flex */], {
    style: {
      overflow: "auto"
    }
  }, react_default.a.createElement(components["a" /* Box */], {
    m: 4
  }, react_default.a.createElement(components["e" /* Heading */].h2, null, "ClusterNodes"), react_default.a.createElement(ClusterNodes_NodeList, {
    sshHistory: sshHistory,
    storage: storage,
    siteId: siteId,
    sites: sites,
    nodeRecords: nodeRecords,
    logins: logins
  })));
};

function ClusterNodes_mapStoreToProps(props) {
  var clusterId = props.clusterId;
  return {
    nodes: nodes_getters.nodesByCluster(clusterId),
    aclStore: userAcl_getters.userAcl,
    sshHistory: store["a" /* getters */].store
  };
}

/* harmony default export */ var components_ClusterNodes_ClusterNodes = (Object(nuclear["b" /* connect */])(ClusterNodes_mapStoreToProps)(ClusterNodes_ClusterNodes));
// CONCATENATED MODULE: ./src/app/components/ClusterNodes/index.js

/* harmony default export */ var components_ClusterNodes = (components_ClusterNodes_ClusterNodes);
// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js
var react_select_esm = __webpack_require__("y2Vs");

// CONCATENATED MODULE: ./src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx
function ClusterSelector_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { ClusterSelector_defineProperty(target, key, source[key]); }); } return target; }

function ClusterSelector_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ClusterSelector_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ClusterSelector_typeof = function _typeof(obj) { return typeof obj; }; } else { ClusterSelector_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ClusterSelector_typeof(obj); }

function ClusterSelector_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ClusterSelector_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ClusterSelector_createClass(Constructor, protoProps, staticProps) { if (protoProps) ClusterSelector_defineProperties(Constructor.prototype, protoProps); if (staticProps) ClusterSelector_defineProperties(Constructor, staticProps); return Constructor; }

function ClusterSelector_possibleConstructorReturn(self, call) { if (call && (ClusterSelector_typeof(call) === "object" || typeof call === "function")) { return call; } return ClusterSelector_assertThisInitialized(self); }

function ClusterSelector_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ClusterSelector_getPrototypeOf(o) { ClusterSelector_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ClusterSelector_getPrototypeOf(o); }

function ClusterSelector_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ClusterSelector_setPrototypeOf(subClass, superClass); }

function ClusterSelector_setPrototypeOf(o, p) { ClusterSelector_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ClusterSelector_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var ClusterSelector_ClusterSelector =
/*#__PURE__*/
function (_React$Component) {
  ClusterSelector_inherits(ClusterSelector, _React$Component);

  function ClusterSelector() {
    ClusterSelector_classCallCheck(this, ClusterSelector);

    return ClusterSelector_possibleConstructorReturn(this, ClusterSelector_getPrototypeOf(ClusterSelector).apply(this, arguments));
  }

  ClusterSelector_createClass(ClusterSelector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options,
          onChange = _this$props.onChange;
      var selected = options.find(function (o) {
        return o.value === value;
      });
      return react_default.a.createElement("div", {
        style: {
          width: "400px"
        }
      }, react_default.a.createElement(react_select_esm["a" /* default */], {
        styles: customStyles,
        value: selected,
        onChange: onChange,
        options: options
      }));
    }
  }]);

  return ClusterSelector;
}(react_default.a.Component);

var customStyles = {
  option: function option(provided, state) {
    return ClusterSelector_objectSpread({}, provided, {
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue' //padding: 20,

    });
  },
  control: function control() {
    return {
      // none of react-select's styles are passed to <Control />
      width: 400,
      display: "flex"
    };
  },
  singleValue: function singleValue(provided, state) {
    var opacity = state.isDisabled ? 0.5 : 1;
    var transition = 'opacity 300ms';
    return ClusterSelector_objectSpread({}, provided, {
      opacity: opacity,
      transition: transition
    });
  }
};
/* harmony default export */ var Cluster_ClusterSelector_ClusterSelector = (ClusterSelector_ClusterSelector);
// CONCATENATED MODULE: ./src/app/components/Cluster/ClusterSelector/index.js

/* harmony default export */ var Cluster_ClusterSelector = (Cluster_ClusterSelector_ClusterSelector);
// CONCATENATED MODULE: ./src/app/components/Cluster/Cluster.jsx
function Cluster_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Cluster_typeof = function _typeof(obj) { return typeof obj; }; } else { Cluster_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Cluster_typeof(obj); }

function Cluster_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Cluster_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Cluster_createClass(Constructor, protoProps, staticProps) { if (protoProps) Cluster_defineProperties(Constructor.prototype, protoProps); if (staticProps) Cluster_defineProperties(Constructor, staticProps); return Constructor; }

function Cluster_possibleConstructorReturn(self, call) { if (call && (Cluster_typeof(call) === "object" || typeof call === "function")) { return call; } return Cluster_assertThisInitialized(self); }

function Cluster_getPrototypeOf(o) { Cluster_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Cluster_getPrototypeOf(o); }

function Cluster_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Cluster_setPrototypeOf(subClass, superClass); }

function Cluster_setPrototypeOf(o, p) { Cluster_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Cluster_setPrototypeOf(o, p); }

function Cluster_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Cluster_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/









var Cluster_Cluster =
/*#__PURE__*/
function (_React$Component) {
  Cluster_inherits(Cluster, _React$Component);

  function Cluster() {
    var _getPrototypeOf2;

    var _this;

    Cluster_classCallCheck(this, Cluster);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Cluster_possibleConstructorReturn(this, (_getPrototypeOf2 = Cluster_getPrototypeOf(Cluster)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Cluster_defineProperty(Cluster_assertThisInitialized(Cluster_assertThisInitialized(_this)), "onChangeCluster", function (option) {
      _this.props.onChangeCluster(option.value);
    });

    return _this;
  }

  Cluster_createClass(Cluster, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clusterId = _this$props.clusterId,
          clusters = _this$props.clusters;
      var clusterOptions = clusters.map(function (c) {
        return {
          value: c.name,
          label: c.name
        };
      });
      return react_default.a.createElement(components["d" /* Flex */], {
        style: {
          height: "100%"
        }
      }, react_default.a.createElement(components["a" /* Box */], {
        style: {
          overflow: "auto"
        }
      }, react_default.a.createElement(components["i" /* SideNav */], null, react_default.a.createElement(components["j" /* SideNavItem */], {
        as: function as(props) {
          return react_default.a.createElement(NavLink["a" /* default */], {
            className: props.className,
            exact: true,
            to: config["a" /* default */].getClusterUrl(clusterId)
          }, "Nodes");
        }
      }), react_default.a.createElement(components["j" /* SideNavItem */], {
        as: function as(props) {
          return react_default.a.createElement(NavLink["a" /* default */], {
            className: props.className,
            to: config["a" /* default */].getClusterSessionsUrl(clusterId)
          }, "Sessions");
        }
      }))), react_default.a.createElement(components["a" /* Box */], {
        m: 4,
        style: {
          overflow: "auto"
        }
      }, react_default.a.createElement("div", {
        style: {
          width: "400px"
        }
      }, react_default.a.createElement(Cluster_ClusterSelector, {
        value: clusterId,
        onChange: this.onChangeCluster,
        options: clusterOptions
      })), react_default.a.createElement(Switch["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
        exact: true,
        path: config["a" /* default */].routes.cluster
      }, react_default.a.createElement(components_ClusterNodes, {
        clusterId: clusterId
      })))));
    }
  }]);

  return Cluster;
}(react_default.a.Component);

function Cluster_mapStoreToProps() {
  return {
    clusters: sites_getters.sites
  };
}

function mapStateToProps() {
  return {
    onChangeCluster: changeCluster
  };
}

/* harmony default export */ var components_Cluster_Cluster = (Object(nuclear["b" /* connect */])(Cluster_mapStoreToProps, mapStateToProps)(Cluster_Cluster));
// CONCATENATED MODULE: ./src/app/components/Cluster/index.js

/* harmony default export */ var components_Cluster = (components_Cluster_Cluster);
// CONCATENATED MODULE: ./src/app/components/App/App.jsx
function App_templateObject() {
  var data = App_taggedTemplateLiteral(["\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"]);

  App_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function App_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function App_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { App_typeof = function _typeof(obj) { return typeof obj; }; } else { App_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return App_typeof(obj); }

function App_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function App_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function App_createClass(Constructor, protoProps, staticProps) { if (protoProps) App_defineProperties(Constructor.prototype, protoProps); if (staticProps) App_defineProperties(Constructor, staticProps); return Constructor; }

function App_possibleConstructorReturn(self, call) { if (call && (App_typeof(call) === "object" || typeof call === "function")) { return call; } return App_assertThisInitialized(self); }

function App_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function App_getPrototypeOf(o) { App_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return App_getPrototypeOf(o); }

function App_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) App_setPrototypeOf(subClass, superClass); }

function App_setPrototypeOf(o, p) { App_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return App_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/















var App_App =
/*#__PURE__*/
function (_Component) {
  App_inherits(App, _Component);

  function App() {
    App_classCallCheck(this, App);

    return App_possibleConstructorReturn(this, App_getPrototypeOf(App).apply(this, arguments));
  }

  App_createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var featureActivator = new app_featureActivator();
      initApp("", featureActivator);
    }
  }, {
    key: "render",
    value: function render() {
      var initAttempt = this.props.initAttempt;
      var isProcessing = initAttempt.isProcessing,
          isSuccess = initAttempt.isSuccess,
          isFailed = initAttempt.isFailed,
          message = initAttempt.message;

      if (isProcessing) {
        return react_default.a.createElement(components["f" /* Indicator */], null);
      }

      if (isFailed) {
        return react_default.a.createElement(msgPage_Failed, {
          message: message
        });
      }

      if (!isSuccess) {
        return null;
      }

      return react_default.a.createElement(StyledApp, {
        flexDirection: "column"
      }, react_default.a.createElement(components["a" /* Box */], null, react_default.a.createElement(App_AppBar, null)), react_default.a.createElement(Switch["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
        exact: true,
        path: config["a" /* default */].routes.app,
        component: components_Clusters
      }), react_default.a.createElement(Route["a" /* default */], {
        path: config["a" /* default */].routes.cluster,
        render: function render(_ref) {
          var match = _ref.match;
          return react_default.a.createElement(components_Cluster, {
            path: match.path,
            clusterId: match.params.clusterId
          });
        }
      })));
    }
  }]);

  return App;
}(react["Component"]);

function App_mapStateToProps() {
  return {
    initAttempt: app_getters.initAttempt
  };
}

/* harmony default export */ var components_App_App = (components_withAuth(Object(nuclear["b" /* connect */])(App_mapStateToProps)(App_App)));
var StyledApp = styled_components_browser_esm["c" /* default */].div(App_templateObject());
// CONCATENATED MODULE: ./src/app/components/App/index.js

/* harmony default export */ var components_App = __webpack_exports__["a"] = (components_App_App);

/***/ }),

/***/ "ksSu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeStatus */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initAppStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return loginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchInviteStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return signupStatus; });
/* unused harmony export initSettingsStatus */
/* unused harmony export changePasswordStatus */
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xSHT");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tGXY");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LYgY");
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



function makeStatus(reqType) {
  return {
    start: function start() {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* START */ "c"], {
        type: reqType
      });
    },
    success: function success(message) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* SUCCESS */ "d"], {
        type: reqType,
        message: message
      });
    },
    fail: function fail(message) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* FAIL */ "b"], {
        type: reqType,
        message: message
      });
    },
    clear: function clear() {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__[/* CLEAR */ "a"], {
        type: reqType
      });
    }
  };
}
var initAppStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* TRYING_TO_INIT_APP */ "c"]);
var loginStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* TRYING_TO_LOGIN */ "e"]);
var fetchInviteStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* FETCHING_INVITE */ "a"]);
var signupStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* TRYING_TO_SIGN_UP */ "f"]);
var initSettingsStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* TRYING_TO_INIT_SETTINGS */ "d"]);
var changePasswordStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__[/* TRYING_TO_CHANGE_PSW */ "b"]);

/***/ }),

/***/ "l3S1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AuthProviderTypeEnum; });
/* unused harmony export RestRespCodeEnum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Auth2faTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AuthTypeEnum; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var AuthProviderTypeEnum = {
  OIDC: 'oidc',
  SAML: 'saml',
  GITHUB: 'github'
};
var RestRespCodeEnum = {
  FORBIDDEN: 403
};
var Auth2faTypeEnum = {
  UTF: 'u2f',
  OTP: 'otp',
  DISABLED: 'off'
};
var AuthTypeEnum = {
  LOCAL: 'local',
  SSO: 'sso'
};

/***/ }),

/***/ "lZJN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    _classCallCheck(this, Logger);

    this.name = name;
  }

  _createClass(Logger, [{
    key: "log",
    value: function log() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';

      if (true) {
        var _window$console;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_window$console = window.console)[level].apply(_window$console, ["%c[".concat(this.name, "]"), "color: blue;"].concat(args));
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.log.apply(this, ['trace'].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.log.apply(this, ['warn'].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.log.apply(this, ['info'].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.log.apply(this, ['error'].concat(args));
    }
  }]);

  return Logger;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
  create: function create() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _construct(Logger, args);
  }
});

/***/ }),

/***/ "oHDm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeGetter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return initAppAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return loginAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchInviteAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return signupAttempt; });
/* unused harmony export initSettingsAttempt */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changePasswordAttempt; });
/* harmony import */ var _statusStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("PVWJ");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("LYgY");
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var STORE_NAME = 'tlpt_status';
var makeGetter = function makeGetter(reqType) {
  return [[STORE_NAME, reqType], function (rec) {
    return rec || new _statusStore__WEBPACK_IMPORTED_MODULE_0__[/* TrackRec */ "a"]();
  }];
};
var initAppAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* TRYING_TO_INIT_APP */ "c"]);
var loginAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* TRYING_TO_LOGIN */ "e"]);
var fetchInviteAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* FETCHING_INVITE */ "a"]);
var signupAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* TRYING_TO_SIGN_UP */ "f"]);
var initSettingsAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* TRYING_TO_INIT_SETTINGS */ "d"]);
var changePasswordAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__[/* TRYING_TO_CHANGE_PSW */ "b"]);

/***/ }),

/***/ "owjQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RECEIVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RECEIVE_INVITE; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var RECEIVE_USER = 'TLPT_RECEIVE_USER';
var RECEIVE_INVITE = 'TLPT_RECEIVE_USER_INVITE';

/***/ }),

/***/ "qDpX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RECEIVE_CLUSTERS; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var RECEIVE_CLUSTERS = 'TLPT_CLUSTER_RECEIVE';

/***/ }),

/***/ "rVcD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("i8i4");
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/app/index.jsx
var app = __webpack_require__("eowl");

// EXTERNAL MODULE: ./src/app/services/history.js
var services_history = __webpack_require__("yaYm");

// EXTERNAL MODULE: ./src/app/config.js
var config = __webpack_require__("LMli");

// EXTERNAL MODULE: ./src/app/reactor.js
var app_reactor = __webpack_require__("xSHT");

// EXTERNAL MODULE: ./node_modules/nuclear-js/dist/nuclear.js
var nuclear = __webpack_require__("L7e8");

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("JPcv");

// EXTERNAL MODULE: ./src/app/services/localStorage.js
var localStorage = __webpack_require__("KdfW");

// CONCATENATED MODULE: ./src/app/flux/terminal/actionTypes.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var TLPT_TERMINAL_INIT = 'TLPT_TERMINAL_INIT';
var TLPT_TERMINAL_CLOSE = 'TLPT_TERMINAL_CLOSE';
var TLPT_TERMINAL_SET_STATUS = 'TLPT_TERMINAL_SET_STATUS';
// CONCATENATED MODULE: ./src/app/flux/terminal/store.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/





var TermStatusRec = new immutable["Record"]({
  isReady: false,
  isLoading: false,
  isNotFound: false,
  isError: false,
  errorText: undefined
});
var store_TermRec =
/*#__PURE__*/
function (_Record) {
  _inherits(TermRec, _Record);

  function TermRec() {
    _classCallCheck(this, TermRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(TermRec).apply(this, arguments));
  }

  _createClass(TermRec, [{
    key: "getClusterName",
    value: function getClusterName() {
      return this.siteId;
    }
  }, {
    key: "getTtyParams",
    value: function getTtyParams() {
      var _localStorage$getBear = localStorage["b" /* default */].getBearerToken(),
          accessToken = _localStorage$getBear.accessToken;

      var server_id = this.serverId;
      return {
        login: this.login,
        sid: this.sid,
        token: accessToken,
        ttyUrl: config["a" /* default */].api.ttyWsAddr,
        cluster: this.siteId,
        getTarget: function getTarget() {
          return {
            server_id: server_id
          };
        }
      };
    }
  }, {
    key: "getServerLabel",
    value: function getServerLabel() {
      if (this.hostname && this.login) {
        return "".concat(this.login, "@").concat(this.hostname);
      }

      if (this.serverId && this.login) {
        return "".concat(this.login, "@").concat(this.serverId);
      }

      return '';
    }
  }]);

  return TermRec;
}(Object(immutable["Record"])({
  status: TermStatusRec(),
  hostname: null,
  login: null,
  siteId: null,
  serverId: null,
  sid: null
}));
/* harmony default export */ var store = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new store_TermRec();
  },
  initialize: function initialize() {
    this.on(TLPT_TERMINAL_INIT, init);
    this.on(TLPT_TERMINAL_CLOSE, store_close);
    this.on(TLPT_TERMINAL_SET_STATUS, changeStatus);
  }
}));

function store_close() {
  return new store_TermRec();
}

function init(state, json) {
  return new store_TermRec(json);
}

function changeStatus(state, status) {
  return state.setIn(['status'], new TermStatusRec(status));
}
// EXTERNAL MODULE: ./src/app/flux/userAcl/actionTypes.js
var actionTypes = __webpack_require__("gC4k");

// CONCATENATED MODULE: ./src/app/flux/userAcl/store.js
function store_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { store_typeof = function _typeof(obj) { return typeof obj; }; } else { store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return store_typeof(obj); }

function store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function store_createClass(Constructor, protoProps, staticProps) { if (protoProps) store_defineProperties(Constructor.prototype, protoProps); if (staticProps) store_defineProperties(Constructor, staticProps); return Constructor; }

function store_possibleConstructorReturn(self, call) { if (call && (store_typeof(call) === "object" || typeof call === "function")) { return call; } return store_assertThisInitialized(self); }

function store_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function store_getPrototypeOf(o) { store_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return store_getPrototypeOf(o); }

function store_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) store_setPrototypeOf(subClass, superClass); }

function store_setPrototypeOf(o, p) { store_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return store_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



 // sort logins by making 'root' as the first in the list

var sortLogins = function sortLogins(loginList) {
  var index = loginList.indexOf('root');

  if (index !== -1) {
    loginList = loginList.remove(index);
    return loginList.sort().unshift('root');
  }

  return loginList;
};

var Access = new immutable["Record"]({
  list: false,
  read: false,
  edit: false,
  create: false,
  remove: false
});

var store_AccessListRec =
/*#__PURE__*/
function (_Record) {
  store_inherits(AccessListRec, _Record);

  function AccessListRec() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    store_classCallCheck(this, AccessListRec);

    var map = Object(nuclear["toImmutable"])(json);
    var sshLogins = new immutable["List"](map.get('sshLogins'));
    var params = {
      sshLogins: sortLogins(sshLogins),
      authConnectors: new Access(map.get('authConnectors')),
      trustedClusters: new Access(map.get('trustedClusters')),
      roles: new Access(map.get('roles')),
      sessions: new Access(map.get('sessions'))
    };
    return store_possibleConstructorReturn(this, store_getPrototypeOf(AccessListRec).call(this, params));
  }

  store_createClass(AccessListRec, [{
    key: "getSessionAccess",
    value: function getSessionAccess() {
      return this.get('sessions');
    }
  }, {
    key: "getRoleAccess",
    value: function getRoleAccess() {
      return this.get('roles');
    }
  }, {
    key: "getConnectorAccess",
    value: function getConnectorAccess() {
      return this.get('authConnectors');
    }
  }, {
    key: "getClusterAccess",
    value: function getClusterAccess() {
      return this.get('trustedClusters');
    }
  }, {
    key: "getSshLogins",
    value: function getSshLogins() {
      return this.get('sshLogins');
    }
  }]);

  return AccessListRec;
}(Object(immutable["Record"])({
  authConnectors: new Access(),
  trustedClusters: new Access(),
  roles: new Access(),
  sessions: new Access(),
  sshLogins: new immutable["List"]()
}));

function getAcl() {
  return app_reactor["a" /* default */].evaluate(['tlpt_user_acl']);
}
/* harmony default export */ var userAcl_store = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new store_AccessListRec();
  },
  initialize: function initialize() {
    this.on(actionTypes["a" /* RECEIVE_USERACL */], function (state, json) {
      return new store_AccessListRec(json);
    });
  }
}));
// EXTERNAL MODULE: ./src/app/flux/app/actionTypes.js
var app_actionTypes = __webpack_require__("FCiP");

// CONCATENATED MODULE: ./src/app/flux/app/appStore.js
function appStore_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { appStore_typeof = function _typeof(obj) { return typeof obj; }; } else { appStore_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return appStore_typeof(obj); }

function appStore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function appStore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function appStore_createClass(Constructor, protoProps, staticProps) { if (protoProps) appStore_defineProperties(Constructor.prototype, protoProps); if (staticProps) appStore_defineProperties(Constructor, staticProps); return Constructor; }

function appStore_possibleConstructorReturn(self, call) { if (call && (appStore_typeof(call) === "object" || typeof call === "function")) { return call; } return appStore_assertThisInitialized(self); }

function appStore_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function appStore_getPrototypeOf(o) { appStore_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return appStore_getPrototypeOf(o); }

function appStore_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) appStore_setPrototypeOf(subClass, superClass); }

function appStore_setPrototypeOf(o, p) { appStore_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return appStore_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/





var AppRec =
/*#__PURE__*/
function (_Record) {
  appStore_inherits(AppRec, _Record);

  function AppRec(props) {
    appStore_classCallCheck(this, AppRec);

    return appStore_possibleConstructorReturn(this, appStore_getPrototypeOf(AppRec).call(this, props));
  }

  appStore_createClass(AppRec, [{
    key: "setSiteId",
    value: function setSiteId(siteId) {
      return this.set('siteId', siteId);
    }
  }, {
    key: "getClusterName",
    value: function getClusterName() {
      return this.get('siteId');
    }
  }, {
    key: "getNavItems",
    value: function getNavItems() {
      return this.navItems.toJS();
    }
  }, {
    key: "addNavItem",
    value: function addNavItem(navItem) {
      return this.set('navItems', this.navItems.push(navItem));
    }
  }]);

  return AppRec;
}(Object(immutable["Record"])({
  siteId: null,
  navItems: new immutable["List"]()
}));

function getStore() {
  return app_reactor["a" /* default */].evaluate(['tlpt']);
}
/* harmony default export */ var appStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new AppRec();
  },
  initialize: function initialize() {
    this.on(app_actionTypes["b" /* SET_SITE_ID */], function (state, siteId) {
      return state.setSiteId(siteId);
    });
    this.on(app_actionTypes["a" /* ADD_NAV_ITEM */], function (state, navItem) {
      return state.addNavItem(navItem);
    });
  }
}));
// EXTERNAL MODULE: ./src/app/flux/nodes/actionTypes.js
var nodes_actionTypes = __webpack_require__("ausB");

// CONCATENATED MODULE: ./src/app/flux/nodes/nodeStore.js
function nodeStore_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { nodeStore_typeof = function _typeof(obj) { return typeof obj; }; } else { nodeStore_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return nodeStore_typeof(obj); }

function nodeStore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function nodeStore_createClass(Constructor, protoProps, staticProps) { if (protoProps) nodeStore_defineProperties(Constructor.prototype, protoProps); if (staticProps) nodeStore_defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function nodeStore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function nodeStore_possibleConstructorReturn(self, call) { if (call && (nodeStore_typeof(call) === "object" || typeof call === "function")) { return call; } return nodeStore_assertThisInitialized(self); }

function nodeStore_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function nodeStore_getPrototypeOf(o) { nodeStore_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return nodeStore_getPrototypeOf(o); }

function nodeStore_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) nodeStore_setPrototypeOf(subClass, superClass); }

function nodeStore_setPrototypeOf(o, p) { nodeStore_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return nodeStore_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var nodeStore_ServerRec =
/*#__PURE__*/
function (_Record) {
  nodeStore_inherits(ServerRec, _Record);

  function ServerRec(props) {
    nodeStore_classCallCheck(this, ServerRec);

    var tags = new immutable["List"](Object(nuclear["toImmutable"])(props.tags));
    return nodeStore_possibleConstructorReturn(this, nodeStore_getPrototypeOf(ServerRec).call(this, _objectSpread({}, props, {
      tags: tags
    })));
  }

  return ServerRec;
}(Object(immutable["Record"])({
  id: '',
  siteId: '',
  hostname: '',
  tags: new immutable["List"](),
  addr: ''
}));

var nodeStore_NodeStoreRec =
/*#__PURE__*/
function (_Record2) {
  nodeStore_inherits(NodeStoreRec, _Record2);

  function NodeStoreRec() {
    nodeStore_classCallCheck(this, NodeStoreRec);

    return nodeStore_possibleConstructorReturn(this, nodeStore_getPrototypeOf(NodeStoreRec).apply(this, arguments));
  }

  nodeStore_createClass(NodeStoreRec, [{
    key: "findServer",
    value: function findServer(serverId) {
      return this.servers.find(function (s) {
        return s.id === serverId;
      });
    }
  }, {
    key: "getSiteServers",
    value: function getSiteServers(siteId) {
      return this.servers.filter(function (s) {
        return s.siteId === siteId;
      });
    }
  }, {
    key: "addSiteServers",
    value: function addSiteServers(jsonItems) {
      var list = new immutable["List"]().withMutations(function (state) {
        jsonItems.forEach(function (item) {
          return state.push(new nodeStore_ServerRec(item));
        });
        return state;
      });
      return list.equals(this.servers) ? this : this.set('servers', list);
    }
  }]);

  return NodeStoreRec;
}(Object(immutable["Record"])({
  servers: new immutable["List"]()
}));

function getNodeStore() {
  return app_reactor["a" /* default */].evaluate(['tlpt_nodes']);
}
/* harmony default export */ var nodeStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new nodeStore_NodeStoreRec();
  },
  initialize: function initialize() {
    this.on(nodes_actionTypes["a" /* TLPT_NODES_RECEIVE */], function (state, items) {
      return state.addSiteServers(items);
    });
  }
}));
// CONCATENATED MODULE: ./src/app/flux/settings/actionTypes.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var INIT = 'SETTINGS_INIT';
var ADD_NAV_ITEM = 'SETTINGS_ADD_NAV_ITEM';
var SET_RES_TO_DELETE = 'SETTINGS_SET_RES_TO_DELETE';
// CONCATENATED MODULE: ./src/app/flux/settings/store.js
function settings_store_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { settings_store_typeof = function _typeof(obj) { return typeof obj; }; } else { settings_store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return settings_store_typeof(obj); }

function settings_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function settings_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function settings_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) settings_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) settings_store_defineProperties(Constructor, staticProps); return Constructor; }

function settings_store_possibleConstructorReturn(self, call) { if (call && (settings_store_typeof(call) === "object" || typeof call === "function")) { return call; } return settings_store_assertThisInitialized(self); }

function settings_store_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function settings_store_getPrototypeOf(o) { settings_store_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return settings_store_getPrototypeOf(o); }

function settings_store_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) settings_store_setPrototypeOf(subClass, superClass); }

function settings_store_setPrototypeOf(o, p) { settings_store_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return settings_store_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var SettingsRec =
/*#__PURE__*/
function (_Record) {
  settings_store_inherits(SettingsRec, _Record);

  function SettingsRec(params) {
    settings_store_classCallCheck(this, SettingsRec);

    return settings_store_possibleConstructorReturn(this, settings_store_getPrototypeOf(SettingsRec).call(this, params));
  }

  settings_store_createClass(SettingsRec, [{
    key: "isReady",
    value: function isReady() {
      return this.isInitialized;
    }
  }, {
    key: "getNavItems",
    value: function getNavItems() {
      return this.navItems.toJS();
    }
  }, {
    key: "addNavItem",
    value: function addNavItem(navItem) {
      return this.set('navItems', this.navItems.push(navItem));
    }
  }]);

  return SettingsRec;
}(Object(immutable["Record"])({
  isInitialized: false,
  navItems: new immutable["List"]()
}));

/* harmony default export */ var settings_store = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new SettingsRec();
  },
  initialize: function initialize() {
    this.on(INIT, function (state) {
      return state.set('isInitialized', true);
    });
    this.on(ADD_NAV_ITEM, function (state, navItem) {
      return state.addNavItem(navItem);
    });
  }
}));
// EXTERNAL MODULE: ./src/app/flux/status/statusStore.js
var statusStore = __webpack_require__("PVWJ");

// EXTERNAL MODULE: ./src/app/flux/user/actionTypes.js
var user_actionTypes = __webpack_require__("owjQ");

// EXTERNAL MODULE: ./src/app/services/enums.js
var enums = __webpack_require__("l3S1");

// CONCATENATED MODULE: ./src/app/flux/user/userStore.js
function userStore_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { userStore_typeof = function _typeof(obj) { return typeof obj; }; } else { userStore_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return userStore_typeof(obj); }

function userStore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function userStore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function userStore_createClass(Constructor, protoProps, staticProps) { if (protoProps) userStore_defineProperties(Constructor.prototype, protoProps); if (staticProps) userStore_defineProperties(Constructor, staticProps); return Constructor; }

function userStore_possibleConstructorReturn(self, call) { if (call && (userStore_typeof(call) === "object" || typeof call === "function")) { return call; } return userStore_assertThisInitialized(self); }

function userStore_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function userStore_getPrototypeOf(o) { userStore_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return userStore_getPrototypeOf(o); }

function userStore_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) userStore_setPrototypeOf(subClass, superClass); }

function userStore_setPrototypeOf(o, p) { userStore_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return userStore_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/





var userStore_UserRec =
/*#__PURE__*/
function (_Record) {
  userStore_inherits(UserRec, _Record);

  function UserRec(params) {
    userStore_classCallCheck(this, UserRec);

    return userStore_possibleConstructorReturn(this, userStore_getPrototypeOf(UserRec).call(this, params));
  }

  userStore_createClass(UserRec, [{
    key: "isSso",
    value: function isSso() {
      return this.get('authType') === enums["c" /* AuthTypeEnum */].SSO;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.get('name');
    }
  }]);

  return UserRec;
}(Object(immutable["Record"])({
  name: '',
  authType: ''
}));

/* harmony default export */ var userStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear["toImmutable"])(null);
  },
  initialize: function initialize() {
    this.on(user_actionTypes["b" /* RECEIVE_USER */], receiveUser);
  }
}));

function receiveUser(state, json) {
  return new userStore_UserRec(json);
}
// CONCATENATED MODULE: ./src/app/flux/user/userInviteStore.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var Invite = new immutable["Record"]({
  invite_token: '',
  user: '',
  qr: ''
});
/* harmony default export */ var userInviteStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear["toImmutable"])(null);
  },
  initialize: function initialize() {
    this.on(user_actionTypes["a" /* RECEIVE_INVITE */], receiveInvite);
  }
}));

function receiveInvite(state, json) {
  return new Invite(json);
}
// EXTERNAL MODULE: ./src/app/flux/sites/actionTypes.js
var sites_actionTypes = __webpack_require__("qDpX");

// CONCATENATED MODULE: ./src/app/flux/sites/siteStore.js
function siteStore_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { siteStore_typeof = function _typeof(obj) { return typeof obj; }; } else { siteStore_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return siteStore_typeof(obj); }

function siteStore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { siteStore_defineProperty(target, key, source[key]); }); } return target; }

function siteStore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function siteStore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function siteStore_possibleConstructorReturn(self, call) { if (call && (siteStore_typeof(call) === "object" || typeof call === "function")) { return call; } return siteStore_assertThisInitialized(self); }

function siteStore_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function siteStore_getPrototypeOf(o) { siteStore_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return siteStore_getPrototypeOf(o); }

function siteStore_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) siteStore_setPrototypeOf(subClass, superClass); }

function siteStore_setPrototypeOf(o, p) { siteStore_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return siteStore_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var SiteRec =
/*#__PURE__*/
function (_Record) {
  siteStore_inherits(SiteRec, _Record);

  function SiteRec(json) {
    siteStore_classCallCheck(this, SiteRec);

    var params = siteStore_objectSpread({}, json, {
      connectedAt: json.last_connected
    });

    return siteStore_possibleConstructorReturn(this, siteStore_getPrototypeOf(SiteRec).call(this, params));
  }

  return SiteRec;
}(Object(immutable["Record"])({
  name: null,
  status: '',
  connectedAt: null
}));
/* harmony default export */ var siteStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new immutable["List"]();
  },
  initialize: function initialize() {
    this.on(sites_actionTypes["a" /* RECEIVE_CLUSTERS */], receiveSites);
  }
}));

function receiveSites(state, json) {
  return new immutable["List"](json.map(function (o) {
    return new SiteRec(o);
  }));
}
// EXTERNAL MODULE: ./src/app/flux/sessions/actionTypes.js
var sessions_actionTypes = __webpack_require__("zMbK");

// CONCATENATED MODULE: ./src/app/flux/sessions/eventStore.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


/* harmony default export */ var eventStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(sessions_actionTypes["b" /* RECEIVE_SITE_EVENTS */], receive);
  }
}));

function receive(state, _ref) {
  var json = _ref.json;
  var jsonEvents = json || [];
  return state.withMutations(function (state) {
    jsonEvents.forEach(function (item) {
      var sid = item.sid,
          event = item.event;

      if (!state.has(sid)) {
        state.set(sid, Object(nuclear["toImmutable"])({}));
      }

      state.setIn([sid, event], Object(nuclear["toImmutable"])(item));
    });
  });
}
// CONCATENATED MODULE: ./src/app/lib/term/enums.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var EventTypeEnum = {
  START: 'session.start',
  JOIN: 'session.join',
  END: 'session.end',
  PRINT: 'print',
  RESIZE: 'resize'
};
var TermEventEnum = {
  RESIZE: 'terminal.resize',
  CLOSE: 'terminal.close',
  RESET: 'terminal.reset',
  DATA: 'terminal.data',
  CONN_CLOSE: 'connection.close'
};
var StatusCodeEnum = {
  NORMAL: 1000
};
// CONCATENATED MODULE: ./src/app/flux/sessions/archivedSessionStore.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var StoredSessionRec = Object(immutable["Record"])({
  id: undefined,
  user: undefined,
  created: undefined,
  nodeIp: undefined,
  last_active: undefined,
  server_id: undefined,
  siteId: undefined,
  parties: Object(immutable["List"])()
});
/* harmony default export */ var archivedSessionStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(sessions_actionTypes["b" /* RECEIVE_SITE_EVENTS */], archivedSessionStore_receive);
  }
})); // uses events to build stored session objects

function archivedSessionStore_receive(state, _ref) {
  var siteId = _ref.siteId,
      json = _ref.json;
  var jsonEvents = json || [];
  var tmp = {};
  return state.withMutations(function (state) {
    jsonEvents.forEach(function (item) {
      if (item.event !== EventTypeEnum.START && item.event !== EventTypeEnum.END) {
        return;
      }

      var sid = item.sid,
          user = item.user,
          time = item.time,
          event = item.event,
          server_id = item.server_id;
      tmp[sid] = tmp[sid] || {};
      tmp[sid].id = sid;
      tmp[sid].user = user;
      tmp[sid].siteId = siteId;

      if (event === EventTypeEnum.START) {
        tmp[sid].created = time;
        tmp[sid].server_id = server_id;
        tmp[sid].nodeIp = item['addr.local'];
        tmp[sid].parties = [{
          user: user,
          serverIp: item['addr.remote']
        }];
      } // update the store only with new items


      if (event === EventTypeEnum.END && !state.has(sid)) {
        tmp[sid].last_active = time;
        state.set(sid, new StoredSessionRec(Object(nuclear["toImmutable"])(tmp[sid])));
      }
    });
  });
}
// CONCATENATED MODULE: ./src/app/flux/sessions/activeSessionStore.js
function activeSessionStore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { activeSessionStore_defineProperty(target, key, source[key]); }); } return target; }

function activeSessionStore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var ActiveSessionRec = Object(immutable["Record"])({
  id: undefined,
  namespace: undefined,
  login: undefined,
  active: undefined,
  created: undefined,
  last_active: undefined,
  server_id: undefined,
  siteId: undefined,
  parties: Object(immutable["List"])()
});
var PartyRecord = Object(immutable["Record"])({
  user: undefined,
  serverIp: undefined,
  serverId: undefined
});

var activeSessionStore_defaultState = function defaultState() {
  return Object(nuclear["toImmutable"])({});
};

/* harmony default export */ var activeSessionStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return activeSessionStore_defaultState();
  },
  initialize: function initialize() {
    this.on(sessions_actionTypes["a" /* RECEIVE_ACTIVE_SESSIONS */], activeSessionStore_receive);
  }
}));

function activeSessionStore_receive(state, _ref) {
  var siteId = _ref.siteId,
      json = _ref.json;
  var jsonArray = json || [];
  var newState = activeSessionStore_defaultState().withMutations(function (newState) {
    return jsonArray.filter(function (item) {
      return item.active === true;
    }).forEach(function (item) {
      var rec = createSessionRec(siteId, item);
      newState.set(rec.id, rec);
    });
  });
  return newState.equals(state) ? state : newState;
}

function createSessionRec(siteId, json) {
  var parties = createParties(json.parties);
  var rec = new ActiveSessionRec(Object(nuclear["toImmutable"])(activeSessionStore_objectSpread({}, json, {
    siteId: siteId,
    parties: parties
  })));
  return rec;
}

function createParties(jsonArray) {
  jsonArray = jsonArray || [];
  var list = new immutable["List"]();
  return list.withMutations(function (list) {
    jsonArray.forEach(function (item) {
      var party = new PartyRecord({
        user: item.user,
        serverIp: item.remote_addr,
        serverId: item.server_id
      });
      list.push(party);
    });
  });
}
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("wd/R");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./src/app/flux/storedSessionsFilter/actionTypes.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var TLPT_STORED_SESSINS_FILTER_SET_RANGE = 'TLPT_STORED_SESSINS_FILTER_SET_RANGE';
var TLPT_STORED_SESSINS_FILTER_SET_STATUS = 'TLPT_STORED_SESSINS_FILTER_SET_STATUS';
var TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE = 'TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE';
// CONCATENATED MODULE: ./src/app/flux/storedSessionsFilter/storedSessionFilterStore.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



/* harmony default export */ var storedSessionFilterStore = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    var end = moment_default()(new Date()).endOf('day').toDate();
    var start = moment_default()(end).subtract(3, 'day').startOf('day').toDate();
    var state = {
      start: start,
      end: end
    };
    return Object(nuclear["toImmutable"])(state);
  },
  initialize: function initialize() {
    this.on(TLPT_STORED_SESSINS_FILTER_SET_RANGE, setRange);
  }
}));

function setRange(state, newState) {
  return state.merge(newState);
}
// EXTERNAL MODULE: ./src/app/flux/sshHistory/store.js + 1 modules
var sshHistory_store = __webpack_require__("SwYS");

// CONCATENATED MODULE: ./src/app/flux/misc/store.js
function store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var SET = 'MISC_SET';
var STORE_NAME = 'tlpt_misc'; // stores any temporary data

var store_store = Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new nuclear["Immutable"].Map();
  },
  initialize: function initialize() {
    this.on(SET, function (state, _ref) {
      var key = _ref.key,
          payload = _ref.payload;
      return state.set(key, payload);
    });
  }
});
var store_register = function register(reactor) {
  reactor.registerStores(store_defineProperty({}, STORE_NAME, store_store));
};
var storage = {
  save: function save(key, payload) {
    app_reactor["a" /* default */].dispatch(SET, {
      key: key,
      payload: payload
    });
  },
  findByKey: function findByKey(key) {
    return app_reactor["a" /* default */].evaluate([STORE_NAME, key]);
  }
};
// CONCATENATED MODULE: ./src/app/flux/fileTransfer/actionTypes.jsx
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var OPEN = '/flux/fileTransfer:open';
var CLOSE = '/flux/fileTransfer:close';
var ADD = '/flux/fileTransfer:add';
var REMOVE = '/flux/fileTransfer:remove';
var UPDATE_STATUS = '/flux/fileTransfer:status';
// CONCATENATED MODULE: ./src/app/flux/fileTransfer/store.js
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function fileTransfer_store_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fileTransfer_store_createClass(Constructor, protoProps, staticProps) { if (protoProps) fileTransfer_store_defineProperties(Constructor.prototype, protoProps); if (staticProps) fileTransfer_store_defineProperties(Constructor, staticProps); return Constructor; }

function fileTransfer_store_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { fileTransfer_store_typeof = function _typeof(obj) { return typeof obj; }; } else { fileTransfer_store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return fileTransfer_store_typeof(obj); }

function store_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { fileTransfer_store_defineProperty(target, key, source[key]); }); } return target; }

function fileTransfer_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fileTransfer_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fileTransfer_store_possibleConstructorReturn(self, call) { if (call && (fileTransfer_store_typeof(call) === "object" || typeof call === "function")) { return call; } return fileTransfer_store_assertThisInitialized(self); }

function fileTransfer_store_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function fileTransfer_store_getPrototypeOf(o) { fileTransfer_store_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return fileTransfer_store_getPrototypeOf(o); }

function fileTransfer_store_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) fileTransfer_store_setPrototypeOf(subClass, superClass); }

function fileTransfer_store_setPrototypeOf(o, p) { fileTransfer_store_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return fileTransfer_store_setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/




var store_defaultStatus = {
  isFailed: false,
  isProcessing: false,
  isCompleted: false,
  error: ""
};

var File =
/*#__PURE__*/
function (_Record) {
  fileTransfer_store_inherits(File, _Record);

  function File(props) {
    fileTransfer_store_classCallCheck(this, File);

    props = store_objectSpread({}, props, {
      id: new Date().getTime() + props.name
    });
    return fileTransfer_store_possibleConstructorReturn(this, fileTransfer_store_getPrototypeOf(File).call(this, props));
  }

  return File;
}(Object(immutable["Record"])(store_objectSpread({
  id: '',
  url: '',
  name: '',
  isUpload: '',
  blob: null
}, store_defaultStatus)));

var store_FileTransferStore =
/*#__PURE__*/
function (_Record2) {
  fileTransfer_store_inherits(FileTransferStore, _Record2);

  function FileTransferStore(params) {
    fileTransfer_store_classCallCheck(this, FileTransferStore);

    return fileTransfer_store_possibleConstructorReturn(this, fileTransfer_store_getPrototypeOf(FileTransferStore).call(this, params));
  }

  fileTransfer_store_createClass(FileTransferStore, [{
    key: "open",
    value: function open(_ref) {
      var isUpload = _ref.isUpload,
          siteId = _ref.siteId,
          serverId = _ref.serverId,
          login = _ref.login;
      return this.merge({
        isOpen: true,
        isUpload: isUpload,
        siteId: siteId,
        serverId: serverId,
        login: login
      });
    }
  }, {
    key: "close",
    value: function close() {
      return new FileTransferStore();
    }
  }, {
    key: "makeUrl",
    value: function makeUrl(location, filename) {
      var siteId = this.siteId,
          serverId = this.serverId,
          login = this.login;
      var url = config["a" /* default */].api.getScpUrl({
        siteId: siteId,
        serverId: serverId,
        login: login,
        location: location,
        filename: filename
      });
      return url;
    }
  }, {
    key: "removeFile",
    value: function removeFile(id) {
      var files = this.files.delete(id);
      return this.set('files', files);
    }
  }, {
    key: "addFile",
    value: function addFile(_ref2) {
      var location = _ref2.location,
          name = _ref2.name,
          blob = _ref2.blob,
          isUpload = _ref2.isUpload;
      var url = this.makeUrl(location, name);
      var file = new File({
        url: url,
        name: name,
        isUpload: isUpload,
        blob: blob
      });
      return this.update('files', function (files) {
        return files.set(file.id, file);
      });
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(_ref3) {
      var id = _ref3.id,
          rest = _objectWithoutProperties(_ref3, ["id"]);

      var file = this.files.get(id);

      var status = store_objectSpread({}, store_defaultStatus, rest);

      file = file.merge(status);
      return this.update('files', function (files) {
        return files.set(id, file);
      });
    }
  }, {
    key: "isTransfering",
    value: function isTransfering() {
      return this.files.some(function (f) {
        return f.isProcessing === true;
      });
    }
  }]);

  return FileTransferStore;
}(Object(immutable["Record"])({
  isOpen: false,
  isUpload: false,
  siteId: '',
  serverId: '',
  login: '',
  files: new immutable["OrderedMap"]()
}));
/* harmony default export */ var fileTransfer_store = (Object(nuclear["Store"])({
  getInitialState: function getInitialState() {
    return new store_FileTransferStore();
  },
  initialize: function initialize() {
    this.on(OPEN, function (state, json) {
      return state.open(json);
    });
    this.on(CLOSE, function (state) {
      return state.close();
    });
    this.on(ADD, function (state, json) {
      return state.addFile(json);
    });
    this.on(REMOVE, function (state, id) {
      return state.removeFile(id);
    });
    this.on(UPDATE_STATUS, function (state, json) {
      return state.updateStatus(json);
    });
  }
}));
// CONCATENATED MODULE: ./src/app/flux/fileTransfer/index.js
function fileTransfer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var fileTransfer_STORE_NAME = 'tlpt_files';
function getFileTransfer() {
  return app_reactor["a" /* default */].evaluate([fileTransfer_STORE_NAME]);
}
var fileTransfer_register = function register(reactor) {
  reactor.registerStores(fileTransfer_defineProperty({}, fileTransfer_STORE_NAME, fileTransfer_store));
};
var getters = {
  store: [fileTransfer_STORE_NAME]
};
// CONCATENATED MODULE: ./src/app/flux/index.js
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

















Object(sshHistory_store["b" /* register */])(app_reactor["a" /* default */]);
store_register(app_reactor["a" /* default */]);
fileTransfer_register(app_reactor["a" /* default */]);
app_reactor["a" /* default */].registerStores({
  'tlpt_settings': settings_store,
  'tlpt': appStore,
  'tlpt_terminal': store,
  'tlpt_nodes': nodeStore,
  'tlpt_user': userStore,
  'tlpt_user_invite': userInviteStore,
  'tlpt_user_acl': userAcl_store,
  'tlpt_sites': siteStore,
  'tlpt_status': statusStore["b" /* default */],
  'tlpt_sessions_events': eventStore,
  'tlpt_sessions_archived': archivedSessionStore,
  'tlpt_sessions_active': activeSessionStore,
  'tlpt_sessions_filter': storedSessionFilterStore
});
// CONCATENATED MODULE: ./src/boot.js
/*
Copyright 2018 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/







services_history["a" /* default */].init();
config["a" /* default */].init(window.GRV_CONFIG);

var boot_render = function render(Component) {
  react_dom_default.a.render(react_default.a.createElement(Component, {
    reactor: app_reactor["a" /* default */],
    history: services_history["a" /* default */].original()
  }), document.getElementById('app'));
};

boot_render(app["a" /* default */]);

/***/ }),

/***/ "ryey":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var components_theme = __webpack_require__("K0cP");

// EXTERNAL MODULE: ./node_modules/styled-system/dist/index.esm.js + 1 modules
var index_esm = __webpack_require__("za5s");

// CONCATENATED MODULE: ./src/shared/components/Input/Input.jsx
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  appearance: none;\n  border-radius: 4px;\n  background: ", ";\n  border: ", ";\n  box-sizing: border-box;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, .24);\n  color: ", ";\n  font-family: inherit;\n  font-size: 16px;\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 0 24px 0;\n  outline: none;\n  padding: 0 16px;\n  transition: all .3s;\n  width: 100%;\n\n  ::-ms-clear {\n    display: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var Input = styled_components_browser_esm["c" /* default */].input(_templateObject(), function (props) {
  return props.hasError ? props.theme.background.error : '#FFF';
}, function (props) {
  return props.hasError ? "2px solid ".concat(props.theme.colors.warning) : 'none';
}, components_theme["b" /* colors */].text, function (props) {
  return props.theme.colors.subtle;
}, index_esm["k" /* space */]);
Input.displayName = 'Input';
Input.propTypes = {
  placeholder: prop_types_default.a.string,
  hasError: prop_types_default.a.bool
};
/* harmony default export */ var Input_Input = (Input);
// CONCATENATED MODULE: ./src/shared/components/Input/index.js

/* harmony default export */ var components_Input = (Input_Input);
// EXTERNAL MODULE: ./src/shared/components/Button/index.js + 1 modules
var Button = __webpack_require__("frOc");

// CONCATENATED MODULE: ./src/shared/components/Box/Box.jsx
function Box_templateObject() {
  var data = Box_taggedTemplateLiteral(["\n  ", " ", " ", " ", " ", " ", " ", "\n"]);

  Box_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Box_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var Box = styled_components_browser_esm["c" /* default */].div(Box_templateObject(), index_esm["k" /* space */], index_esm["m" /* width */], index_esm["c" /* color */], index_esm["l" /* textAlign */], index_esm["d" /* flex */], index_esm["b" /* alignSelf */], index_esm["i" /* justifySelf */]);
Box.displayName = 'Box';
Box.defaultProps = {
  theme: components_theme["c" /* default */]
};
var numberStringOrArray = prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string, prop_types_default.a.array]);
Box.propTypes = {
  color: prop_types_default.a.string,
  bg: prop_types_default.a.string,
  width: numberStringOrArray,
  w: numberStringOrArray,
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray,
  p: numberStringOrArray,
  pt: numberStringOrArray,
  pr: numberStringOrArray,
  pb: numberStringOrArray,
  pl: numberStringOrArray,
  px: numberStringOrArray,
  py: numberStringOrArray
};
/* harmony default export */ var Box_Box = (Box);
// CONCATENATED MODULE: ./src/shared/components/Box/index.js

/* harmony default export */ var components_Box = (Box_Box);
// CONCATENATED MODULE: ./src/shared/components/Card/Card.jsx
function Card_templateObject() {
  var data = Card_taggedTemplateLiteral(["\n  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);\n  border-radius: 12px;\n  background-color: ", ";\n  box-sizing: border-box;\n"]);

  Card_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Card_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var Card = Object(styled_components_browser_esm["c" /* default */])(components_Box)(Card_templateObject(), function (props) {
  return props.theme.background.secondary;
});
Card.propTypes = {
  boxShadowSize: prop_types_default.a.oneOf(['sm', 'md', 'lg', 'xl']),
  borderColor: prop_types_default.a.string,
  borderWidth: prop_types_default.a.oneOf([1, 2])
};
Card.defaultProps = {
  theme: components_theme["c" /* default */]
};
Card.displayName = 'Card';
/* harmony default export */ var Card_Card = (Card);
// CONCATENATED MODULE: ./src/shared/components/Card/index.js

/* harmony default export */ var components_Card = (Card_Card);
// CONCATENATED MODULE: ./src/shared/components/Text/Text.jsx
function Text_templateObject() {
  var data = Text_taggedTemplateLiteral(["\n  ", " ", " ", " ", " ", " ", " ", " ", ";\n"]);

  Text_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Text_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var caps = function caps(props) {
  return props.caps ? {
    textTransform: 'uppercase'
  } : null;
};
var regular = function regular(props) {
  return props.regular ? {
    fontWeight: props.theme.regular
  } : null;
};
var bold = function bold(props) {
  return props.bold ? {
    fontWeight: props.theme.bold
  } : null;
};
var italic = function italic(props) {
  return props.italic ? {
    fontStyle: 'italic'
  } : null;
};
var Text = styled_components_browser_esm["c" /* default */].div(Text_templateObject(), italic, index_esm["g" /* fontSize */], index_esm["k" /* space */], index_esm["c" /* color */], caps, regular, bold, index_esm["l" /* textAlign */]);
Text.displayName = 'Text';
var Text_numberStringOrArray = prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string, prop_types_default.a.array]);
Text.propTypes = {
  fontSize: prop_types_default.a.oneOfType([prop_types_default.a.number, prop_types_default.a.string, prop_types_default.a.array]),
  textAlign: prop_types_default.a.oneOf(['left', 'center', 'right', 'justify']),
  caps: prop_types_default.a.bool,
  regular: prop_types_default.a.bool,
  bold: prop_types_default.a.bool,
  italic: prop_types_default.a.bool,
  color: prop_types_default.a.string,

  /** Margin */
  m: Text_numberStringOrArray,
  mt: Text_numberStringOrArray,
  mr: Text_numberStringOrArray,
  mb: Text_numberStringOrArray,
  ml: Text_numberStringOrArray,
  mx: Text_numberStringOrArray,
  my: Text_numberStringOrArray,

  /** Padding */
  p: Text_numberStringOrArray,
  pt: Text_numberStringOrArray,
  pr: Text_numberStringOrArray,
  pb: Text_numberStringOrArray,
  pl: Text_numberStringOrArray,
  px: Text_numberStringOrArray,
  py: Text_numberStringOrArray
};
Text.defaultProps = {
  theme: components_theme["c" /* default */]
};
Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p');
Text.s = Text.withComponent('s');
/* harmony default export */ var Text_Text = (Text);
// CONCATENATED MODULE: ./src/shared/components/Text/index.js

/* harmony default export */ var components_Text = (Text_Text);
// CONCATENATED MODULE: ./src/shared/components/Label/Label.jsx
function Label_templateObject() {
  var data = Label_taggedTemplateLiteral(["\n  color: ", "\n  display: block;\n  font-size: 11px;\n  font-weight: bold;\n  margin: 0 0 8px 0;\n  text-transform: uppercase;\n  width: 100%;\n"]);

  Label_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Label_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var Label = styled_components_browser_esm["c" /* default */].label(Label_templateObject(), function (props) {
  return props.hasError ? props.theme.colors.warning : props.theme.colors.light;
});
Label.propTypes = {
  hasError: prop_types_default.a.bool
};
Label.defaultProps = {
  hasError: false,
  fontSize: 0
};
Label.displayName = 'Label';
/* harmony default export */ var Label_Label = (Label);
// CONCATENATED MODULE: ./src/shared/components/Label/index.js

/* harmony default export */ var components_Label = (Label_Label);
// CONCATENATED MODULE: ./src/shared/components/Heading/Heading.js


var Heading = components_Text.withComponent('h3');
Heading.displayName = 'Heading';
Heading.defaultProps = {
  regular: true,
  fontSize: 4,
  m: 0,
  theme: components_theme["c" /* default */]
};
Heading.h1 = Heading.withComponent('h1');
Heading.h1.defaultProps = {
  bold: true,
  fontSize: 6,
  m: 0
};
Heading.h2 = Heading.withComponent('h2');
Heading.h2.defaultProps = {
  bold: true,
  fontSize: 5,
  m: 0
};
Heading.h3 = Heading.withComponent('h3');
Heading.h3.defaultProps = {
  regular: true,
  fontSize: 4,
  m: 0
};
Heading.h4 = Heading.withComponent('h4');
Heading.h4.defaultProps = {
  regular: true,
  fontSize: 3,
  m: 0
};
Heading.h5 = Heading.withComponent('h5');
Heading.h5.defaultProps = {
  bold: true,
  fontSize: 2,
  m: 0
};
Heading.h6 = Heading.withComponent('h6');
Heading.h6.defaultProps = {
  bold: true,
  caps: true,
  fontSize: 0,
  m: 0
};
/* harmony default export */ var Heading_Heading = (Heading);
// CONCATENATED MODULE: ./src/shared/components/Heading/index.js

/* harmony default export */ var components_Heading = (Heading_Heading);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./src/shared/assets/icomoon/style.css
var style = __webpack_require__("ec++");

// CONCATENATED MODULE: ./src/shared/components/Indicator/Indicator.jsx
function Indicator_templateObject() {
  var data = Indicator_taggedTemplateLiteral(["\n  animation: anim-rotate 2s infinite linear;\n  color: #fff;\n  display: inline-block;\n  font-size:4em;\n  height: 1em;\n  line-height: 1;\n  margin: .5em;\n  text-shadow: 0 0 .25em rgba(255,255,255, .3);\n\n  @keyframes anim-rotate {\n    0% {\n      transform: rotate(0);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n"]);

  Indicator_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Indicator_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var WHEN_TO_DISPLAY = 100; // 0.2s;

var Indicator_Indicator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Indicator, _React$Component);

  function Indicator(props) {
    var _this;

    _classCallCheck(this, Indicator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Indicator).call(this, props));
    _this._timer = null;
    _this.state = {
      canDisplay: false
    };
    return _this;
  }

  _createClass(Indicator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._timer = setTimeout(function () {
        _this2.setState({
          canDisplay: true
        });
      }, WHEN_TO_DISPLAY);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.canDisplay) {
        return null;
      }

      return react_default.a.createElement(StyledSpinner, null);
    }
  }]);

  return Indicator;
}(react_default.a.Component);

var StyledSpinner = styled_components_browser_esm["c" /* default */].div.attrs({
  className: 'icon icon-spinner8'
})(Indicator_templateObject());
/* harmony default export */ var components_Indicator_Indicator = (Indicator_Indicator);
// CONCATENATED MODULE: ./src/shared/components/Indicator/index.js

/* harmony default export */ var components_Indicator = (components_Indicator_Indicator);
// CONCATENATED MODULE: ./src/shared/components/SideNav/SideNav.jsx
function SideNav_templateObject() {
  var data = SideNav_taggedTemplateLiteral(["\n  background: ", ";\n  width: 240px;\n  overflow: auto;\n"]);

  SideNav_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function SideNav_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var SideNav = styled_components_browser_esm["c" /* default */].nav(SideNav_templateObject(), function (props) {
  return props.theme.background.primary;
});
SideNav.displayName = 'SideNav';
SideNav.defaultProps = {
  theme: components_theme["c" /* default */]
};
/* harmony default export */ var SideNav_SideNav = (SideNav);
// CONCATENATED MODULE: ./src/shared/components/SideNav/SideNavItem.jsx
function SideNavItem_templateObject() {
  var data = SideNavItem_taggedTemplateLiteral(["\n  background: ", ";\n  border: none;\n  box-sizing: border-box;\n  color: ", ";\n  cursor: pointer;\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: ", ";\n  margin: 0;\n  outline: none;\n  padding: 0 32px;\n  text-align: left;\n  text-decoration: none;\n  text-transform: uppercase;\n  transition: all .3s;\n  width: 100%;\n  -webkit-font-smoothing: antialiased;\n\n  &:hover {\n    background:  ", ";\n  }\n\n  &:active, &.active {\n    background:  ", ";\n    color: ", ";\n  }\n"]);

  SideNavItem_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function SideNavItem_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var SideNavItem = styled_components_browser_esm["c" /* default */].button(SideNavItem_templateObject(), function (props) {
  return props.active ? props.theme.background.secondary : props.theme.background.primary;
}, function (props) {
  return props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)';
}, function (props) {
  return props.active ? '68px' : '72px';
}, function (props) {
  return props.active ? props.theme.background.secondary : 'rgba(255, 255, 255, .06)';
}, function (props) {
  return props.active ? props.theme.background.secondary : props.theme.background.primary;
}, function (props) {
  return props.theme.colors.light;
});
SideNavItem.displayName = 'SideNavItem';
SideNavItem.defaultProps = {
  theme: components_theme["c" /* default */]
};
/* harmony default export */ var SideNav_SideNavItem = (SideNavItem);
// CONCATENATED MODULE: ./src/shared/components/SideNav/index.js


/* harmony default export */ var components_SideNav = (SideNav_SideNav);

// EXTERNAL MODULE: ./src/shared/components/TopNav/TopNavItem.jsx
var TopNavItem = __webpack_require__("2oKY");

// CONCATENATED MODULE: ./src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx
function TopNavLogo_templateObject() {
  var data = TopNavLogo_taggedTemplateLiteral(["\n  margin: 0 80px 0 0;\n\n  img {\n    display: inline-block;\n    float: left;\n    height: 24px;\n    margin: 24px 8px 24px 16px;\n  }\n\n  em {\n    font-size: 10px;\n    font-weight: bold\n    font-style: normal;\n    margin: 0;\n  }\n"]);

  TopNavLogo_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function TopNavLogo_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var TopNavLogo_TopNavLogo = function TopNavLogo(_ref) {
  var className = _ref.className,
      src = _ref.src,
      version = _ref.version;
  return react_default.a.createElement(StyledLogo, {
    className: className
  }, react_default.a.createElement("img", {
    src: src
  }), react_default.a.createElement("em", null, version));
};

TopNavLogo_TopNavLogo.propTypes = {
  src: prop_types_default.a.string,
  onClick: prop_types_default.a.func,
  title: prop_types_default.a.string
};
TopNavLogo_TopNavLogo.defaultProps = {
  src: '/',
  onClick: function onClick() {},
  title: 'Empty Title'
};
TopNavLogo_TopNavLogo.displayName = 'TopNavLogo';
var StyledLogo = Object(styled_components_browser_esm["c" /* default */])(TopNavItem["a" /* default */])(TopNavLogo_templateObject());
/* harmony default export */ var TopNav_TopNavLogo_TopNavLogo = (TopNavLogo_TopNavLogo);
// CONCATENATED MODULE: ./src/shared/components/TopNav/TopNav.jsx
function TopNav_templateObject() {
  var data = TopNav_taggedTemplateLiteral(["\n  background: ", ";\n  box-shadow: 0 8px 24px rgba(0, 0, 0, .24);\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"]);

  TopNav_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function TopNav_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var TopNav_TopNav = function TopNav(_ref) {
  var logoSrc = _ref.logoSrc,
      version = _ref.version,
      children = _ref.children,
      theme = _ref.theme;
  return react_default.a.createElement(StyledNav, {
    theme: theme
  }, react_default.a.createElement(TopNav_TopNavLogo_TopNavLogo, {
    src: logoSrc,
    version: version
  }), children);
};

TopNav_TopNav.propTypes = {
  /** The version of the product (ex. 5.3.2) */
  version: prop_types_default.a.string
};
TopNav_TopNav.defaultProps = {
  theme: components_theme["c" /* default */]
};
var StyledNav = styled_components_browser_esm["c" /* default */].nav(TopNav_templateObject(), function (props) {
  return props.theme.background.secondary;
});
/* harmony default export */ var components_TopNav_TopNav = (TopNav_TopNav);
// CONCATENATED MODULE: ./src/shared/components/TopNav/index.js


/* harmony default export */ var components_TopNav = (components_TopNav_TopNav);

// CONCATENATED MODULE: ./src/shared/components/Flex/Flex.jsx
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Flex_templateObject() {
  var data = Flex_taggedTemplateLiteral(["\n  display: flex;\n  ", " ", " ", " ", " ", " ", " ", ";\n"]);

  Flex_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Flex_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var Flex = styled_components_browser_esm["c" /* default */].div(Flex_templateObject(), index_esm["k" /* space */], index_esm["m" /* width */], index_esm["c" /* color */], index_esm["a" /* alignItems */], index_esm["h" /* justifyContent */], index_esm["f" /* flexWrap */], index_esm["e" /* flexDirection */]);
Flex.defaultProps = {
  theme: components_theme["c" /* default */]
};
Flex.propTypes = _objectSpread({}, index_esm["j" /* propTypes */].space, index_esm["j" /* propTypes */].width, index_esm["j" /* propTypes */].color, index_esm["j" /* propTypes */].alignItems, index_esm["j" /* propTypes */].justifyContent, index_esm["j" /* propTypes */].flexWrap, index_esm["j" /* propTypes */].flexDirection);
Flex.displayName = 'Flex';
/* harmony default export */ var Flex_Flex = (Flex);
// CONCATENATED MODULE: ./src/shared/components/Flex/index.js

/* harmony default export */ var components_Flex = (Flex_Flex);
// CONCATENATED MODULE: ./src/shared/components/index.js
/* concated harmony reexport Box */__webpack_require__.d(__webpack_exports__, "a", function() { return components_Box; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "b", function() { return Button["a" /* default */]; });
/* concated harmony reexport Card */__webpack_require__.d(__webpack_exports__, "c", function() { return components_Card; });
/* concated harmony reexport Flex */__webpack_require__.d(__webpack_exports__, "d", function() { return components_Flex; });
/* concated harmony reexport Heading */__webpack_require__.d(__webpack_exports__, "e", function() { return components_Heading; });
/* concated harmony reexport Indicator */__webpack_require__.d(__webpack_exports__, "f", function() { return components_Indicator; });
/* concated harmony reexport Input */__webpack_require__.d(__webpack_exports__, "g", function() { return components_Input; });
/* concated harmony reexport Label */__webpack_require__.d(__webpack_exports__, "h", function() { return components_Label; });
/* concated harmony reexport SideNav */__webpack_require__.d(__webpack_exports__, "i", function() { return components_SideNav; });
/* concated harmony reexport SideNavItem */__webpack_require__.d(__webpack_exports__, "j", function() { return SideNav_SideNavItem; });
/* unused concated harmony import Text */
/* concated harmony reexport TopNav */__webpack_require__.d(__webpack_exports__, "k", function() { return components_TopNav; });
/* concated harmony reexport TopNavItem */__webpack_require__.d(__webpack_exports__, "l", function() { return TopNavItem["a" /* default */]; });













/***/ }),

/***/ "s1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// CONCATENATED MODULE: ./src/shared/components/ThemeProvider/globals.js
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  html {\n    font-family: ", ";\n    font-weight: 400;\n  }\n\n  body {\n    margin: 0;\n    background-color: ", ";\n    color: ", ";\n  }\n\n  article,\n  aside,\n  details,\n  figcaption,\n  figure,\n  footer,\n  header,\n  main,\n  menu,\n  nav,\n  section,\n  summary {\n    display: block;\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var GlobalStyle = Object(styled_components_browser_esm["b" /* createGlobalStyle */])(_templateObject(), function (props) {
  return props.theme.font;
}, function (props) {
  return props.theme.background.primary;
}, function (props) {
  return props.theme.colors.light;
});

// EXTERNAL MODULE: ./src/shared/components/theme.js + 1 modules
var theme = __webpack_require__("K0cP");

// CONCATENATED MODULE: ./src/shared/components/ThemeProvider/index.js





var ThemeProvider_ThemeProvider = function ThemeProvider(props) {
  return react_default.a.createElement(styled_components_browser_esm["a" /* ThemeProvider */], {
    theme: props.theme || theme["c" /* default */]
  }, react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(GlobalStyle, null), props.children));
};

/* harmony default export */ var components_ThemeProvider = __webpack_exports__["a"] = (ThemeProvider_ThemeProvider);

/***/ }),

/***/ "tGXY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var START = 'TLPT_STATUS_START';
var SUCCESS = 'TLPT_STATUS_SUCCESS';
var FAIL = 'TLPT_STATUS_FAIL';
var CLEAR = 'TLPT_STATUS_CLEAR';

/***/ }),

/***/ "tq85":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DocumentTitle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return withDocTitle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var DocumentTitle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DocumentTitle, _React$Component);

  function DocumentTitle() {
    _classCallCheck(this, DocumentTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(DocumentTitle).apply(this, arguments));
  }

  _createClass(DocumentTitle, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.title !== this.props.title) {
        this.setTitle(this.props.title);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTitle(this.props.title);
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return document.title;
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      document.title = title;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return DocumentTitle;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var withDocTitle = function withDocTitle(title, component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(WithWindowTitle, _React$Component2);

    function WithWindowTitle() {
      _classCallCheck(this, WithWindowTitle);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithWindowTitle).apply(this, arguments));
    }

    _createClass(WithWindowTitle, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setTitle(title);
      }
    }, {
      key: "setTitle",
      value: function setTitle(title) {
        document.title = title;
      }
    }, {
      key: "render",
      value: function render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(component, _objectSpread({}, this.props));
      }
    }]);

    return WithWindowTitle;
  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component), _defineProperty(_class, "displayName", "withDocTitleWrapper"), _temp;
};

/***/ }),

/***/ "xSHT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("L7e8");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var CSS = 'color: blue'; // reactor options

var options = {
  debug: "production" === 'development'
};
var logger = {
  dispatchStart: function dispatchStart(reactorState, actionType, payload) {
    window.console.log("%creactor.dispatch(\"".concat(actionType, "\", "), CSS, payload, ")");
  },
  dispatchError: function dispatchError(reactorState, error) {
    window.console.debug('Dispatch error: ' + error);
  },
  dispatchEnd: function dispatchEnd(reactorState, state, dirtyStores) {
    var stateChanges = state.filter(function (val, key) {
      return dirtyStores.contains(key);
    });
    window.console.log('%cupdated store -> ', CSS, stateChanges.toJS());
  }
};

if (options.debug) {
  options.logger = logger;
}

var reactor = new nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Reactor"](options);
window.reactor = reactor;
/* harmony default export */ __webpack_exports__["a"] = (reactor);

/***/ }),

/***/ "yaYm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bpk+");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cIpc");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LMli");
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/



var _inst = null;
var history = {
  original: function original() {
    return _inst;
  },
  init: function init(history) {
    _inst = history || history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default()();
  },
  push: function push(route) {
    var withRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    route = this.ensureSafeRoute(route);

    if (withRefresh) {
      this._pageRefresh(route);
    } else {
      _inst.push(route);
    }
  },
  goBack: function goBack(number) {
    this.original().goBack(number);
  },
  goToLogin: function goToLogin(rememberLocation) {
    var url = app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].routes.login;

    if (rememberLocation) {
      var redirectUrl = _inst.createHref(_inst.location);

      redirectUrl = this.ensureSafeRoute(redirectUrl);
      redirectUrl = this.ensureBaseUrl(redirectUrl);
      url = "".concat(url, "?redirect_uri=").concat(redirectUrl);
    }

    this._pageRefresh(url);
  },
  getRedirectParam: function getRedirectParam() {
    var loc = this.original().location;

    if (loc.query && loc.query.redirect_uri) {
      return loc.query.redirect_uri;
    }

    return '';
  },
  ensureSafeRoute: function ensureSafeRoute(url) {
    url = this._canPush(url) ? url : app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].routes.app;
    return url;
  },
  ensureBaseUrl: function ensureBaseUrl(url) {
    url = url || '';

    if (url.indexOf(app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].baseUrl) !== 0) {
      url = app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].baseUrl + url;
    }

    return url;
  },
  getRoutes: function getRoutes() {
    return Object.getOwnPropertyNames(app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].routes).map(function (p) {
      return app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].routes[p];
    });
  },
  _canPush: function _canPush(route) {
    route = route || '';
    var routes = this.getRoutes();

    if (route.indexOf(app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].baseUrl) === 0) {
      route = route.replace(app_config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].baseUrl, '');
    }

    return routes.some(match(route));
  },
  _pageRefresh: function _pageRefresh(route) {
    window.location.href = this.ensureBaseUrl(route);
  }
};

var match = function match(url) {
  return function (route) {
    var _matchPattern = Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_1__[/* matchPattern */ "b"])(route, url),
        remainingPathname = _matchPattern.remainingPathname;

    return remainingPathname !== null && remainingPathname.length === 0;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (history);

/***/ }),

/***/ "zMbK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RECEIVE_ACTIVE_SESSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RECEIVE_SITE_EVENTS; });
/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var RECEIVE_ACTIVE_SESSIONS = 'TLPT_SESSIONS_RECEIVE_ACTIVE';
var RECEIVE_SITE_EVENTS = 'TLPT_SESSIONS_RECEIVE_EVENTS';

/***/ })

/******/ });