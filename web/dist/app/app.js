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
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
<<<<<<< Updated upstream
/******/ 	var hotCurrentHash = "c6a8cd8ffec5b460fa4e";
=======
/******/ 	var hotCurrentHash = "6f3b07e9027f00dfff98";
>>>>>>> Stashed changes
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
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
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
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
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/app/components/App/App.jsx":
/*!****************************************!*\
  !*** ./src/app/components/App/App.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppBar */ "./src/app/components/App/AppBar/index.js");
/* harmony import */ var app_flux_app_getters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/flux/app/getters */ "./src/app/flux/app/getters.js");
/* harmony import */ var _msgPage_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../msgPage.jsx */ "./src/app/components/msgPage.jsx");
/* harmony import */ var app_flux_app_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/flux/app/actions */ "./src/app/flux/app/actions.js");
/* harmony import */ var shared_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/components */ "./src/shared/components/index.js");
/* harmony import */ var _withAuth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../withAuth */ "./src/app/components/withAuth.jsx");
/* harmony import */ var _featureActivator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../featureActivator */ "./src/app/featureActivator.js");
/* harmony import */ var _Clusters__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../Clusters */ "./src/app/components/Clusters/index.js");
/* harmony import */ var _Cluster__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../Cluster */ "./src/app/components/Cluster/index.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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















var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var featureActivator = new _featureActivator__WEBPACK_IMPORTED_MODULE_10__["default"]();
      Object(app_flux_app_actions__WEBPACK_IMPORTED_MODULE_7__["initApp"])("", featureActivator);
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
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_8__["Indicator"], null);
      }

      if (isFailed) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_msgPage_jsx__WEBPACK_IMPORTED_MODULE_6__["Failed"], {
          message: message
        });
      }

      if (!isSuccess) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledApp, {
        flexDirection: "column"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_8__["Box"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppBar__WEBPACK_IMPORTED_MODULE_4__["default"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: app_config__WEBPACK_IMPORTED_MODULE_13__["default"].routes.app,
        component: _Clusters__WEBPACK_IMPORTED_MODULE_11__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: app_config__WEBPACK_IMPORTED_MODULE_13__["default"].routes.cluster,
        render: function render(_ref) {
          var match = _ref.match;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Cluster__WEBPACK_IMPORTED_MODULE_12__["default"], {
            path: match.path,
            clusterId: match.params.clusterId
          });
        }
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps() {
  return {
    initAttempt: app_flux_app_getters__WEBPACK_IMPORTED_MODULE_5__["default"].initAttempt
  };
}

var _default = Object(_withAuth__WEBPACK_IMPORTED_MODULE_9__["default"])(Object(_nuclear__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(App));

/* harmony default export */ __webpack_exports__["default"] = (_default);
var StyledApp = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "App__StyledApp",
  componentId: "sc-5lf6k4-0"
})(["position:fixed;height:100%;width:100%;display:flex;flex-direction:column;"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/App.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/App.jsx");
  reactHotLoader.register(StyledApp, "StyledApp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/App.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/App.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/App/AppBar/AppBar.jsx":
/*!**************************************************!*\
  !*** ./src/app/components/App/AppBar/AppBar.jsx ***!
  \**************************************************/
/*! exports provided: AppBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBar", function() { return AppBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_flux_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/flux/user */ "./src/app/flux/user/index.js");
/* harmony import */ var app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/flux/user/actions */ "./src/app/flux/user/actions.js");
/* harmony import */ var shared_components_TopNav_TopNavUserMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shared/components/TopNav/TopNavUserMenu */ "./src/shared/components/TopNav/TopNavUserMenu/index.js");
/* harmony import */ var shared_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shared/components */ "./src/shared/components/index.js");
/* harmony import */ var app_shared_assets_images_teleport_logo_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/../shared/assets/images/teleport-logo.svg */ "./src/shared/assets/images/teleport-logo.svg");
/* harmony import */ var app_shared_assets_images_teleport_logo_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(app_shared_assets_images_teleport_logo_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var shared_components_Menu_MenuItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! shared/components/Menu/MenuItem */ "./src/shared/components/Menu/MenuItem.jsx");
/* harmony import */ var shared_components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/components/Button */ "./src/shared/components/Button/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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










var AppBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppBar, _React$Component);

  function AppBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AppBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AppBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onShowMenu", function () {
      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCloseMenu", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onItemClick", function () {
      _this.onClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogout", function () {
      _this.props.onLogout();

      _this.onClose();
    });

    return _this;
  }

  _createClass(AppBar, [{
    key: "render",
    value: function render() {
      var username = this.props.username;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_5__["TopNav"], {
        logoSrc: app_shared_assets_images_teleport_logo_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
        version: "v3.2.1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_TopNav_TopNavUserMenu__WEBPACK_IMPORTED_MODULE_4__["default"], {
        open: this.state.open,
        onShow: this.onShowMenu,
        onClose: this.onCloseMenu,
        user: username
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Menu_MenuItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onClick: this.onLogout
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
        size: "small"
      }, "Logout"))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AppBar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStoreToProps() {
  return {
    username: app_flux_user__WEBPACK_IMPORTED_MODULE_2__["getters"].userName
  };
}

function mapActionsToProps() {
  return {
    onLogout: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__["logout"]
  };
}

var _default = Object(_nuclear__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStoreToProps, mapActionsToProps)(AppBar);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppBar, "AppBar", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/AppBar/AppBar.jsx");
  reactHotLoader.register(mapStoreToProps, "mapStoreToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/AppBar/AppBar.jsx");
  reactHotLoader.register(mapActionsToProps, "mapActionsToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/AppBar/AppBar.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/AppBar/AppBar.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/App/AppBar/index.js":
/*!************************************************!*\
  !*** ./src/app/components/App/AppBar/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar */ "./src/app/components/App/AppBar/AppBar.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _AppBar__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/AppBar/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/App/index.js":
/*!*****************************************!*\
  !*** ./src/app/components/App/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/app/components/App/App.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _App__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/App/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Cluster/Cluster.jsx":
/*!************************************************!*\
  !*** ./src/app/components/Cluster/Cluster.jsx ***!
  \************************************************/
/*! exports provided: Cluster, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return Cluster; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_flux_sites_getters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/flux/sites/getters */ "./src/app/flux/sites/getters.js");
/* harmony import */ var shared_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shared/components */ "./src/shared/components/index.js");
/* harmony import */ var _ClusterNodes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../ClusterNodes */ "./src/app/components/ClusterNodes/index.js");
/* harmony import */ var _ClusterSelector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ClusterSelector */ "./src/app/components/Cluster/ClusterSelector/index.js");
/* harmony import */ var app_flux_sites_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/flux/sites/actions */ "./src/app/flux/sites/actions.js");
/* harmony import */ var shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/components/Icon/Icon */ "./src/shared/components/Icon/Icon.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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










var Cluster =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Cluster, _React$Component);

  function Cluster() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Cluster);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Cluster)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeCluster", function (option) {
      _this.props.onChangeCluster(option.value);
    });

    return _this;
  }

  _createClass(Cluster, [{
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_5__["Box"], {
        style: {
          height: "100%",
          paddingLeft: "260px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_5__["SideNav"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_5__["SideNavItem"], {
        as: function as(props) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
            className: props.className,
            exact: true,
            to: app_config__WEBPACK_IMPORTED_MODULE_3__["default"].getClusterUrl(clusterId)
          }, "Nodes");
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_5__["SideNavItem"], {
        as: function as(props) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
            className: props.className,
            to: app_config__WEBPACK_IMPORTED_MODULE_3__["default"].getClusterSessionsUrl(clusterId)
          }, "Sessions");
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ClusterSelector__WEBPACK_IMPORTED_MODULE_7__["default"], {
        value: clusterId,
        onChange: this.onChangeCluster,
        options: clusterOptions
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        exact: true,
        path: app_config__WEBPACK_IMPORTED_MODULE_3__["default"].routes.cluster
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ClusterNodes__WEBPACK_IMPORTED_MODULE_6__["default"], {
        clusterId: clusterId
      }))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Cluster;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStoreToProps() {
  return {
    clusters: app_flux_sites_getters__WEBPACK_IMPORTED_MODULE_4__["default"].sites
  };
}

function mapStateToProps() {
  return {
    onChangeCluster: app_flux_sites_actions__WEBPACK_IMPORTED_MODULE_8__["changeCluster"]
  };
}

var _default = Object(_nuclear__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStoreToProps, mapStateToProps)(Cluster);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Cluster, "Cluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/Cluster.jsx");
  reactHotLoader.register(mapStoreToProps, "mapStoreToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/Cluster.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/Cluster.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/Cluster.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx":
/*!************************************************************************!*\
  !*** ./src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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



var ClusterSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClusterSelector, _React$Component);

  function ClusterSelector() {
    _classCallCheck(this, ClusterSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClusterSelector).apply(this, arguments));
  }

  _createClass(ClusterSelector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options,
          onChange = _this$props.onChange;
      var selected = options.find(function (o) {
        return o.value === value;
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], {
        styles: customStyles,
        value: selected,
        onChange: onChange,
        options: options
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ClusterSelector;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var customStyles = {
  option: function option(provided, state) {
    return _objectSpread({}, provided, {
      color: state.isSelected ? 'red' : 'blue'
    });
  },
<<<<<<< Updated upstream
  container: function container(provided) {
=======
  container: function container(provided, state) {
>>>>>>> Stashed changes
    return _objectSpread({}, provided, {
      height: '24px',
      lineHeight: '24px',
      width: '200px'
    });
  },
  singleValue: function singleValue(provided, state) {
    var opacity = state.isDisabled ? 0.5 : 1;
    var transition = 'opacity 300ms';
    return _objectSpread({}, provided, {
      opacity: opacity,
      transition: transition
    });
  }
};
var _default = ClusterSelector;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ClusterSelector, "ClusterSelector", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx");
  reactHotLoader.register(customStyles, "customStyles", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Cluster/ClusterSelector/index.js":
/*!*************************************************************!*\
  !*** ./src/app/components/Cluster/ClusterSelector/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _ClusterSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClusterSelector */ "./src/app/components/Cluster/ClusterSelector/ClusterSelector.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _ClusterSelector__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/ClusterSelector/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Cluster/index.js":
/*!*********************************************!*\
  !*** ./src/app/components/Cluster/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Cluster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cluster */ "./src/app/components/Cluster/Cluster.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Cluster__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Cluster/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/ClusterNodes/ClusterNodes.jsx":
/*!**********************************************************!*\
  !*** ./src/app/components/ClusterNodes/ClusterNodes.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_flux_userAcl_getters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/flux/userAcl/getters */ "./src/app/flux/userAcl/getters.js");
/* harmony import */ var app_flux_nodes_getters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/flux/nodes/getters */ "./src/app/flux/nodes/getters.js");
/* harmony import */ var app_flux_sshHistory_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/flux/sshHistory/store */ "./src/app/flux/sshHistory/store.js");
/* harmony import */ var _NodeList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NodeList */ "./src/app/components/ClusterNodes/NodeList/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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







var ClusterNodes = function ClusterNodes(_ref) {
  var nodes = _ref.nodes,
      sshHistory = _ref.sshHistory,
      aclStore = _ref.aclStore,
      sites = _ref.sites,
      siteId = _ref.siteId,
      storage = _ref.storage;
  var logins = aclStore.getSshLogins().toJS();
  var nodeRecords = nodes.toJS();
<<<<<<< Updated upstream
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NodeList__WEBPACK_IMPORTED_MODULE_5__["default"], {
=======
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NodeList__WEBPACK_IMPORTED_MODULE_6__["default"], {
>>>>>>> Stashed changes
    sshHistory: sshHistory,
    storage: storage,
    siteId: siteId,
    sites: sites,
    nodeRecords: nodeRecords,
    logins: logins
  });
};

function mapStoreToProps(props) {
  var clusterId = props.clusterId;
  return {
    nodes: app_flux_nodes_getters__WEBPACK_IMPORTED_MODULE_3__["default"].nodesByCluster(clusterId),
    aclStore: app_flux_userAcl_getters__WEBPACK_IMPORTED_MODULE_2__["default"].userAcl,
    sshHistory: app_flux_sshHistory_store__WEBPACK_IMPORTED_MODULE_4__["getters"].store
  };
}

var _default = Object(_nuclear__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStoreToProps)(ClusterNodes);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ClusterNodes, "ClusterNodes", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/ClusterNodes.jsx");
  reactHotLoader.register(mapStoreToProps, "mapStoreToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/ClusterNodes.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/ClusterNodes.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/ClusterNodes/NodeList/NodeList.jsx":
/*!***************************************************************!*\
  !*** ./src/app/components/ClusterNodes/NodeList/NodeList.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_lib_objectUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/lib/objectUtils */ "./src/app/lib/objectUtils.js");
/* harmony import */ var shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shared/components/DataTable */ "./src/shared/components/DataTable/index.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_services_history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/services/history */ "./src/app/services/history.js");
/* harmony import */ var _InputSearch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../InputSearch */ "./src/app/components/InputSearch/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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










var EmptyValue = function EmptyValue(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Empty' : _ref$text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "text-muted"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, text));
};

var TagCell = function TagCell(_ref2) {
  var rowIndex = _ref2.rowIndex,
      data = _ref2.data,
      props = _objectWithoutProperties(_ref2, ["rowIndex", "data"]);

  var tags = data[rowIndex].tags;
  var $content = tags.map(function (item, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: index,
      title: "".concat(item.name, ":").concat(item.value),
      className: "label label-default grv-nodes-table-label"
    }, item.name, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "fa fa-long-arrow-right m-r-xs"
    }), item.value);
  });

  if ($content.length === 0) {
    $content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EmptyValue, {
      text: "No assigned labels"
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Cell"], props, $content);
};

var LoginCell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginCell, _React$Component);

  function LoginCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyPress", function (e) {
      if (e.key === 'Enter' && e.target.value) {
        var url = _this.makeUrl(e.target.value);

        app_services_history__WEBPACK_IMPORTED_MODULE_7__["default"].push(url);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onShowLoginsClick", function () {
      _this.refs.customLogin.focus();
    });

    return _this;
  }

  _createClass(LoginCell, [{
    key: "makeUrl",
    value: function makeUrl(login) {
      var _this$props = this.props,
          data = _this$props.data,
          rowIndex = _this$props.rowIndex;
      var _data$rowIndex = data[rowIndex],
          siteId = _data$rowIndex.siteId,
          id = _data$rowIndex.id;
      return app_config__WEBPACK_IMPORTED_MODULE_6__["default"].getTerminalLoginUrl({
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
          props = _objectWithoutProperties(_this$props2, ["logins"]);

      var $lis = [];
      var defaultLogin = logins[0] || '';
      var defaultTermUrl = this.makeUrl(defaultLogin);

      for (var i = 0; i < logins.length; i++) {
        var termUrl = this.makeUrl(logins[i]);
        $lis.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: i
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
          to: termUrl
        }, logins[i])));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Cell"], props, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: "flex"
        }
      }, logins.length === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EmptyValue, {
        text: "No assigned logins"
      }), logins.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: "flex"
        },
        className: "btn-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
        to: defaultTermUrl
      }, defaultLogin), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        "data-toggle": "dropdown",
        onClick: this.onShowLoginsClick,
        className: "btn btn-default btn-xs dropdown-toggle"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "caret"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "dropdown-menu pull-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input-group-sm grv-nodes-custom-login"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "form-control",
        ref: "customLogin",
        placeholder: "Enter login name...",
        onKeyPress: this.onKeyPress
      }))), $lis))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return LoginCell;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var NodeList =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(NodeList, _React$Component2);

  function NodeList(props) {
    var _this2;

    _classCallCheck(this, NodeList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(NodeList).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "storageKey", 'NodeList');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "searchableProps", ['addr', 'hostname', 'tags']);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onSortChange", function (columnKey, sortDir) {
      _this2.state.colSortDirs = _defineProperty({}, columnKey, sortDir);

      _this2.setState(_this2.state);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onFilterChange", function (value) {
      _this2.state.filter = value;

      _this2.setState(_this2.state);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onSshInputEnter", function (login, host) {
      var url = app_config__WEBPACK_IMPORTED_MODULE_6__["default"].getTerminalLoginUrl({
        siteId: _this2.props.siteId,
        serverId: host,
        login: login
      });
      app_services_history__WEBPACK_IMPORTED_MODULE_7__["default"].push(url);
    });

    if (props.storage) {
      _this2.state = props.storage.findByKey(_this2.storageKey);
    }

    if (!_this2.state) {
      _this2.state = {
        filter: '',
        colSortDirs: {
          hostname: shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["SortTypes"].DESC
        }
      };
    }

    return _this2;
  }

  _createClass(NodeList, [{
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
        return Object(app_lib_objectUtils__WEBPACK_IMPORTED_MODULE_4__["isMatch"])(obj, _this3.state.filter, {
          searchableProps: _this3.searchableProps,
          cb: _this3.searchAndFilterCb
        });
      });
      var columnKey = Object.getOwnPropertyNames(colSortDirs)[0];
      var sortDir = colSortDirs[columnKey];
      var sorted = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["sortBy"])(filtered, columnKey);

      if (sortDir === shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["SortTypes"].ASC) {
        sorted = sorted.reverse();
      }

      return sorted;
    }
  }, {
    key: "renderPageHeader",
    value: function renderPageHeader() {
      var searchValue = this.state.filter;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PageHeader, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Nodes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InputSearch__WEBPACK_IMPORTED_MODULE_8__["default"], {
        value: searchValue,
        onChange: this.onFilterChange
      }));
    }
  }, {
    key: "renderEmptyIndicator",
    value: function renderEmptyIndicator() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["EmptyIndicator"], {
        title: "No Results Found for \"".concat(this.state.filter, "\"")
      }, "For tips on getting better search results, please read ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://gravitational.com/teleport/docs"
      }, "our documentation"));
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this$props3 = this.props,
          nodeRecords = _this$props3.nodeRecords,
          logins = _this$props3.logins,
          onLoginClick = _this$props3.onLoginClick;
      var data = this.sortAndFilter(nodeRecords);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Table"], {
        rowCount: data.length,
        data: data
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Column"], {
        columnKey: "hostname",
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["SortHeaderCell"], {
          sortDir: this.state.colSortDirs.hostname,
          onSortChange: this.onSortChange,
          title: "Hostname"
        }),
        cell: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["TextCell"], null)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Column"], {
        columnKey: "addr",
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["SortHeaderCell"], {
          sortDir: this.state.colSortDirs.addr,
          onSortChange: this.onSortChange,
          title: "Address"
        }),
        cell: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["TextCell"], null)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Column"], {
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, "Labels"),
        cell: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TagCell, null)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Column"], {
        onLoginClick: onLoginClick,
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_DataTable__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, "Login as"),
        cell: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoginCell, {
          logins: logins
        })
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var nodeRecords = this.props.nodeRecords;
      var data = this.sortAndFilter(nodeRecords);
      var table = this.renderTable(); // no results found

      if (data.length === 0 && this.state.filter.length > 0) {
        table = this.renderEmptyIndicator();
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.renderPageHeader(), table);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return NodeList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var PageHeader = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].header.withConfig({
  displayName: "NodeList__PageHeader",
  componentId: "sc-17omfyh-0"
})(["height:40px;margin:40px 0;&::after{content:\"\";clear:both;display:table;}h1{font-size:36px;font-weight:300;float:left;line-height:40px;margin:0 40px 0 0;}"]);
var _default = NodeList;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(EmptyValue, "EmptyValue", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(TagCell, "TagCell", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(LoginCell, "LoginCell", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(NodeList, "NodeList", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(PageHeader, "PageHeader", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(_default, "default", "/Users/admin/Development/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
=======
  reactHotLoader.register(EmptyValue, "EmptyValue", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(TagCell, "TagCell", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(LoginCell, "LoginCell", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(NodeList, "NodeList", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(PageHeader, "PageHeader", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/NodeList.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/ClusterNodes/NodeList/index.js":
/*!***********************************************************!*\
  !*** ./src/app/components/ClusterNodes/NodeList/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _NodeList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeList */ "./src/app/components/ClusterNodes/NodeList/NodeList.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _NodeList__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/NodeList/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/ClusterNodes/index.js":
/*!**************************************************!*\
  !*** ./src/app/components/ClusterNodes/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _ClusterNodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClusterNodes */ "./src/app/components/ClusterNodes/ClusterNodes.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _ClusterNodes__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/ClusterNodes/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Clusters/CardCluster/CardCluster.jsx":
/*!*****************************************************************!*\
  !*** ./src/app/components/Clusters/CardCluster/CardCluster.jsx ***!
  \*****************************************************************/
/*! exports provided: CardCluster, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardCluster", function() { return CardCluster; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var shared_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shared/components */ "./src/shared/components/index.js");
/* harmony import */ var shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shared/components/Icon/Icon */ "./src/shared/components/Icon/Icon.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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




var CardCluster =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardCluster, _React$Component);

  function CardCluster() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CardCluster);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CardCluster)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {
      _this.props.onClick(_this.props.name);
    });

    return _this;
  }

  _createClass(CardCluster, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          status = _this$props.status,
          connectedAt = _this$props.connectedAt,
          rest = _objectWithoutProperties(_this$props, ["name", "status", "connectedAt"]);

      var public_addr = public_addr || 'wolfe.gravitational.com';
      var version = version || '#.#.#';

      var props = _objectSpread({
        p: 4
      }, rest, {
        onClick: this.onClick
      });

      var lastSeen = null;

      if (status !== 'online') {
        lastSeen = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "LAST SEEN: ", connectedAt);
      }

<<<<<<< Updated upstream
=======
      console.log(this.props);
>>>>>>> Stashed changes
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledCardCluster, props, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterHeader, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterStatus, {
        status: status
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, " NODES"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterSettings, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_3__["Ellipsis"], null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterContent, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterIcon, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_3__["Cluster"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "STATUS: ", status)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, public_addr), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Teleport v", version))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ClusterFooter, null, lastSeen));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return CardCluster;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var StyledCardCluster = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(shared_components__WEBPACK_IMPORTED_MODULE_2__["Box"]).withConfig({
  displayName: "CardCluster__StyledCardCluster",
  componentId: "i6q3if-0"
})(["background:", ";border-radius:4px;box-shadow:0 8px 32px rgba(0,0,0,.24);cursor:pointer;width:408px;padding:0;transition:all .3s;&:hover{box-shadow:0 24px 64px rgba(0,0,0,.56);}"], function (props) {
  return props.theme.background.secondary;
});
var ClusterHeader = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].header.withConfig({
  displayName: "CardCluster__ClusterHeader",
  componentId: "i6q3if-1"
})(["background:", ";border-radius:4px 4px 0 0;padding:16px 16px 8px 40px;position:relative;transition:all .3s;h2{font-size:12px;line-height:16px;margin:0;text-transform:uppercase;}h3{font-size:10px;line-height:16px;margin:0;opacity:.56;text-transform:uppercase;}"], function (props) {
  return props.theme.background.tertiary;
});
var ClusterStatus = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "CardCluster__ClusterStatus",
  componentId: "i6q3if-2"
})(["background:", ";box-shadow:0 2px 16px ", ";border-radius:200px;border:1px solid ", ";height:8px;left:16px;position:absolute;top:24px;width:8px;z-index:1;"], function (props) {
  return props.status !== "online" ? props.theme.colors.error : props.theme.colors.success;
}, function (props) {
  return props.status !== "online" ? props.theme.colors.error : props.theme.colors.success;
}, function (props) {
  return props.theme.background.tertiary;
});
var ClusterSettings = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "CardCluster__ClusterSettings",
  componentId: "i6q3if-3"
})(["opacity:.24;right:16px;position:absolute;top:16px;z-index:2;"]);
var ClusterIcon = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "CardCluster__ClusterIcon",
  componentId: "i6q3if-4"
})(["background:", ";border-radius:4px;box-sizing:border-box;float:left;height:72px;margin:0 16px 0 0;padding:16px;text-align:center;width:72px;.icon{font-size:40px;display:block;line-height:40px;margin:0 auto;}"], function (props) {
  return props.theme.background.quaternary;
});
var ClusterContent = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "CardCluster__ClusterContent",
  componentId: "i6q3if-5"
})(["border-radius:4px;padding:40px;ul{font-size:12px;list-style-type:none;margin:0;padding:0;li{color:", ";line-height:24px;margin:0;}strong{font-weight:bold;color:", ";text-transform:uppercase;}}"], function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.light;
});
var ClusterFooter = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].footer.withConfig({
  displayName: "CardCluster__ClusterFooter",
  componentId: "i6q3if-6"
})(["background:", ";box-sizing:border-box;border-radius:0 0 4px 4px;clear:both;font-size:12px;height:48px;line-height:48px;opacity:.56;margin:0;padding:0 16px;"], function (props) {
  return props.theme.background.quaternary;
});
var _default = CardCluster;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(CardCluster, "CardCluster", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(StyledCardCluster, "StyledCardCluster", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterHeader, "ClusterHeader", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterStatus, "ClusterStatus", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterSettings, "ClusterSettings", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterIcon, "ClusterIcon", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterContent, "ClusterContent", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterFooter, "ClusterFooter", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(_default, "default", "/Users/admin/Development/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
=======
  reactHotLoader.register(CardCluster, "CardCluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(StyledCardCluster, "StyledCardCluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterHeader, "ClusterHeader", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterStatus, "ClusterStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterSettings, "ClusterSettings", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterIcon, "ClusterIcon", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterContent, "ClusterContent", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(ClusterFooter, "ClusterFooter", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/CardCluster.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Clusters/CardCluster/index.js":
/*!**********************************************************!*\
  !*** ./src/app/components/Clusters/CardCluster/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _CardCluster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardCluster */ "./src/app/components/Clusters/CardCluster/CardCluster.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _CardCluster__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/CardCluster/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Clusters/Clusters.jsx":
/*!**************************************************!*\
  !*** ./src/app/components/Clusters/Clusters.jsx ***!
  \**************************************************/
/*! exports provided: Clusters, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clusters", function() { return Clusters; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_flux_sites_getters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/flux/sites/getters */ "./src/app/flux/sites/getters.js");
/* harmony import */ var shared_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shared/components */ "./src/shared/components/index.js");
/* harmony import */ var _CardCluster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardCluster */ "./src/app/components/Clusters/CardCluster/index.js");
/* harmony import */ var app_flux_sites_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/flux/sites/actions */ "./src/app/flux/sites/actions.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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






var Clusters =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Clusters, _React$Component);

  function Clusters() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clusters);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clusters)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectCluster", function (clusterId) {
      _this.props.onSelectCluster(clusterId);
    });

    return _this;
  }

  _createClass(Clusters, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var clusters = this.props.clusters;
      var $clusters = clusters.map(function (cluster, index) {
        var name = cluster.name,
            connectedAt = cluster.connectedAt,
            status = cluster.status;
        var key = "".concat(name, "-").concat(index);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CardCluster__WEBPACK_IMPORTED_MODULE_4__["default"], {
          m: 2,
          key: key,
          onClick: _this2.onSelectCluster,
          name: name,
          connectedAt: connectedAt,
          status: status
        });
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_3__["Flex"], {
        style: {
          overflow: "auto"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_3__["Box"], {
        m: 4
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_3__["Heading"].h2, null, "Clusters"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components__WEBPACK_IMPORTED_MODULE_3__["Flex"], {
        flexWrap: "wrap"
      }, $clusters)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Clusters;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStoreToProps() {
  return {
    clusters: app_flux_sites_getters__WEBPACK_IMPORTED_MODULE_2__["default"].sites
  };
}

function mapActionsToProps() {
  return {
    onSelectCluster: app_flux_sites_actions__WEBPACK_IMPORTED_MODULE_5__["showCluster"]
  };
}

var _default = Object(_nuclear__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStoreToProps, mapActionsToProps)(Clusters);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Clusters, "Clusters", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/Clusters.jsx");
  reactHotLoader.register(mapStoreToProps, "mapStoreToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/Clusters.jsx");
  reactHotLoader.register(mapActionsToProps, "mapActionsToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/Clusters.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/Clusters.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Clusters/index.js":
/*!**********************************************!*\
  !*** ./src/app/components/Clusters/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Clusters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clusters */ "./src/app/components/Clusters/Clusters.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Clusters__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Clusters/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/InputSearch/InputSearch.jsx":
/*!********************************************************!*\
  !*** ./src/app/components/InputSearch/InputSearch.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shared/components/Icon/Icon */ "./src/shared/components/Icon/Icon.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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






var InputSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputSearch, _React$Component);

  function InputSearch(props) {
    var _this;

    _classCallCheck(this, InputSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputSearch).call(this, props));

<<<<<<< Updated upstream
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onBlur", function () {
      _this.setState({
        isFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onFocus", function () {
      _this.setState({
        isFocused: true
      });
=======
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onBlur", function (e) {
      _this.setState({
        isFocused: false
      });

      console.log('blur');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onFocus", function (e) {
      _this.setState({
        isFocused: true
      });

      console.log('focus');
>>>>>>> Stashed changes
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (e) {
      _this.setState({
        value: e.target.value
      });

      _this.debouncedNotify();
    });

    _this.debouncedNotify = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["debounce"])(function () {
      _this.props.onChange(_this.state.value);
    }, 200);
    var value = props.value || '';
    _this.state = {
      value: value,
      isFocused: false
    };
    return _this;
  }

  _createClass(InputSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // set cursor
      var $el = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);

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
      var _this$props$autoFocus = this.props.autoFocus,
          autoFocus = _this$props$autoFocus === void 0 ? false : _this$props$autoFocus;
      var isFocused = this.state.isFocused ? 'is-active' : '';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchField, {
        className: isFocused
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Icon_Icon__WEBPACK_IMPORTED_MODULE_4__["Magnifier"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        placeholder: "Search...",
        className: "form-control",
        autoFocus: autoFocus,
        value: this.state.value,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return InputSearch;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var SearchField = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "InputSearch__SearchField",
  componentId: "sc-350p2x-0"
})(["float:left;height:40px;margin:0;position:relative;&.is-active{.icon{color:", ";}}.icon{font-size:20px;left:12px;opacity:.24;position:absolute;top:12px;z-index:1;}input{background:", ";border:none;border-radius:200px;color:", ";font-size:14px;font-weight:300;height:40px;outline:none;padding:0 16px 0 40px;transition:all .3s;&:focus,&:active{background:", ";box-shadow:inset 0 2px 4px rgba(0,0,0,.24);color:", ";}&::-webkit-input-placeholder{color:", ";font-size:12px;text-transform:uppercase;}&::-moz-placeholder{color:", ";font-size:12px;text-transform:uppercase;}&:-ms-input-placeholder{color:", ";font-size:12px;text-transform:uppercase;}&:-moz-placeholder{color:", ";font-size:12px;text-transform:uppercase;}}"], function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.theme.colors.light;
}, function (props) {
  return props.theme.background.light;
}, function (props) {
  return props.theme.colors.link;
}, function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.subtle;
});
var _default = InputSearch;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(InputSearch, "InputSearch", "/Users/admin/Development/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
  reactHotLoader.register(SearchField, "SearchField", "/Users/admin/Development/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
  reactHotLoader.register(_default, "default", "/Users/admin/Development/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
=======
  reactHotLoader.register(InputSearch, "InputSearch", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
  reactHotLoader.register(SearchField, "SearchField", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/InputSearch/InputSearch.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/InputSearch/index.js":
/*!*************************************************!*\
  !*** ./src/app/components/InputSearch/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _InputSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputSearch */ "./src/app/components/InputSearch/InputSearch.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _InputSearch__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/InputSearch/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/Invite.jsx":
/*!**********************************************!*\
  !*** ./src/app/components/Invite/Invite.jsx ***!
  \**********************************************/
/*! exports provided: Invite, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invite", function() { return Invite; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/flux/user/actions */ "./src/app/flux/user/actions.js");
/* harmony import */ var app_flux_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/flux/user */ "./src/app/flux/user/index.js");
/* harmony import */ var _documentTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../documentTitle */ "./src/app/components/documentTitle.jsx");
/* harmony import */ var _InviteForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InviteForm */ "./src/app/components/Invite/InviteForm/index.js");
/* harmony import */ var _InviteForm_ExpiredInvite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InviteForm/ExpiredInvite */ "./src/app/components/Invite/InviteForm/ExpiredInvite.jsx");
/* harmony import */ var shared_components_Logo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/components/Logo */ "./src/shared/components/Logo/index.js");
/* harmony import */ var shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shared/assets/images/teleport-medallion.svg */ "./src/shared/assets/images/teleport-medallion.svg");
/* harmony import */ var shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_9__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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










