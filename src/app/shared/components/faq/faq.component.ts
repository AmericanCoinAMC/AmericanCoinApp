import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {


    constructor(private _dialog: MdDialog) {


    }

    ngOnInit() {
    }

    public close(): void {
        this._dialog.closeAll();
    }
}
