import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Image } from '../../model/class/Image';
import { ImageService } from '../../services/image/image.service';

@Component({
	selector: 'app-new-image',
	templateUrl: './new-image.component.html',
	styleUrl: './new-image.component.scss',
})
export class NewImageComponent {
	public imageForm: UntypedFormGroup;

	constructor(
		private formBuilder: UntypedFormBuilder,
		private imageService: ImageService,
		private dialogRef: DynamicDialogRef,
		private config: DynamicDialogConfig,
		private messageService: MessageService
	) {
		const image: Image = config.data;
		this.imageForm = this.formBuilder.group({
			name: new UntypedFormControl(image.name, [Validators.required, Validators.maxLength(40)]),
		});
	}

	/**
	 * Edit the image name
	 */
	public async editImage(): Promise<void> {
		await this.imageService.editImage({ ...this.config.data, ...this.imageForm.value } as Image);
		this.messageService.add({
			severity: 'success',
			summary: 'Image Successfully Edited',
			detail: `${this.imageForm.get('name')?.value} has been edited.`,
		});
		this.dialogRef.close();
	}
}
