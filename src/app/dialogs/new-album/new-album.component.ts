import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlbumService } from '../../services/album/album.service';

@Component({
	selector: 'app-new-album',
	templateUrl: './new-album.component.html',
	styleUrl: './new-album.component.scss',
})
export class NewAlbumComponent {
	public albumForm: UntypedFormGroup;

	constructor(
		private formBuilder: UntypedFormBuilder,
		private albumService: AlbumService,
		public dialogRef: DynamicDialogRef,
		public config: DynamicDialogConfig
	) {
		const album: any = config.data;
		this.albumForm = this.formBuilder.group({
			name: new UntypedFormControl(album ? album.name : 'New Album', [
				Validators.required,
				Validators.maxLength(40),
			]),
		});
	}

	/**
	 * Create or update the album
	 */
	public createAlbum(): void {
		if (this.config.data) {
			this.albumService.editAlbum({ ...this.config.data, ...this.albumForm.value });
		} else {
			this.albumService.createAlbum(this.albumForm.value);
		}
		this.dialogRef.close();
	}
}
