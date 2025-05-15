import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostPageComponent } from './post-page/post-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'post/:id', component: PostPageComponent }
];
