import {NgModule}                from '@angular/core';
import {CommonModule}            from '@angular/common';
import {MenubarModule}           from 'primeng/menubar';
import {CardModule}               from 'primeng/card';
import {components, services}    from './main.content';

@NgModule({
    imports: [
        CommonModule,
        MenubarModule,
        CardModule,
    ],
    declarations: [
        ...components,
    ],
    exports: [
        ...components,
    ],
    providers: [
        ...services,
    ]
})

export class MainModule{}