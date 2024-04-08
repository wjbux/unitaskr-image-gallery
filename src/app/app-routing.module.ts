import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
	{
		path: '',
		component: GalleryComponent,
		children: [{ path: 'album/:id', component: AlbumComponent }],
	},
	{ path: '**', component: GalleryComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
