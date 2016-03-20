import {Block, COLOURS, BlockGrid, EMPTY_COLOUR} from '../app/javascript/grid';
import {assert} from 'chai';

let {describe, it} = window;

describe('Type Checker', () => {
	it('EMPTY_STRING should be string', () => {
		assert.ok(typeof EMPTY_COLOUR === 'string')
	});
	it('COLOURS should be an Array', () => {
		assert.ok(COLOURS instanceof Array)
	});
	it('Block should be a Class', () => {
		assert.ok(typeof Block === 'function');
	});
	it('BlockGrid should be a Class', () => {
		assert.ok(typeof Block === 'function');
	});
});

describe('Block', () => {

	it('should be created with correctly', () => {
		let testCoords = [
			[1, 2],
			[4, 9],
			[0, 0]
		];

		testCoords.forEach((testCoord) => {
			let block = new Block(...testCoord);
			assert.equal(block.x, testCoord[0], 'x is set correctly');
			assert.equal(block.y, testCoord[1], 'y is set correctly');
			assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
		});
	});

	it('blank block should be created correctly', () => {

		let block = new Block(1, 1, true);

		assert.equal(block.blank, true);

	});

});

describe('BlockGrid', () => {
	


	it('should be created correctly', () => {

		const blockGrid = new BlockGrid(5, 5);
		
		assert.ok(blockGrid.grid instanceof Array);
		assert.ok(blockGrid.grid[0][0] instanceof Block);
		assert.equal(blockGrid.grid.length, 5);
		assert.equal(blockGrid.grid[0].length, 5);
		
	});

	it('should update correctly', () => {

		let pattern = [
			['red', 'red', 'blue', 'green', 'yellow'],
			['red', 'red', 'yellow', 'yellow', 'yellow'],
			['blue', 'blue', 'yellow', 'green', 'green'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['blue', 'blue', 'blue', 'blue', 'blue']
		];

		const blockGrid = new BlockGrid(5, 5, pattern);

		blockGrid.render = function() {};

		blockGrid.blockClicked(null, blockGrid.grid[0][0]);

		assert.equal(blockGrid.grid[0][0].colour, 'blue');
		assert.equal(blockGrid.grid[1][0].colour, 'yellow');

		blockGrid.blockClicked(null, blockGrid.grid[1][0]);

		assert.equal(blockGrid.grid[3][0].blank, true);

		blockGrid.blockClicked(null, blockGrid.grid[4][4]);
		assert.equal(blockGrid.grid[4].length, 5);

	});
	

});
