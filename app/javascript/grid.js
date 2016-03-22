export const COLOURS = ['red', 'green', 'blue', 'yellow'];
export const EMPTY_COLOUR = 'transparent';
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
	constructor(x, y, blank, colour) {
		this.x = x;
		this.y = y;
		if(blank) {
			this.blank = !!blank;
		} else {
			this.colour = colour ? colour : COLOURS[Math.floor(Math.random() * COLOURS.length)];
		}
	}
}

export class BlockGrid {

	constructor(maxX = MAX_X, maxY = MAX_Y, pattern) {
		this.grid = [];
		this.maxX = maxX;
		this.maxY = maxY;

		for(let x = 0; x < this.maxX; x++) {
			let col = [];
			for(let y = 0; y < this.maxY; y++) {
				col.push(new Block(x, y, null, pattern ? pattern[x][y] : null));
			}

			this.grid.push(col);
		}

		//console.log(this.grid);

		return this;
	}

	render(el = document.querySelector('#gridEl')) {
		
		el.innerHTML = '';
		
		for(let x = 0; x < this.maxX; x++) {
			let id = 'col_' + x;
			let colEl = document.createElement('div');
			colEl.className = 'col';
			colEl.id = id;
			el.appendChild(colEl);

			for(let y = this.maxY - 1; y >= 0; y--) {

				let block = this.grid[x][y],
					id = `block_${x}x${y}`,
					blockEl = document.createElement('div');

				blockEl.id = id;

				if(block.blank) {
					blockEl.className = 'block blank';
					blockEl.style.background = EMPTY_COLOUR;
				} else {
					blockEl.className = 'block';
					blockEl.style.background = block.colour;
					//blockEl.innerText = `${x},${y}  t:${block.tagForRemoval || ''}`;
					blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
				}

				colEl.appendChild(blockEl);

			}
		}

		return this;
	}

	blockClicked(e, block) {
		this.removeAdjacentBlocks(block);
		this.updateBlocksXY();
		this.render();
		//console.log('block', block)
		//console.log('after', this.grid)
	}

	removeAdjacentBlocks(block) {

		try {

			let blocks = [
				// Above block
				block.y < this.maxY ? this.grid[block.x][block.y + 1] : null,
				// Right block
				block.x < this.maxX - 1 ? this.grid[block.x + 1][block.y] : null,
				// Below block
				block.y > 0 ? this.grid[block.x][block.y - 1] : null,
				// Left Block
				block.x > 0 ? this.grid[block.x - 1][block.y] : null
			];

			//console.log(blocks);

			// Remove self
			block.tagForRemoval = true;

			// Remove all adjacent blocks that match in colour
			blocks.forEach(adjacentBlock => {
				if(adjacentBlock && !adjacentBlock.tagForRemoval && adjacentBlock.colour == block.colour) {
					adjacentBlock.tagForRemoval = true;
					this.removeAdjacentBlocks(adjacentBlock);
				}
			});

			this.removeTaggedBlocks();

		} catch(y) {
			console.error(y);
			return false;
		}

	}

	removeTaggedBlocks() {

		this.grid.forEach((column, x) => {
			column.forEach((block, y) => {
				if(block.tagForRemoval) {
					this.grid[x].splice(y, 1);
					this.grid[x].push(new Block(x, this.maxY, true));
				}
			});
		});

	}

	updateBlocksXY() {

		this.grid.forEach((column, x) => {
			column.forEach((block, y) => {
				block.x = x;
				block.y = y;
			});
		});

	}

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
