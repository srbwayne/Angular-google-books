import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-empty',
    templateUrl: './card-empty.component.html',
    styleUrls: ['./card-empty.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEmptyComponent implements OnInit {

    @Input() novoMostrar = false;
    @Input() novoRota = 'novo';

    @Input() headerShow = true;
    @Input() title;

    constructor() { }

    ngOnInit(): void {
    }

}