var Invite =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Invite, _React$Component);

  function Invite() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Invite);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Invite)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmitWithU2f", function (username, password) {
      _this.props.acceptInviteWithU2f(username, password, _this.props.params.inviteToken);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (username, password, token) {
      _this.props.acceptInvite(username, password, token, _this.props.params.inviteToken);
    });

    return _this;
  }

  _createClass(Invite, [{
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
      var auth2faType = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].getAuth2faType();

      if (fetchingInvite.isFailed) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Logo__WEBPACK_IMPORTED_MODULE_8__["default"], {
          src: shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_9___default.a
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InviteForm_ExpiredInvite__WEBPACK_IMPORTED_MODULE_7__["default"], null));
      }

      if (!invite) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Logo__WEBPACK_IMPORTED_MODULE_8__["default"], {
        src: shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_9___default.a
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InviteForm__WEBPACK_IMPORTED_MODULE_6__["default"], {
        auth2faType: auth2faType,
        attempt: attempt,
        invite: invite,
        onSubmitWithU2f: this.onSubmitWithU2f,
        onSubmit: this.onSubmit
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Invite;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStateToProps() {
  return {
    invite: app_flux_user__WEBPACK_IMPORTED_MODULE_4__["getters"].invite,
    attempt: app_flux_user__WEBPACK_IMPORTED_MODULE_4__["getters"].attemp,
    fetchingInvite: app_flux_user__WEBPACK_IMPORTED_MODULE_4__["getters"].fetchingInvite
  };
}

function mapActionsToProps() {
  return {
    fetchInvite: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__["fetchInvite"],
    acceptInviteWithU2f: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__["acceptInviteWithU2f"],
    acceptInvite: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_3__["acceptInvite"]
  };
}

var _default = Object(_documentTitle__WEBPACK_IMPORTED_MODULE_5__["withDocTitle"])("Invite", Object(_nuclear__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapActionsToProps)(Invite));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Invite, "Invite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/Invite.jsx");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/Invite.jsx");
  reactHotLoader.register(mapActionsToProps, "mapActionsToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/Invite.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/Invite.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/InviteForm/ExpiredInvite.jsx":
/*!****************************************************************!*\
  !*** ./src/app/components/Invite/InviteForm/ExpiredInvite.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





var ExpiredInvite =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpiredInvite, _React$Component);

  function ExpiredInvite(props) {
    _classCallCheck(this, ExpiredInvite);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExpiredInvite).call(this, props));
  }

  _createClass(ExpiredInvite, [{
    key: "renderGithubLink",
    value: function renderGithubLink() {
      var product = this.props.product;
      var message = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "If you believe this is an issue with Teleport, please create a", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GithubLink, {
        href: "https://github.com/gravitational/teleport/issues/new"
      }, "GitHub issue"), ".");

      if (product === 'gravity') {
        message = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "If you believe this is an issue with Gravity, please create a", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GithubLink, {
          href: "https://github.com/gravitational/gravity/issues/new"
        }, "GitHub issue"), ".");
      }

      return message;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ExpiredCard, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Invite code has expired"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "It appears that your invite code isn't valid anymore. Please contact your account administrator and request another invite."), this.renderGithubLink());
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ExpiredInvite;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var GithubLink = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].a.withConfig({
  displayName: "ExpiredInvite__GithubLink",
  componentId: "cv0zmh-0"
})(["color:", ";margin:0 0 0 8px;&:visted{color:", ";}"], _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__["colors"].link, _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__["colors"].link);
var ExpiredCard = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "ExpiredInvite__ExpiredCard",
  componentId: "cv0zmh-1"
})(["background-color:", ";border-radius:8px;box-sizing:border-box;box-shadow:0 0 32px rgba(0,0,0,.12),0 8px 32px rgba(0,0,0,.24);color:", ";margin:32px auto;padding:40px;width:540px;h1{color:", ";font-size:20px;margin:0;text-align:center;text-transform:uppercase;}p{line-height:32px;}"], _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__["background"].light, _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__["colors"].text, _shared_components_theme__WEBPACK_IMPORTED_MODULE_3__["colors"].text); // https://github.com/gravitational/teleport/issues/new

ExpiredInvite.propTypes = {
  /** The name of the product (gravity, teleport) */
  product: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['gravity', 'teleport'])
};
ExpiredInvite.defaultProps = {
  product: 'teleport'
};
var _default = ExpiredInvite;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ExpiredInvite, "ExpiredInvite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/ExpiredInvite.jsx");
  reactHotLoader.register(GithubLink, "GithubLink", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/ExpiredInvite.jsx");
  reactHotLoader.register(ExpiredCard, "ExpiredCard", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/ExpiredInvite.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/ExpiredInvite.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/InviteForm/InviteForm.jsx":
/*!*************************************************************!*\
  !*** ./src/app/components/Invite/InviteForm/InviteForm.jsx ***!
  \*************************************************************/
/*! exports provided: InviteForm, ErrorMessage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InviteForm", function() { return InviteForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorMessage", function() { return ErrorMessage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_services_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/enums */ "./src/app/services/enums.js");
/* harmony import */ var _shared_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/components */ "./src/shared/components/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _TwoFaInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TwoFaInfo */ "./src/app/components/Invite/InviteForm/TwoFaInfo.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var needs2fa = function needs2fa(auth2faType) {
  return !!auth2faType && auth2faType !== app_services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].DISABLED;
};

var InviteForm =
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

      if (_this.props.auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].UTF) {
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserName, null, user), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Label"], {
        hasError: passError
      }, passError || "Password"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        hasError: passError,
        value: values.password,
        onChange: handleChange,
        type: "password",
        name: "password",
        placeholder: "Password"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Label"], {
        hasError: passConfirmedError
      }, passConfirmedError || "Confirm Password"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        hasError: passConfirmedError,
        value: values.passwordConfirmed,
        onChange: handleChange,
        type: "password",
        name: "passwordConfirmed",
        placeholder: "Password"
      }), this.isOTP() && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Label"], {
        mt: 3,
        mb: 1,
        hasError: tokenError
      }, tokenError && errors.token || "Two factor token"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
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
      return needs2fa(auth2faType) && auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].OTP;
    }
  }, {
    key: "render2faFields",
    value: function render2faFields() {
      var _this2 = this;

      var auth2faType = this.props.auth2faType;

      if (needs2fa(auth2faType) && auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].OTP) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "form-group"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
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
      var $helpBlock = isProcessing && this.props.auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].UTF ? "Insert your U2F key and press the button on the key" : null;
      var isDisabled = isProcessing;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
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
      var $error = isFailed ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorMessage, {
        message: message
      }) : null;
      var has2FA = needs2fa(auth2faType);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
        validate: this.onValidate,
        onSubmit: this.onSubmit,
        initialValues: this.initialValues
      }, function (props) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_4__["Card"], {
          bg: "secondary",
          mt: "4",
          mb: "4",
          mr: "auto",
          ml: "auto",
          width: "456px",
          p: "5"
        }, _this3.renderNameAndPassFields(props), _this3.renderSubmitBtn(props.handleSubmit), $error, has2FA && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoFaInfo__WEBPACK_IMPORTED_MODULE_6__["default"], {
          auth2faType: auth2faType,
          qr: invite.qr
        }));
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return InviteForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(InviteForm, "propTypes", {
  auth2faType: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  authType: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  onSubmitWithU2f: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  attempt: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
});

var ErrorMessage = function ErrorMessage(_ref2) {
  var message = _ref2.message;
  message = message || '';

  if (message.indexOf('U2F') !== -1) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "grv-invite-login-error"
    }, message, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
      className: "grv-invite-login-error-u2f-codes"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "click ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      target: "_blank",
      href: U2F_ERROR_CODES_URL
    }, "here"), " to learn more about U2F error codes")));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "error"
  }, message, " ");
};
var UserName = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "InviteForm__UserName",
  componentId: "sc-13hpdx6-0"
})(["font-size:20px;font-weight:bold;line-height:40px;margin:0 0 16px 0;"]);
var _default = InviteForm;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(U2F_ERROR_CODES_URL, "U2F_ERROR_CODES_URL", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  reactHotLoader.register(needs2fa, "needs2fa", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  reactHotLoader.register(InviteForm, "InviteForm", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  reactHotLoader.register(ErrorMessage, "ErrorMessage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  reactHotLoader.register(UserName, "UserName", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/InviteForm.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/InviteForm/TwoFaInfo.jsx":
/*!************************************************************!*\
  !*** ./src/app/components/Invite/InviteForm/TwoFaInfo.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Invite2faData; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_services_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/enums */ "./src/app/services/enums.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

  if (auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_1__["Auth2faTypeEnum"].OTP) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "grv-flex-column grv-invite-barcode"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Scan bar code for auth token ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, "Scan below to generate your two factor token")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "img-thumbnail",
      src: "data:image/png;base64,".concat(qr)
    }));
  }

  if (auth2faType === app_services_enums__WEBPACK_IMPORTED_MODULE_1__["Auth2faTypeEnum"].UTF) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "grv-flex-column"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Insert your U2F key "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "m-t-md"
    }, "Press the button on the U2F key after you press the sign up button"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "m-t text-muted"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, "Click", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      a: true,
      target: "_blank",
      href: U2F_HELP_URL
    }, " here "), "to learn more about U2F 2-Step Verification.")));
  }

  return null;
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(U2F_HELP_URL, "U2F_HELP_URL", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/TwoFaInfo.jsx");
  reactHotLoader.register(Invite2faData, "Invite2faData", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/TwoFaInfo.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/InviteForm/index.js":
/*!*******************************************************!*\
  !*** ./src/app/components/Invite/InviteForm/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _InviteForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InviteForm */ "./src/app/components/Invite/InviteForm/InviteForm.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _InviteForm__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/InviteForm/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Invite/index.jsx":
/*!*********************************************!*\
  !*** ./src/app/components/Invite/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Invite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invite */ "./src/app/components/Invite/Invite.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _Invite__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Invite/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/Login.jsx":
/*!********************************************!*\
  !*** ./src/app/components/Login/Login.jsx ***!
  \********************************************/
/*! exports provided: Login, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nuclear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var app_flux_user_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/flux/user/actions */ "./src/app/flux/user/actions.js");
/* harmony import */ var app_flux_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/flux/user */ "./src/app/flux/user/index.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var _LoginForm___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoginForm/ */ "./src/app/components/Login/LoginForm/index.jsx");
/* harmony import */ var _documentTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../documentTitle */ "./src/app/components/documentTitle.jsx");
/* harmony import */ var shared_components_Logo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! shared/components/Logo */ "./src/shared/components/Logo/index.js");
/* harmony import */ var shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/assets/images/teleport-medallion.svg */ "./src/shared/assets/images/teleport-medallion.svg");
/* harmony import */ var shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_8__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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









var Login =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLoginWithSso", function (ssoProvider) {
      _this.props.onLoginWithSso(ssoProvider.name, ssoProvider.url);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLoginWithU2f", function (username, password) {
      _this.props.onLoginWithU2f(username, password);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogin", function (username, password, token) {
      _this.props.onLogin(username, password, token);
    });

    return _this;
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      var attempt = this.props.attempt;
      var authProviders = app_config__WEBPACK_IMPORTED_MODULE_4__["default"].getAuthProviders();
      var auth2faType = app_config__WEBPACK_IMPORTED_MODULE_4__["default"].getAuth2faType();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(shared_components_Logo__WEBPACK_IMPORTED_MODULE_7__["default"], {
        src: shared_assets_images_teleport_medallion_svg__WEBPACK_IMPORTED_MODULE_8___default.a
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoginForm___WEBPACK_IMPORTED_MODULE_5__["default"], {
        authProviders: authProviders,
        auth2faType: auth2faType,
        onLoginWithSso: this.onLoginWithSso,
        onLoginWithU2f: this.onLoginWithU2f,
        onLogin: this.onLogin,
        attempt: attempt
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function mapStoreToProps() {
  return {
    attempt: app_flux_user__WEBPACK_IMPORTED_MODULE_3__["getters"].loginAttemp
  };
}

function mapActionsToProps() {
  return {
    onLogin: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_2__["login"],
    onLoginWithU2f: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_2__["loginWithU2f"],
    onLoginWithSso: app_flux_user_actions__WEBPACK_IMPORTED_MODULE_2__["loginWithSso"]
  };
}

var _default = Object(_documentTitle__WEBPACK_IMPORTED_MODULE_6__["withDocTitle"])("Login", Object(_nuclear__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStoreToProps, mapActionsToProps)(Login));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Login, "Login", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/Login.jsx");
  reactHotLoader.register(mapStoreToProps, "mapStoreToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/Login.jsx");
  reactHotLoader.register(mapActionsToProps, "mapActionsToProps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/Login.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/Login.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/LoginForm/LoginForm.jsx":
/*!**********************************************************!*\
  !*** ./src/app/components/Login/LoginForm/LoginForm.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/components */ "./src/shared/components/index.js");
/* harmony import */ var _shared_components_Alerts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/components/Alerts */ "./src/shared/components/Alerts/index.jsx");
/* harmony import */ var _services_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/enums */ "./src/app/services/enums.js");
/* harmony import */ var _SsoButtons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SsoButtons */ "./src/app/components/Login/LoginForm/SsoButtons.jsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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







var LoginForm =
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

      if (_this.props.auth2faType === _services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].UTF) {
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
      return !!this.props.auth2faType && this.props.auth2faType !== _services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].DISABLED;
    }
  }, {
    key: "needsSso",
    value: function needsSso() {
      return this.props.authProviders && this.props.authProviders.length > 0;
    }
  }, {
    key: "isOTP",
    value: function isOTP() {
      return this.needs2fa() && this.props.auth2faType === _services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].OTP;
    }
  }, {
    key: "renderLoginBtn",
    value: function renderLoginBtn(onClick) {
      var isProcessing = this.props.attempt.isProcessing;
      var $helpBlock = isProcessing && this.props.auth2faType === _services_enums__WEBPACK_IMPORTED_MODULE_3__["Auth2faTypeEnum"].UTF ? "Insert your U2F key and press the button on the key" : null;
      var isDisabled = isProcessing;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SsoButtons__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Label"], {
        mb: 1,
        hasError: userError
      }, "Email", userError && errors.user), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        id: "user",
        fontSize: 0,
        autoFocus: true,
        value: values.user,
        hasError: userError,
        onChange: handleChange,
        placeholder: "User name",
        name: "user"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Label"], {
        hasError: passError
      }, "Password", passError && errors.password), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        id: "password",
        hasError: passError,
        value: values.password,
        onChange: handleChange,
        type: "password",
        name: "password",
        placeholder: "Password"
      }), this.isOTP() && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Label"], {
        mt: 3,
        mb: 1,
        hasError: tokenError
      }, "Two factor token", tokenError && errors.token), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Input"], {
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
        validate: this.onValidate,
        onSubmit: this.onLogin,
        initialValues: this.initialValues
      }, function (props) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Card"], {
          bg: "secondary",
          mt: "4",
          mb: "4",
          mr: "auto",
          ml: "auto",
          width: "456px",
          p: "5"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_1__["Heading"].h5, {
          textAlign: "center",
          mb: "3",
          color: "light"
        }, "SIGN INTO TELEPORT"), isFailed && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components_Alerts__WEBPACK_IMPORTED_MODULE_2__["Danger"], null, " ", message, " "), _this2.renderInputFields(props), _this2.renderLoginBtn(props.handleSubmit), _this2.renderSsoBtns());
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return LoginForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoginForm, "LoginForm", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/LoginForm/LoginForm.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/LoginForm/SsoButtons.jsx":
/*!***********************************************************!*\
  !*** ./src/app/components/Login/LoginForm/SsoButtons.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_services_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/enums */ "./src/app/services/enums.js");
/* harmony import */ var _SsoButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../SsoButton */ "./src/app/components/Login/SsoButton/index.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

  if (name.indexOf('github') !== -1 || type === app_services_enums__WEBPACK_IMPORTED_MODULE_1__["AuthProviderTypeEnum"].GITHUB) {
    return 'github';
  }

  if (type === app_services_enums__WEBPACK_IMPORTED_MODULE_1__["AuthProviderTypeEnum"].OIDC) {
    return 'openid';
  }

  return '--unknown';
}

var SsoBtnList = function SsoBtnList(_ref) {
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SsoButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " You have no SSO providers configured ");
  }

  return $btns;
};

var _default = SsoBtnList;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(guessProviderType, "guessProviderType", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/LoginForm/SsoButtons.jsx");
  reactHotLoader.register(SsoBtnList, "SsoBtnList", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/LoginForm/SsoButtons.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/LoginForm/SsoButtons.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/LoginForm/index.jsx":
/*!******************************************************!*\
  !*** ./src/app/components/Login/LoginForm/index.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _LoginForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginForm */ "./src/app/components/Login/LoginForm/LoginForm.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _LoginForm__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/LoginForm/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/SsoButton/SsoButton.jsx":
/*!**********************************************************!*\
  !*** ./src/app/components/Login/SsoButton/SsoButton.jsx ***!
  \**********************************************************/
/*! exports provided: StyledSsoButton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledSsoButton", function() { return StyledSsoButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _shared_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/components */ "./src/shared/components/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var SsoButton = function SsoButton(props) {
  var iconClass = pickSso(props.type).className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components__WEBPACK_IMPORTED_MODULE_2__["Button"], _extends({
    block: true,
    size: "large"
  }, props, {
    color: "light"
  }), iconClass && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Icon, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: iconClass
  })), props.children);
};

