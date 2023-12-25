// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"setup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJECT_TYPE = exports.LEVEL_2 = exports.LEVEL = exports.GRID_SIZE_2 = exports.GRID_SIZE = exports.DIRECTIONS_2 = exports.DIRECTIONS = exports.CLASS_LIST = exports.CELL_SIZE = void 0;
var GRID_SIZE = exports.GRID_SIZE = 20;
var GRID_SIZE_2 = exports.GRID_SIZE_2 = 20;
var CELL_SIZE = exports.CELL_SIZE = 20;
var DIRECTIONS = exports.DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
};
var DIRECTIONS_2 = exports.DIRECTIONS_2 = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE_2
    // rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE_2
    // rotation: 90
  }
};
var OBJECT_TYPE = exports.OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair'
};

// Lookup array for classes
var CLASS_LIST = exports.CLASS_LIST = [OBJECT_TYPE.BLANK, OBJECT_TYPE.WALL, OBJECT_TYPE.DOT, OBJECT_TYPE.BLINKY, OBJECT_TYPE.PINKY, OBJECT_TYPE.INKY, OBJECT_TYPE.CLYDE, OBJECT_TYPE.PILL, OBJECT_TYPE.PACMAN, OBJECT_TYPE.GHOSTLAIR];

// prettier-ignore
var LEVEL = exports.LEVEL = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var LEVEL_2 = exports.LEVEL_2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 7, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 0, 0, 9, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 7, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 7, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
},{}],"ghostmoves.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomMovement = randomMovement;
var _setup = require("./setup");
// Importing constants from setup.js

