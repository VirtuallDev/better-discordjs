"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.Event = exports.ExtendedClient = void 0;
var discord_js_1 = __importStar(require("discord.js"));
var glob_1 = __importDefault(require("glob"));
var util_1 = require("util");
var utils_1 = __importDefault(require("./utils"));
var globsify = (0, util_1.promisify)(glob_1.default);
var ExtendedClient = /** @class */ (function (_super) {
    __extends(ExtendedClient, _super);
    function ExtendedClient(options) {
        var _this = _super.call(this, { intents: options.intents }) || this;
        _this.commands = new discord_js_1.Collection();
        _this.connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var commands_1, url;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((_a = this.clientOptions) === null || _a === void 0 ? void 0 : _a.eventsPath)
                            this.loadEvents(this.clientOptions.eventsPath);
                        if (!((_b = this.clientOptions) === null || _b === void 0 ? void 0 : _b.commandPath)) return [3 /*break*/, 2];
                        commands_1 = [];
                        url = this.clientOptions.commandPath.endsWith("/") ? this.clientOptions.commandPath + "*/*{.ts,.js}" : this.clientOptions.commandPath + "/*/*{.ts,.js}";
                        return [4 /*yield*/, globsify(url)];
                    case 1:
                        (_c.sent()).forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var command;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, utils_1.default.importFile(file)];
                                    case 1:
                                        command = _a.sent();
                                        if (!command.name)
                                            return [2 /*return*/, console.error("Missed name argument in command: " + file)];
                                        this.commands.set(command.name, command);
                                        commands_1.push(command);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.on("ready", function () {
                            var _a, _b;
                            if (((_a = _this.clientOptions) === null || _a === void 0 ? void 0 : _a.guildIds) && _this.clientOptions.guildIds.length > 0) {
                                (_b = _this.clientOptions) === null || _b === void 0 ? void 0 : _b.guildIds.forEach(function (guildId) {
                                    _this.loadApplicationCommands({
                                        commands: commands_1,
                                        guildId: guildId
                                    });
                                });
                            }
                            else {
                                _this.loadApplicationCommands({ commands: commands_1 });
                            }
                        });
                        _c.label = 2;
                    case 2:
                        this.login(this.clientOptions.token).catch(function () {
                            console.error("Invalid Token!");
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.loadApplicationCommands = function (_a) {
            var _b, _c;
            var commands = _a.commands, guildId = _a.guildId;
            if (!guildId) {
                (_b = _this.application) === null || _b === void 0 ? void 0 : _b.commands.set(commands);
            }
            else {
                (_c = _this.guilds.cache.get(guildId)) === null || _c === void 0 ? void 0 : _c.commands.set(commands);
            }
        };
        _this.loadEvents = function (eventPath) { return __awaiter(_this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = eventPath.endsWith("/") ? eventPath + "*{.ts,.js}" : eventPath + "/*{.ts,.js}";
                        return [4 /*yield*/, globsify(url)];
                    case 1:
                        (_a.sent()).forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var event;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, utils_1.default.importFile(file)];
                                    case 1:
                                        event = _a.sent();
                                        if (!event.name)
                                            console.error("Invalid Event: " + file);
                                        else {
                                            console.log("Loaded event: " + event.name);
                                            this.on(event.name, event.callback);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.clientOptions = options;
        return _this;
    }
    return ExtendedClient;
}(discord_js_1.default.Client));
exports.ExtendedClient = ExtendedClient;
var Event = /** @class */ (function () {
    function Event(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    return Event;
}());
exports.Event = Event;
var Command = /** @class */ (function () {
    function Command(options) {
        Object.assign(this, options);
    }
    return Command;
}());
exports.Command = Command;