var StyledSsoButton = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(SsoButton).withConfig({
  displayName: "SsoButton__StyledSsoButton",
  componentId: "moqho3-0"
})(["background-color:", ";position:relative;box-sizing:border-box;margin:32px 0 0 0;"], function (props) {
  return pickSso(props.type).color;
});
var Icon = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "SsoButton__Icon",
  componentId: "moqho3-1"
})(["position:absolute;left:0;top:0;bottom:0;width:32px;font-size:1.6em;text-align:center;border-right:1px solid rgba(0,0,0,.2);"]);
var _default = StyledSsoButton;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(pickSso, "pickSso", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/SsoButton.jsx");
  reactHotLoader.register(SsoButton, "SsoButton", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/SsoButton.jsx");
  reactHotLoader.register(StyledSsoButton, "StyledSsoButton", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/SsoButton.jsx");
  reactHotLoader.register(Icon, "Icon", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/SsoButton.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/SsoButton.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/SsoButton/index.jsx":
/*!******************************************************!*\
  !*** ./src/app/components/Login/SsoButton/index.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _SsoButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SsoButton */ "./src/app/components/Login/SsoButton/SsoButton.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _SsoButton__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/SsoButton/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/Login/index.jsx":
/*!********************************************!*\
  !*** ./src/app/components/Login/index.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login */ "./src/app/components/Login/Login.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = _Login__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/Login/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/documentTitle.jsx":
/*!**********************************************!*\
  !*** ./src/app/components/documentTitle.jsx ***!
  \**********************************************/
/*! exports provided: DocumentTitle, withDocTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentTitle", function() { return DocumentTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withDocTitle", function() { return withDocTitle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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
    }, {
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return WithWindowTitle;
  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component), _defineProperty(_class, "displayName", "withDocTitleWrapper"), _temp;
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DocumentTitle, "DocumentTitle", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/documentTitle.jsx");
  reactHotLoader.register(withDocTitle, "withDocTitle", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/documentTitle.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/msgPage.jsx":
/*!****************************************!*\
  !*** ./src/app/components/msgPage.jsx ***!
  \****************************************/
/*! exports provided: MSG_INFO_LOGIN_SUCCESS, MSG_ERROR_LOGIN_FAILED, MSG_ERROR_DEFAULT, MSG_ERROR_NOT_FOUND, MSG_ERROR_NOT_FOUND_DETAILS, MSG_ERROR_EXPIRED_INVITE, MSG_ERROR_EXPIRED_INVITE_DETAILS, MSG_ERROR_ACCESS_DENIED, ErrorPage, InfoPage, NotFoundPage, NotFound, Failed, AccessDenied, ExpiredLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_INFO_LOGIN_SUCCESS", function() { return MSG_INFO_LOGIN_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_LOGIN_FAILED", function() { return MSG_ERROR_LOGIN_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_DEFAULT", function() { return MSG_ERROR_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_NOT_FOUND", function() { return MSG_ERROR_NOT_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_NOT_FOUND_DETAILS", function() { return MSG_ERROR_NOT_FOUND_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_EXPIRED_INVITE", function() { return MSG_ERROR_EXPIRED_INVITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_EXPIRED_INVITE_DETAILS", function() { return MSG_ERROR_EXPIRED_INVITE_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSG_ERROR_ACCESS_DENIED", function() { return MSG_ERROR_ACCESS_DENIED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPage", function() { return ErrorPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoPage", function() { return InfoPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundPage", function() { return NotFoundPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFound", function() { return NotFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Failed", function() { return Failed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessDenied", function() { return AccessDenied; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpiredLink", function() { return ExpiredLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _documentTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./documentTitle */ "./src/app/components/documentTitle.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
var InfoPage = Object(_documentTitle__WEBPACK_IMPORTED_MODULE_1__["withDocTitle"])("Info", function (_ref) {
  var params = _ref.params;
  var type = params.type;

  if (type === InfoPageEnum.LOGIN_SUCCESS) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SuccessfulLogin, null);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InfoBox, null);
});
var ErrorPage = Object(_documentTitle__WEBPACK_IMPORTED_MODULE_1__["withDocTitle"])("Error", function (_ref2) {
  var params = _ref2.params,
      location = _ref2.location;
  var type = params.type;
  var details = location.query.details;

  switch (type) {
    case ErrorPageEnum.FAILED_TO_LOGIN:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoginFailed, {
        message: details
      });

    case ErrorPageEnum.EXPIRED_INVITE:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ExpiredLink, null);

    case ErrorPageEnum.NOT_FOUND:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotFound, null);

    case ErrorPageEnum.ACCESS_DENIED:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AccessDenied, {
        message: details
      });

    default:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Failed, {
        message: details
      });
  }
});

var Box = function Box(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grv-msg-page"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grv-header"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: props.iconClass
  })), props.children);
};

var InfoBox = function InfoBox(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Box, _extends({
    iconClass: "fa fa-smile-o"
  }, props));
};

var ErrorBox = function ErrorBox(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Box, _extends({
    iconClass: "fa fa-frown-o"
  }, props));
};

var ErrorBoxDetails = function ErrorBoxDetails(_ref3) {
  var _ref3$message = _ref3.message,
      message = _ref3$message === void 0 ? '' : _ref3$message;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-t text-muted"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "grv-msg-page-details-text"
  }, message), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "contact-section"
  }, "If you believe this is an issue with Teleport, please ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/gravitational/teleport/issues/new"
  }, "create a GitHub issue."))));
};

var NotFound = function NotFound() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_ERROR_NOT_FOUND), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoxDetails, {
    message: MSG_ERROR_NOT_FOUND_DETAILS
  }));
};

var NotFoundPage = Object(_documentTitle__WEBPACK_IMPORTED_MODULE_1__["withDocTitle"])("Not Found", NotFound);

var AccessDenied = function AccessDenied(_ref4) {
  var message = _ref4.message;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Box, {
    iconClass: "fa fa-frown-o"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_ERROR_ACCESS_DENIED), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoxDetails, {
    message: message
  }));
};

var Failed = function Failed(_ref5) {
  var message = _ref5.message;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_ERROR_DEFAULT), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoxDetails, {
    message: message
  }));
};

var ExpiredLink = function ExpiredLink() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_ERROR_EXPIRED_INVITE), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoxDetails, {
    message: MSG_ERROR_EXPIRED_INVITE_DETAILS
  }));
};

var LoginFailed = function LoginFailed(_ref6) {
  var message = _ref6.message;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBox, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_ERROR_LOGIN_FAILED), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorBoxDetails, {
    message: message
  }));
};

var SuccessfulLogin = function SuccessfulLogin() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InfoBox, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, MSG_INFO_LOGIN_SUCCESS));
};


;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MSG_INFO_LOGIN_SUCCESS, "MSG_INFO_LOGIN_SUCCESS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_LOGIN_FAILED, "MSG_ERROR_LOGIN_FAILED", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_DEFAULT, "MSG_ERROR_DEFAULT", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_NOT_FOUND, "MSG_ERROR_NOT_FOUND", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_NOT_FOUND_DETAILS, "MSG_ERROR_NOT_FOUND_DETAILS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_EXPIRED_INVITE, "MSG_ERROR_EXPIRED_INVITE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_EXPIRED_INVITE_DETAILS, "MSG_ERROR_EXPIRED_INVITE_DETAILS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(MSG_ERROR_ACCESS_DENIED, "MSG_ERROR_ACCESS_DENIED", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(ErrorPageEnum, "ErrorPageEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(InfoPageEnum, "InfoPageEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(InfoPage, "InfoPage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(ErrorPage, "ErrorPage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(Box, "Box", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(InfoBox, "InfoBox", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(ErrorBox, "ErrorBox", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(ErrorBoxDetails, "ErrorBoxDetails", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(NotFound, "NotFound", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(NotFoundPage, "NotFoundPage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(AccessDenied, "AccessDenied", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(Failed, "Failed", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(ExpiredLink, "ExpiredLink", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(LoginFailed, "LoginFailed", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  reactHotLoader.register(SuccessfulLogin, "SuccessfulLogin", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/msgPage.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/nuclear.jsx":
/*!****************************************!*\
  !*** ./src/app/components/nuclear.jsx ***!
  \****************************************/
/*! exports provided: Provider, connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return connect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/index.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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
      }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
          // @ts-ignore
          this[key] = eval(code);
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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Provider, "Provider", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/nuclear.jsx");
  reactHotLoader.register(reactorShape, "reactorShape", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/nuclear.jsx");
  reactHotLoader.register(getDisplayName, "getDisplayName", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/nuclear.jsx");
  reactHotLoader.register(connect, "connect", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/nuclear.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/components/withAuth.jsx":
/*!*****************************************!*\
  !*** ./src/app/components/withAuth.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_services_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/session */ "./src/app/services/session.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var withAuth = function withAuth(component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WithAuthWrapper, _React$Component);

    function WithAuthWrapper() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithAuthWrapper);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithAuthWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        hasUser: false
      });

      return _this;
    }

    _createClass(WithAuthWrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        app_services_session__WEBPACK_IMPORTED_MODULE_1__["default"].ensureSession(true).then(function () {
          _this2.setState({
            hasUser: true
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.hasUser) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(component, this.props);
        }

        return null;
      }
    }, {
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return WithAuthWrapper;
  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component), _defineProperty(_class, "displayName", "WithAuthWrapper"), _temp;
};

var _default = withAuth;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(withAuth, "withAuth", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/withAuth.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/components/withAuth.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/config.js":
/*!***************************!*\
  !*** ./src/app/config.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/lib/patternUtils */ "./src/app/lib/patternUtils.js");
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/utils */ "./src/app/services/utils.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var baseUrl = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__["isTestEnv"])() ? 'localhost' : window.location.origin;
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
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.sitePath, {
        siteId: siteId
      });
    },
    getSiteNodesUrl: function getSiteNodesUrl() {
      var siteId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-current-';
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.nodesPath, {
        siteId: siteId
      });
    },
    getSiteSessionUrl: function getSiteSessionUrl() {
      var siteId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-current-';
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.siteSessionPath, {
        siteId: siteId
      });
    },
    getSsoUrl: function getSsoUrl(providerUrl, providerName, redirect) {
      return cfg.baseUrl + Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(providerUrl, {
        redirect: redirect,
        providerName: providerName
      });
    },
    getSiteEventsFilterUrl: function getSiteEventsFilterUrl(_ref) {
      var start = _ref.start,
          end = _ref.end,
          siteId = _ref.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.siteEventsFilterPath, {
        start: start,
        end: end,
        siteId: siteId
      });
    },
    getSessionEventsUrl: function getSessionEventsUrl(_ref2) {
      var sid = _ref2.sid,
          siteId = _ref2.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.sessionEventsPath, {
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
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.scp, {
        siteId: siteId,
        serverId: serverId,
        login: login,
        location: location,
        filename: filename
      });
    },
    getFetchSessionsUrl: function getFetchSessionsUrl(siteId) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.siteEventSessionFilterPath, {
        siteId: siteId
      });
    },
    getFetchSessionUrl: function getFetchSessionUrl(_ref4) {
      var sid = _ref4.sid,
          siteId = _ref4.siteId;
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.siteSessionPath + '/:sid', {
        sid: sid,
        siteId: siteId
      });
    },
    getInviteUrl: function getInviteUrl(inviteToken) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.invitePath, {
        inviteToken: inviteToken
      });
    },
    getU2fCreateUserChallengeUrl: function getU2fCreateUserChallengeUrl(inviteToken) {
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.api.u2fCreateUserChallengePath, {
        inviteToken: inviteToken
      });
    }
  },
  getPlayerUrl: function getPlayerUrl(_ref5) {
    var siteId = _ref5.siteId,
        sid = _ref5.sid;
    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.routes.player, {
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
      return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(url, {
        siteId: siteId,
        serverId: serverId,
        login: login
      });
    }

    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.routes.terminal, {
      siteId: siteId,
      serverId: serverId,
      login: login,
      sid: sid
    });
  },
  getCurrentSessionRouteUrl: function getCurrentSessionRouteUrl(_ref7) {
    var sid = _ref7.sid,
        siteId = _ref7.siteId;
    return Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_2__["formatPattern"])(cfg.routes.currentSession, {
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
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__["generatePath"])(cfg.routes.cluster, {
      clusterId: clusterId
    });
  },
  getClusterNodesUrl: function getClusterNodesUrl(clusterId) {
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__["generatePath"])(cfg.routes.clusterNodes, {
      clusterId: clusterId
    });
  },
  getClusterSessionsUrl: function getClusterSessionsUrl(clusterId) {
    return Object(react_router__WEBPACK_IMPORTED_MODULE_0__["generatePath"])(cfg.routes.clusterSessions, {
      clusterId: clusterId
    });
  },
  stripOptionalParams: function stripOptionalParams(pattern) {
    return pattern.replace(/\(.*\)/, '');
  }
};
var _default = cfg;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(baseUrl, "baseUrl", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/config.js");
  reactHotLoader.register(cfg, "cfg", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/config.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/config.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/featureActivator.js":
/*!*************************************!*\
  !*** ./src/app/featureActivator.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_0__["default"].create('featureActivator');
/**
 * Invokes methods on a group of registered features.
 *
 */

var FeactureActivator =
/*#__PURE__*/
function () {
  function FeactureActivator() {
    _classCallCheck(this, FeactureActivator);

    this._features = [];
  }

  _createClass(FeactureActivator, [{
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
        logger.error('failed to invoke feature onload()', err);
      }
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FeactureActivator;
}();

var _default = FeactureActivator;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/featureActivator.js");
  reactHotLoader.register(FeactureActivator, "FeactureActivator", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/featureActivator.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/featureActivator.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/app/actionTypes.js":
/*!*****************************************!*\
  !*** ./src/app/flux/app/actionTypes.js ***!
  \*****************************************/
/*! exports provided: SET_SITE_ID, ADD_NAV_ITEM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SITE_ID", function() { return SET_SITE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_NAV_ITEM", function() { return ADD_NAV_ITEM; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SET_SITE_ID, "SET_SITE_ID", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actionTypes.js");
  reactHotLoader.register(ADD_NAV_ITEM, "ADD_NAV_ITEM", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/app/actions.js":
/*!*************************************!*\
  !*** ./src/app/flux/app/actions.js ***!
  \*************************************/
/*! exports provided: addNavItem, setSiteId, initApp, refresh, fetchInitData, fetchSites, fetchUserContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNavItem", function() { return addNavItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSiteId", function() { return setSiteId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initApp", function() { return initApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refresh", function() { return refresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInitData", function() { return fetchInitData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSites", function() { return fetchSites; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserContext", function() { return fetchUserContext; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/app/actionTypes.js");
/* harmony import */ var _sites_actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../sites/actionTypes */ "./src/app/flux/sites/actionTypes.js");
/* harmony import */ var _user_actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../user/actionTypes */ "./src/app/flux/user/actionTypes.js");
/* harmony import */ var _userAcl_actionTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../userAcl/actionTypes */ "./src/app/flux/userAcl/actionTypes.js");
/* harmony import */ var app_services_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/services/api */ "./src/app/services/api.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_flux_status_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/flux/status/actions */ "./src/app/flux/status/actions.js");
/* harmony import */ var _nodes_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../nodes/actions */ "./src/app/flux/nodes/actions.js");
/* harmony import */ var app_flux_sessions_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/flux/sessions/actions */ "./src/app/flux/sessions/actions.js");
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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











var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_10__["default"].create('flux/app');
function addNavItem(item) {
  app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["ADD_NAV_ITEM"], item);
}
function setSiteId(siteId) {
  app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["SET_SITE_ID"], siteId);
}
function initApp(siteId, featureActivator) {
  app_flux_status_actions__WEBPACK_IMPORTED_MODULE_7__["initAppStatus"].start(); // get the list of available clusters

  return fetchInitData(siteId).then(function () {
    featureActivator.onload();
    app_flux_status_actions__WEBPACK_IMPORTED_MODULE_7__["initAppStatus"].success();
  }).catch(function (err) {
    app_flux_status_actions__WEBPACK_IMPORTED_MODULE_7__["initAppStatus"].fail(err.message);
  });
}
function refresh() {
  return Promise.all([app_flux_sessions_actions__WEBPACK_IMPORTED_MODULE_9__["fetchActiveSessions"](), Object(_nodes_actions__WEBPACK_IMPORTED_MODULE_8__["fetchNodes"])()]);
}
function fetchInitData(siteId) {
  return Promise.all([fetchSites(), fetchUserContext()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        masterSiteId = _ref2[0];

    var selectedCluster = siteId || masterSiteId;
    setSiteId(selectedCluster);
    return Promise.all([Object(_nodes_actions__WEBPACK_IMPORTED_MODULE_8__["fetchNodes"])(), app_flux_sessions_actions__WEBPACK_IMPORTED_MODULE_9__["fetchActiveSessions"]()]);
  });
}
function fetchSites() {
  return app_services_api__WEBPACK_IMPORTED_MODULE_5__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.sitesBasePath).then(function (json) {
    var trusted = json.trusted || [];
    var allClusters = [json.current].concat(_toConsumableArray(trusted));
    app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_sites_actionTypes__WEBPACK_IMPORTED_MODULE_2__["RECEIVE_CLUSTERS"], allClusters);
    return json.current.name;
  }).catch(function (err) {
    logger.error('fetchSites', err);
  });
}
function fetchUserContext() {
  return app_services_api__WEBPACK_IMPORTED_MODULE_5__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_6__["default"].api.userContextPath).then(function (json) {
    app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_user_actionTypes__WEBPACK_IMPORTED_MODULE_3__["RECEIVE_USER"], {
      name: json.userName,
      authType: json.authType
    });
    app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_userAcl_actionTypes__WEBPACK_IMPORTED_MODULE_4__["RECEIVE_USERACL"], json.userAcl);
    logger.info("Teleport ver:", json.version);
  });
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(addNavItem, "addNavItem", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(setSiteId, "setSiteId", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(initApp, "initApp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(refresh, "refresh", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(fetchInitData, "fetchInitData", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(fetchSites, "fetchSites", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  reactHotLoader.register(fetchUserContext, "fetchUserContext", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/app/appStore.js":
/*!**************************************!*\
  !*** ./src/app/flux/app/appStore.js ***!
  \**************************************/
/*! exports provided: getStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore", function() { return getStore; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/app/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





var AppRec =
/*#__PURE__*/
function (_Record) {
  _inherits(AppRec, _Record);

  function AppRec(props) {
    _classCallCheck(this, AppRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppRec).call(this, props));
  }

  _createClass(AppRec, [{
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AppRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Record"])({
  siteId: null,
  navItems: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]()
}));

function getStore() {
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(['tlpt']);
}

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_1__["Store"])({
  getInitialState: function getInitialState() {
    return new AppRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["SET_SITE_ID"], function (state, siteId) {
      return state.setSiteId(siteId);
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ADD_NAV_ITEM"], function (state, navItem) {
      return state.addNavItem(navItem);
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppRec, "AppRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/appStore.js");
  reactHotLoader.register(getStore, "getStore", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/appStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/appStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/app/getters.js":
/*!*************************************!*\
  !*** ./src/app/flux/app/getters.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var app_flux_status_getters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/flux/status/getters */ "./src/app/flux/status/getters.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = {
  initAttempt: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_0__["initAppAttempt"],
  siteId: ['tlpt', 'siteId']
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/app/getters.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/fileTransfer/actionTypes.jsx":
/*!***************************************************!*\
  !*** ./src/app/flux/fileTransfer/actionTypes.jsx ***!
  \***************************************************/
/*! exports provided: OPEN, CLOSE, ADD, REMOVE, UPDATE_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPEN", function() { return OPEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSE", function() { return CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD", function() { return ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE", function() { return REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_STATUS", function() { return UPDATE_STATUS; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(OPEN, "OPEN", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/actionTypes.jsx");
  reactHotLoader.register(CLOSE, "CLOSE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/actionTypes.jsx");
  reactHotLoader.register(ADD, "ADD", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/actionTypes.jsx");
  reactHotLoader.register(REMOVE, "REMOVE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/actionTypes.jsx");
  reactHotLoader.register(UPDATE_STATUS, "UPDATE_STATUS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/actionTypes.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/fileTransfer/index.js":
/*!********************************************!*\
  !*** ./src/app/flux/fileTransfer/index.js ***!
  \********************************************/
/*! exports provided: getFileTransfer, register, getters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileTransfer", function() { return getFileTransfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/app/flux/fileTransfer/store.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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


var STORE_NAME = 'tlpt_files';
function getFileTransfer() {
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate([STORE_NAME]);
}
var register = function register(reactor) {
  reactor.registerStores(_defineProperty({}, STORE_NAME, _store__WEBPACK_IMPORTED_MODULE_1__["default"]));
};
var getters = {
  store: [STORE_NAME]
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(STORE_NAME, "STORE_NAME", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/index.js");
  reactHotLoader.register(getFileTransfer, "getFileTransfer", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/index.js");
  reactHotLoader.register(register, "register", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/index.js");
  reactHotLoader.register(getters, "getters", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/fileTransfer/store.js":
/*!********************************************!*\
  !*** ./src/app/flux/fileTransfer/store.js ***!
  \********************************************/
/*! exports provided: FileTransferStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileTransferStore", function() { return FileTransferStore; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/fileTransfer/actionTypes.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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




var defaultStatus = {
  isFailed: false,
  isProcessing: false,
  isCompleted: false,
  error: ""
};

var File =
/*#__PURE__*/
function (_Record) {
  _inherits(File, _Record);

  function File(props) {
    _classCallCheck(this, File);

    props = _objectSpread({}, props, {
      id: new Date().getTime() + props.name
    });
    return _possibleConstructorReturn(this, _getPrototypeOf(File).call(this, props));
  }

  _createClass(File, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return File;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])(_objectSpread({
  id: '',
  url: '',
  name: '',
  isUpload: '',
  blob: null
}, defaultStatus)));

var FileTransferStore =
/*#__PURE__*/
function (_Record2) {
  _inherits(FileTransferStore, _Record2);

  function FileTransferStore(params) {
    _classCallCheck(this, FileTransferStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(FileTransferStore).call(this, params));
  }

  _createClass(FileTransferStore, [{
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
      var url = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getScpUrl({
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

      var status = _objectSpread({}, defaultStatus, rest);

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FileTransferStore;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  isOpen: false,
  isUpload: false,
  siteId: '',
  serverId: '',
  login: '',
  files: new immutable__WEBPACK_IMPORTED_MODULE_1__["OrderedMap"]()
}));

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new FileTransferStore();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["OPEN"], function (state, json) {
      return state.open(json);
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["CLOSE"], function (state) {
      return state.close();
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["ADD"], function (state, json) {
      return state.addFile(json);
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["REMOVE"], function (state, id) {
      return state.removeFile(id);
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["UPDATE_STATUS"], function (state, json) {
      return state.updateStatus(json);
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultStatus, "defaultStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/store.js");
  reactHotLoader.register(File, "File", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/store.js");
  reactHotLoader.register(FileTransferStore, "FileTransferStore", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/store.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/fileTransfer/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/index.js":
/*!*******************************!*\
  !*** ./src/app/flux/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _terminal_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terminal/store */ "./src/app/flux/terminal/store.js");
/* harmony import */ var _userAcl_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userAcl/store */ "./src/app/flux/userAcl/store.js");
/* harmony import */ var _app_appStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/appStore */ "./src/app/flux/app/appStore.js");
/* harmony import */ var _nodes_nodeStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nodes/nodeStore */ "./src/app/flux/nodes/nodeStore.js");
/* harmony import */ var _settings_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/store */ "./src/app/flux/settings/store.js");
/* harmony import */ var _status_statusStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./status/statusStore */ "./src/app/flux/status/statusStore.js");
/* harmony import */ var _user_userStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user/userStore */ "./src/app/flux/user/userStore.js");
/* harmony import */ var _user_userInviteStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user/userInviteStore */ "./src/app/flux/user/userInviteStore.js");
/* harmony import */ var _sites_siteStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sites/siteStore */ "./src/app/flux/sites/siteStore.js");
/* harmony import */ var _sessions_eventStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sessions/eventStore */ "./src/app/flux/sessions/eventStore.js");
/* harmony import */ var _sessions_archivedSessionStore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sessions/archivedSessionStore */ "./src/app/flux/sessions/archivedSessionStore.js");
/* harmony import */ var _sessions_activeSessionStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sessions/activeSessionStore */ "./src/app/flux/sessions/activeSessionStore.js");
/* harmony import */ var _storedSessionsFilter_storedSessionFilterStore__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./storedSessionsFilter/storedSessionFilterStore */ "./src/app/flux/storedSessionsFilter/storedSessionFilterStore.js");
/* harmony import */ var _sshHistory_store__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sshHistory/store */ "./src/app/flux/sshHistory/store.js");
/* harmony import */ var _misc_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./misc/store */ "./src/app/flux/misc/store.js");
/* harmony import */ var _fileTransfer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./fileTransfer */ "./src/app/flux/fileTransfer/index.js");
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

















Object(_sshHistory_store__WEBPACK_IMPORTED_MODULE_14__["register"])(app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_misc_store__WEBPACK_IMPORTED_MODULE_15__["register"])(app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_fileTransfer__WEBPACK_IMPORTED_MODULE_16__["register"])(app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"]);
app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].registerStores({
  'tlpt_settings': _settings_store__WEBPACK_IMPORTED_MODULE_5__["default"],
  'tlpt': _app_appStore__WEBPACK_IMPORTED_MODULE_3__["default"],
  'tlpt_terminal': _terminal_store__WEBPACK_IMPORTED_MODULE_1__["default"],
  'tlpt_nodes': _nodes_nodeStore__WEBPACK_IMPORTED_MODULE_4__["default"],
  'tlpt_user': _user_userStore__WEBPACK_IMPORTED_MODULE_7__["default"],
  'tlpt_user_invite': _user_userInviteStore__WEBPACK_IMPORTED_MODULE_8__["default"],
  'tlpt_user_acl': _userAcl_store__WEBPACK_IMPORTED_MODULE_2__["default"],
  'tlpt_sites': _sites_siteStore__WEBPACK_IMPORTED_MODULE_9__["default"],
  'tlpt_status': _status_statusStore__WEBPACK_IMPORTED_MODULE_6__["default"],
  'tlpt_sessions_events': _sessions_eventStore__WEBPACK_IMPORTED_MODULE_10__["default"],
  'tlpt_sessions_archived': _sessions_archivedSessionStore__WEBPACK_IMPORTED_MODULE_11__["default"],
  'tlpt_sessions_active': _sessions_activeSessionStore__WEBPACK_IMPORTED_MODULE_12__["default"],
  'tlpt_sessions_filter': _storedSessionsFilter_storedSessionFilterStore__WEBPACK_IMPORTED_MODULE_13__["default"]
});

/***/ }),

/***/ "./src/app/flux/misc/store.js":
/*!************************************!*\
  !*** ./src/app/flux/misc/store.js ***!
  \************************************/