// Primitive random movement function
function randomMovement(position, direction, objectExist) {
  // Initialize variables with the current direction and next move position
  var dir = direction;
  var nextMovePos = position + dir.movement;

  // Create an array from the directions object's keys
  var keys = Object.keys(_setup.DIRECTIONS);

  // Loop until a valid next move position is found
  while (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _setup.OBJECT_TYPE.GHOST)) {
    // Get a random key from the array of direction keys
    var key = keys[Math.floor(Math.random() * keys.length)];

    // Set the new direction based on the random key
    dir = _setup.DIRECTIONS[key];

    // Set the next move position using the new direction
    nextMovePos = position + dir.movement;
  }

  // Return an object with the updated next move position and direction
  return {
    nextMovePos: nextMovePos,
    direction: dir
  };
}
},{"./setup":"setup.js"}],"GameBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setup = require("./setup");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameBoard = /*#__PURE__*/function () {
  function GameBoard(DOMGrid) {
    _classCallCheck(this, GameBoard);
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }
  _createClass(GameBoard, [{
    key: "showGameStatus",
    value: function showGameStatus(gameWin) {
      // Create and show game win or game over
      var div = document.createElement('div');
      div.classList.add('game-status');
      div.innerHTML = "".concat(gameWin ? 'WIN!' : 'GAME OVER!');
      this.DOMGrid.appendChild(div);
    }
  }, {
    key: "createGrid",
    value: function createGrid(level) {
      var _this = this;
      var gridSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _setup.GRID_SIZE;
      this.dotCount = 0;
      this.grid = [];
      this.DOMGrid.innerHTML = '';
      // First set correct amount of columns based on Grid Size and Cell Size
      this.DOMGrid.style.cssText = "grid-template-columns: repeat(".concat(gridSize, ", ").concat(_setup.CELL_SIZE, "px);");
      level.forEach(function (square) {
        var div = document.createElement('div');
        div.classList.add('square', _setup.CLASS_LIST[square]);
        div.style.cssText = "width: ".concat(_setup.CELL_SIZE, "px; height: ").concat(_setup.CELL_SIZE, "px;");
        _this.DOMGrid.appendChild(div);
        _this.grid.push(div);

        // Add dots
        if (_setup.CLASS_LIST[square] === _setup.OBJECT_TYPE.DOT) _this.dotCount++;
      });
    }
  }, {
    key: "addObject",
    value: function addObject(pos, classes) {
      var _this$grid$pos$classL;
      (_this$grid$pos$classL = this.grid[pos].classList).add.apply(_this$grid$pos$classL, _toConsumableArray(classes));
    }
  }, {
    key: "removeObject",
    value: function removeObject(pos, classes) {
      var _this$grid$pos$classL2;
      (_this$grid$pos$classL2 = this.grid[pos].classList).remove.apply(_this$grid$pos$classL2, _toConsumableArray(classes));
    }
    // Can have an arrow function here cause of this binding
  }, {
    key: "objectExist",
    value: function objectExist(pos, object) {
      return this.grid[pos].classList.contains(object);
    }
  }, {
    key: "rotateDiv",
    value: function rotateDiv(pos, deg) {
      this.grid[pos].style.transform = "rotate(".concat(deg, "deg)");
    }
  }, {
    key: "moveCharacter",
    value: function moveCharacter(character) {
      if (character.shouldMove()) {
        var _character$getNextMov = character.getNextMove(this.objectExist.bind(this)),
          nextMovePos = _character$getNextMov.nextMovePos,
          direction = _character$getNextMov.direction;
        var _character$makeMove = character.makeMove(),
          classesToRemove = _character$makeMove.classesToRemove,
          classesToAdd = _character$makeMove.classesToAdd;
        if (character.rotation && nextMovePos !== character.pos) {
          // Rotate
          this.rotateDiv(nextMovePos, character.dir.rotation);
          // Rotate the previous div back
          this.rotateDiv(character.pos, 0);
        }
        this.removeObject(character.pos, classesToRemove);
        this.addObject(nextMovePos, classesToAdd);
        character.setNewPos(nextMovePos, direction);
      }
    }
  }, {
    key: "resetPacmanPosition",
    value: function resetPacmanPosition(pacman) {
      this.removeObject(pacman.pos, [_setup.OBJECT_TYPE.PACMAN]);
      pacman.setNewPos(287); // Set the initial position or any desired position
      this.addObject(pacman.pos, [_setup.OBJECT_TYPE.PACMAN]);
    }
  }], [{
    key: "createGameBoard",
    value: function createGameBoard(DOMGrid, level) {
      var board = new this(DOMGrid);
      board.createGrid(level);
      return board;
    }
  }]);
  return GameBoard;
}();
var _default = exports.default = GameBoard;
},{"./setup":"setup.js"}],"Pacman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setup = require("./setup");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Importing constants from setup.js
// Pacman class definition
var Pacman = /*#__PURE__*/function () {
  // Constructor for Pacman
  function Pacman(speed, startPos) {
    var lives = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    _classCallCheck(this, Pacman);
    this.pos = startPos; // Initial position
    this.speed = speed; // Speed of Pacman
    this.dir = null; // Direction of movement
    this.timer = 0; // Timer for movement
    this.powerPill = false; // Flag indicating if Pacman has power pill
    this.rotation = true; // Flag indicating if rotation is enabled
    this.lives = lives;
  }

  // Method to check if Pacman should move
  _createClass(Pacman, [{
    key: "shouldMove",
    value: function shouldMove() {
      if (!this.dir) return false;
      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }
      this.timer++;
    }

    // Method to get the next move of Pacman
  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      var nextMovePos = this.pos + this.dir.movement;

      // Check for collision with a wall or ghost lair
      if (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _setup.OBJECT_TYPE.GHOSTLAIR)) {
        nextMovePos = this.pos; // Reset position if collision
      }

      // Return an object with the updated next move position and direction
      return {
        nextMovePos: nextMovePos,
        direction: this.dir
      };
    }

    // Method to define Pacman's move
  }, {
    key: "makeMove",
    value: function makeMove() {
      var classesToRemove = [_setup.OBJECT_TYPE.PACMAN];
      var classesToAdd = [_setup.OBJECT_TYPE.PACMAN];

      // Return an object with classes to remove and classes to add
      return {
        classesToRemove: classesToRemove,
        classesToAdd: classesToAdd
      };
    }

    // Method to set the new position of Pacman
  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos) {
      this.pos = nextMovePos;
    }

    // Method to handle keyboard input for Pacman
  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(e, objectExist) {
      var dir;

      // Check if the key pressed is an arrow key
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        dir = _setup.DIRECTIONS[e.key];
      } else {
        return; // Do nothing if a non-arrow key is pressed
      }

      // Calculate the next move position
      var nextMovePos = this.pos + dir.movement;

      // Check if the next move collides with a wall
      if (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL)) return;

      // Set the direction for Pacman
      this.dir = dir;
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(gameBoard, gameOver) {
      console.log('Handling collision. Lives before:', this.lives);
      this.lives--;
      if (this.lives <= 0) {
        // Trigger game over logic here
        console.log('Game over!');
        gameOver(this, gameBoard);
      } else {
        // Reset Pacman's position
        console.log('Resetting position.');
        gameBoard.resetPacmanPosition(this);
      }
      console.log('Lives after:', this.lives);
    }
  }]);
  return Pacman;
}(); // Test 1: Pac-Man creation test
var testPacmanCreation = function testPacmanCreation() {
  var pacman = new Pacman(1, 0); // Adjust the initial properties as needed
  console.log('Test 1: Pac-Man creation test');
  console.log('Pacman object:', pacman);
};

