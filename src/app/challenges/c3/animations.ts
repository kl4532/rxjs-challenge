import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const Animations = [
  trigger('insert', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('150ms', style({ opacity: 0 }))
    ])
  ]),
  trigger('sequenceSlide', [
    transition(':enter', [
      query('h2, p', [
        style({opacity: 0, transform: 'translateX(100px)'}),
        stagger(1000, [
          animate('1500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
      ])
    ])
  ]),
  trigger('slide', [
    state('open', style({
      height: '70px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '0px',
      display: 'none'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('1s')
    ])
  ]),
  trigger('expand', [
    state('expanded', style({height: '*', opacity: 1, visibility: 'visible'})),
    state('collapsed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
    transition('expanded <=> collapsed',
      animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
  ])
]