/*! exports provided: register, storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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


var SET = 'MISC_SET';
var STORE_NAME = 'tlpt_misc'; // stores any temporary data

var store = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Immutable"].Map();
  },
  initialize: function initialize() {
    this.on(SET, function (state, _ref) {
      var key = _ref.key,
          payload = _ref.payload;
      return state.set(key, payload);
    });
  }
});
var register = function register(reactor) {
  reactor.registerStores(_defineProperty({}, STORE_NAME, store));
};
var storage = {
  save: function save(key, payload) {
    app_reactor__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch(SET, {
      key: key,
      payload: payload
    });
  },
  findByKey: function findByKey(key) {
    return app_reactor__WEBPACK_IMPORTED_MODULE_1__["default"].evaluate([STORE_NAME, key]);
  }
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SET, "SET", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/misc/store.js");
  reactHotLoader.register(STORE_NAME, "STORE_NAME", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/misc/store.js");
  reactHotLoader.register(store, "store", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/misc/store.js");
  reactHotLoader.register(register, "register", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/misc/store.js");
  reactHotLoader.register(storage, "storage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/misc/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/nodes/actionTypes.js":
/*!*******************************************!*\
  !*** ./src/app/flux/nodes/actionTypes.js ***!
  \*******************************************/
/*! exports provided: TLPT_NODES_RECEIVE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_NODES_RECEIVE", function() { return TLPT_NODES_RECEIVE; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TLPT_NODES_RECEIVE, "TLPT_NODES_RECEIVE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/nodes/actions.js":
/*!***************************************!*\
  !*** ./src/app/flux/nodes/actions.js ***!
  \***************************************/
/*! exports provided: fetchNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNodes", function() { return fetchNodes; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/nodes/actionTypes.js");
/* harmony import */ var app_services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/api */ "./src/app/services/api.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/flux/app/getters */ "./src/app/flux/app/getters.js");
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();







var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_5__["default"].create('flux/nodes');
function fetchNodes() {
  var siteId = app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__["default"].siteId);
  return app_services_api__WEBPACK_IMPORTED_MODULE_2__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_3__["default"].api.getSiteNodesUrl(siteId)).then(function (res) {
    return res.items || [];
  }).then(function (items) {
    return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["TLPT_NODES_RECEIVE"], items);
  }).catch(function (err) {
    logger.error('fetchNodes', err);
    throw err;
  });
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/actions.js");
  reactHotLoader.register(fetchNodes, "fetchNodes", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/nodes/getters.js":
/*!***************************************!*\
  !*** ./src/app/flux/nodes/getters.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
var _default = {
  siteNodes: siteNodes,
  nodesByCluster: function nodesByCluster(clusterId) {
    return [['tlpt_nodes'], function (nodeStore) {
      return nodeStore.getSiteServers(clusterId);
    }];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(siteNodes, "siteNodes", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/getters.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/getters.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/nodes/nodeStore.js":
/*!*****************************************!*\
  !*** ./src/app/flux/nodes/nodeStore.js ***!
  \*****************************************/
/*! exports provided: ServerRec, getNodeStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerRec", function() { return ServerRec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeStore", function() { return getNodeStore; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/nodes/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var ServerRec =
/*#__PURE__*/
function (_Record) {
  _inherits(ServerRec, _Record);

  function ServerRec(props) {
    _classCallCheck(this, ServerRec);

    var tags = new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](Object(nuclear_js__WEBPACK_IMPORTED_MODULE_1__["toImmutable"])(props.tags));
    return _possibleConstructorReturn(this, _getPrototypeOf(ServerRec).call(this, _objectSpread({}, props, {
      tags: tags
    })));
  }

  _createClass(ServerRec, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return ServerRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Record"])({
  id: '',
  siteId: '',
  hostname: '',
  tags: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](),
  addr: ''
}));

var NodeStoreRec =
/*#__PURE__*/
function (_Record2) {
  _inherits(NodeStoreRec, _Record2);

  function NodeStoreRec() {
    _classCallCheck(this, NodeStoreRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(NodeStoreRec).apply(this, arguments));
  }

  _createClass(NodeStoreRec, [{
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
      var list = new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]().withMutations(function (state) {
        jsonItems.forEach(function (item) {
          return state.push(new ServerRec(item));
        });
        return state;
      });
      return list.equals(this.servers) ? this : this.set('servers', list);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return NodeStoreRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Record"])({
  servers: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]()
}));

function getNodeStore() {
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(['tlpt_nodes']);
}

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_1__["Store"])({
  getInitialState: function getInitialState() {
    return new NodeStoreRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["TLPT_NODES_RECEIVE"], function (state, items) {
      return state.addSiteServers(items);
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ServerRec, "ServerRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/nodeStore.js");
  reactHotLoader.register(NodeStoreRec, "NodeStoreRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/nodeStore.js");
  reactHotLoader.register(getNodeStore, "getNodeStore", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/nodeStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/nodes/nodeStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sessions/actionTypes.js":
/*!**********************************************!*\
  !*** ./src/app/flux/sessions/actionTypes.js ***!
  \**********************************************/
/*! exports provided: RECEIVE_ACTIVE_SESSIONS, RECEIVE_SITE_EVENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_ACTIVE_SESSIONS", function() { return RECEIVE_ACTIVE_SESSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_SITE_EVENTS", function() { return RECEIVE_SITE_EVENTS; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RECEIVE_ACTIVE_SESSIONS, "RECEIVE_ACTIVE_SESSIONS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actionTypes.js");
  reactHotLoader.register(RECEIVE_SITE_EVENTS, "RECEIVE_SITE_EVENTS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sessions/actions.js":
/*!******************************************!*\
  !*** ./src/app/flux/sessions/actions.js ***!
  \******************************************/
/*! exports provided: fetchStoredSession, fetchSiteEvents, fetchActiveSessions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchStoredSession", function() { return fetchStoredSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSiteEvents", function() { return fetchSiteEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchActiveSessions", function() { return fetchActiveSessions; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var app_services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/api */ "./src/app/services/api.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/flux/app/getters */ "./src/app/flux/app/getters.js");
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sessions/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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







var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_5__["default"].create('flux/sessions');
function fetchStoredSession(sid, siteId) {
  siteId = siteId || app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__["default"].siteId);
  return app_services_api__WEBPACK_IMPORTED_MODULE_1__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getSessionEventsUrl({
    siteId: siteId,
    sid: sid
  })).then(function (json) {
    if (json && json.events) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_6__["RECEIVE_SITE_EVENTS"], {
        siteId: siteId,
        json: json.events
      });
    }
  });
}
function fetchSiteEvents(start, end) {
  // default values
  start = start || moment__WEBPACK_IMPORTED_MODULE_3___default()(new Date()).endOf('day').toDate();
  end = end || moment__WEBPACK_IMPORTED_MODULE_3___default()(end).subtract(3, 'day').startOf('day').toDate();
  start = start.toISOString();
  end = end.toISOString();
  var siteId = app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__["default"].siteId);
  return app_services_api__WEBPACK_IMPORTED_MODULE_1__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getSiteEventsFilterUrl({
    start: start,
    end: end,
    siteId: siteId
  })).then(function (json) {
    if (json && json.events) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_6__["RECEIVE_SITE_EVENTS"], {
        siteId: siteId,
        json: json.events
      });
    }
  }).catch(function (err) {
    logger.error('fetchSiteEvents', err);
    throw err;
  });
}
function fetchActiveSessions() {
  var siteId = app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(app_flux_app_getters__WEBPACK_IMPORTED_MODULE_4__["default"].siteId);
  return app_services_api__WEBPACK_IMPORTED_MODULE_1__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].api.getFetchSessionsUrl(siteId)).then(function (json) {
    var sessions = json.sessions || [];
    app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_6__["RECEIVE_ACTIVE_SESSIONS"], {
      siteId: siteId,
      json: sessions
    });
  }).catch(function (err) {
    logger.error('fetchActiveSessions', err);
    throw err;
  });
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actions.js");
  reactHotLoader.register(fetchStoredSession, "fetchStoredSession", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actions.js");
  reactHotLoader.register(fetchSiteEvents, "fetchSiteEvents", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actions.js");
  reactHotLoader.register(fetchActiveSessions, "fetchActiveSessions", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sessions/activeSessionStore.js":
/*!*****************************************************!*\
  !*** ./src/app/flux/sessions/activeSessionStore.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sessions/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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



var ActiveSessionRec = Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  id: undefined,
  namespace: undefined,
  login: undefined,
  active: undefined,
  created: undefined,
  last_active: undefined,
  server_id: undefined,
  siteId: undefined,
  parties: Object(immutable__WEBPACK_IMPORTED_MODULE_1__["List"])()
});
var PartyRecord = Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  user: undefined,
  serverIp: undefined,
  serverId: undefined
});

var defaultState = function defaultState() {
  return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({});
};

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return defaultState();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["RECEIVE_ACTIVE_SESSIONS"], receive);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function receive(state, _ref) {
  var siteId = _ref.siteId,
      json = _ref.json;
  var jsonArray = json || [];
  var newState = defaultState().withMutations(function (newState) {
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
  var rec = new ActiveSessionRec(Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(_objectSpread({}, json, {
    siteId: siteId,
    parties: parties
  })));
  return rec;
}

function createParties(jsonArray) {
  jsonArray = jsonArray || [];
  var list = new immutable__WEBPACK_IMPORTED_MODULE_1__["List"]();
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

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ActiveSessionRec, "ActiveSessionRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(PartyRecord, "PartyRecord", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(defaultState, "defaultState", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(receive, "receive", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(createSessionRec, "createSessionRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(createParties, "createParties", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/activeSessionStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sessions/archivedSessionStore.js":
/*!*******************************************************!*\
  !*** ./src/app/flux/sessions/archivedSessionStore.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sessions/actionTypes.js");
/* harmony import */ var app_lib_term_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/lib/term/enums */ "./src/app/lib/term/enums.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var StoredSessionRec = Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  id: undefined,
  user: undefined,
  created: undefined,
  nodeIp: undefined,
  last_active: undefined,
  server_id: undefined,
  siteId: undefined,
  parties: Object(immutable__WEBPACK_IMPORTED_MODULE_1__["List"])()
});

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["RECEIVE_SITE_EVENTS"], receive);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default); // uses events to build stored session objects

function receive(state, _ref) {
  var siteId = _ref.siteId,
      json = _ref.json;
  var jsonEvents = json || [];
  var tmp = {};
  return state.withMutations(function (state) {
    jsonEvents.forEach(function (item) {
      if (item.event !== app_lib_term_enums__WEBPACK_IMPORTED_MODULE_3__["EventTypeEnum"].START && item.event !== app_lib_term_enums__WEBPACK_IMPORTED_MODULE_3__["EventTypeEnum"].END) {
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

      if (event === app_lib_term_enums__WEBPACK_IMPORTED_MODULE_3__["EventTypeEnum"].START) {
        tmp[sid].created = time;
        tmp[sid].server_id = server_id;
        tmp[sid].nodeIp = item['addr.local'];
        tmp[sid].parties = [{
          user: user,
          serverIp: item['addr.remote']
        }];
      } // update the store only with new items


      if (event === app_lib_term_enums__WEBPACK_IMPORTED_MODULE_3__["EventTypeEnum"].END && !state.has(sid)) {
        tmp[sid].last_active = time;
        state.set(sid, new StoredSessionRec(Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(tmp[sid])));
      }
    });
  });
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StoredSessionRec, "StoredSessionRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/archivedSessionStore.js");
  reactHotLoader.register(receive, "receive", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/archivedSessionStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/archivedSessionStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sessions/eventStore.js":
/*!*********************************************!*\
  !*** ./src/app/flux/sessions/eventStore.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sessions/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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



var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["RECEIVE_SITE_EVENTS"], receive);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function receive(state, _ref) {
  var json = _ref.json;
  var jsonEvents = json || [];
  return state.withMutations(function (state) {
    jsonEvents.forEach(function (item) {
      var sid = item.sid,
          event = item.event;

      if (!state.has(sid)) {
        state.set(sid, Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({}));
      }

      state.setIn([sid, event], Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(item));
    });
  });
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(receive, "receive", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/eventStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sessions/eventStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/settings/actionTypes.js":
/*!**********************************************!*\
  !*** ./src/app/flux/settings/actionTypes.js ***!
  \**********************************************/
/*! exports provided: INIT, ADD_NAV_ITEM, SET_RES_TO_DELETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INIT", function() { return INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_NAV_ITEM", function() { return ADD_NAV_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RES_TO_DELETE", function() { return SET_RES_TO_DELETE; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(INIT, "INIT", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/settings/actionTypes.js");
  reactHotLoader.register(ADD_NAV_ITEM, "ADD_NAV_ITEM", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/settings/actionTypes.js");
  reactHotLoader.register(SET_RES_TO_DELETE, "SET_RES_TO_DELETE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/settings/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/settings/store.js":
/*!****************************************!*\
  !*** ./src/app/flux/settings/store.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/settings/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var SettingsRec =
/*#__PURE__*/
function (_Record) {
  _inherits(SettingsRec, _Record);

  function SettingsRec(params) {
    _classCallCheck(this, SettingsRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(SettingsRec).call(this, params));
  }

  _createClass(SettingsRec, [{
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return SettingsRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  isInitialized: false,
  navItems: new immutable__WEBPACK_IMPORTED_MODULE_1__["List"]()
}));

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new SettingsRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["INIT"], function (state) {
      return state.set('isInitialized', true);
    });
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["ADD_NAV_ITEM"], function (state, navItem) {
      return state.addNavItem(navItem);
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SettingsRec, "SettingsRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/settings/store.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/settings/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sites/actionTypes.js":
/*!*******************************************!*\
  !*** ./src/app/flux/sites/actionTypes.js ***!
  \*******************************************/
/*! exports provided: RECEIVE_CLUSTERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_CLUSTERS", function() { return RECEIVE_CLUSTERS; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RECEIVE_CLUSTERS, "RECEIVE_CLUSTERS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sites/actions.js":
/*!***************************************!*\
  !*** ./src/app/flux/sites/actions.js ***!
  \***************************************/
/*! exports provided: showCluster, changeCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showCluster", function() { return showCluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCluster", function() { return changeCluster; });
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var app_services_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/history */ "./src/app/services/history.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  var route = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].getClusterUrl(clusterId);
  app_services_history__WEBPACK_IMPORTED_MODULE_1__["default"].push(route);
}
function changeCluster(clusterId) {
  var nodesUrl = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].getClusterNodesUrl(clusterId);
  var sessionsUrl = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].getClusterSessionsUrl(clusterId);
  var currentRoute = app_services_history__WEBPACK_IMPORTED_MODULE_1__["default"].original().location.pathname;
  var isNodeRoute = Object(react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"])(currentRoute, {
    path: app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes.clusterNodes,
    exact: true
  });
  var isSessionRoute = Object(react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"])(currentRoute, {
    path: app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes.clusterSessions,
    exact: true
  });

  if (isNodeRoute) {
    app_services_history__WEBPACK_IMPORTED_MODULE_1__["default"].push(nodesUrl);
  }

  if (isSessionRoute) {
    app_services_history__WEBPACK_IMPORTED_MODULE_1__["default"].push(sessionsUrl);
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(showCluster, "showCluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/actions.js");
  reactHotLoader.register(changeCluster, "changeCluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sites/getters.js":
/*!***************************************!*\
  !*** ./src/app/flux/sites/getters.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var sites = [['tlpt_sites'], function (siteList) {
  return siteList.filter(onlyOnline).toArray();
}];
var _default = {
  sites: sites
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SiteStatusEnum, "SiteStatusEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/getters.js");
  reactHotLoader.register(onlyOnline, "onlyOnline", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/getters.js");
  reactHotLoader.register(sites, "sites", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/getters.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/getters.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sites/siteStore.js":
/*!*****************************************!*\
  !*** ./src/app/flux/sites/siteStore.js ***!
  \*****************************************/
/*! exports provided: SiteRec, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteRec", function() { return SiteRec; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sites/actionTypes.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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



var SiteRec =
/*#__PURE__*/
function (_Record) {
  _inherits(SiteRec, _Record);

  function SiteRec(json) {
    _classCallCheck(this, SiteRec);

    var params = _objectSpread({}, json, {
      connectedAt: json.last_connected
    });

    return _possibleConstructorReturn(this, _getPrototypeOf(SiteRec).call(this, params));
  }

  _createClass(SiteRec, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return SiteRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Record"])({
  name: null,
  status: '',
  connectedAt: null
}));

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["RECEIVE_CLUSTERS"], receiveSites);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function receiveSites(state, json) {
  return new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](json.map(function (o) {
    return new SiteRec(o);
  }));
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SiteRec, "SiteRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/siteStore.js");
  reactHotLoader.register(receiveSites, "receiveSites", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/siteStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sites/siteStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sshHistory/actionTypes.js":
/*!************************************************!*\
  !*** ./src/app/flux/sshHistory/actionTypes.js ***!
  \************************************************/
/*! exports provided: ADD_ITEM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ITEM", function() { return ADD_ITEM; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ADD_ITEM, "ADD_ITEM", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/sshHistory/store.js":
/*!******************************************!*\
  !*** ./src/app/flux/sshHistory/store.js ***!
  \******************************************/
/*! exports provided: SshHistoryRec, register, getters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SshHistoryRec", function() { return SshHistoryRec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/sshHistory/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return SshHistoryRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  clusterLogins: new immutable__WEBPACK_IMPORTED_MODULE_1__["Map"]()
}));
var store = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new SshHistoryRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["ADD_ITEM"], function (state, params) {
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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(STORE_NAME, "STORE_NAME", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/store.js");
  reactHotLoader.register(SshHistoryRec, "SshHistoryRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/store.js");
  reactHotLoader.register(store, "store", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/store.js");
  reactHotLoader.register(register, "register", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/store.js");
  reactHotLoader.register(getters, "getters", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/sshHistory/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/status/actionTypes.js":
/*!********************************************!*\
  !*** ./src/app/flux/status/actionTypes.js ***!
  \********************************************/
/*! exports provided: START, SUCCESS, FAIL, CLEAR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START", function() { return START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCESS", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAIL", function() { return FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR", function() { return CLEAR; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(START, "START", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actionTypes.js");
  reactHotLoader.register(SUCCESS, "SUCCESS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actionTypes.js");
  reactHotLoader.register(FAIL, "FAIL", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actionTypes.js");
  reactHotLoader.register(CLEAR, "CLEAR", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/status/actions.js":
/*!****************************************!*\
  !*** ./src/app/flux/status/actions.js ***!
  \****************************************/
/*! exports provided: makeStatus, initAppStatus, loginStatus, fetchInviteStatus, signupStatus, initSettingsStatus, changePasswordStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeStatus", function() { return makeStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAppStatus", function() { return initAppStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginStatus", function() { return loginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInviteStatus", function() { return fetchInviteStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupStatus", function() { return signupStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSettingsStatus", function() { return initSettingsStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePasswordStatus", function() { return changePasswordStatus; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/status/actionTypes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/app/flux/status/constants.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["START"], {
        type: reqType
      });
    },
    success: function success(message) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"], {
        type: reqType,
        message: message
      });
    },
    fail: function fail(message) {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FAIL"], {
        type: reqType,
        message: message
      });
    },
    clear: function clear() {
      app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CLEAR"], {
        type: reqType
      });
    }
  };
}
var initAppStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["TRYING_TO_INIT_APP"]);
var loginStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["TRYING_TO_LOGIN"]);
var fetchInviteStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["FETCHING_INVITE"]);
var signupStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["TRYING_TO_SIGN_UP"]);
var initSettingsStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["TRYING_TO_INIT_SETTINGS"]);
var changePasswordStatus = makeStatus(_constants__WEBPACK_IMPORTED_MODULE_2__["TRYING_TO_CHANGE_PSW"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(makeStatus, "makeStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(initAppStatus, "initAppStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(loginStatus, "loginStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(fetchInviteStatus, "fetchInviteStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(signupStatus, "signupStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(initSettingsStatus, "initSettingsStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  reactHotLoader.register(changePasswordStatus, "changePasswordStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/status/constants.js":
/*!******************************************!*\
  !*** ./src/app/flux/status/constants.js ***!
  \******************************************/
/*! exports provided: TRYING_TO_SIGN_UP, TRYING_TO_LOGIN, FETCHING_INVITE, TRYING_TO_INIT_APP, TRYING_TO_INIT_SETTINGS, TRYING_TO_CHANGE_PSW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRYING_TO_SIGN_UP", function() { return TRYING_TO_SIGN_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRYING_TO_LOGIN", function() { return TRYING_TO_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCHING_INVITE", function() { return FETCHING_INVITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRYING_TO_INIT_APP", function() { return TRYING_TO_INIT_APP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRYING_TO_INIT_SETTINGS", function() { return TRYING_TO_INIT_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRYING_TO_CHANGE_PSW", function() { return TRYING_TO_CHANGE_PSW; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TRYING_TO_SIGN_UP, "TRYING_TO_SIGN_UP", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  reactHotLoader.register(TRYING_TO_LOGIN, "TRYING_TO_LOGIN", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  reactHotLoader.register(FETCHING_INVITE, "FETCHING_INVITE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  reactHotLoader.register(TRYING_TO_INIT_APP, "TRYING_TO_INIT_APP", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  reactHotLoader.register(TRYING_TO_INIT_SETTINGS, "TRYING_TO_INIT_SETTINGS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  reactHotLoader.register(TRYING_TO_CHANGE_PSW, "TRYING_TO_CHANGE_PSW", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/constants.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/status/getters.js":
/*!****************************************!*\
  !*** ./src/app/flux/status/getters.js ***!
  \****************************************/
/*! exports provided: makeGetter, initAppAttempt, loginAttempt, fetchInviteAttempt, signupAttempt, initSettingsAttempt, changePasswordAttempt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeGetter", function() { return makeGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAppAttempt", function() { return initAppAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginAttempt", function() { return loginAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInviteAttempt", function() { return fetchInviteAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupAttempt", function() { return signupAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSettingsAttempt", function() { return initSettingsAttempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePasswordAttempt", function() { return changePasswordAttempt; });
/* harmony import */ var _statusStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statusStore */ "./src/app/flux/status/statusStore.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/app/flux/status/constants.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
    return rec || new _statusStore__WEBPACK_IMPORTED_MODULE_0__["TrackRec"]();
  }];
};
var initAppAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["TRYING_TO_INIT_APP"]);
var loginAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["TRYING_TO_LOGIN"]);
var fetchInviteAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["FETCHING_INVITE"]);
var signupAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["TRYING_TO_SIGN_UP"]);
var initSettingsAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["TRYING_TO_INIT_SETTINGS"]);
var changePasswordAttempt = makeGetter(_constants__WEBPACK_IMPORTED_MODULE_1__["TRYING_TO_CHANGE_PSW"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(STORE_NAME, "STORE_NAME", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(makeGetter, "makeGetter", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(initAppAttempt, "initAppAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(loginAttempt, "loginAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(fetchInviteAttempt, "fetchInviteAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(signupAttempt, "signupAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(initSettingsAttempt, "initSettingsAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  reactHotLoader.register(changePasswordAttempt, "changePasswordAttempt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/getters.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/status/statusStore.js":
/*!********************************************!*\
  !*** ./src/app/flux/status/statusStore.js ***!
  \********************************************/
/*! exports provided: TrackRec, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackRec", function() { return TrackRec; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/status/actionTypes.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])({});
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["START"], start);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FAIL"], fail);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"], success);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CLEAR"], clear);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

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

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TrackRec, "TrackRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  reactHotLoader.register(start, "start", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  reactHotLoader.register(fail, "fail", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  reactHotLoader.register(success, "success", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  reactHotLoader.register(clear, "clear", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/status/statusStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/storedSessionsFilter/actionTypes.js":
/*!**********************************************************!*\
  !*** ./src/app/flux/storedSessionsFilter/actionTypes.js ***!
  \**********************************************************/
/*! exports provided: TLPT_STORED_SESSINS_FILTER_SET_RANGE, TLPT_STORED_SESSINS_FILTER_SET_STATUS, TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_STORED_SESSINS_FILTER_SET_RANGE", function() { return TLPT_STORED_SESSINS_FILTER_SET_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_STORED_SESSINS_FILTER_SET_STATUS", function() { return TLPT_STORED_SESSINS_FILTER_SET_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE", function() { return TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TLPT_STORED_SESSINS_FILTER_SET_RANGE, "TLPT_STORED_SESSINS_FILTER_SET_RANGE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/storedSessionsFilter/actionTypes.js");
  reactHotLoader.register(TLPT_STORED_SESSINS_FILTER_SET_STATUS, "TLPT_STORED_SESSINS_FILTER_SET_STATUS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/storedSessionsFilter/actionTypes.js");
  reactHotLoader.register(TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE, "TLPT_STORED_SESSINS_FILTER_RECEIVE_MORE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/storedSessionsFilter/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/storedSessionsFilter/storedSessionFilterStore.js":
/*!***********************************************************************!*\
  !*** ./src/app/flux/storedSessionsFilter/storedSessionFilterStore.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/storedSessionsFilter/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    var end = moment__WEBPACK_IMPORTED_MODULE_1___default()(new Date()).endOf('day').toDate();
    var start = moment__WEBPACK_IMPORTED_MODULE_1___default()(end).subtract(3, 'day').startOf('day').toDate();
    var state = {
      start: start,
      end: end
    };
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(state);
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["TLPT_STORED_SESSINS_FILTER_SET_RANGE"], setRange);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function setRange(state, newState) {
  return state.merge(newState);
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(setRange, "setRange", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/storedSessionsFilter/storedSessionFilterStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/storedSessionsFilter/storedSessionFilterStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/terminal/actionTypes.js":
/*!**********************************************!*\
  !*** ./src/app/flux/terminal/actionTypes.js ***!
  \**********************************************/
/*! exports provided: TLPT_TERMINAL_INIT, TLPT_TERMINAL_CLOSE, TLPT_TERMINAL_SET_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_TERMINAL_INIT", function() { return TLPT_TERMINAL_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_TERMINAL_CLOSE", function() { return TLPT_TERMINAL_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TLPT_TERMINAL_SET_STATUS", function() { return TLPT_TERMINAL_SET_STATUS; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TLPT_TERMINAL_INIT, "TLPT_TERMINAL_INIT", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/actionTypes.js");
  reactHotLoader.register(TLPT_TERMINAL_CLOSE, "TLPT_TERMINAL_CLOSE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/actionTypes.js");
  reactHotLoader.register(TLPT_TERMINAL_SET_STATUS, "TLPT_TERMINAL_SET_STATUS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/terminal/store.js":
/*!****************************************!*\
  !*** ./src/app/flux/terminal/store.js ***!
  \****************************************/
/*! exports provided: TermRec, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermRec", function() { return TermRec; });
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_services_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/localStorage */ "./src/app/services/localStorage.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/terminal/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





var TermStatusRec = new immutable__WEBPACK_IMPORTED_MODULE_1__["Record"]({
  isReady: false,
  isLoading: false,
  isNotFound: false,
  isError: false,
  errorText: undefined
});
var TermRec =
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
      var _localStorage$getBear = app_services_localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].getBearerToken(),
          accessToken = _localStorage$getBear.accessToken;

      var server_id = this.serverId;
      return {
        login: this.login,
        sid: this.sid,
        token: accessToken,
        ttyUrl: app_config__WEBPACK_IMPORTED_MODULE_2__["default"].api.ttyWsAddr,
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return TermRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  status: TermStatusRec(),
  hostname: null,
  login: null,
  siteId: null,
  serverId: null,
  sid: null
}));

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return new TermRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_4__["TLPT_TERMINAL_INIT"], init);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_4__["TLPT_TERMINAL_CLOSE"], close);
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_4__["TLPT_TERMINAL_SET_STATUS"], changeStatus);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function close() {
  return new TermRec();
}

function init(state, json) {
  return new TermRec(json);
}

function changeStatus(state, status) {
  return state.setIn(['status'], new TermStatusRec(status));
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TermStatusRec, "TermStatusRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  reactHotLoader.register(TermRec, "TermRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  reactHotLoader.register(close, "close", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  reactHotLoader.register(init, "init", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  reactHotLoader.register(changeStatus, "changeStatus", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/terminal/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/user/actionTypes.js":
/*!******************************************!*\
  !*** ./src/app/flux/user/actionTypes.js ***!
  \******************************************/
/*! exports provided: RECEIVE_USER, RECEIVE_INVITE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_USER", function() { return RECEIVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_INVITE", function() { return RECEIVE_INVITE; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RECEIVE_USER, "RECEIVE_USER", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actionTypes.js");
  reactHotLoader.register(RECEIVE_INVITE, "RECEIVE_INVITE", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/user/actions.js":
/*!**************************************!*\
  !*** ./src/app/flux/user/actions.js ***!
  \**************************************/
/*! exports provided: fetchInvite, acceptInvite, acceptInviteWithU2f, loginWithSso, loginWithU2f, login, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchInvite", function() { return fetchInvite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acceptInvite", function() { return acceptInvite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acceptInviteWithU2f", function() { return acceptInviteWithU2f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginWithSso", function() { return loginWithSso; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginWithU2f", function() { return loginWithU2f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var app_services_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/services/auth */ "./src/app/services/auth.js");
/* harmony import */ var app_services_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/services/history */ "./src/app/services/history.js");
/* harmony import */ var app_services_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/session */ "./src/app/services/session.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var app_services_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/services/api */ "./src/app/services/api.js");
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
/* harmony import */ var _status_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../status/actions */ "./src/app/flux/status/actions.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/user/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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









var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_6__["default"].create('flux/user/actions');
function fetchInvite(inviteToken) {
  var path = app_config__WEBPACK_IMPORTED_MODULE_4__["default"].api.getInviteUrl(inviteToken);
  _status_actions__WEBPACK_IMPORTED_MODULE_7__["fetchInviteStatus"].start();
  return app_services_api__WEBPACK_IMPORTED_MODULE_5__["default"].get(path).then(function (invite) {
    _status_actions__WEBPACK_IMPORTED_MODULE_7__["fetchInviteStatus"].success();
    app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["RECEIVE_INVITE"], invite);
  }).catch(function (err) {
    _status_actions__WEBPACK_IMPORTED_MODULE_7__["fetchInviteStatus"].fail(err.message);
  });
}
function acceptInvite(name, psw, token, inviteToken) {
  var promise = app_services_auth__WEBPACK_IMPORTED_MODULE_1__["default"].acceptInvite(name, psw, token, inviteToken);
  return _handleAcceptInvitePromise(promise);
}
function acceptInviteWithU2f(name, psw, inviteToken) {
  var promise = app_services_auth__WEBPACK_IMPORTED_MODULE_1__["default"].acceptInviteWithU2f(name, psw, inviteToken);
  return _handleAcceptInvitePromise(promise);
}
function loginWithSso(providerName, providerUrl) {
  var entryUrl = _getEntryRoute();

  app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].push(app_config__WEBPACK_IMPORTED_MODULE_4__["default"].api.getSsoUrl(providerUrl, providerName, entryUrl), true);
}
function loginWithU2f(user, password) {
  var promise = app_services_auth__WEBPACK_IMPORTED_MODULE_1__["default"].loginWithU2f(user, password);
  return _handleLoginPromise(promise);
}
function login(user, password, token) {
  var promise = app_services_auth__WEBPACK_IMPORTED_MODULE_1__["default"].login(user, password, token);
  return _handleLoginPromise(promise);
}
function logout() {
  app_services_session__WEBPACK_IMPORTED_MODULE_3__["default"].logout();
}

function _handleAcceptInvitePromise(promise) {
  _status_actions__WEBPACK_IMPORTED_MODULE_7__["signupStatus"].start();
  return promise.then(function () {
    app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].push(app_config__WEBPACK_IMPORTED_MODULE_4__["default"].routes.app, true);
  }).catch(function (err) {
    logger.error('accept invite', err);
    _status_actions__WEBPACK_IMPORTED_MODULE_7__["signupStatus"].fail(err.message);
  });
}

