import { getScrollbarWidth } from '../modules/functions.js';
import { disableScrollbar } from '../modules/functions.js';

let scrollbarWidth = getScrollbarWidth();

class AllahModal {
	constructor(options) {
		let defaultOptions = {
			isOpen: ()=>{},
			isClose: ()=>{},
		}
		this.options = Object.assign(defaultOptions, options);
		this.modal = null;
		this.speed = 300;
		this.animation = 'fade';
		this._reOpen = false;
		this._nextContainer = false;
		this.modalContainer = false;
		this.isOpen = false;
		this.previousActiveElement = false;
		this._focusElements = [
			'a[href]',
			'input',
			'select',
			'textarea',
			'button',
			'iframe',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])'
		];
		this._fixBlocks = document.querySelectorAll('.fixed-block');
		this.events();
	}

	events() {
		if (!this.modal) {
			document.addEventListener('click', function(e) {
				const clickedElement = e.target.closest(`[data-allah-path]`);
				if (clickedElement) {
					let target = clickedElement.dataset.allahPath;
					let animation = clickedElement.dataset.allahAnimation;
					let speed =  clickedElement.dataset.allahSpeed;
					this.animation = animation ? animation : 'fade';
					this.speed = speed ? parseInt(speed) : 300;
					this._nextContainer = document.querySelector(`[data-allah-target="${target}"]`);
					this.modal = this._nextContainer.parentElement;
					this.open();
					return;
				}

				if (e.target.closest('.modal__close') || e.target.closest('.modal__close-btn')) {
					this.close();
					return;
				}
			}.bind(this));

			window.addEventListener('keydown', function(e) {
				if (e.keyCode == 27 && this.isOpen) {
					this.close();
				}

				if (e.which == 9 && this.isOpen) {
					this.focusCatch(e);
					return;
				}
			}.bind(this));

			document.addEventListener('click', function(e) {
				if (e.target.classList.contains('modal') && e.target.classList.contains("is-open")) {
					this.close();
				}
			}.bind(this));
		}

	}

	open(selector) {
		this.previousActiveElement = document.activeElement;

		if (this.isOpen) {
			this.reOpen = true;
			this.close();
			return;
		}

		this.modalContainer = this._nextContainer;

		if (selector) {
			this.modalContainer = document.querySelector(`[data-allah-target="${selector}"]`);
		}

		this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
		this.modal.classList.add('is-open');

		document.body.style.scrollBehavior = 'auto';
		document.documentElement.style.scrollBehavior = 'auto';

		this.disableScroll();

		this.modalContainer.classList.add('modal-open');
		this.modalContainer.classList.add(this.animation);

		setTimeout(() => {
			this.options.isOpen(this);
			this.modalContainer.classList.add('animate-open');
			this.isOpen = true;
			this.focusTrap();
		}, this.speed);
	}

	close() {
		if (this.modalContainer) {
			this.modalContainer.classList.remove('animate-open');
			this.modalContainer.classList.remove(this.animation);
			this.modal.classList.remove('is-open');
			this.modalContainer.classList.remove('modal-open');

			this.enableScroll();

			document.body.style.scrollBehavior = 'auto';
			document.documentElement.style.scrollBehavior = 'auto';

			this.modal = null;
			this.options.isClose(this);
			this.isOpen = false;
			this.focusTrap();

			if (this.reOpen) {
				this.reOpen = false;
				this.open();
			}
		}
	}

	focusCatch(e) {
		const nodes = this.modalContainer.querySelectorAll(this._focusElements);
		const nodesArray = Array.prototype.slice.call(nodes);
		const focusedItemIndex = nodesArray.indexOf(document.activeElement)
		if (e.shiftKey && focusedItemIndex === 0) {
			nodesArray[nodesArray.length - 1].focus();
			e.preventDefault();
		}
		if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
			nodesArray[0].focus();
			e.preventDefault();
		}
	}

	focusTrap() {
		const nodes = this.modalContainer.querySelectorAll(this._focusElements);
		if (this.isOpen) {
			if (nodes.length) nodes[0].focus();
		} else {
			this.previousActiveElement.focus();
		}
	}

	disableScroll() {
		this.lockPadding();
		document.body.classList.add('disable-scroll');
	}

	enableScroll() {
		this.unlockPadding();
		document.body.classList.remove('disable-scroll');
	}

	lockPadding() {
		this._fixBlocks.forEach((el) => {
			el.style.paddingRight = scrollbarWidth + 'px';
		});
		document.body.style.paddingRight = scrollbarWidth + 'px';
	}

	unlockPadding() {
		this._fixBlocks.forEach((el) => {
			el.style.paddingRight = 0;
		});
		document.body.style.paddingRight = 0;
	}
}

/* Приклад */
document.querySelectorAll('.modal-btn').forEach(btn => {
	btn.addEventListener('click', e => {
		new AllahModal({
			isOpen: (modal) => {
			},
			isClose: (modal) => {
			}
		}).open();
	});
});

export default AllahModal;