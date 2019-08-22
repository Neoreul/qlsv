import { Directive, ElementRef, OnInit } from '@angular/core';
import { element } from 'protractor';

@Directive({
	selector: '[inputText]'
})

export class InputDirective implements OnInit {

	constructor(private elem: ElementRef) {}

	ngOnInit() {
		setTimeout(() => {
			this.initial();
		}, 150);
	}

	initial() {
        let inputChildElm = this.elem.nativeElement.children[1];

        if(inputChildElm) {

        	inputChildElm.addEventListener('change', () => {
	            if(inputChildElm.value == "") {
	                if(this.elem.nativeElement.classList.value.indexOf('active') != -1) {
	                    this.elem.nativeElement.classList.remove('active');
	                }
	            } else {
	                this.elem.nativeElement.classList.add('active');
	            }
	        });

        	inputChildElm.addEventListener('focus', () => {
	            this.elem.nativeElement.classList.toggle('focused');
	        });

	        inputChildElm.addEventListener('blur', () => {
	           this.elem.nativeElement.classList.toggle('focused'); 
	        });
        }
	}
}