function _handleLoginPromise(promise) {
  _status_actions__WEBPACK_IMPORTED_MODULE_7__["loginStatus"].start();
  return promise.then(function () {
    var url = _getEntryRoute();

    app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].push(url, true);
  }).catch(function (err) {
    logger.error('login', err);
    _status_actions__WEBPACK_IMPORTED_MODULE_7__["loginStatus"].fail(err.message);
  });
}

function _getEntryRoute() {
  var entryUrl = app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].getRedirectParam();

  if (entryUrl) {
    entryUrl = app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].ensureSafeRoute(entryUrl);
  } else {
    entryUrl = app_config__WEBPACK_IMPORTED_MODULE_4__["default"].routes.app;
  }

  return app_services_history__WEBPACK_IMPORTED_MODULE_2__["default"].ensureBaseUrl(entryUrl);
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(fetchInvite, "fetchInvite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(acceptInvite, "acceptInvite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(acceptInviteWithU2f, "acceptInviteWithU2f", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(loginWithSso, "loginWithSso", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(loginWithU2f, "loginWithU2f", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(login, "login", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(logout, "logout", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(_handleAcceptInvitePromise, "_handleAcceptInvitePromise", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(_handleLoginPromise, "_handleLoginPromise", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  reactHotLoader.register(_getEntryRoute, "_getEntryRoute", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/user/index.js":
/*!************************************!*\
  !*** ./src/app/flux/user/index.js ***!
  \************************************/
/*! exports provided: getUser, getters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/flux/status/getters */ "./src/app/flux/status/getters.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate([STORE_NAME]);
}
var invite = [['tlpt_user_invite'], function (invite) {
  return invite;
}];
var userName = [STORE_NAME, 'name'];
var getters = {
  userName: userName,
  invite: invite,
  pswChangeAttempt: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__["changePasswordAttempt"],
  loginAttemp: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__["loginAttempt"],
  attemp: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__["signupAttempt"],
  fetchingInvite: app_flux_status_getters__WEBPACK_IMPORTED_MODULE_1__["fetchInviteAttempt"]
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(STORE_NAME, "STORE_NAME", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/index.js");
  reactHotLoader.register(getUser, "getUser", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/index.js");
  reactHotLoader.register(invite, "invite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/index.js");
  reactHotLoader.register(userName, "userName", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/index.js");
  reactHotLoader.register(getters, "getters", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/user/userInviteStore.js":
/*!**********************************************!*\
  !*** ./src/app/flux/user/userInviteStore.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/user/actionTypes.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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



var Invite = new immutable__WEBPACK_IMPORTED_MODULE_2__["Record"]({
  invite_token: '',
  user: '',
  qr: ''
});

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(null);
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_1__["RECEIVE_INVITE"], receiveInvite);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function receiveInvite(state, json) {
  return new Invite(json);
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Invite, "Invite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userInviteStore.js");
  reactHotLoader.register(receiveInvite, "receiveInvite", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userInviteStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userInviteStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/user/userStore.js":
/*!****************************************!*\
  !*** ./src/app/flux/user/userStore.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/user/actionTypes.js");
/* harmony import */ var app_services_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/services/enums */ "./src/app/services/enums.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





var UserRec =
/*#__PURE__*/
function (_Record) {
  _inherits(UserRec, _Record);

  function UserRec(params) {
    _classCallCheck(this, UserRec);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserRec).call(this, params));
  }

  _createClass(UserRec, [{
    key: "isSso",
    value: function isSso() {
      return this.get('authType') === app_services_enums__WEBPACK_IMPORTED_MODULE_3__["AuthTypeEnum"].SSO;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.get('name');
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return UserRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_1__["Record"])({
  name: '',
  authType: ''
}));

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["Store"])({
  getInitialState: function getInitialState() {
    return Object(nuclear_js__WEBPACK_IMPORTED_MODULE_0__["toImmutable"])(null);
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_2__["RECEIVE_USER"], receiveUser);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);

function receiveUser(state, json) {
  return new UserRec(json);
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserRec, "UserRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userStore.js");
  reactHotLoader.register(receiveUser, "receiveUser", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userStore.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/user/userStore.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/userAcl/actionTypes.js":
/*!*********************************************!*\
  !*** ./src/app/flux/userAcl/actionTypes.js ***!
  \*********************************************/
/*! exports provided: RECEIVE_USERACL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECEIVE_USERACL", function() { return RECEIVE_USERACL; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RECEIVE_USERACL, "RECEIVE_USERACL", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/actionTypes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/userAcl/getters.js":
/*!*****************************************!*\
  !*** ./src/app/flux/userAcl/getters.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
var _default = {
  userAcl: userAcl
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(userAcl, "userAcl", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/getters.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/getters.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/flux/userAcl/store.js":
/*!***************************************!*\
  !*** ./src/app/flux/userAcl/store.js ***!
  \***************************************/
/*! exports provided: getAcl, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAcl", function() { return getAcl; });
/* harmony import */ var app_reactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/reactor */ "./src/app/reactor.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actionTypes */ "./src/app/flux/userAcl/actionTypes.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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



 // sort logins by making 'root' as the first in the list

var sortLogins = function sortLogins(loginList) {
  var index = loginList.indexOf('root');

  if (index !== -1) {
    loginList = loginList.remove(index);
    return loginList.sort().unshift('root');
  }

  return loginList;
};

var Access = new immutable__WEBPACK_IMPORTED_MODULE_2__["Record"]({
  list: false,
  read: false,
  edit: false,
  create: false,
  remove: false
});

var AccessListRec =
/*#__PURE__*/
function (_Record) {
  _inherits(AccessListRec, _Record);

  function AccessListRec() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AccessListRec);

    var map = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_1__["toImmutable"])(json);
    var sshLogins = new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](map.get('sshLogins'));
    var params = {
      sshLogins: sortLogins(sshLogins),
      authConnectors: new Access(map.get('authConnectors')),
      trustedClusters: new Access(map.get('trustedClusters')),
      roles: new Access(map.get('roles')),
      sessions: new Access(map.get('sessions'))
    };
    return _possibleConstructorReturn(this, _getPrototypeOf(AccessListRec).call(this, params));
  }

  _createClass(AccessListRec, [{
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AccessListRec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Record"])({
  authConnectors: new Access(),
  trustedClusters: new Access(),
  roles: new Access(),
  sessions: new Access(),
  sshLogins: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]()
}));

function getAcl() {
  return app_reactor__WEBPACK_IMPORTED_MODULE_0__["default"].evaluate(['tlpt_user_acl']);
}

var _default = Object(nuclear_js__WEBPACK_IMPORTED_MODULE_1__["Store"])({
  getInitialState: function getInitialState() {
    return new AccessListRec();
  },
  initialize: function initialize() {
    this.on(_actionTypes__WEBPACK_IMPORTED_MODULE_3__["RECEIVE_USERACL"], function (state, json) {
      return new AccessListRec(json);
    });
  }
});

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(sortLogins, "sortLogins", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/store.js");
  reactHotLoader.register(Access, "Access", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/store.js");
  reactHotLoader.register(AccessListRec, "AccessListRec", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/store.js");
  reactHotLoader.register(getAcl, "getAcl", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/store.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/flux/userAcl/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/index.jsx":
/*!***************************!*\
  !*** ./src/app/index.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _components_nuclear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/nuclear */ "./src/app/components/nuclear.jsx");
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Login */ "./src/app/components/Login/index.jsx");
/* harmony import */ var _components_Invite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Invite */ "./src/app/components/Invite/index.jsx");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config */ "./src/app/config.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/App */ "./src/app/components/App/index.js");
/* harmony import */ var _shared_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../shared/components/ThemeProvider */ "./src/shared/components/ThemeProvider/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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










Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__["setConfig"])({
  logLevel: 'no-errors-please'
});

var Root = function Root(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Router"], {
    history: props.history
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_nuclear__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
    reactor: props.reactor
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_components_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: _config__WEBPACK_IMPORTED_MODULE_6__["default"].routes.login,
    component: _components_Login__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: _config__WEBPACK_IMPORTED_MODULE_6__["default"].routes.newUser,
    component: _components_Invite__WEBPACK_IMPORTED_MODULE_5__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: _config__WEBPACK_IMPORTED_MODULE_6__["default"].routes.app,
    component: _components_App__WEBPACK_IMPORTED_MODULE_7__["default"]
  })))));
};

var _default = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__["hot"])(module)(Root);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Root, "Root", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/index.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/lib/logger.js":
/*!*******************************!*\
  !*** ./src/app/lib/logger.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Logger;
}();

var _default = {
  create: function create() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _construct(Logger, args);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Logger, "Logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/logger.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/logger.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/lib/objectUtils.js":
/*!************************************!*\
  !*** ./src/app/lib/objectUtils.js ***!
  \************************************/
/*! exports provided: parseIp, isMatch, isUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIp", function() { return parseIp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMatch", function() { return isMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUUID", function() { return isUUID; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(uuid, "uuid", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/objectUtils.js");
  reactHotLoader.register(PORT_REGEX, "PORT_REGEX", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/objectUtils.js");
  reactHotLoader.register(parseIp, "parseIp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/objectUtils.js");
  reactHotLoader.register(isMatch, "isMatch", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/objectUtils.js");
  reactHotLoader.register(isUUID, "isUUID", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/objectUtils.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/lib/patternUtils.js":
/*!*************************************!*\
  !*** ./src/app/lib/patternUtils.js ***!
  \*************************************/
/*! exports provided: compilePattern, matchPattern, getParamNames, getParams, formatPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compilePattern", function() { return compilePattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchPattern", function() { return matchPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParamNames", function() { return getParamNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParams", function() { return getParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPattern", function() { return formatPattern; });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(escapeRegExp, "escapeRegExp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(escapeSource, "escapeSource", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(_compilePattern, "_compilePattern", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(CompiledPatternsCache, "CompiledPatternsCache", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(compilePattern, "compilePattern", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(matchPattern, "matchPattern", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(getParamNames, "getParamNames", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(getParams, "getParams", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  reactHotLoader.register(formatPattern, "formatPattern", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/patternUtils.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/lib/term/enums.js":
/*!***********************************!*\
  !*** ./src/app/lib/term/enums.js ***!
  \***********************************/
/*! exports provided: EventTypeEnum, TermEventEnum, StatusCodeEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTypeEnum", function() { return EventTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermEventEnum", function() { return TermEventEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCodeEnum", function() { return StatusCodeEnum; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EventTypeEnum, "EventTypeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/term/enums.js");
  reactHotLoader.register(TermEventEnum, "TermEventEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/term/enums.js");
  reactHotLoader.register(StatusCodeEnum, "StatusCodeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/lib/term/enums.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/reactor.js":
/*!****************************!*\
  !*** ./src/app/reactor.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nuclear-js */ "./node_modules/nuclear-js/dist/nuclear.js");
/* harmony import */ var nuclear_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nuclear_js__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  debug: "development" === 'development'
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
var _default = reactor;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CSS, "CSS", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/reactor.js");
  reactHotLoader.register(options, "options", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/reactor.js");
  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/reactor.js");
  reactHotLoader.register(reactor, "reactor", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/reactor.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/reactor.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/api.js":
/*!*********************************!*\
  !*** ./src/app/services/api.js ***!
  \*********************************/
/*! exports provided: getAuthHeaders, getNoCacheHeaders, getXCSRFToken, getAccessToken, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthHeaders", function() { return getAuthHeaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNoCacheHeaders", function() { return getNoCacheHeaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getXCSRFToken", function() { return getXCSRFToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccessToken", function() { return getAccessToken; });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/app/services/localStorage.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../config */ "./src/app/config.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
    url = _config__WEBPACK_IMPORTED_MODULE_2__["default"].baseUrl + url;

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
  var bearerToken = _localStorage__WEBPACK_IMPORTED_MODULE_1__["default"].getBearerToken() || {};
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

var _default = api;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultCfg, "defaultCfg", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(api, "api", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(parseJSON, "parseJSON", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(getAuthHeaders, "getAuthHeaders", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(getNoCacheHeaders, "getNoCacheHeaders", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(getXCSRFToken, "getXCSRFToken", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(getAccessToken, "getAccessToken", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(getErrorText, "getErrorText", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/api.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/auth.js":
/*!**********************************!*\
  !*** ./src/app/services/auth.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/app/services/api.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var u2f_api_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! u2f-api-polyfill */ "./node_modules/u2f-api-polyfill/u2f-api-polyfill.js");
/* harmony import */ var u2f_api_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(u2f_api_polyfill__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.sessionPath, data, false);
  },
  loginWithU2f: function loginWithU2f(name, password) {
    var data = {
      user: name,
      pass: password
    };
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.u2fSessionChallengePath, data, false).then(function (data) {
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
          _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.u2fSessionPath, response, false).then(function (data) {
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
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.createUserPath, data, false);
  },
  acceptInviteWithU2f: function acceptInviteWithU2f(name, password, inviteToken) {
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.getU2fCreateUserChallengeUrl(inviteToken)).then(function (data) {
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
          _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.u2fCreateUserPath, response, false).then(function (data) {
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
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].put(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.changeUserPasswordPath, data);
  },
  changePasswordWithU2f: function changePasswordWithU2f(oldPass, newPass) {
    var data = {
      user: name,
      pass: oldPass
    };
    return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.u2fChangePassChallengePath, data).then(function (data) {
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
          _api__WEBPACK_IMPORTED_MODULE_0__["default"].put(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.changeUserPasswordPath, data).then(function (data) {
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
var _default = auth;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(auth, "auth", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/auth.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/auth.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/enums.js":
/*!***********************************!*\
  !*** ./src/app/services/enums.js ***!
  \***********************************/
/*! exports provided: AuthProviderTypeEnum, RestRespCodeEnum, Auth2faTypeEnum, AuthTypeEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthProviderTypeEnum", function() { return AuthProviderTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestRespCodeEnum", function() { return RestRespCodeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auth2faTypeEnum", function() { return Auth2faTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthTypeEnum", function() { return AuthTypeEnum; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthProviderTypeEnum, "AuthProviderTypeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/enums.js");
  reactHotLoader.register(RestRespCodeEnum, "RestRespCodeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/enums.js");
  reactHotLoader.register(Auth2faTypeEnum, "Auth2faTypeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/enums.js");
  reactHotLoader.register(AuthTypeEnum, "AuthTypeEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/enums.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/history.js":
/*!*************************************!*\
  !*** ./src/app/services/history.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history/createBrowserHistory */ "./node_modules/history/createBrowserHistory.js");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/lib/patternUtils */ "./src/app/lib/patternUtils.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
    var url = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes.login;

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
    url = this._canPush(url) ? url : app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes.app;
    return url;
  },
  ensureBaseUrl: function ensureBaseUrl(url) {
    url = url || '';

    if (url.indexOf(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].baseUrl) !== 0) {
      url = app_config__WEBPACK_IMPORTED_MODULE_2__["default"].baseUrl + url;
    }

    return url;
  },
  getRoutes: function getRoutes() {
    return Object.getOwnPropertyNames(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes).map(function (p) {
      return app_config__WEBPACK_IMPORTED_MODULE_2__["default"].routes[p];
    });
  },
  _canPush: function _canPush(route) {
    route = route || '';
    var routes = this.getRoutes();

    if (route.indexOf(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].baseUrl) === 0) {
      route = route.replace(app_config__WEBPACK_IMPORTED_MODULE_2__["default"].baseUrl, '');
    }

    return routes.some(match(route));
  },
  _pageRefresh: function _pageRefresh(route) {
    window.location.href = this.ensureBaseUrl(route);
  }
};

var match = function match(url) {
  return function (route) {
    var _matchPattern = Object(app_lib_patternUtils__WEBPACK_IMPORTED_MODULE_1__["matchPattern"])(route, url),
        remainingPathname = _matchPattern.remainingPathname;

    return remainingPathname !== null && remainingPathname.length === 0;
  };
};

var _default = history;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_inst, "_inst", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/history.js");
  reactHotLoader.register(history, "history", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/history.js");
  reactHotLoader.register(match, "match", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/history.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/history.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/localStorage.js":
/*!******************************************!*\
  !*** ./src/app/services/localStorage.js ***!
  \******************************************/
/*! exports provided: KeysEnum, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeysEnum", function() { return KeysEnum; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
var _default = storage;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(KeysEnum, "KeysEnum", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/localStorage.js");
  reactHotLoader.register(storage, "storage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/localStorage.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/localStorage.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/session.js":
/*!*************************************!*\
  !*** ./src/app/services/session.js ***!
  \*************************************/
/*! exports provided: BearerToken, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BearerToken", function() { return BearerToken; });
/* harmony import */ var app_lib_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/lib/logger */ "./src/app/lib/logger.js");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history */ "./src/app/services/history.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage */ "./src/app/services/localStorage.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api */ "./src/app/services/api.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





var EMPTY_TOKEN_CONTENT_LENGTH = 20;
var TOKEN_CHECKER_INTERVAL = 15 * 1000; //  every 15 sec

var logger = app_lib_logger__WEBPACK_IMPORTED_MODULE_0__["default"].create('services/sessions');
var BearerToken =
/*#__PURE__*/
function () {
  function BearerToken(json) {
    _classCallCheck(this, BearerToken);

    this.accessToken = json.token;
    this.expiresIn = json.expires_in;
    this.created = new Date().getTime();
  }

  _createClass(BearerToken, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return BearerToken;
}();
var sesstionCheckerTimerId = null;
var session = {
  logout: function logout() {
    var _this = this;

    var rememberLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return _api__WEBPACK_IMPORTED_MODULE_4__["default"].delete(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.sessionPath).finally(function () {
      _this.clear();

      _history__WEBPACK_IMPORTED_MODULE_2__["default"].goToLogin(rememberLocation);
    });
  },
  clear: function clear() {
    this._stopSessionChecker();

    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].unsubscribe(receiveMessage);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].setBearerToken(null);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].clear();
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
        _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].setBearerToken(token);
      } else {
        token = _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].getBearerToken();
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

    return _api__WEBPACK_IMPORTED_MODULE_4__["default"].post(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.renewTokenPath).then(this._receiveBearerToken.bind(this)).finally(function () {
      _this3._setAndBroadcastIsRenewing(false);
    });
  },
  _receiveBearerToken: function _receiveBearerToken(json) {
    var token = new BearerToken(json);
    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].setBearerToken(token);
  },
  _fetchStatus: function _fetchStatus() {
    var _this4 = this;

    _api__WEBPACK_IMPORTED_MODULE_4__["default"].get(app_config__WEBPACK_IMPORTED_MODULE_1__["default"].api.userStatusPath).catch(function (err) {
      // indicates that session is no longer valid (caused by server restarts or updates)
      if (err.status == 403) {
        _this4.logout();
      }
    });
  },
  _setAndBroadcastIsRenewing: function _setAndBroadcastIsRenewing(value) {
    this._setIsRenewing(value);

    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].broadcast(_localStorage__WEBPACK_IMPORTED_MODULE_3__["KeysEnum"].TOKEN_RENEW, value);
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
    _localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].subscribe(receiveMessage);
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

  if (_localStorage__WEBPACK_IMPORTED_MODULE_3__["default"].getBearerToken() === null) {
    session.logout();
  } // renewToken has been invoked from another tab


  if (key === _localStorage__WEBPACK_IMPORTED_MODULE_3__["KeysEnum"].TOKEN_RENEW && !!newValue) {
    session._setIsRenewing(JSON.parse(newValue));
  }
}

var _default = session;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EMPTY_TOKEN_CONTENT_LENGTH, "EMPTY_TOKEN_CONTENT_LENGTH", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(TOKEN_CHECKER_INTERVAL, "TOKEN_CHECKER_INTERVAL", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(logger, "logger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(BearerToken, "BearerToken", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(sesstionCheckerTimerId, "sesstionCheckerTimerId", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(session, "session", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(receiveMessage, "receiveMessage", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/session.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/app/services/utils.js":
/*!***********************************!*\
  !*** ./src/app/services/utils.js ***!
  \***********************************/
/*! exports provided: isDevEnv, isTestEnv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDevEnv", function() { return isDevEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTestEnv", function() { return isTestEnv; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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
  return "development" === 'development';
};
var isTestEnv = function isTestEnv() {
  return "development" === 'test';
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isDevEnv, "isDevEnv", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/utils.js");
  reactHotLoader.register(isTestEnv, "isTestEnv", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/app/services/utils.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/boot.js":
/*!*********************!*\
  !*** ./src/boot.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/index */ "./src/app/index.jsx");
/* harmony import */ var _app_services_history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/services/history */ "./src/app/services/history.js");
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/config */ "./src/app/config.js");
/* harmony import */ var _app_reactor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/reactor */ "./src/app/reactor.js");
/* harmony import */ var _app_flux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app/flux */ "./src/app/flux/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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







_app_services_history__WEBPACK_IMPORTED_MODULE_3__["default"].init();
_app_config__WEBPACK_IMPORTED_MODULE_4__["default"].init(window.GRV_CONFIG);

var render = function render(Component) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
    reactor: _app_reactor__WEBPACK_IMPORTED_MODULE_5__["default"],
    history: _app_services_history__WEBPACK_IMPORTED_MODULE_3__["default"].original()
  }), document.getElementById('app'));
};

render(_app_index__WEBPACK_IMPORTED_MODULE_2__["default"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(render, "render", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/boot.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Alerts/index.jsx":
/*!************************************************!*\
  !*** ./src/shared/components/Alerts/index.jsx ***!
  \************************************************/
/*! exports provided: default, Danger, Warning, Info, Success */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Danger", function() { return Danger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Warning", function() { return Warning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return Info; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Success", function() { return Success; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();







var alertType = function alertType(props) {
  switch (props.type) {
    case 'danger':
      return {
        background: _theme__WEBPACK_IMPORTED_MODULE_4__["background"].error,
        borderColor: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].error,
        color: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].error
      };

    case 'info':
      return {
        background: _theme__WEBPACK_IMPORTED_MODULE_4__["background"].error,
        color: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].text
      };

    case 'warning':
      return {
        background: _theme__WEBPACK_IMPORTED_MODULE_4__["background"].error,
        color: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].text
      };

    case 'success':
      return {
        background: _theme__WEBPACK_IMPORTED_MODULE_4__["background"].error,
        color: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].text
      };

    default:
      return {
        background: _theme__WEBPACK_IMPORTED_MODULE_4__["background"].error,
        color: _theme__WEBPACK_IMPORTED_MODULE_4__["colors"].text
      };
  }
};