// Test 2: Testing the shouldMove method
var testShouldMoveMethod = function testShouldMoveMethod() {
  var pacman = new Pacman(1, 0); // Adjust the initial properties as needed
  console.log('Test 2: Testing the shouldMove method');

  // Case 1: direction is null
  pacman.dir = null;
  console.log('Case 1 - ShouldMove:', pacman.shouldMove()); // Expected: false

  // Case 2: timer reaches speed
  pacman.dir = {
    movement: 1
  }; // Set a direction for testing
  pacman.timer = pacman.speed;
  console.log('Case 2 - ShouldMove:', pacman.shouldMove()); // Expected: true
};

// Test 3: Testing the getNextMove method
var testGetNextMoveMethod = function testGetNextMoveMethod() {
  var pacman = new Pacman(1, 0); // Adjust the initial properties as needed
  console.log('Test 3: Testing the getNextMove method');

  // Case 1: next move is not blocked
  pacman.dir = {
    movement: 1
  }; // Set a direction for testing
  var result1 = pacman.getNextMove(function () {
    return false;
  }); // Mock objectExist function
  console.log('Case 1 - Next Move Result:', result1);

  // Case 2: next move is blocked
  var result2 = pacman.getNextMove(function () {
    return true;
  }); // Mock objectExist function
  console.log('Case 2 - Next Move Result:', result2);
};

// Add more test functions for the remaining methods...

// Run the tests
testPacmanCreation();
testShouldMoveMethod();
testGetNextMoveMethod();
// Call other test functions...

