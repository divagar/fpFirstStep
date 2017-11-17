import { Component } from '@angular/core';
import { HttpService } from '../app.http.service';
import * as Reveal from 'reveal.js';
import * as appConfig from '../../../config.json';

@Component({
    selector: '[app-mr]',
    templateUrl: './mapreduce.component.html',
    styleUrls: ['./slides.component.css']
})

export class MRComponent {

    gistUrl: string;
    mainCode: string;
    consoleOutput: string;
    jsEditorOptions = {};
    htmlEditorOptions = {};

    constructor(private httpService: HttpService) {
        this.gistUrl = (<any>appConfig).gist.apiUrl;
        this.initEditor();
    }

    ngOnInit() {
        var that = this;
        Reveal.addEventListener('slide_mr', function () {
            that.initEditor();
            that.getCode('962e76ccef7dd8703c1365fa9388124e').then(
                (val) => that.mainCode = String(val)
            );
        }, false);
        Reveal.addEventListener('slide_mr_1', function () {
            that.initEditor();
            that.getCode('db012916dd89f58fdc032e4cb3ed898b').then(
                (val) => that.mainCode = String(val)
            );
        }, false);
        Reveal.addEventListener('slide_mr_2', function () {
            that.initEditor();
            that.getCode('deb73a0eddceaa84f2d7502ba44520ba').then(
                (val) => that.mainCode = String(val)
            );
        }, false);
    }

    initEditor() {
        this.jsEditorOptions = Object.assign({}, (<any>appConfig).jsEditorOptions);
        this.htmlEditorOptions = Object.assign({}, (<any>appConfig).htmlEditorOptions);
    }

    getCode(gistId) {
        var url = this.gistUrl + gistId + '/raw';
        return new Promise((resolve, reject) => {
            this.httpService.get(url).subscribe(
                (val) => { resolve(val); },
                (err) => { reject(err) }
            );
        })
    }

    run() {
        this.consoleOutput = eval(this.mainCode);
    }

}