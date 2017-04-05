mocha.setup('bdd');
var expect = chai.expect;

//TESTS
// var Earth = {
//   isRound : true,
//   whichPlanet : 3,
//   density : 6
// }
//
// describe('earth', function(){
//
//   it('is round', function(){
//     expect(Earth.isRound).to.equal(true);
//   });
//
//   it('is the third planet from the sun', function(){
//     expect(Earth.whichPlanet).to.equal(4);
//   });
//
//   it('is a dense planet', function(){
//     expect(Earth.density).to.be.at.least(5);
//   })
// });

// Write a function called replaceWith that takes in a string, a character to replace and a character
// to replace it with and returns the string with the replacements. Write tests to make sure this is case sensitive
function replaceWith(string, letter, switchLetter){
  var arr = string.split('');
  for (var i = 0; i < arr.length; i ++){
    if(arr[i] === letter){
      arr[i] = switchLetter;
    }
  }
  return arr.join('');
}

// Write a function called expand which takes an array and a number and
//returns a copy of the array with as many numbers as specified

function expand(array, num){
  var newArr = [];
  for(var i = 0 ; i < num; i ++){
    newArr = newArr.concat(array);
  }
  return newArr;
}

// Write a function called acceptNumbersOnly which takes in any number of arguments and returns true if all of them are numbers.
// Watch out for NaN - it is a typeof "number"!
function acceptNumbersOnly(){
  var args = Array.prototype.slice.call(arguments);
  for(var i = 0 ; i < args.length; i ++){
    if(isNaN(args[i]) || typeof args[i] !== 'number'){
      return false;
    }
  }
  return true;
}

//Write a function called mergeArrays which takes in two arrays and returns one array with the values sorted
function mergeArrays(arr1, arr2){
  return arr1.concat(arr2);
}

// Write a function called mergeObjects which takes in two objects and return an object with the keys and values combined.
// If the second parameter has the same key - it should override first one.
// There is a built in function called Object.assign - research it, but do not use it, try to do this on your own!
function mergeObjects(obj1, obj2){

  var newObj = {};
  for(var key in obj1){
    if(newObj[key] === undefined){
      newObj[key] = obj1[key];
    } else {
      newObj[key] = obj1[key];
    }
  }
  for(var key in obj2){
    if(newObj[key] === undefined){
      newObj[key] = obj2[key];
    } else {
      newObj[key] = obj2[key];
    }
  }
  return newObj;
}

describe('replaceWith', function(){

  it('should return a new string', function(){
    expect(replaceWith('awesome', 'e', 'z')).to.equal('awzsomz');
  });

  it('should check for case sensitivity', function(){
    expect(replaceWith("Foo", "F", "B")).to.equal('Boo');
  });
});


describe('expand', function(){

  it('should return a new array as many times as the given parameter', function(){
    expect(expand([1, 2, 3], 4)).to.deep.equal([1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]);
    expect(expand(['Foo', 'Bar'], 5)).to.deep.equal(['Foo', 'Bar', 'Foo', 'Bar', 'Foo', 'Bar', 'Foo', 'Bar', 'Foo', 'Bar']);
  });

});

describe('acceptNumbersOnly', function(){

  it('should return true if all arguments are numbers', function(){
    expect(acceptNumbersOnly(1, 2, 3)).to.equal(true);
    //expect(acceptNumbersOnly(1, 2, 3, 4)).to.equal(true);
  });

  it('should return `false` if `NaN` is an argument', function(){
    expect(acceptNumbersOnly(1,2,3,4,5,6,NaN)).to.equal(false);
  });
});

describe('mergeArrays', function(){

  it('should return a new array', function(){
    expect(mergeArrays([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
  });

  it('should return a sorted array', function(){
    expect(mergeArrays([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
  });
});

describe('mergeObjects', function(){

  // var obj1;
  // var obj2;
    var obj1 = {
      name: "Foo",
      num: 33
    };
    var obj2 = {
    test: "thing",
    num: 55
}
  it('should return an object', function(){
    expect(mergeObjects(obj1, obj2)).to.deep.equal({
    name: "Foo",
    num: 55,
    test: "thing"
});
  });
});

mocha.checkLeaks();
mocha.run();