// Export the Pacman class
var _default = exports.default = Pacman;
},{"./setup":"setup.js"}],"Ghost.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setup = require("./setup");
var _ghostmoves = require("./ghostmoves");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ghost = /*#__PURE__*/function () {
  function Ghost() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    var startPos = arguments.length > 1 ? arguments[1] : undefined;
    var movement = arguments.length > 2 ? arguments[2] : undefined;
    var name = arguments.length > 3 ? arguments[3] : undefined;
    _classCallCheck(this, Ghost);
    this.name = name;
    this.movement = movement;
    this.startPos = startPos;
    this.pos = startPos;
    this.dir = _setup.DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }
  _createClass(Ghost, [{
    key: "shouldMove",
    value: function shouldMove() {
      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }
      this.timer++;
    }
  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      // Call move algoritm here
      var _this$movement = this.movement(this.pos, this.dir, objectExist),
        nextMovePos = _this$movement.nextMovePos,
        direction = _this$movement.direction;
      return {
        nextMovePos: nextMovePos,
        direction: direction
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove() {
      var classesToRemove = [_setup.OBJECT_TYPE.GHOST, _setup.OBJECT_TYPE.SCARED, this.name];
      var classesToAdd = [_setup.OBJECT_TYPE.GHOST, this.name];
      if (this.isScared) classesToAdd = [].concat(_toConsumableArray(classesToAdd), [_setup.OBJECT_TYPE.SCARED]);
      return {
        classesToRemove: classesToRemove,
        classesToAdd: classesToAdd
      };
    }
  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos, direction) {
      this.pos = nextMovePos;
      this.dir = direction;
    }
  }]);
  return Ghost;
}();
var _default = exports.default = Ghost;
},{"./setup":"setup.js","./ghostmoves":"ghostmoves.js"}],"sounds/munch.wav":[function(require,module,exports) {
module.exports = "/munch.50161df6.wav";
},{}],"sounds/pill.wav":[function(require,module,exports) {
module.exports = "/pill.d5173a33.wav";
},{}],"sounds/game_start.wav":[function(require,module,exports) {
module.exports = "/game_start.09b402f7.wav";
},{}],"sounds/death.wav":[function(require,module,exports) {
module.exports = "/death.1b6386ba.wav";
},{}],"sounds/eat_ghost.wav":[function(require,module,exports) {
module.exports = "/eat_ghost.09613325.wav";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _setup = require("./setup");
var _ghostmoves = require("./ghostmoves");
var _GameBoard = _interopRequireDefault(require("./GameBoard"));
var _Pacman = _interopRequireDefault(require("./Pacman"));
var _Ghost = _interopRequireDefault(require("./Ghost"));
var _munch = _interopRequireDefault(require("./sounds/munch.wav"));
var _pill = _interopRequireDefault(require("./sounds/pill.wav"));
var _game_start = _interopRequireDefault(require("./sounds/game_start.wav"));
var _death = _interopRequireDefault(require("./sounds/death.wav"));
var _eat_ghost = _interopRequireDefault(require("./sounds/eat_ghost.wav"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importing necessary modules and assets

// Classes

// Sounds

// Dom Elements
var gameGrid = document.querySelector('#game');
var scoreTable = document.querySelector('#score');
var startButton = document.querySelector('#start-button');
var nextLevelButton = document.querySelector('#next-level-button');
// Game constants
var POWER_PILL_TIME = 10000; // ms
var GLOBAL_SPEED = 80; // ms
var gameBoard = _GameBoard.default.createGameBoard(gameGrid, _setup.LEVEL);
var TOTAL_LEVELS = 2; // Set the total number of levels here

var currentLevel = 1; // Initialize the current level
// Initial setup
var score = 0;
var timer = null;
var gameWin = false;
var powerPillActive = false;
var powerPillTimer = null;
var lives = 2;

// --- AUDIO --- //
function playAudio(audio) {
  var soundEffect = new Audio(audio);
  soundEffect.play();
}

// --- GAME CONTROLLER --- //
function gameOver(pacman, _grid) {
  playAudio(_death.default);
  document.removeEventListener('keydown', function (e) {
    return pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
  });
  gameBoard.showGameStatus(gameWin);
  clearInterval(timer);

  // Decrement lives
  lives--;
  updateVisualLives(lives);

  // Check if the game is over
  if (lives <= 0) {
    // Trigger game over logic here
    console.log('Game over!');
    // You may want to add additional game over logic here if needed
  } else {
    // Reset Pacman's position
    console.log('Resetting position.');
    gameBoard.resetPacmanPosition(pacman);
    // Show start button
    startButton.classList.remove('hide');
  }

  // Update lives display
  // updateLivesDisplay(lives);
  // Show start button
  startButton.classList.remove('hide');
}
function updateVisualLives(lives) {
  var lifeDivs = document.querySelectorAll('.life');
  console.log('Updating visual lives. Lives:', lives);
  lifeDivs.forEach(function (lifeDiv, index) {
    if (index < lives) {
      // Show the div for remaining lives
      lifeDiv.classList.remove('hidden');
    } else {
      // Hide the div for lost lives
      lifeDiv.classList.add('hidden');
    }
  });
}
function checkCollision(pacman, ghosts, updateVisualLives) {
  // Check if Pacman collides with ghosts
  var collidedGhost = ghosts.find(function (ghost) {
    return pacman.pos === ghost.pos;
  });
  // updateLivesDisplay(lives);

  if (collidedGhost) {
    if (pacman.powerPill) {
      // If Pacman has power pill, eat ghost
      playAudio(_eat_ghost.default);
      gameBoard.removeObject(collidedGhost.pos, [_setup.OBJECT_TYPE.GHOST, _setup.OBJECT_TYPE.SCARED, collidedGhost.name]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      // If Pacman does not have power pill, game over
      pacman.handleCollision(gameBoard, gameOver, updateVisualLives);

      // Add a class to life1 when pacman.pos is equal to ghost.pos
      if (pacman.lives === 2) {
        var lifeElement = document.querySelector('#life3');
        if (lifeElement) {
          lifeElement.classList.add('hidden');
        }
      }
      if (pacman.lives === 1) {
        var _lifeElement = document.querySelector('#life2');
        if (_lifeElement) {
          _lifeElement.classList.add('hidden');
        }
      }
      if (pacman.lives === 0) {
        var _lifeElement2 = document.querySelector('#life1');
        if (_lifeElement2) {
          _lifeElement2.classList.add('hidden');
        }
      }
    }
  }
}
function gameLoop(pacman, ghosts) {
  // 1. Move Pacman
  gameBoard.moveCharacter(pacman);
  // 2. Check Ghost collision on the old positions
  checkCollision(pacman, ghosts);
  // 3. Move ghosts
  ghosts.forEach(function (ghost) {
    return gameBoard.moveCharacter(ghost);
  });
  // 4. Do a new ghost collision check on the new positions
  checkCollision(pacman, ghosts);
  // 5. Check if Pacman eats a dot
  if (gameBoard.objectExist(pacman.pos, _setup.OBJECT_TYPE.DOT)) {
    playAudio(_munch.default);
    gameBoard.removeObject(pacman.pos, [_setup.OBJECT_TYPE.DOT]);
    // Remove a dot
    gameBoard.dotCount--;
    // Add Score
    score += 10;
  }
  // 6. Check if Pacman eats a power pill
  if (gameBoard.objectExist(pacman.pos, _setup.OBJECT_TYPE.PILL)) {
    playAudio(_pill.default);
    gameBoard.removeObject(pacman.pos, [_setup.OBJECT_TYPE.PILL]);
    pacman.powerPill = true;
    score += 50;
    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(function () {
      return pacman.powerPill = false;
    }, POWER_PILL_TIME);
  }
  // 7. Change ghost scare mode depending on power pill
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach(function (ghost) {
      return ghost.isScared = pacman.powerPill;
    });
  }
  // 8. Check if all dots have been eaten
  if (gameBoard.dotCount === 0) {
    if (currentLevel === TOTAL_LEVELS) {
      // If it's the last level, trigger game win
      gameWin = true;
      gameOver(pacman, gameGrid);
    } else {
      // Increment the current level
      currentLevel++;

      // Show the "Next Level" button
      nextLevelButton.classList.remove('hide');

      // Clear the game loop timer
      clearInterval(timer);
    }
  }

  // 9. Show new score
  scoreTable.innerHTML = score;
}

// Initialize game
startButton.addEventListener('click', startGame);
function startGame() {
  // Play the game start sound
  playAudio(_game_start.default);

  // Reset game state
  gameWin = false;
  powerPillActive = false;
  score = 0;

  // Show all life elements
  var allLifeElements = document.querySelectorAll('.life');
  allLifeElements.forEach(function (lifeElement) {
    lifeElement.classList.remove('hidden');
    lifeElement.classList.add('showing-live');
  });
  // Hide the start button
  startButton.classList.add('hide');

  // Create the game grid
  gameBoard.createGrid(_setup.LEVEL);

  // Initialize Pacman
  var pacman = new _Pacman.default(2, 287);
  gameBoard.addObject(287, [_setup.OBJECT_TYPE.PACMAN]);
  // Listen for key input to control Pacman
  document.addEventListener('keydown', function (e) {
    return pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
  });

  // Initialize Ghosts
  var ghosts = [new _Ghost.default(5, 188, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.BLINKY), new _Ghost.default(4, 209, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.PINKY), new _Ghost.default(3, 230, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.INKY), new _Ghost.default(2, 251, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.CLYDE)];
  // updateLivesDisplay(lives);
  // Gameloop
  timer = setInterval(function () {
    return gameLoop(pacman, ghosts);
  }, GLOBAL_SPEED);
}
function nextLevel() {
  // Update the grid size and create the new game board
  gameBoard.createGrid(currentLevel === 1 ? _setup.LEVEL_2 : _setup.LEVEL_2, currentLevel === 1 ? _setup.GRID_SIZE_2 : _setup.GRID_SIZE_2);
  // Reset other game-related variables if needed
  score = 0;
  gameWin = false;
  powerPillActive = false;

  // Create Pacman and ghosts for the new level
  var pacman = new _Pacman.default(2, 287);
  gameBoard.addObject(287, [_setup.OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', function (e) {
    var directions = currentLevel === 1 ? directions : _setup.DIRECTIONS_2;
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard), directions);
  });
  var ghosts = [new _Ghost.default(5, 188, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.BLINKY), new _Ghost.default(4, 209, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.PINKY), new _Ghost.default(3, 230, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.INKY), new _Ghost.default(2, 251, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.CLYDE)];

  // Start the game loop for the new level
  timer = setInterval(function () {
    return gameLoop(pacman, ghosts);
  }, GLOBAL_SPEED);
}

// Initialize game
startButton.addEventListener('click', startGame);

// uncomment later
nextLevelButton.addEventListener('click', function () {
  // Hide the "Next Level" button
  nextLevelButton.classList.add('hide');
  // Move to the next level
  nextLevel();
});
},{"./setup":"setup.js","./ghostmoves":"ghostmoves.js","./GameBoard":"GameBoard.js","./Pacman":"Pacman.js","./Ghost":"Ghost.js","./sounds/munch.wav":"sounds/munch.wav","./sounds/pill.wav":"sounds/pill.wav","./sounds/game_start.wav":"sounds/game_start.wav","./sounds/death.wav":"sounds/death.wav","./sounds/eat_ghost.wav":"sounds/eat_ghost.wav"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50294" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/pacman.e31bb0bc.js.map