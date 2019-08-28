import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

	constructor(
        private elRef: ElementRef,
        private router: Router) {
        
    }

    // TODO: lazy load
    initialFrontEnd() {

        // Page script
        const mainElm    = document.getElementById("main");
        const headerElm  = document.getElementsByTagName("header")[0];
        const footerElm  = document.getElementsByTagName("footer")[0];

        const mainHeight = window.innerHeight - headerElm.clientHeight - footerElm.clientHeight;
        mainElm.style.minHeight = mainHeight + "px";
    }

    ngAfterViewInit() {
		
        setTimeout(() => {
            
            this.initialFrontEnd();

        }, 150);

        
	}
}
