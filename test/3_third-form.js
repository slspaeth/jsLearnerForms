'use strict';

const assert = require('chai').assert;
const jsforms = require('../src/jsforms');

require('./helpers/global-helper');

describe('Forms', function () {

    describe('greeter', function () {

        /*
         * 1 - Extract typeof expression to a function:
         * 
         *     function isType (typeName, value) {
         *          return typeof _something_ === _string_;
         *     }
         * 
         * 2 - Refactor greet to use isType
         * 
         *     function greet (greeting) {
         *          let result = isType(_string_, _something_) ? _something_ : _something_;
         *          return result;
         *     }
         * 
         * 3 - extract ternary to a function:
         * 
         *     function eitherType (typeName, defaultValue, actualValue) {
         *          return _string_ ? _something_ : _something_;
         *     }
         * 
         * 4 - Refactor greet to use eitherType
         * 
         *     function greet (greeting) {
         *          return eitherType(_string_, _something_, _something_) + '!';
         *     }
         */

        // Keep the tests passing!

        it('should say "Hello!" by default', function () {
            assert.equal(jsforms.greet(), 'Hello!');
        });

        it('should say "Salutations!" when Salutations is passed', function () {
            assert.equal(jsforms.greet('Salutations'), 'Salutations!');
        });

    });

    describe('square', function () {

        // Keep the tests passing!

        it('should square 1', function () {
            assert.equal(jsforms.square(1), 1);
        });

        it('should square 3', function () {
            assert.equal(jsforms.square(3), 9);
        });

    });

    describe('squareRoot', function () {

        // Keep the tests passing!

        it('should take the square root of 1', function () {
            assert.equal(jsforms.squareRoot(1), 1);
        });

        it('should take the square root of 4', function () {
            assert.equal(jsforms.squareRoot(4), 2);
        });

    });

    describe('sum', function () {

        /*
         * 1 - Refactor forEach loop to reduce
         * 
         *     function (values) {
         *          var result = _array_.reduce(_function_, _number_);
         *          return result;
         *     }
         * 
         * 2 - Return reduction directly (inline value)
         */

        // Keep the tests passing!

        it('should take the sum of one number', function () {
            assert.equal(jsforms.sum([1]), 1);
        });

        it('should add two numbers', function () {
            assert.equal(jsforms.sum([2, 3]), 5);
        });

        it('should add multiple numbers', function () {
            assert.equal(jsforms.sum([1, 3, 5, 7]), 16);
        });
    });

    describe('squareAll', function () {

        // Keep the tests passing!

        it('should square all numbers in a single-value array', function () {
            assert.equal(jsforms.squareAll([2]).toString(), '4');
        });

        it('should square multiple numbers', function () {
            assert.equal(jsforms.squareAll([1, 2, 3, 5]).toString(), '1,4,9,25');
        });

    });

    describe('sumOfSquares', function () {

        // Keep the tests passing!

        it('should square number in a 1-length array and return it', function () {
            assert.equal(jsforms.sumOfSquares([2]), 4);
        });

        it('should take the sum of squares of multiple numbers', function () {
            assert.equal(jsforms.sumOfSquares([1, 2, 3]), 14);
        });

    });

    describe('buildVector', function () {

        /*
         * 1 - Make the Vector constructor into a constructor/factory
         *      function Vector (points) {
         *          let vector = this instanceof Vector ? _object_ : new _function_;
         *          
         *          vector.points = _array_;
         *          _array_.forEach((value, index) => _object_[_number_] = _something_);
         * 
         *          return vector;
         *      }
         * 
         * 2 - Replace buildVector in the module exports object and delete buildVector function
         * 
         * 3 - Extract value attachment into a function
         *      Vector.attachValues = function (vector, points) {
         *          _object_.points = _array_;
         *          _array_.forEach((value, index) => _object_[_number_] = _something_);
         *      }
         * 
         *      function Vector (points) {
         *          let vector = this instanceof Vector ? _object_ : new _function_;
         *          Vector.attachValues(_object_, _array_);
         *          return vector;
         *      }
         * 
         */

        // Keep the tests passing!

        it('should return a vector matching original values', function () {
            let initialArray = [1, 2];
            let vector = jsforms.buildVector(initialArray);
            let resultValues = [vector[0], vector[1]];

            assert.equal(resultValues.toString(), initialArray.toString());
        });

        it('should return a vector given an array which is not the original array', function () {
            let initialArray = [1, 2];
            let vector = jsforms.buildVector(initialArray);

            assert.equal(initialArray !== vector, true);
        });

        it('should return vector with valueOf function which does not return vector', function () {
            let vector = jsforms.buildVector([1, 2, 3]);

            assert.equal(vector.valueOf() !== vector, true);
        });

        it('should return a vector where toString returns a vector string', function () {
            let vector = jsforms.buildVector([1, 2, 3]);

            assert.equal(vector.toString(), '<1,2,3>');
        });

    });

    describe('Immutable vector properties', function () {
        
    });

    describe('magnitude', function () {

        // Keep the tests passing!

        it('should return the magnitude of a one-value vector', function () {
            assert.equal(jsforms.magnitude([5]), 5);
        });

        it('should return only positive magnitude values', function () {
            assert.equal(jsforms.magnitude([-3]), 3);
        });

        it('should return the magnitude of a two-value vector', function () {
            assert.equal(jsforms.magnitude([6, 8]), 10);
        });

        it('should return the magnitude of a multi-value vector', function () {
            assert.equal(jsforms.magnitude([0, 12, 3, 4]), 13);
        });

    });

    describe('getVectorsShorterThan', function () {

        // Keep the tests passing!

        it('should return single vector when the only vector magnitude is acceptably short', function () {
            let vectors = [jsforms.buildVector([1, 2])];
            let result = jsforms.getVectorsShorterThan(5, vectors);

            assert.equal(result.length, 1);
            assert.equal(result[0].toString(), '<1,2>');
        });

        it('should return an empty array when the only vector magnitude is too long', function () {
            let length = 4;
            let vectors = [jsforms.buildVector([3, 4])];
            let result = jsforms.getVectorsShorterThan(length, vectors);

            assert.equal(result.length, 0)
        });

        it('should only filter vectors which are too long', function () {
            let length = 10;
            let vectors = [
                jsforms.buildVector([10, 10]),
                jsforms.buildVector([3, 4])
            ];

            let result = jsforms.getVectorsShorterThan(length, vectors);

            assert.equal(result.length, 1);
            assert.equal(result[0].toString(), '<3,4>');
        });

        it('should filter all vectors which are too long', function () {
            let vectors = [
                jsforms.buildVector([1, 2, 2]),
                jsforms.buildVector([10, 20]),
                jsforms.buildVector([3, 4]),
                jsforms.buildVector([1, 2, 10, 100])
            ];

            let result = jsforms.getVectorsShorterThan(10, vectors);

            let resultValues = [
                result[0].toString(),
                result[1].toString()
            ];

            assert.equal(resultValues.toString(), '<1,2,2>,<3,4>');
        });

    });

    // You're done!
    // Good job! I like what you got.

});

if (typeof global.runQuokkaMochaBdd === 'function') {
    runQuokkaMochaBdd();
}