var Alert = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "Alerts__Alert",
  componentId: "sc-1ku7asp-0"
})(["border-width:2px;border-style:solid;border-radius:8px;font-weight:bold;font-size:14px;line-height:24px;margin:0 0 16px 0;padding:8px 16px;text-align:center;-webkit-font-smoothing:antialiased;word-break:break-all;", " ", ""], styled_system__WEBPACK_IMPORTED_MODULE_3__["space"], alertType);
var numberStringOrArray = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array]);
Alert.propTypes = {
  /** Size */
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['danger', 'info', 'warning', 'success']),

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
var _default = Alert;
/* harmony default export */ __webpack_exports__["default"] = (_default);
var Danger = function Danger(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    type: "danger"
  }, props.children);
};
var Warning = function Warning(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    type: "warning"
  }, props.children);
};
var Info = function Info(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    type: "info"
  }, props.children);
};
var Success = function Success(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Alert, {
    type: "success"
  }, props.children);
};
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(alertType, "alertType", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(Alert, "Alert", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(numberStringOrArray, "numberStringOrArray", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(Danger, "Danger", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(Warning, "Warning", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(Info, "Info", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(Success, "Success", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Alerts/index.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Box/Box.jsx":
/*!*******************************************!*\
  !*** ./src/shared/components/Box/Box.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





var Box = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "Box",
  componentId: "sc-1cwekyo-0"
})(["", " ", " ", " ", " ", " ", " ", ""], styled_system__WEBPACK_IMPORTED_MODULE_1__["space"], styled_system__WEBPACK_IMPORTED_MODULE_1__["width"], styled_system__WEBPACK_IMPORTED_MODULE_1__["color"], styled_system__WEBPACK_IMPORTED_MODULE_1__["textAlign"], styled_system__WEBPACK_IMPORTED_MODULE_1__["flex"], styled_system__WEBPACK_IMPORTED_MODULE_1__["alignSelf"], styled_system__WEBPACK_IMPORTED_MODULE_1__["justifySelf"]);
Box.displayName = 'Box';
Box.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_3__["default"]
};
var numberStringOrArray = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array]);
Box.propTypes = {
  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  bg: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
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
var _default = Box;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Box, "Box", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Box/Box.jsx");
  reactHotLoader.register(numberStringOrArray, "numberStringOrArray", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Box/Box.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Box/Box.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Box/index.js":
/*!********************************************!*\
  !*** ./src/shared/components/Box/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/shared/components/Box/Box.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Box__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Box/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Button/Button.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/Button/Button.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();






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
      '&:hover, &:focus': {
        background: props.theme.colors.secondaryLight
      }
    };
  }

  if (props.warning) {
    color = {
      background: props.theme.colors.warning,
      '&:hover, &:focus': {
        background: props.theme.colors.error
      },
      '&:active': {
        opacity: .56
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

var Button = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button.withConfig({
  displayName: "Button",
  componentId: "xcx6qf-0"
})(["background:", ";border:none;border-radius:4px;color:", ";cursor:pointer;font-family:inherit;font-weight:bold;display:inline-block;line-height:40px;outline:none;text-align:center;text-decoration:none;text-transform:uppercase;transition:all .3s;-webkit-font-smoothing:antialiased;&:hover,&:focus{background:", ";}&:active{background:", ";color:rgba(255,255,255,.24);box-shadow:none;}&:disabled{background:rgba(255,255,255,.24);color:rgba(0,0,0,.24);}", " ", " ", " ", ""], function (props) {
  return props.theme.colors.primary;
}, function (props) {
  return props.theme.colors.light;
}, function (props) {
  return props.theme.colors.primaryLight;
}, function (props) {
  return props.theme.colors.primaryDark;
}, color, block, size, styled_system__WEBPACK_IMPORTED_MODULE_2__["space"]);
var numberStringOrArray = prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array]);
Button.propTypes = {
  /** Size */
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['small', 'medium', 'large']),
  block: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  secondary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

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
  theme: _theme__WEBPACK_IMPORTED_MODULE_3__["default"]
};
Button.displayName = 'Button';
var _default = Button;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(size, "size", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  reactHotLoader.register(color, "color", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  reactHotLoader.register(block, "block", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  reactHotLoader.register(Button, "Button", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  reactHotLoader.register(numberStringOrArray, "numberStringOrArray", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/Button.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Button/index.js":
/*!***********************************************!*\
  !*** ./src/shared/components/Button/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./src/shared/components/Button/Button.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Button__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Button/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Card/Card.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Card/Card.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Box */ "./src/shared/components/Box/index.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





var Card = Object(styled_components__WEBPACK_IMPORTED_MODULE_0__["default"])(_Box__WEBPACK_IMPORTED_MODULE_1__["default"]).withConfig({
  displayName: "Card",
  componentId: "sc-42qzlx-0"
})(["box-shadow:0 0 32px rgba(0,0,0,.12),0 8px 32px rgba(0,0,0,.24);border-radius:12px;background-color:", ";box-sizing:border-box;"], function (props) {
  return props.theme.background.secondary;
});
Card.propTypes = {
  boxShadowSize: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['sm', 'md', 'lg', 'xl']),
  borderColor: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  borderWidth: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf([1, 2])
};
Card.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_2__["default"]
};
Card.displayName = 'Card';
var _default = Card;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Card, "Card", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Card/Card.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Card/Card.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Card/index.js":
/*!*********************************************!*\
  !*** ./src/shared/components/Card/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card */ "./src/shared/components/Card/Card.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Card__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Card/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/DataTable/StyledTable.jsx":
/*!*********************************************************!*\
  !*** ./src/shared/components/DataTable/StyledTable.jsx ***!
  \*********************************************************/
/*! exports provided: StyledTable, StyledEmptyIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledTable", function() { return StyledTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledEmptyIndicator", function() { return StyledEmptyIndicator; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var StyledTable = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].table.withConfig({
  displayName: "StyledTable",
  componentId: "sc-1d2mbmy-0"
})(["background:", ";box-shadow:0 8px 32px rgba(0,0,0,.24);border-collapse:collapse;border-spacing:0;border-radius:4px;font-size:12px;margin:40px 0;width:100%;& > thead > tr > th,& > tbody > tr > th,& > tfoot > tr > th,& > thead > tr > td,& > tbody > tr > td,& > tfoot > tr > td{line-height:24px;padding:16px;vertical-align:top;}& > thead> tr > th,& > tbody> tr > th,& > tfoot> tr > th,& > thead> tr > td,& > tbody> tr > td,& > tfoot> tr > td{line-height:24px;padding:16px;vertical-align:top;}& > thead > tr > th{background:", ";color:rgba(255,255,255,.56);cursor:pointer;font-size:10px;font-weight:600;height:24px;line-height:24px;padding:0 16px;text-align:left;text-transform:uppercase;.icon{font-weight:bold;margin-left:8px;}}.no-data{font-size:14px;font-weight:500;opacity:.24;margin:24px 0;}"], function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.theme.background.quaternary;
});
var StyledEmptyIndicator = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "StyledTable__StyledEmptyIndicator",
  componentId: "sc-1d2mbmy-1"
})(["background:", ";border-radius:4px;box-sizing:border-box;margin:48px auto;max-width:720px;padding:32px;text-align:center;h2{font-size:32px;font-weight:300;line-height:40px;margin:0 0 16px 0;}p{font-size:12px;line-height:24px;margin:0;}a{color:", ";}"], function (props) {
  return props.theme.background.quaternary;
}, function (props) {
  return props.theme.colors.link;
});
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StyledTable, "StyledTable", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/StyledTable.jsx");
  reactHotLoader.register(StyledEmptyIndicator, "StyledEmptyIndicator", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/StyledTable.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/DataTable/Table.jsx":
/*!***************************************************!*\
  !*** ./src/shared/components/DataTable/Table.jsx ***!
  \***************************************************/
/*! exports provided: Column, Table, Cell, TextCell, SortHeaderCell, SortIndicator, SortTypes, EmptyIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextCell", function() { return TextCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortHeaderCell", function() { return SortHeaderCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortIndicator", function() { return SortIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortTypes", function() { return SortTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyIndicator", function() { return EmptyIndicator; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StyledTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StyledTable */ "./src/shared/components/DataTable/StyledTable.jsx");
/* harmony import */ var _Icon_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../Icon/Icon */ "./src/shared/components/Icon/Icon.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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



/**
* Sort indicator used by SortHeaderCell
*/

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, _getPrototypeOf(Table).apply(this, arguments));
  }

  _createClass(Table, [{
    key: "renderHeader",
    value: function renderHeader(children) {
      var _this = this;

      var data = this.props.data;
      var cells = children.map(function (item, index) {
        return _this.renderCell(item.props.header, _objectSpread({
          index: index,
          key: index,
          isHeader: true,
          data: data
        }, item.props));
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, cells));
    }
  }, {
    key: "renderBody",
    value: function renderBody(children) {
      var _this2 = this;

      var data = this.props.data;
      var count = this.props.rowCount;
      var rows = [];

      var _loop = function _loop(i) {
        var cells = children.map(function (item, index) {
          return _this2.renderCell(item.props.cell, _objectSpread({
            rowIndex: i,
            key: index,
            isHeader: false,
            data: data
          }, item.props));
        });
        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: i
        }, cells));
      };

      for (var i = 0; i < count; i++) {
        _loop(i);
      }

      if (rows.length) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, rows);
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          align: "center",
          colSpan: children ? children.length : 0
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          className: "no-data"
        }, "NO DATA AVAIALBLE"))));
      }
    }
  }, {
    key: "renderCell",
    value: function renderCell(cell, cellProps) {
      var content = null;

      if (react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(cell)) {
        content = react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(cell, cellProps);
      } else if (typeof cell === 'function') {
        content = cell(cellProps);
      }

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var children = [];
      react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.forEach(this.props.children, function (child) {
        if (child == null) {
          return;
        }

        if (!child.props._isColumn) {
          throw 'Should be Column';
        }

        children.push(child);
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StyledTable__WEBPACK_IMPORTED_MODULE_1__["StyledTable"], null, this.renderHeader(children), this.renderBody(children));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Table;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var SortIndicator = function SortIndicator(_ref) {
  var sortDir = _ref.sortDir;

  if (sortDir === SortTypes.DESC) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__["SortDesc"], null);
  }

  if (sortDir === SortTypes.ASC) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__["SortAsc"], null);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__["Sort"], null);
};

var Column =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Column, _React$Component2);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, _getPrototypeOf(Column).apply(this, arguments));
  }

  _createClass(Column, [{
    key: "render",
    value: function render() {
      throw new Error("Component Column should never render");
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Column;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(Column, "defaultProps", {
  _isColumn: true
});

var Cell = function Cell(props) {
  var isHeader = props.isHeader,
      children = props.children;
  var cell = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, children);

  if (isHeader) {
    cell = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, children);
  }

  return cell;
};

var TextCell = function TextCell(_ref2) {
  var rowIndex = _ref2.rowIndex,
      data = _ref2.data,
      columnKey = _ref2.columnKey,
      props = _objectWithoutProperties(_ref2, ["rowIndex", "data", "columnKey"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Cell, props, data[rowIndex][columnKey]);
};

var SortHeaderCell =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(SortHeaderCell, _React$Component3);

  function SortHeaderCell() {
    var _getPrototypeOf2;

    var _this3;

    _classCallCheck(this, SortHeaderCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SortHeaderCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onSortChange", function (e) {
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

  _createClass(SortHeaderCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sortDir = _this$props.sortDir,
          title = _this$props.title,
          props = _objectWithoutProperties(_this$props, ["sortDir", "title"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Cell, props, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: this.onSortChange
      }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SortIndicator, {
        sortDir: sortDir
      }));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return SortHeaderCell;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var EmptyIndicator =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(EmptyIndicator, _React$Component4);

  function EmptyIndicator() {
    _classCallCheck(this, EmptyIndicator);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmptyIndicator).apply(this, arguments));
  }

  _createClass(EmptyIndicator, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          title = _this$props2.title;
      var noResults = title || "No Results Found";
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StyledTable__WEBPACK_IMPORTED_MODULE_1__["StyledEmptyIndicator"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, noResults), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, children));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return EmptyIndicator;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(SortTypes, "SortTypes", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Table, "Table", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(SortIndicator, "SortIndicator", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Column, "Column", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Cell, "Cell", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(TextCell, "TextCell", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(SortHeaderCell, "SortHeaderCell", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(EmptyIndicator, "EmptyIndicator", "/Users/admin/Development/teleport/web/src/shared/components/DataTable/Table.jsx");
=======
  reactHotLoader.register(SortTypes, "SortTypes", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Table, "Table", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(SortIndicator, "SortIndicator", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Column, "Column", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(Cell, "Cell", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(TextCell, "TextCell", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(SortHeaderCell, "SortHeaderCell", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
  reactHotLoader.register(EmptyIndicator, "EmptyIndicator", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/DataTable/Table.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/DataTable/index.js":
/*!**************************************************!*\
  !*** ./src/shared/components/DataTable/index.js ***!
  \**************************************************/
/*! exports provided: Column, Table, Cell, TextCell, SortHeaderCell, SortIndicator, SortTypes, EmptyIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table */ "./src/shared/components/DataTable/Table.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["Column"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["Table"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["Cell"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextCell", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["TextCell"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortHeaderCell", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["SortHeaderCell"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortIndicator", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["SortIndicator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortTypes", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["SortTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyIndicator", function() { return _Table__WEBPACK_IMPORTED_MODULE_0__["EmptyIndicator"]; });




/***/ }),

/***/ "./src/shared/components/Flex/Flex.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Flex/Flex.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Flex = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "Flex",
  componentId: "sc-1jrhisy-0"
})(["display:flex;", " ", " ", " ", " ", " ", " ", ";"], styled_system__WEBPACK_IMPORTED_MODULE_1__["space"], styled_system__WEBPACK_IMPORTED_MODULE_1__["width"], styled_system__WEBPACK_IMPORTED_MODULE_1__["color"], styled_system__WEBPACK_IMPORTED_MODULE_1__["alignItems"], styled_system__WEBPACK_IMPORTED_MODULE_1__["justifyContent"], styled_system__WEBPACK_IMPORTED_MODULE_1__["flexWrap"], styled_system__WEBPACK_IMPORTED_MODULE_1__["flexDirection"]);
Flex.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_2__["default"]
};
Flex.propTypes = _objectSpread({}, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].space, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].width, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].color, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].alignItems, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].justifyContent, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].flexWrap, styled_system__WEBPACK_IMPORTED_MODULE_1__["propTypes"].flexDirection);
Flex.displayName = 'Flex';
var _default = Flex;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Flex, "Flex", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Flex/Flex.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Flex/Flex.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Flex/index.js":
/*!*********************************************!*\
  !*** ./src/shared/components/Flex/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Flex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Flex */ "./src/shared/components/Flex/Flex.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Flex__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Flex/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Heading/Heading.js":
/*!**************************************************!*\
  !*** ./src/shared/components/Heading/Heading.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Text */ "./src/shared/components/Text/index.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var Heading = _Text__WEBPACK_IMPORTED_MODULE_0__["default"].withComponent('h3');
Heading.displayName = 'Heading';
Heading.defaultProps = {
  regular: true,
  fontSize: 4,
  m: 0,
  theme: _theme__WEBPACK_IMPORTED_MODULE_1__["default"]
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
var _default = Heading;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Heading, "Heading", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Heading/Heading.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Heading/Heading.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Heading/index.js":
/*!************************************************!*\
  !*** ./src/shared/components/Heading/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Heading */ "./src/shared/components/Heading/Heading.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Heading__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Heading/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Icon/Icon.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Icon/Icon.jsx ***!
  \*********************************************/
/*! exports provided: CarrotDown, CarrotUp, CarrotLeft, CarrotRight, CarrotSort, Earth, CircleCheck, CircleCross, CircleStop, CirclePlay, CirclePause, Magnifier, Cluster, Ellipsis, Github, Google, SortDesc, SortAsc, Sort, CardView, CardViewSmall, ListView, Twitter, Facebook, CreditCard, CaretLeft, CaretRight, Apple, Windows, Linux, Visa, MasterCard, Discover, Amex, Paypal, Stripe, CreditCardAlt, Home, Apartment, Pencil, Edit, Cloud, Database, Server, ShieldCheck, Lock, Unlock, Cog, Trash, Archive, Clipboard, ClipboardUser, License, Play, Camera, Label, Profile, User, Users, AddUsers, CreditCardAlt2, Cash, Phone, MapMarker, Calendar, Signal, SmartPhone, Tablet, Window, Power, Bubble, Graph, Shart, Speed, Planet, VolumeUp, Mute, Lan, LanAlt, Wifi, Cli, Code, Link, Cross, ListCheck, ListBullet, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowsVertical, Expand, Contract, Layers, Spinner, FacebookSquare, Youtube, Linkedin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrotDown", function() { return CarrotDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrotUp", function() { return CarrotUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrotLeft", function() { return CarrotLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrotRight", function() { return CarrotRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrotSort", function() { return CarrotSort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Earth", function() { return Earth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleCheck", function() { return CircleCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleCross", function() { return CircleCross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleStop", function() { return CircleStop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CirclePlay", function() { return CirclePlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CirclePause", function() { return CirclePause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Magnifier", function() { return Magnifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return Cluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipsis", function() { return Ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Github", function() { return Github; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Google", function() { return Google; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortDesc", function() { return SortDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortAsc", function() { return SortAsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sort", function() { return Sort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardView", function() { return CardView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardViewSmall", function() { return CardViewSmall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListView", function() { return ListView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Twitter", function() { return Twitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Facebook", function() { return Facebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCard", function() { return CreditCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaretLeft", function() { return CaretLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaretRight", function() { return CaretRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apple", function() { return Apple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Windows", function() { return Windows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Linux", function() { return Linux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Visa", function() { return Visa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasterCard", function() { return MasterCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Discover", function() { return Discover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Amex", function() { return Amex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Paypal", function() { return Paypal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stripe", function() { return Stripe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCardAlt", function() { return CreditCardAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apartment", function() { return Apartment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pencil", function() { return Pencil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Edit", function() { return Edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cloud", function() { return Cloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Server", function() { return Server; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShieldCheck", function() { return ShieldCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lock", function() { return Lock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unlock", function() { return Unlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cog", function() { return Cog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trash", function() { return Trash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Archive", function() { return Archive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clipboard", function() { return Clipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardUser", function() { return ClipboardUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "License", function() { return License; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Play", function() { return Play; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return Label; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Users", function() { return Users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUsers", function() { return AddUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCardAlt2", function() { return CreditCardAlt2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cash", function() { return Cash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Phone", function() { return Phone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapMarker", function() { return MapMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signal", function() { return Signal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmartPhone", function() { return SmartPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tablet", function() { return Tablet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Window", function() { return Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Power", function() { return Power; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shart", function() { return Shart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Speed", function() { return Speed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Planet", function() { return Planet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VolumeUp", function() { return VolumeUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mute", function() { return Mute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lan", function() { return Lan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanAlt", function() { return LanAlt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wifi", function() { return Wifi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cli", function() { return Cli; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code", function() { return Code; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cross", function() { return Cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListCheck", function() { return ListCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListBullet", function() { return ListBullet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowUp", function() { return ArrowUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowDown", function() { return ArrowDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowLeft", function() { return ArrowLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowRight", function() { return ArrowRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowsVertical", function() { return ArrowsVertical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expand", function() { return Expand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return Contract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layers", function() { return Layers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return Spinner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacebookSquare", function() { return FacebookSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Youtube", function() { return Youtube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Linkedin", function() { return Linkedin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../assets/icomoon/style.css */ "./src/shared/assets/icomoon/style.css");
/* harmony import */ var _assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var fontIconClasses = {
  "CarrotDown": 'icon-caret-down',
  "CarrotUp": 'icon-caret-up',
  "CarrotLeft": 'icon-caret-left',
  "CarrotRight": 'icon-caret-right',
  "CarrotSort": 'icon-sort',
  "Earth": 'icon-earth',
  "CircleCheck": 'icon-checkmark-circle',
  "CircleCross": 'icon-cross-circle',
  "CircleStop": 'icon-stop-circle',
  "CirclePlay": 'icon-play-circle',
  "CirclePause": 'icon-pause-circle',
  "Magnifier": 'icon-magnifier',
  "Cluster": 'icon-site-map',
  "Ellipsis": 'icon-ellipsis',
  "Github": 'icon-github',
  "Google": 'icon-google-plus2',
  "SortDesc": 'icon-chevron-down',
  "SortAsc": 'icon-chevron-up',
  "Sort": 'icon-chevrons-expand-vertical',
  "CardView": 'icon-th-large',
  "CardViewSmall": 'icon-th',
  "ListView": 'icon-th-list',
  "Twitter": 'icon-twitter',
  "Facebook": 'icon-facebook',
  "CreditCard": 'icon-credit-card1',
  "CaretLeft": 'icon-caret-left',
  "CaretRight": 'icon-caret-right',
  "Apple": 'icon-apple',
  "Windows": 'icon-windows',
  "Linux": 'icon-linux',
  "Visa": 'icon-cc-visa',
  "MasterCard": 'icon-cc-mastercard',
  "Discover": 'icon-cc-discover',
  "Amex": 'icon-cc-amex',
  "Paypal": 'icon-cc-paypal',
  "Stripe": 'icon-cc-stripe',
  "CreditCardAlt": 'icon-credit-card-alt',
  "Home": 'icon-home3',
  "Apartment": 'icon-apartment',
  "Pencil": 'icon-pencil',
  "Edit": 'icon-pencil4',
  "Cloud": 'icon-cloud',
  "Database": 'icon-database',
  "Server": 'icon-server',
  "ShieldCheck": 'icon-shield-check',
  "Lock": 'icon-lock',
  "Unlock": 'icon-unlock',
  "Cog": 'icon-cog',
  "Trash": 'icon-trash2',
  "Archive": 'icon-archive2',
  "Clipboard": 'icon-clipboard-text',
  "ClipboardUser": 'icon-clipboard-user',
  "License": 'icon-license2',
  "Play": 'icon-play',
  "Camera": 'icon-camera',
  "Label": 'icon-label',
  "Profile": 'icon-profile',
  "User": 'icon-user',
  "Users": 'icon-users2',
  "AddUsers": 'icon-users-plus',
  "CreditCardAlt2": 'icon-credit-card',
  "Cash": 'icon-cash-dollar',
  "Phone": 'icon-telephone',
  "MapMarker": 'icon-map-marker',
  "Calendar": 'icon-calendar-empty',
  "Signal": 'icon-signal',
  "SmartPhone": 'icon-smartphone-embed',
  "Tablet": 'icon-tablet2',
  "Window": 'icon-window',
  "Power": 'icon-power',
  "Bubble": 'icon-bubble',
  "Graph": 'icon-graph',
  "Shart": 'icon-chart-bars',
  "Speed": 'icon-speed-fast',
  "Planet": 'icon-planet',
  "VolumeUp": 'icon-volume-high',
  "Mute": 'icon-mute',
  "Lan": 'icon-lan',
  "LanAlt": 'icon-lan2',
  "Wifi": 'icon-wifi',
  "Cli": 'icon-cli',
  "Code": 'icon-code',
  "Link": 'icon-link',
  "Cross": 'icon-cross',
  "ListCheck": 'icon-list3',
  "ListBullet": 'icon-list4',
  "ArrowUp": 'icon-chevron-up',
  "ArrowDown": 'icon-chevron-down',
  "ArrowLeft": 'icon-chevron-left',
  "ArrowRight": 'icon-chevron-right',
  "ArrowsVertical": 'icon-chevrons-expand-vertical',
  "Expand": 'icon-frame-expand',
  "Contract": 'icon-frame-contract',
  "Layers": 'icon-layers',
  "Spinner": 'icon-spinner8',
  "FacebookSquare": 'icon-facebook2',
  "Youtube": 'icon-youtube',
  "Linkedin": 'icon-linkedin'
};

function makeFontIcon(kind) {
  var className = fontIconClasses[kind];

  var Icon = function Icon() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "icon ".concat(className)
    });
  };

  Icon.displayName = "Icon.".concat(kind);
  return Icon;
}

