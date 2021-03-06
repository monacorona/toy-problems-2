var permutations = function (array) {
  var len = array.length;
  if (len === 0) { return []; }
  if (len === 1) { return [ array ]; }

  var first  = array.slice(0, 1);
  var rest   = array.slice(1);

  return permutations( rest ).reduce(function (acc, cur) {
    var len = cur.length;

    for (var i = 0; i < len; i += 1) {
      acc.push( Array.prototype.concat.call( cur.slice(0, i), first, cur.slice(i) ) );
    }
    acc.push( Array.prototype.concat.call( cur, first ) );

    return acc;
  }, []);
};


var combinations = function (array) {
  var len    = array.length;
  var result = [];
  var first, rest;

  if (len === 0) { return []; }
  if (len === 1) { return [ array ]; }

  first = array[0];
  rest  = array.slice(1);

  combinations( rest ).forEach(function (arr) {
    result.push( arr.concat(first) );
    result.push( arr );
  });
  result.push( [ first ] );

  return result;
};


var rockPaperScissors = function (num) {
  if (num <=  0) { return []; }
  if (num === 1) { return [ ['rock'], ['paper'], ['scissors'] ]; }

  var result = [];

  rockPaperScissors(num - 1).forEach(function (arr) {
    ['rock', 'paper', 'scissors'].forEach(function (hand) {
      result.push( Array.prototype.concat( arr, hand ) );
    });
  });

  return result;
};


var balancedParens = function (string) {
  var stack = [];
  var character, popped;

  var isOpening = function (character) {
    return character === '(' ||
           character === '[' ||
           character === '{';
  };

  var map = {
    ')' : '(',
    ']' : '[',
    '}' : '{'
  };

  for (var i = 0; i < string.length; i += 1) {
    character = string[i];

    if ( isOpening(character) ) {
      stack.push( character );
    } else if ( map[ character ] ) {
      popped = stack.pop();
      if ( map[character] !== popped ) { return false; }
    }
  }

  return stack.length === 0;
};


var binarySearch = function (arr, num) {
  var inner = function (start, end) {
    var mid = Math.floor( (start + end) / 2 );

    if (start >= end)     { return null; }
    if (num === arr[mid]) { return mid; }
    if (num  <  arr[mid]) { return inner(start, mid); }
    return inner(mid + 1, end);
  };

  return inner(0, arr.length);
};


var characterFrequency = function (string) {
  var createHash = function (string) {
    var hash = {};
    for (var i = 0; i < string.length; i += 1) {
      hash[ string[i] ] = hash[ string[i] ] || 0;
      hash[ string[i] ] += 1;
    }
    return hash;
  };

  var createDataStructure = function (hash) {
    var result = [];
    for (var prop in hash) {
      result.push([ prop, hash[prop] ]);
    }
    return result;
  };

  var dsHash = createDataStructure( createHash(string) );

  dsHash.sort(function (a, b) {
    // a and b are arrays
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else {
      return a[0] >= b[0] ? 1 : -1;
    }
  });

  return dsHash;
};


var makeChange = function (num) {
  var inner = function (num, coins) {
    if (num  <  0) { return 0; }
    if (num === 0) { return 1; }

    var total = 0;
    coins.forEach(function (amt) {
      total += inner(num - amt, availableCoins(amt));
    });

    return total;
  };

  return inner(num, availableCoins(num));
};

var availableCoins = function (num) {
  return [200, 100, 50, 20, 10, 5, 2, 1].filter(function (n) {
    return num >= n;
  });
};


var convertToHash = function (string) {
  var hash = {};
  for (var i = 0; i < string.length; i += 1) {
    hash[string[i]] = true;
  }
  return hash;
};

var combineHash = function (hash1, hash2) {
  var result = {};
  for (var prop in hash1) {
    if (hash2[prop]) {
      result[prop] = true;
    }
  }
  return result;
};

var commonCharacters = function () {
  var args   = Array.prototype.slice.call(arguments);
  var first  = args[0];
  var result = args
    .map(function (string) {
      return convertToHash(string);
    })
    .reduce(function (acc, cur) {
      return combineHash(acc, cur);
    });

  return first.split('')
    .filter(function (character) {
      var temp = result[character];
      delete result[character];
      return temp;
    })
    .join('');
};


var mixEvents = function (obj) {
  var eventHash = {};

  obj.on = function (e, callback) {
    // check if event already exists in eventHash
    eventHash[ e ] = eventHash[ e ] || [];
    eventHash[ e ].push( callback );
  };

  obj.trigger = function (e) {
    var args = Array.prototype.slice.call(arguments, 1);
    var allCallbacks = eventHash[ e ];
    allCallbacks.forEach(function (fn) {
      fn.apply(this, args);
    });
  };

  return obj;
};


Array.prototype.isSubsetOf = function (base) {
  var thisLen = this.length;
  var baseLen = base.length;
  var isFound, i, j;

  if (thisLen > baseLen) return false;

  // 'this' array contains at most base array's number of elements
  for (i = 0; i < thisLen; i += 1) {
    isFound = false;
    for (j = 0; j < baseLen; j += 1) {
      if (this[i] === base[j]) {
        isFound = true;
      }
    }
    // check if isFound has flipped
    if (!isFound) return false;
  }

  return true;
};


var quickSort = function (array) {
  // base case
  if (array.length < 2) return array;

  var pivot = array.splice(0, 1)[0];
  var left  = [];
  var right = [];
  var len   = array.length;
  var i;

  for (i = 0; i < len; i += 1) {
    (array[i] <= pivot ? left : right).push( array[i] );
  }

  return Array.prototype.concat.call( quickSort(left), pivot, quickSort(right) );
};


var mergeSort = function (array) {
  var len = array.length;
  if (len < 2) return array;

  var mid   = Math.floor(len / 2);
  var left  = mergeSort( array.slice(0, mid) );
  var right = mergeSort( array.slice(mid) );

  return merge(array, left, right);
};

var merge = function (array, left, right) {
  var leftLen  = left.length;
  var rightLen = right.length;
  var i = 0;
  var j = 0;
  var k = 0;

  while (j < leftLen && k < rightLen) {
    if (left[j] <= right[k]) {
      array[i] = left[j];
      j += 1;
    } else {
      array[i] = right[k];
      k += 1;
    }
    i += 1;
  }

  while (j < leftLen) {
    array[i] = left[j];
    i += 1;
    j += 1;
  }

  while (k < rightLen) {
    array[i] = right[k];
    i += 1;
    k += 1;
  }

  return array;
};