import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
	selector: 'app-admin',
	templateUrl: './Admin.component.html',
	styleUrls: ['./Admin.component.css']
})

export class AdminComponent implements AfterViewInit {
    isShowMenu: boolean = false;

	constructor(
        private elRef: ElementRef) {
    }

    initialAdminFrontEnd() {
    	// Page script
        const mainElm    = document.getElementById("main");
        const footerElm  = document.getElementsByTagName('footer')[0];
        const leftMenuElm= document.getElementById('left-menu');

        // padding-top: 10px
        leftMenuElm.style.minHeight = (mainElm.clientHeight - 10 + footerElm.clientHeight) + "px";
    }

    ngAfterViewInit() {
    	setTimeout(() => {
            
            this.initialAdminFrontEnd();

        }, 150);
    }

    toggleMenu() {
        this.isShowMenu = !this.isShowMenu;
    }
}