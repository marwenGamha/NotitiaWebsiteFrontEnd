import { Routes } from '@angular/router';


import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';

export const MapsRoutes: Routes = [{
      
        path: '',
        children: [{
            path: 'google',
            component: GoogleMapsComponent
        }]
    },{
        path: '',
        children: [{
            path: 'vector',
            component: VectorMapsComponent
        }]
    }
]
