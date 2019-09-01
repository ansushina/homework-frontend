'use strict';

QUnit.module('Тестируем функцию zip', function () {
	QUnit.test('Функция работает с единственным объектом', function (assert) {
		assert.deepEqual(zip({}), {});
		assert.deepEqual(zip({answer: 42}), {answer: 42});
		assert.deepEqual(zip({name: 'Georg'}), {name: 'Georg'});
		const obj = {
			count: 0,
			cost: '120$'
		};
		assert.deepEqual(zip(obj), obj);
	});

	QUnit.test('Функция работает с объектами среди которых есть объекты без свойств', function (assert) {
		assert.deepEqual(zip({}, {}), {});
		assert.deepEqual(zip({answer: 42}, {}), {answer: 42});
		assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
		assert.deepEqual(zip({}, {answer: 42}), {answer: 42});
		assert.deepEqual(zip({}, {}, {}, {name: 'Georg'}), {name: 'Georg'});

		const obj = {
			count: 0,
			cost: '120$'
		};

		assert.deepEqual(zip({}, {}, {}, obj, {}, {}), obj);
	});

	QUnit.test('Функция работает с объектами со свойствами с разными именами', function (assert) {
		const obj = {
			count: 0,
			cost: '120$'
		};

		assert.deepEqual(zip({count: 0}, {cost: '120$'}), obj);

		const obj2 = {
			a: 1,
			b: 2,
			c: null,
			d: 4,
			e: 5
		};
		assert.deepEqual(zip({a: 1}, {b: 2}, {c: null}, {d: 4}, {e: 5}), obj2);

		const obj3 = {
			name: 'age',
			value: 42
		};

		const obj4 = {
			prop: false,
			attr: null
		};

		const obj5 = {
			name: 'age',
			value: 42,
			prop: false,
			attr: null
		};

		assert.deepEqual(zip(obj3, obj4), obj5);
        
        assert.deepEqual(zip({b:{c:{k:1}}}, {r:{f:2}}), {b:{c:{k:1}}, r:{f:2}});
	});

	QUnit.test('Функция правильно работает со свойствами, которые встречаются в нескольких объектах', function (assert) {
		assert.deepEqual(zip({answer: 42}, {answer: false}), {answer: 42}, 'Значение должно браться из первого встретившегося поля');
		assert.deepEqual(zip({age: 5}, {}, {age: 4}, {age: 72}), {age: 5});

		const obj = {
			name: 'age',
			value: 42
		};
		assert.deepEqual(zip({name: 'age'}, {value: 42}, {name: 'cost'}, {value: -6}), obj);
        
        const obj1 = {
            name:"name",
            age:42,
        };
        
        const obj2 = {
            name:'liza',
            country:'russia',
            attr: null
        };
        
        const obj3 = {
            name:"name",
            age:42,
            country:'russia',
            attr: null  
        };  
        
        assert.deepEqual(zip(obj1, obj2), obj3);
        
        assert.deepEqual(zip({a:{k:{z:2}}}, {a:{d:{z:1}}}), {a:{k:{z:2}, d:{z:1}}});
        assert.deepEqual(zip({a:{k:{z:2}}}, {a:{k:{z:1}}}), {a:{k:{z:2}}});
        assert.deepEqual(zip({a:{k:{z:2}}}, {a:{k:{m:1}}}), {a:{k:{z:2, m:1}}});
	});
    
    QUnit.test('Функция правильно работает с неверно переданными параметрами', function (assert) {
        assert.deepEqual(zip(), {});
        
        assert.deepEqual(zip(1,2,3,4), {});
        assert.deepEqual(zip(1,2,3,4, {age:5}), {age:5});
        
        assert.deepEqual(zip('string', 'string'), {});
        assert.deepEqual(zip('string', {string: 'string'}), {string: 'string'});
        
        assert.deepEqual(zip(true,false), {});
        assert.deepEqual(zip(true, {age:5}), {age:5});
        
        assert.deepEqual(zip(null), {});
        assert.deepEqual(zip(null, {age:5}), {age:5});
        
        assert.deepEqual(zip(undefined),{});
        assert.deepEqual(zip(undefined, {age:5}), {age:5});
        
    });
});
