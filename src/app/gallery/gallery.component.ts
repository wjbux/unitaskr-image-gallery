import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, firstValueFrom } from 'rxjs';
import { NewAlbumComponent } from '../dialogs/new-album/new-album.component';
import { Album } from '../model/class/Album';
import { AlbumService } from '../services/album/album.service';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
	public albums$: Observable<Album[]>;

	constructor(private albumService: AlbumService, public dialogService: DialogService) {}

	public ngOnInit(): void {
		this.albums$ = this.albumService.getAlbums();
	}

	/**
	 * Opens the new album dialog
	 */
	public async createAlbum(): Promise<void> {
		const dialogRef: DynamicDialogRef = this.dialogService.open(NewAlbumComponent, {
			header: 'New Album',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});
		await firstValueFrom(dialogRef.onClose);
		this.albums$ = this.albumService.getAlbums();
	}
}
