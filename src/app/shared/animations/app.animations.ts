import {trigger, state, animate, style, transition} from '@angular/animations';

export const appAnimations: any = {
    favPanelAnimation: function (): any{
        return trigger('favPanel', [
            state('inactive', style({
                opacity: 0,
                transform: 'translateY(50px)'
            })),
            state('active', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ]);
    },
    fadeUp: function (panelName: string): any{
        return trigger(panelName + 'Panel', [
            state('disabled', style({
                opacity: 0,
                transform: 'translateY(50px)'
            })),
            state('enabled', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            state('void', style({
                opacity: 0,
                transform: 'translateY(50px)'
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(0px)'
            })),
            transition('disabled => enabled', animate('250ms ease-in')),
            transition('enabled => disabled', animate('250ms ease-out')),
            transition('void => *', animate('250ms ease-in')),
            transition('* => void', animate('250ms ease-out')),

        ]);
    },
};