var CarrotDown = makeFontIcon('CarrotDown');
var CarrotUp = makeFontIcon('CarrotUp');
var CarrotLeft = makeFontIcon('CarrotLeft');
var CarrotRight = makeFontIcon('CarrotRight');
var CarrotSort = makeFontIcon('CarrotSort');
var Earth = makeFontIcon('Earth');
var CircleCheck = makeFontIcon('CircleCheck');
var CircleCross = makeFontIcon('CircleCross');
var CircleStop = makeFontIcon('CircleStop');
var CirclePlay = makeFontIcon('CirclePlay');
var CirclePause = makeFontIcon('CirclePause');
var Magnifier = makeFontIcon('Magnifier');
var Cluster = makeFontIcon('Cluster');
var Ellipsis = makeFontIcon('Ellipsis');
var Github = makeFontIcon('Github');
var Google = makeFontIcon('Google');
var SortDesc = makeFontIcon('SortDesc');
var SortAsc = makeFontIcon('SortAsc');
var Sort = makeFontIcon('Sort');
var CardView = makeFontIcon('CardView');
var CardViewSmall = makeFontIcon('CardViewSmall');
var ListView = makeFontIcon('ListView');
var Twitter = makeFontIcon('Twitter');
var Facebook = makeFontIcon('Facebook');
var CreditCard = makeFontIcon('CreditCard');
var CaretLeft = makeFontIcon('CaretLeft');
var CaretRight = makeFontIcon('CaretRight');
var Apple = makeFontIcon('Apple');
var Windows = makeFontIcon('Windows');
var Linux = makeFontIcon('Linux');
var Visa = makeFontIcon('Visa');
var MasterCard = makeFontIcon('MasterCard');
var Discover = makeFontIcon('Discover');
var Amex = makeFontIcon('Amex');
var Paypal = makeFontIcon('Paypal');
var Stripe = makeFontIcon('Stripe');
var CreditCardAlt = makeFontIcon('CreditCardAlt');
var Home = makeFontIcon('Home');
var Apartment = makeFontIcon('Apartment');
var Pencil = makeFontIcon('Pencil');
var Edit = makeFontIcon('Edit');
var Cloud = makeFontIcon('Cloud');
var Database = makeFontIcon('Database');
var Server = makeFontIcon('Server');
var ShieldCheck = makeFontIcon('ShieldCheck');
var Lock = makeFontIcon('Lock');
var Unlock = makeFontIcon('Unlock');
var Cog = makeFontIcon('Cog');
var Trash = makeFontIcon('Trash');
var Archive = makeFontIcon('Archive');
var Clipboard = makeFontIcon('Clipboard');
var ClipboardUser = makeFontIcon('ClipboardUser');
var License = makeFontIcon('License');
var Play = makeFontIcon('Play');
var Camera = makeFontIcon('Camera');
var Label = makeFontIcon('Label');
var Profile = makeFontIcon('Profile');
var User = makeFontIcon('User');
var Users = makeFontIcon('Users');
var AddUsers = makeFontIcon('AddUsers');
var CreditCardAlt2 = makeFontIcon('CreditCardAlt2');
var Cash = makeFontIcon('Cash');
var Phone = makeFontIcon('Phone');
var MapMarker = makeFontIcon('MapMarker');
var Calendar = makeFontIcon('Calendar');
var Signal = makeFontIcon('Signal');
var SmartPhone = makeFontIcon('SmartPhone');
var Tablet = makeFontIcon('Tablet');
var Window = makeFontIcon('Window');
var Power = makeFontIcon('Power');
var Bubble = makeFontIcon('Bubble');
var Graph = makeFontIcon('Graph');
var Shart = makeFontIcon('Shart');
var Speed = makeFontIcon('Speed');
var Planet = makeFontIcon('Planet');
var VolumeUp = makeFontIcon('VolumeUp');
var Mute = makeFontIcon('Mute');
var Lan = makeFontIcon('Lan');
var LanAlt = makeFontIcon('LanAlt');
var Wifi = makeFontIcon('Wifi');
var Cli = makeFontIcon('Cli');
var Code = makeFontIcon('Code');
var Link = makeFontIcon('Link');
var Cross = makeFontIcon('Cross');
var ListCheck = makeFontIcon('ListCheck');
var ListBullet = makeFontIcon('ListBullet');
var ArrowUp = makeFontIcon('ArrowUp');
var ArrowDown = makeFontIcon('ArrowDown');
var ArrowLeft = makeFontIcon('ArrowLeft');
var ArrowRight = makeFontIcon('ArrowRight');
var ArrowsVertical = makeFontIcon('ArrowsVertical');
var Expand = makeFontIcon('Expand');
var Contract = makeFontIcon('Contract');
var Layers = makeFontIcon('Layers');
var Spinner = makeFontIcon('Spinner');
var FacebookSquare = makeFontIcon('FacebookSquare');
var Youtube = makeFontIcon('Youtube');
var Linkedin = makeFontIcon('Linkedin');
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(fontIconClasses, "fontIconClasses", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(makeFontIcon, "makeFontIcon", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotDown, "CarrotDown", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotUp, "CarrotUp", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotLeft, "CarrotLeft", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotRight, "CarrotRight", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotSort, "CarrotSort", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Earth, "Earth", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleCheck, "CircleCheck", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleCross, "CircleCross", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleStop, "CircleStop", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CirclePlay, "CirclePlay", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CirclePause, "CirclePause", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Magnifier, "Magnifier", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cluster, "Cluster", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Ellipsis, "Ellipsis", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Github, "Github", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Google, "Google", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SortDesc, "SortDesc", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SortAsc, "SortAsc", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Sort, "Sort", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CardView, "CardView", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CardViewSmall, "CardViewSmall", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListView, "ListView", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Twitter, "Twitter", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Facebook, "Facebook", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCard, "CreditCard", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CaretLeft, "CaretLeft", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CaretRight, "CaretRight", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Apple, "Apple", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Windows, "Windows", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Linux, "Linux", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Visa, "Visa", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(MasterCard, "MasterCard", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Discover, "Discover", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Amex, "Amex", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Paypal, "Paypal", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Stripe, "Stripe", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCardAlt, "CreditCardAlt", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Home, "Home", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Apartment, "Apartment", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Pencil, "Pencil", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Edit, "Edit", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cloud, "Cloud", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Database, "Database", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Server, "Server", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ShieldCheck, "ShieldCheck", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Lock, "Lock", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Unlock, "Unlock", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cog, "Cog", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Trash, "Trash", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Archive, "Archive", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Clipboard, "Clipboard", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ClipboardUser, "ClipboardUser", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(License, "License", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Play, "Play", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Camera, "Camera", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Label, "Label", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Profile, "Profile", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(User, "User", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Users, "Users", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(AddUsers, "AddUsers", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCardAlt2, "CreditCardAlt2", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cash, "Cash", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Phone, "Phone", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(MapMarker, "MapMarker", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Calendar, "Calendar", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Signal, "Signal", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SmartPhone, "SmartPhone", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Tablet, "Tablet", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Window, "Window", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Power, "Power", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Bubble, "Bubble", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Graph, "Graph", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Shart, "Shart", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Speed, "Speed", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Planet, "Planet", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(VolumeUp, "VolumeUp", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Mute, "Mute", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Lan, "Lan", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(LanAlt, "LanAlt", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Wifi, "Wifi", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cli, "Cli", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Code, "Code", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Link, "Link", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cross, "Cross", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListCheck, "ListCheck", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListBullet, "ListBullet", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowUp, "ArrowUp", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowDown, "ArrowDown", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowLeft, "ArrowLeft", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowRight, "ArrowRight", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowsVertical, "ArrowsVertical", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Expand, "Expand", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Contract, "Contract", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Layers, "Layers", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Spinner, "Spinner", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(FacebookSquare, "FacebookSquare", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Youtube, "Youtube", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Linkedin, "Linkedin", "/Users/admin/Development/teleport/web/src/shared/components/Icon/Icon.jsx");
=======
  reactHotLoader.register(fontIconClasses, "fontIconClasses", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(makeFontIcon, "makeFontIcon", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotDown, "CarrotDown", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotUp, "CarrotUp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotLeft, "CarrotLeft", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotRight, "CarrotRight", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CarrotSort, "CarrotSort", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Earth, "Earth", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleCheck, "CircleCheck", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleCross, "CircleCross", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CircleStop, "CircleStop", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CirclePlay, "CirclePlay", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CirclePause, "CirclePause", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Magnifier, "Magnifier", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cluster, "Cluster", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Ellipsis, "Ellipsis", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Github, "Github", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Google, "Google", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SortDesc, "SortDesc", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SortAsc, "SortAsc", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Sort, "Sort", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CardView, "CardView", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CardViewSmall, "CardViewSmall", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListView, "ListView", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Twitter, "Twitter", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Facebook, "Facebook", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCard, "CreditCard", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CaretLeft, "CaretLeft", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CaretRight, "CaretRight", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Apple, "Apple", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Windows, "Windows", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Linux, "Linux", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Visa, "Visa", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(MasterCard, "MasterCard", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Discover, "Discover", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Amex, "Amex", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Paypal, "Paypal", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Stripe, "Stripe", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCardAlt, "CreditCardAlt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Home, "Home", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Apartment, "Apartment", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Pencil, "Pencil", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Edit, "Edit", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cloud, "Cloud", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Database, "Database", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Server, "Server", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ShieldCheck, "ShieldCheck", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Lock, "Lock", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Unlock, "Unlock", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cog, "Cog", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Trash, "Trash", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Archive, "Archive", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Clipboard, "Clipboard", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ClipboardUser, "ClipboardUser", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(License, "License", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Play, "Play", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Camera, "Camera", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Label, "Label", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Profile, "Profile", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(User, "User", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Users, "Users", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(AddUsers, "AddUsers", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(CreditCardAlt2, "CreditCardAlt2", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cash, "Cash", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Phone, "Phone", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(MapMarker, "MapMarker", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Calendar, "Calendar", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Signal, "Signal", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(SmartPhone, "SmartPhone", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Tablet, "Tablet", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Window, "Window", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Power, "Power", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Bubble, "Bubble", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Graph, "Graph", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Shart, "Shart", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Speed, "Speed", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Planet, "Planet", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(VolumeUp, "VolumeUp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Mute, "Mute", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Lan, "Lan", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(LanAlt, "LanAlt", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Wifi, "Wifi", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cli, "Cli", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Code, "Code", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Link, "Link", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Cross, "Cross", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListCheck, "ListCheck", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ListBullet, "ListBullet", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowUp, "ArrowUp", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowDown, "ArrowDown", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowLeft, "ArrowLeft", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowRight, "ArrowRight", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(ArrowsVertical, "ArrowsVertical", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Expand, "Expand", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Contract, "Contract", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Layers, "Layers", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Spinner, "Spinner", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(FacebookSquare, "FacebookSquare", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Youtube, "Youtube", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
  reactHotLoader.register(Linkedin, "Linkedin", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Icon/Icon.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Indicator/Indicator.jsx":
/*!*******************************************************!*\
  !*** ./src/shared/components/Indicator/Indicator.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../assets/icomoon/style.css */ "./src/shared/assets/icomoon/style.css");
/* harmony import */ var _assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_icomoon_style_css__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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

var Indicator =
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledSpinner, null);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Indicator;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var StyledSpinner = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.attrs({
  className: 'icon icon-spinner8'
}).withConfig({
  displayName: "Indicator__StyledSpinner",
  componentId: "sc-182tlf8-0"
})(["animation:anim-rotate 2s infinite linear;color:#fff;display:inline-block;font-size:32px;height:32px;line-height:32px;margin:16px;text-shadow:0 0 .25em rgba(255,255,255,.3);@keyframes anim-rotate{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}"]);
var _default = Indicator;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(WHEN_TO_DISPLAY, "WHEN_TO_DISPLAY", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Indicator/Indicator.jsx");
  reactHotLoader.register(Indicator, "Indicator", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Indicator/Indicator.jsx");
  reactHotLoader.register(StyledSpinner, "StyledSpinner", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Indicator/Indicator.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Indicator/Indicator.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Indicator/index.js":
/*!**************************************************!*\
  !*** ./src/shared/components/Indicator/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Indicator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Indicator */ "./src/shared/components/Indicator/Indicator.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Indicator__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Indicator/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Input/Input.jsx":
/*!***********************************************!*\
  !*** ./src/shared/components/Input/Input.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





var Input = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].input.withConfig({
  displayName: "Input",
  componentId: "sc-1yz304h-0"
})(["appearance:none;border-radius:4px;background:", ";border:", ";box-sizing:border-box;box-shadow:inset 0 2px 4px rgba(0,0,0,.24);color:", ";font-family:inherit;font-size:16px;display:block;height:40px;line-height:40px;margin:0 0 24px 0;outline:none;padding:0 16px;transition:all .3s;width:100%;::-ms-clear{display:none;}::placeholder{color:", ";}", ";"], function (props) {
  return props.hasError ? props.theme.background.error : '#FFF';
}, function (props) {
  return props.hasError ? "2px solid ".concat(props.theme.colors.warning) : 'none';
}, _theme__WEBPACK_IMPORTED_MODULE_2__["colors"].text, function (props) {
  return props.theme.colors.subtle;
}, styled_system__WEBPACK_IMPORTED_MODULE_3__["space"]);
Input.displayName = 'Input';
Input.propTypes = {
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  hasError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
var _default = Input;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Input, "Input", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Input/Input.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Input/Input.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Input/index.js":
/*!**********************************************!*\
  !*** ./src/shared/components/Input/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ "./src/shared/components/Input/Input.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Input__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Input/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Label/Label.jsx":
/*!***********************************************!*\
  !*** ./src/shared/components/Label/Label.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var Label = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].label.withConfig({
  displayName: "Label",
  componentId: "sc-17np74s-0"
})(["color:", " display:block;font-size:11px;font-weight:bold;margin:0 0 8px 0;text-transform:uppercase;width:100%;"], function (props) {
  return props.hasError ? props.theme.colors.warning : props.theme.colors.light;
});
Label.propTypes = {
  hasError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
Label.defaultProps = {
  hasError: false,
  fontSize: 0
};
Label.displayName = 'Label';
var _default = Label;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Label, "Label", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Label/Label.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Label/Label.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Label/index.js":
/*!**********************************************!*\
  !*** ./src/shared/components/Label/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Label */ "./src/shared/components/Label/Label.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Label__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Label/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Logo/Logo.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Logo/Logo.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





var Logo = function Logo(_ref) {
  var src = _ref.src;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledImg, {
    src: src
  });
};

Logo.propTypes = {
  /** Image Src */
  src: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
Logo.displayName = 'Logo';
var _default = Logo;
/* harmony default export */ __webpack_exports__["default"] = (_default);
var StyledImg = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].img.withConfig({
  displayName: "Logo__StyledImg",
  componentId: "sc-4ci3ef-0"
})(["display:block;outline:none;margin:32px auto;"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Logo, "Logo", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Logo/Logo.jsx");
  reactHotLoader.register(StyledImg, "StyledImg", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Logo/Logo.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Logo/Logo.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Logo/index.js":
/*!*********************************************!*\
  !*** ./src/shared/components/Logo/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logo */ "./src/shared/components/Logo/Logo.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Logo__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Logo/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Menu/Menu.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Menu/Menu.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/util/scrollbarSize */ "./node_modules/dom-helpers/util/scrollbarSize.js");
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Popover */ "./src/shared/components/Popover/index.js");
/* harmony import */ var _MenuList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MenuList */ "./src/shared/components/Menu/MenuList.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var POSITION = {
  vertical: 'top',
  horizontal: 'right'
};

var Menu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getContentAnchorEl", function () {
      if (_this.menuListRef.selectedItemRef) {
        return react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(_this.menuListRef.selectedItemRef);
      }

      return react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(_this.menuListRef).firstChild;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMenuListRef", function (ref) {
      _this.menuListRef = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEntering", function (element) {
      var menuList = react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(_this.menuListRef); // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.

      if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
        var size = "".concat(dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3___default()(), "px");
        menuList.style['paddingRight'] = size;
        menuList.style.width = "calc(100% + ".concat(size, ")");
      }

      if (_this.props.onEntering) {
        _this.props.onEntering(element);
      }
    });

    return _this;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          popoverCss = _this$props.popoverCss,
          menuListCss = _this$props.menuListCss,
          MenuListProps = _this$props.MenuListProps,
          other = _objectWithoutProperties(_this$props, ["children", "popoverCss", "menuListCss", "MenuListProps"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Popover__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
        popoverCss: popoverCss,
        getContentAnchorEl: this.getContentAnchorEl,
        onEntering: this.handleEntering,
        anchorOrigin: POSITION,
        transformOrigin: POSITION
      }, other), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MenuList__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
        menuListCss: menuListCss
      }, MenuListProps, {
        ref: this.handleMenuListRef
      }), children));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Menu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Menu.propTypes = {
  /**
   * The DOM element used to set the position of the menu.
   */
  anchorEl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),

  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,

  /**
   * Properties applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Callback fired when the Menu has entered.
   */
  onEntered: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Callback fired when the Menu is entering.
   */
  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * If `true`, the menu is visible.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,

  /**
   * `popoverCss` property applied to the [`Popover`] css.
   */
  popoverCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * `menuListCss` property applied to the [`MenuList`] css.
   */
  menuListCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
var _default = Menu;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(POSITION, "POSITION", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/Menu.jsx");
  reactHotLoader.register(Menu, "Menu", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/Menu.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/Menu.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Menu/MenuItem.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/Menu/MenuItem.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





function MenuItem(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledMenuItem, _extends({
    tabIndex: -1
  }, props));
}

MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */

  /**
   * @ignore
   */
  role: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * @ignore
   */
  selected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
MenuItem.defaultProps = {
  component: 'li',
  disableGutters: false,
  role: 'menuitem'
};
var StyledMenuItem = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "MenuItem__StyledMenuItem",
  componentId: "sc-1fhgeis-0"
})(["background-color:", ";border-bottom:1px solid ", ";box-sizing:content-box;color:", ";cursor:pointer;display:block;font-size:11px;font-weight:bold;line-height:48px;line-height:48px;overflow:hidden;padding:0 32px;text-align:inherit;text-decoration:none;text-transform:uppercase;transition:all .3s;white-space:nowrap;white-space:nowrap;width:auto;&:hover,&:focus{color:", ";text-decoration:none;background-color:#f8f9fa;}&:last-child{border-radius:0 0 4px 4px;border:none;}&:first-child{border-radius:4px 4px 0 0;}"], function (props) {
  return props.theme.background.light;
}, function (props) {
  return props.theme.colors.subtle;
}, function (props) {
  return props.theme.colors.text;
}, function (props) {
  return props.theme.colors.link;
});
var _default = MenuItem;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MenuItem, "MenuItem", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuItem.jsx");
  reactHotLoader.register(StyledMenuItem, "StyledMenuItem", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuItem.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuItem.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Menu/MenuList.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/Menu/MenuList.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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






var MenuList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MenuList, _React$Component);

  function MenuList() {
    _classCallCheck(this, MenuList);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuList).apply(this, arguments));
  }

  _createClass(MenuList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          other = _objectWithoutProperties(_this$props, ["children"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledMenuList, _extends({
        role: "menu",
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur
      }, other), children);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MenuList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

MenuList.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_3__["default"]
};
MenuList.propTypes = {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,

  /**
   * @ignore
   */
  menuListCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
var StyledMenuList = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "MenuList__StyledMenuList",
  componentId: "i5ahix-0"
})(["background-color:", ";box-shadow:0 8px 24px rgba(0,0,0,.24);border-radius:4px;", ""], function (props) {
  return props.theme.background.light;
}, function (props) {
  return props.menuListCss && props.menuListCss(props);
});
var _default = MenuList;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MenuList, "MenuList", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuList.jsx");
  reactHotLoader.register(StyledMenuList, "StyledMenuList", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuList.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Menu/MenuList.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Modal/Modal.jsx":
/*!***********************************************!*\
  !*** ./src/shared/components/Modal/Modal.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var keycode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! keycode */ "./node_modules/keycode/index.js");
/* harmony import */ var keycode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(keycode__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../utils */ "./src/shared/components/utils/index.js");
/* harmony import */ var _Portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Portal */ "./src/shared/components/Modal/Portal.jsx");
/* harmony import */ var _RootRef__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RootRef */ "./src/shared/components/Modal/RootRef.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function () {
      var doc = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["ownerDocument"])(_this.mountNode); //const container = getContainer(this.props.container, doc.body);
      //this.props.manager.add(this, container);

      doc.addEventListener('keydown', _this.handleDocumentKeyDown);
      doc.addEventListener('focus', _this.enforceFocus, true);

      if (_this.dialogRef) {
        _this.handleOpened();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpened", function () {
      _this.autoFocus(); // Fix a bug on Chrome where the scroll isn't initially 0.


      _this.modalRef.scrollTop = 0;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      var doc = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["ownerDocument"])(_this.mountNode);
      doc.removeEventListener('keydown', _this.handleDocumentKeyDown);
      doc.removeEventListener('focus', _this.enforceFocus, true);

      _this.restoreLastFocus();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleExited", function () {
      _this.setState({
        exited: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBackdropClick", function (event) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentKeyDown", function (event) {
      // Ignore events that have been `event.preventDefault()` marked.
      if (keycode__WEBPACK_IMPORTED_MODULE_3___default()(event) !== 'esc' || !_this.isTopModal() || event.defaultPrevented) {
        return;
      }

      if (_this.props.onEscapeKeyDown) {
        _this.props.onEscapeKeyDown(event);
      }

      if (!_this.props.disableEscapeKeyDown && _this.props.onClose) {
        _this.props.onClose(event, 'escapeKeyDown');
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enforceFocus", function () {
      // The Modal might not already be mounted.
      if (!_this.isTopModal() || _this.props.disableEnforceFocus || !_this.mounted || !_this.dialogRef) {
        return;
      }

      var currentActiveElement = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["ownerDocument"])(_this.mountNode).activeElement;

      if (!_this.dialogRef.contains(currentActiveElement)) {
        _this.dialogRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePortalRef", function (ref) {
      _this.mountNode = ref ? ref.getMountNode() : ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleModalRef", function (ref) {
      _this.modalRef = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onRootRef", function (ref) {
      _this.dialogRef = ref;
    });

    _this.state = {
      exited: !props.open
    };
    return _this;
  }

  _createClass(Modal, [{
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
        this.lastFocus = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["ownerDocument"])(this.mountNode).activeElement;
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Portal__WEBPACK_IMPORTED_MODULE_5__["default"], {
        ref: this.handlePortalRef,
        container: container,
        disablePortal: disablePortal,
        onRendered: this.handleRendered
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledModal, {
        modalCss: modalCss,
        "data-mui-test": "Modal",
        ref: this.handleModalRef
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Backdrop, _extends({
        onClick: this.handleBackdropClick
      }, BackdropProps)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RootRef__WEBPACK_IMPORTED_MODULE_6__["default"], {
        rootRef: this.onRootRef
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(children, childProps))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Modal.propTypes = {
  /**
   * A backdrop component. This property enables custom backdrop rendering.
   */

  /**
   * Properties applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,

  /**
   * A single child content element.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * If `true`, clicking the backdrop will not fire any callback.
   */
  disableBackdropClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * If `true`, hitting escape will not fire any callback.
   */
  disableEscapeKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * A modal manager used to track and manage the state of open
   * Modals. This enables customizing how modals interact within a container.
   */
  manager: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` property took effect.
   */
  onRendered: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * If `true`, the modal is open.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
};
Modal.defaultProps = {
  BackdropComponent: Backdrop,
  disableAutoFocus: false,
  disableBackdropClick: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disablePortal: false,
  disableRestoreFocus: false,
  hideBackdrop: false,
  keepMounted: false
};
var _default = Modal;
/* harmony default export */ __webpack_exports__["default"] = (_default);

var Backdrop = function Backdrop(props) {
  var invisible = props.invisible,
      rest = _objectWithoutProperties(props, ["invisible"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledBackdrop, _extends({
    "aria-hidden": "true",
    invisible: invisible
  }, rest));
};

var StyledBackdrop = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "Modal__StyledBackdrop",
  componentId: "sc-1axnwam-0"
})(["z-index:-1;position:fixed;right:0;bottom:0;top:0;left:0;background-color:", ";opacity:1;touch-action:none;"], function (props) {
  return props.invisible ? 'transparent' : "rgba(0, 0, 0, .24)";
});
var StyledModal = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "Modal__StyledModal",
  componentId: "sc-1axnwam-1"
})(["position:fixed;z-index:1200;right:0;bottom:0;top:0;left:0;", ""], function (props) {
  return props.modalCss && props.modalCss(props);
});
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getHasTransition, "getHasTransition", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  reactHotLoader.register(Modal, "Modal", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  reactHotLoader.register(Backdrop, "Backdrop", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  reactHotLoader.register(StyledBackdrop, "StyledBackdrop", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  reactHotLoader.register(StyledModal, "StyledModal", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Modal.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Modal/Portal.jsx":
/*!************************************************!*\
  !*** ./src/shared/components/Modal/Portal.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils */ "./src/shared/components/utils/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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





/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMountNode", function () {
      return _this.mountNode;
    });

    return _this;
  }

  _createClass(Portal, [{
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
        this.mountNode = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this).parentElement;
        return;
      }

      this.mountNode = getContainer(container, getOwnerDocument(this).body);
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

      return this.mountNode ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.createPortal(children, this.mountNode) : null;
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Portal;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func]),

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
Portal.defaultProps = {
  disablePortal: false
};

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["ownerDocument"])(react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(element));
}

var _default = Portal;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Portal, "Portal", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Portal.jsx");
  reactHotLoader.register(getContainer, "getContainer", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Portal.jsx");
  reactHotLoader.register(getOwnerDocument, "getOwnerDocument", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Portal.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/Portal.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Modal/RootRef.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/Modal/RootRef.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var RootRef =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RootRef, _React$Component);

  function RootRef() {
    _classCallCheck(this, RootRef);

    return _possibleConstructorReturn(this, _getPrototypeOf(RootRef).apply(this, arguments));
  }

  _createClass(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);
      setRef(this.props.rootRef, this.ref);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);

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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return RootRef;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element.isRequired,

  /**
   * Provide a way to access the DOM node of the wrapped element.
   * You can provide a callback ref or a `React.createRef()` ref.
   */
  rootRef: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object]).isRequired
};
var _default = RootRef;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RootRef, "RootRef", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/RootRef.jsx");
  reactHotLoader.register(setRef, "setRef", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/RootRef.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/RootRef.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Modal/index.js":
/*!**********************************************!*\
  !*** ./src/shared/components/Modal/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./src/shared/components/Modal/Modal.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Modal__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Modal/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Popover/Popover.jsx":
/*!***************************************************!*\
  !*** ./src/shared/components/Popover/Popover.jsx ***!
  \***************************************************/
/*! exports provided: StyledPopover, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledPopover", function() { return StyledPopover; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transition */ "./src/shared/components/Popover/Transition.jsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/shared/components/utils/index.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Modal */ "./src/shared/components/Modal/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @inheritedComponent Modal







var StyledPopover = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "Popover__StyledPopover",
  componentId: "hki90w-0"
})(["line-height:24px;max-width:200px;outline:none;overflow:hidden;padding:0;position:absolute;right:0;top:0;", ""], function (props) {
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

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popover, _React$Component);

  function Popover() {
    var _this;

    _classCallCheck(this, Popover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popover).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleGetOffsetTop", getOffsetTop);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleGetOffsetLeft", getOffsetLeft);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPositioningStyles", function (element) {
      var positioning = _this.getPositioningStyle(element);

      if (positioning.top !== null) {
        element.style.top = positioning.top;
      }

      if (positioning.left !== null) {
        element.style.left = positioning.left;
      }

      element.style.transformOrigin = positioning.transformOrigin;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPositioningStyle", function (element) {
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

      var containerWindow = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["ownerWindow"])(getAnchorEl(anchorEl)); // Window thresholds taking required margin into account

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEntering", function (element) {
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

  _createClass(Popover, [{
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

      var anchorElement = getAnchorEl(anchorEl) || Object(_utils__WEBPACK_IMPORTED_MODULE_5__["ownerDocument"])(this.paperRef).body;
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
          other = _objectWithoutProperties(_this$props4, ["anchorEl", "children", "container", "open", "popoverCss"]); // If the container prop is provided, use that
      // If the anchorEl prop is provided, use its parent body element as the container
      // If neither are provided let the Modal take care of choosing the container


      var container = containerProp || (anchorEl ? Object(_utils__WEBPACK_IMPORTED_MODULE_5__["ownerDocument"])(getAnchorEl(anchorEl)).body : undefined);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
        container: container,
        open: open,
        BackdropProps: {
          invisible: true
        }
      }, other), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Transition__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onEntering: this.handleEntering
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledPopover, {
        popoverCss: popoverCss,
        "data-mui-test": "Popover",
        ref: function ref(_ref) {
          _this2.paperRef = react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.findDOMNode(_ref);
        }
      }, children)));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Popover;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Popover.propTypes = {
  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updatePosition() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   */
  anchorEl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func]),

  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    horizontal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['left', 'center', 'right'])]).isRequired,
    vertical: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['top', 'center', 'bottom'])]).isRequired
  }),

  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    left: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
    top: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired
  }),

  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['anchorEl', 'anchorPosition', 'none']),

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func]),

  /**
   * The elevation of the popover.
   */
  elevation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` property.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be:`"escapeKeyDown"`, `"backdropClick"`
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired before the component is entering.
   */
  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the component has entered.
   */
  onEntered: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the component is entering.
   */
  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired before the component is exiting.
   */
  onExit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the component has exited.
   */
  onExited: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * Callback fired when the component is exiting.
   */
  onExiting: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /**
   * If `true`, the popover is visible.
   */
  open: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired,

  /**
   * Properties applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,

  /**
   * @ignore
   */
  role: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,

  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    horizontal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['left', 'center', 'right'])]).isRequired,
    vertical: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['top', 'center', 'bottom'])]).isRequired
  }),

  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
};
Popover.defaultProps = {
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
var _default = Popover;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StyledPopover, "StyledPopover", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(getOffsetTop, "getOffsetTop", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(getOffsetLeft, "getOffsetLeft", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(getTransformOriginValue, "getTransformOriginValue", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(getScrollParent, "getScrollParent", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(getAnchorEl, "getAnchorEl", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(Popover, "Popover", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Popover.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Popover/Transition.jsx":
/*!******************************************************!*\
  !*** ./src/shared/components/Popover/Transition.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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




var Transition =
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
      var node = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this);
      this.props.onEntering(node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          childProps = _objectWithoutProperties(_this$props, ["children"]);

      delete childProps.onEntering;
      var child = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(children);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, childProps);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Transition;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var _default = Transition;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Transition, "Transition", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Transition.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/Transition.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Popover/index.js":
/*!************************************************!*\
  !*** ./src/shared/components/Popover/index.js ***!
  \************************************************/
/*! exports provided: default, StyledPopover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popover */ "./src/shared/components/Popover/Popover.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StyledPopover", function() { return _Popover__WEBPACK_IMPORTED_MODULE_0__["StyledPopover"]; });

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Popover__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Popover/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/SideNav/SideNav.jsx":
/*!***************************************************!*\
  !*** ./src/shared/components/SideNav/SideNav.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../constants */ "./src/shared/components/constants.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var SideNav = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].nav.withConfig({
  displayName: "SideNav",
  componentId: "h5sul4-0"
<<<<<<< Updated upstream
})(["background:", ";bottom:0;width:240px;left:0;overflow:auto;padding-top:72px;position:", ";top:0;z-index:", ";"], function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.static ? 'relative' : 'fixed';
}, _constants__WEBPACK_IMPORTED_MODULE_1__["z"].zmax1);
=======
})(["background:", ";bottom:0;width:240px;left:0;overflow:auto;position:", ";top:0;"], function (props) {
  return props.theme.background.secondary;
}, function (props) {
  return props.static ? 'relative' : 'fixed';
});
>>>>>>> Stashed changes
SideNav.displayName = 'SideNav';
var _default = SideNav;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SideNav, "SideNav", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/SideNav/SideNav.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/SideNav/SideNav.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/SideNav/SideNavItem.jsx":
/*!*******************************************************!*\
  !*** ./src/shared/components/SideNav/SideNavItem.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var SideNavItem = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button.withConfig({
  displayName: "SideNavItem",
  componentId: "sc-2o18yj-0"
})(["background:", ";border:none;box-sizing:border-box;color:", ";cursor:pointer;display:block;font-size:11px;font-weight:600;line-height:", ";margin:0;outline:none;padding:0 32px;text-align:left;text-decoration:none;text-transform:uppercase;transition:all .3s;width:100%;-webkit-font-smoothing:antialiased;&:hover{background:", ";}&:active,&.active{background:", ";color:", ";}"], function (props) {
  return props.active ? props.theme.background.tertiary : props.theme.background.secondary;
}, function (props) {
  return props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)';
}, function (props) {
  return props.active ? '68px' : '72px';
}, function (props) {
  return props.active ? props.theme.background.secondary : 'rgba(255, 255, 255, .06)';
}, function (props) {
  return props.active ? props.theme.background.tertiary : props.theme.background.secondary;
}, function (props) {
  return props.theme.colors.light;
});
SideNavItem.displayName = 'SideNavItem';
SideNavItem.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var _default = SideNavItem;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SideNavItem, "SideNavItem", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/SideNav/SideNavItem.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/SideNav/SideNavItem.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/SideNav/index.js":
/*!************************************************!*\
  !*** ./src/shared/components/SideNav/index.js ***!
  \************************************************/
/*! exports provided: default, SideNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _SideNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SideNav */ "./src/shared/components/SideNav/SideNav.jsx");
/* harmony import */ var _SideNavItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideNavItem */ "./src/shared/components/SideNav/SideNavItem.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SideNavItem", function() { return _SideNavItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var _default = _SideNav__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/SideNav/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Text/Text.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/Text/Text.jsx ***!
  \*********************************************/
/*! exports provided: caps, regular, bold, italic, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caps", function() { return caps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regular", function() { return regular; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bold", function() { return bold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "italic", function() { return italic; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





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
var Text = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "Text",
  componentId: "mga541-0"
})(["", " ", " ", " ", " ", " ", " ", " ", ";"], italic, styled_system__WEBPACK_IMPORTED_MODULE_2__["fontSize"], styled_system__WEBPACK_IMPORTED_MODULE_2__["space"], styled_system__WEBPACK_IMPORTED_MODULE_2__["color"], caps, regular, bold, styled_system__WEBPACK_IMPORTED_MODULE_2__["textAlign"]);
Text.displayName = 'Text';
var numberStringOrArray = prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array]);
Text.propTypes = {
  fontSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array]),
  textAlign: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['left', 'center', 'right', 'justify']),
  caps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  regular: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  bold: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  italic: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /** Margin */
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray,

  /** Padding */
  p: numberStringOrArray,
  pt: numberStringOrArray,
  pr: numberStringOrArray,
  pb: numberStringOrArray,
  pl: numberStringOrArray,
  px: numberStringOrArray,
  py: numberStringOrArray
};
Text.defaultProps = {
  theme: _theme__WEBPACK_IMPORTED_MODULE_3__["default"]
};
Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p');
Text.s = Text.withComponent('s');
var _default = Text;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(caps, "caps", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(regular, "regular", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(bold, "bold", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(italic, "italic", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(Text, "Text", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(numberStringOrArray, "numberStringOrArray", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/Text.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/Text/index.js":
/*!*********************************************!*\
  !*** ./src/shared/components/Text/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text */ "./src/shared/components/Text/Text.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _Text__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/Text/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/ThemeProvider/globals.js":
/*!********************************************************!*\
  !*** ./src/shared/components/ThemeProvider/globals.js ***!
  \********************************************************/
/*! exports provided: GlobalStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalStyle", function() { return GlobalStyle; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  html {\n    font-family: ", ";\n    font-weight: 400;\n  }\n\n  body {\n    margin: 0;\n    background-color: ", ";\n    color: ", ";\n    padding: 0;\n  }\n\n  article,\n  aside,\n  details,\n  figcaption,\n  figure,\n  footer,\n  header,\n  main,\n  menu,\n  nav,\n  section,\n  summary {\n    display: block;\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var GlobalStyle = Object(styled_components__WEBPACK_IMPORTED_MODULE_0__["createGlobalStyle"])(_templateObject(), function (props) {
  return props.theme.font;
}, function (props) {
  return props.theme.background.primary;
}, function (props) {
  return props.theme.colors.light;
});

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GlobalStyle, "GlobalStyle", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/ThemeProvider/globals.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/ThemeProvider/index.js":
/*!******************************************************!*\
  !*** ./src/shared/components/ThemeProvider/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ "./src/shared/components/ThemeProvider/globals.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../theme */ "./src/shared/components/theme.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();






var ThemeProvider = function ThemeProvider(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_1__["ThemeProvider"], {
    theme: props.theme || _theme__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_globals__WEBPACK_IMPORTED_MODULE_2__["GlobalStyle"], null), props.children));
};

var _default = ThemeProvider;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ThemeProvider, "ThemeProvider", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/ThemeProvider/index.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/ThemeProvider/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/TopNav.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/TopNav/TopNav.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TopNavLogo_TopNavLogo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TopNavLogo/TopNavLogo */ "./src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../constants */ "./src/shared/components/constants.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();







var TopNav = function TopNav(_ref) {
  var logoSrc = _ref.logoSrc,
      version = _ref.version,
      children = _ref.children,
      isStatic = _ref.isStatic;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledNav, {
    isStatic: isStatic
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNavLogo_TopNavLogo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    src: logoSrc,
    version: version
  }), children);
};

TopNav.propTypes = {
  /** The version of the product (ex. 5.3.2) */
  version: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  logoSrc: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
TopNav.defaultProps = {
  version: 'v#'
};
var StyledNav = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].nav.withConfig({
  displayName: "TopNav__StyledNav",
  componentId: "sc-1dnu3b9-0"
})(["left:0;display:block;position:", ";right:0;top:0;z-index:", ";"], function (props) {
  return props.isStatic ? 'relative' : 'fixed';
}, _constants__WEBPACK_IMPORTED_MODULE_4__["z"].zmax2);
var _default = TopNav;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TopNav, "TopNav", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNav.jsx");
  reactHotLoader.register(StyledNav, "StyledNav", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNav.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNav.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/TopNavItem.jsx":
/*!*****************************************************!*\
  !*** ./src/shared/components/TopNav/TopNavItem.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


/**
 * TopNavItem
 */

var TopNavItem = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].button.withConfig({
  displayName: "TopNavItem",
  componentId: "sc-1d70xsx-0"
})(["background:none;border:none;border-bottom:", ";box-sizing:border-box;color:", ";cursor:pointer;display:inline-block;font-size:11px;font-weight:600;line-height:", ";margin:0;outline:none;padding:0 16px;text-align:center;text-decoration:none;text-transform:uppercase;transition:all .3s;-webkit-font-smoothing:antialiased;&:hover{background:", ";border-bottom:", ";}&:active,{background:", ";color:", ";border-bottom:", ";}&.active{color:", ";line-height:68px;border-bottom:", "}"], function (props) {
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
var _default = TopNavItem;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TopNavItem, "TopNavItem", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavItem.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavItem.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx":
/*!****************************************************************!*\
  !*** ./src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TopNavItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TopNavItem */ "./src/shared/components/TopNav/TopNavItem.jsx");
/* harmony import */ var app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/config */ "./src/app/config.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();







var TopNavLogo = function TopNavLogo(_ref) {
  var src = _ref.src,
      version = _ref.version;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: app_config__WEBPACK_IMPORTED_MODULE_4__["default"].routes.app
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLogo, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: src
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, version)));
};

TopNavLogo.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  version: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
TopNavLogo.defaultProps = {
  src: '/',
  version: 'v#'
};
TopNavLogo.displayName = 'TopNavLogo';
var StyledLogo = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(_TopNavItem__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "TopNavLogo__StyledLogo",
  componentId: "sc-179wbf7-0"
})(["margin:0;width:240px;img{display:inline-block;float:left;height:24px;margin:24px 0 24px 16px;}em{display:inline-block;font-size:10px;font-weight:bold;font-style:normal;margin:0;}"]);
var _default = TopNavLogo;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TopNavLogo, "TopNavLogo", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx");
  reactHotLoader.register(StyledLogo, "StyledLogo", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavLogo/TopNavLogo.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx":
/*!************************************************************************!*\
  !*** ./src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _TopNavItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TopNavItem */ "./src/shared/components/TopNav/TopNavItem.jsx");
/* harmony import */ var _Menu_Menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Menu/Menu */ "./src/shared/components/Menu/Menu.jsx");
/* harmony import */ var _avatar_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./avatar.png */ "./src/shared/components/TopNav/TopNavUserMenu/avatar.png");
/* harmony import */ var _avatar_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_avatar_png__WEBPACK_IMPORTED_MODULE_5__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

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








var TopNavUserMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TopNavUserMenu, _React$Component);

  function TopNavUserMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TopNavUserMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TopNavUserMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setRef", function (e) {
      _this.btnRef = e;
    });

    return _this;
  }

  _createClass(TopNavUserMenu, [{
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TopNavItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
        style: {
          marginLeft: "auto"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AvatarButton, {
        ref: this.setRef,
        onClick: onShow
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, user), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: avatar
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu_Menu__WEBPACK_IMPORTED_MODULE_4__["default"], {
        anchorOrigin: anchorOrigin,
        transformOrigin: transformOrigin,
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: onClose
      }, children));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return TopNavUserMenu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(TopNavUserMenu, "displayName", 'TopNavMenu');

_defineProperty(TopNavUserMenu, "defaultProps", {
  avatar: _avatar_png__WEBPACK_IMPORTED_MODULE_5___default.a,
  open: false,
  onShow: function onShow() {
    alert('show');
  },
  onClose: function onClose() {
    alert('close');
  }
});

_defineProperty(TopNavUserMenu, "propTypes", {
  /** Callback fired when the component requests to be closed. */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /** Callback fired when the component requests to be open. */
  onShow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /** If true the menu is visible */
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

var _default = TopNavUserMenu;
/* harmony default export */ __webpack_exports__["default"] = (_default);
var AvatarButton = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "TopNavUserMenu__AvatarButton",
  componentId: "sc-9oyl3l-0"
})(["position:absolute;top:0;right:0;img{display:inline-block;float:right;height:24px;margin:24px 8px 24px 16px;}em{font-size:10px;font-weight:bold font-style:normal;margin:0;}"]);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

<<<<<<< Updated upstream
  reactHotLoader.register(TopNavUserMenu, "TopNavUserMenu", "/Users/admin/Development/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
  reactHotLoader.register(AvatarButton, "AvatarButton", "/Users/admin/Development/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
  reactHotLoader.register(_default, "default", "/Users/admin/Development/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
=======
  reactHotLoader.register(TopNavUserMenu, "TopNavUserMenu", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
  reactHotLoader.register(AvatarButton, "AvatarButton", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
  reactHotLoader.register(menuListCss, "menuListCss", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
>>>>>>> Stashed changes
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/TopNavUserMenu/avatar.png":
/*!****************************************************************!*\
  !*** ./src/shared/components/TopNav/TopNavUserMenu/avatar.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/assets/img/img-a9859b.png";

/***/ }),

/***/ "./src/shared/components/TopNav/TopNavUserMenu/index.js":
/*!**************************************************************!*\
  !*** ./src/shared/components/TopNav/TopNavUserMenu/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _TopNavUserMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TopNavUserMenu */ "./src/shared/components/TopNav/TopNavUserMenu/TopNavUserMenu.jsx");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


var _default = _TopNavUserMenu__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/TopNavUserMenu/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/TopNav/index.js":
/*!***********************************************!*\
  !*** ./src/shared/components/TopNav/index.js ***!
  \***********************************************/
/*! exports provided: default, TopNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TopNav */ "./src/shared/components/TopNav/TopNav.jsx");
/* harmony import */ var _TopNavItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TopNavItem */ "./src/shared/components/TopNav/TopNavItem.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TopNavItem", function() { return _TopNavItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();



var _default = _TopNav__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (_default);

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/TopNav/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/constants.js":
/*!********************************************!*\
  !*** ./src/shared/components/constants.js ***!
  \********************************************/
/*! exports provided: z */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return z; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var z = {
  z1: 1,
  z2: 2,
  z3: 3,
  z4: 4,
  z5: 5,
  zmax1: 1000,
  zmax2: 2000,
  zmax3: 3000,
  zmax4: 4000,
  zmax5: 5000
};

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(z, "z", "/Users/admin/Development/teleport/web/src/shared/components/constants.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/index.js":
/*!****************************************!*\
  !*** ./src/shared/components/index.js ***!
  \****************************************/
/*! exports provided: Box, Button, Card, Flex, Heading, Indicator, Input, Label, SideNav, SideNavItem, Text, TopNav, TopNavItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ "./src/shared/components/Input/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _Input__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ "./src/shared/components/Button/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _Button__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Card */ "./src/shared/components/Card/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return _Card__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text */ "./src/shared/components/Text/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _Text__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Label */ "./src/shared/components/Label/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _Label__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Heading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Heading */ "./src/shared/components/Heading/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Heading", function() { return _Heading__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Box */ "./src/shared/components/Box/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _Box__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Indicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Indicator */ "./src/shared/components/Indicator/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Indicator", function() { return _Indicator__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _SideNav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SideNav */ "./src/shared/components/SideNav/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SideNav", function() { return _SideNav__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SideNavItem", function() { return _SideNav__WEBPACK_IMPORTED_MODULE_8__["SideNavItem"]; });

/* harmony import */ var _TopNav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TopNav */ "./src/shared/components/TopNav/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TopNav", function() { return _TopNav__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TopNavItem", function() { return _TopNav__WEBPACK_IMPORTED_MODULE_9__["TopNavItem"]; });

/* harmony import */ var _Flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Flex */ "./src/shared/components/Flex/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Flex", function() { return _Flex__WEBPACK_IMPORTED_MODULE_10__["default"]; });














/***/ }),

/***/ "./src/shared/components/theme.js":
/*!****************************************!*\
  !*** ./src/shared/components/theme.js ***!
  \****************************************/
/*! exports provided: font, fonts, regular, bold, fontSizes, fontWeights, space, background, colors, borders, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "font", function() { return font; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fonts", function() { return fonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regular", function() { return regular; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bold", function() { return bold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontSizes", function() { return fontSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontWeights", function() { return fontWeights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "space", function() { return space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "background", function() { return background; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borders", function() { return borders; });
/* harmony import */ var _utils_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/platform */ "./src/shared/components/utils/platform.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


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
  primary: '#111B48',
  secondary: '#222C59',
  tertiary: '#263266',
  quaternary: '#1B234A',
  error: '#FEE5ED',
  success: '#00BFA5'
};
var colors = {
  accent: '#FA2A6A',
  dark: '#000',
  light: '#fff',
  error: '#FF1744',
  warning: '#FA2A6A',
  subtle: '#EDF0F2',
  success: '#00BFA5',
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
var _default = theme;
/* harmony default export */ __webpack_exports__["default"] = (_default);

function getMonoFont() {
  if (_utils_platform__WEBPACK_IMPORTED_MODULE_0__["platform"].isLinux) {
    return fontMonoLinux;
  }

  if (_utils_platform__WEBPACK_IMPORTED_MODULE_0__["platform"].isMac) {
    return fontMonoMac;
  }

  if (_utils_platform__WEBPACK_IMPORTED_MODULE_0__["platform"].isWin) {
    return fontMonoWin;
  }

  return fontMonoLinux;
}

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(fontMonoLinux, "fontMonoLinux", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(fontMonoWin, "fontMonoWin", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(fontMonoMac, "fontMonoMac", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(font, "font", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(fonts, "fonts", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(regular, "regular", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(bold, "bold", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(fontSizes, "fontSizes", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(fontWeights, "fontWeights", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(space, "space", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(background, "background", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(colors, "colors", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(borders, "borders", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(theme, "theme", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(getMonoFont, "getMonoFont", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  reactHotLoader.register(_default, "default", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/theme.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/utils/index.js":
/*!**********************************************!*\
  !*** ./src/shared/components/utils/index.js ***!
  \**********************************************/
/*! exports provided: ownerDocument, ownerWindow, getContainer, calculatePosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ownerDocument", function() { return ownerDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ownerWindow", function() { return ownerWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContainer", function() { return getContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculatePosition", function() { return calculatePosition; });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/query/offset */ "./node_modules/dom-helpers/query/offset.js");
/* harmony import */ var dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dom_helpers_query_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/query/position */ "./node_modules/dom-helpers/query/position.js");
/* harmony import */ var dom_helpers_query_position__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_position__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/query/scrollTop */ "./node_modules/dom-helpers/query/scrollTop.js");
/* harmony import */ var dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





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
  return react_dom__WEBPACK_IMPORTED_MODULE_0___default.a.findDOMNode(container) || defaultContainer;
}

function getContainerDimensions(containerNode) {
  var width, height, scroll;

  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scroll = dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3___default()(ownerDocument(containerNode).documentElement) || dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3___default()(containerNode);
  } else {
    var _getOffset = dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1___default()(containerNode);

    width = _getOffset.width;
    height = _getOffset.height;
    scroll = dom_helpers_query_scrollTop__WEBPACK_IMPORTED_MODULE_3___default()(containerNode);
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
  var childOffset = container.tagName === 'BODY' ? dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1___default()(target) : dom_helpers_query_position__WEBPACK_IMPORTED_MODULE_2___default()(target, container);

  var _getOffset2 = dom_helpers_query_offset__WEBPACK_IMPORTED_MODULE_1___default()(overlayNode),
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
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ownerDocument, "ownerDocument", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(ownerWindow, "ownerWindow", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(getContainer, "getContainer", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(getContainerDimensions, "getContainerDimensions", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(getTopDelta, "getTopDelta", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(getLeftDelta, "getLeftDelta", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  reactHotLoader.register(calculatePosition, "calculatePosition", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/shared/components/utils/platform.js":
/*!*************************************************!*\
  !*** ./src/shared/components/utils/platform.js ***!
  \*************************************************/
/*! exports provided: platform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "platform", function() { return platform; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

function getPlatform() {
  var userAgent = window.navigator.userAgent;
  return {
    isWin: userAgent.indexOf('Windows') >= 0,
    isMac: userAgent.indexOf('Macintosh') >= 0,
    isLinux: userAgent.indexOf('Linux') >= 0
  };
}

var platform = getPlatform();
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getPlatform, "getPlatform", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/platform.js");
  reactHotLoader.register(platform, "platform", "/home/akontsevoy/go/src/github.com/gravitational/teleport/web/src/shared/components/utils/platform.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/boot.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/boot.js */"./src/boot.js");


/***/ })

/******/ });