'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cognitoClient = require('./cognitoClient');

var _cognitoClient2 = _interopRequireDefault(_cognitoClient);

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    cognitoClient: _cognitoClient2.default,
    hash: _hash2.default
};