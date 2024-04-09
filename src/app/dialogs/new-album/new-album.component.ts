import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Album } from '../../model/class/Album';
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
		private dialogRef: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private messageService: MessageService
	) {
		const album: Album = config.data;
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
	public async createAlbum(): Promise<void> {
		if (this.config.data) {
			await this.albumService.editAlbum({ ...this.config.data, ...this.albumForm.value } as Album);
			this.messageService.add({
				severity: 'success',
				summary: 'Album Successfully Edited',
				detail: `${this.albumForm.get('name')?.value} has been edited.`,
			});
		} else {
			await this.albumService.createAlbum(this.albumForm.value as Album);
			this.messageService.add({
				severity: 'success',
				summary: 'Album Successfully Created',
				detail: `${this.albumForm.get('name')?.value} has been created.`,
			});
		}
		this.dialogRef.close();
	}
}
