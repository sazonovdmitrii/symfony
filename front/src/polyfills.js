import 'promise-polyfill/src/polyfill';
import 'regenerator-runtime/runtime';
import 'unfetch/polyfill';
// for https://github.com/verlok/lazyload
import 'intersection-observer';
import 'custom-event-polyfill'; // for https://github.com/verlok/lazyload

// Support for...of (a commonly used syntax feature that requires Symbols)
import 'core-js/features/symbol';
// Support iterable spread (...Set, ...Map)
import 'core-js/features/array/from';

import 'core-js/features/array/find';
import 'core-js/features/object/keys';
import 'core-js/features/object/values';
import 'core-js/features/object/entries';
import 'core-js/features/weak-map';
import 'core-js/features/url-search-params';

Object.assign = require('object-assign');
