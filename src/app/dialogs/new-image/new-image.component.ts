import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
		public dialogRef: DynamicDialogRef,
		public config: DynamicDialogConfig
	) {
		const image: any = config.data;
		this.imageForm = this.formBuilder.group({
			name: new UntypedFormControl(image.name, [Validators.required, Validators.maxLength(40)]),
		});
	}

	/**
	 * Edit the image name
	 */
	public editImage(): void {
		this.imageService.editImage({ ...this.config.data, ...this.imageForm.value });
		this.dialogRef.close();
	}
}
