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

        router.events.subscribe((val) => {
            this.initialFrontEnd();
        });
        
    }

    initialFrontEnd() {

        const mainAdminElm = document.getElementById('main-admin');
        if(mainAdminElm != null) return;

        // Input text
        // TODO: InputTextDirective
        const inputList = document.getElementsByTagName('input');
            
        for(let i = 0; i < inputList.length; i++) {
            if(inputList[i].parentElement.className == "input") {
                inputList[i].addEventListener('change', () => {
                    if(inputList[i].value == "") {
                        // Con loi
                        if(inputList[i].parentElement.classList.value.indexOf('active') != -1) {
                            inputList[i].parentElement.classList.remove('active');
                        }
                    } else {
                        inputList[i].parentElement.classList.add('active');
                    }
                });

                inputList[i].addEventListener('focus', () => {
                    inputList[i].parentElement.classList.toggle('focused');
                });

                inputList[i].addEventListener('blur', () => {
                    inputList[i].parentElement.classList.toggle('focused');
                });
            }
        }

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
