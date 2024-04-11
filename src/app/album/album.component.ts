import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DataViewPageEvent } from 'primeng/dataview';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { Menu } from 'primeng/menu';
import { firstValueFrom } from 'rxjs';
import { NewAlbumComponent } from '../dialogs/new-album/new-album.component';
import { NewImageComponent } from '../dialogs/new-image/new-image.component';
import { Album } from '../model/class/Album';
import { Image } from '../model/class/Image';
import { ImageQueryOptions } from '../model/class/ImageQueryOptions';
import { AlbumService } from '../services/album/album.service';
import { ImageService } from '../services/image/image.service';

@Component({
	selector: 'app-album',
	templateUrl: './album.component.html',
	styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
	public layout: 'grid' | 'list' = 'list';
	public images: Image[] = [];
	public album: Album;
	public selectedImage: Image;
	public totalImageCount: number;
	public currentQuery: ImageQueryOptions = {
		take: 6,
		skip: 0,
	};

	public sortOptions: SelectItem[] = [
		{ label: 'Oldest First', value: 'ASC' },
		{ label: 'Newest First', value: 'DESC' },
	];

	public albumMenuItems: MenuItem[] = [
		{
			label: 'Edit Album',
			icon: 'pi pi-pencil',
			command: () => {
				this.editAlbum();
			},
		},
		{
			label: 'Delete Album',
			icon: 'pi pi-trash',
			command: () => {
				this.deleteAlbum();
			},
		},
	];

	public imageMenuItems: MenuItem[] = [
		{
			label: 'Edit Image',
			icon: 'pi pi-pencil',
			command: () => {
				this.editImage();
			},
		},
		{
			label: 'Delete Image',
			icon: 'pi pi-trash',
			command: () => {
				this.deleteImage();
			},
		},
	];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService,
		private imageService: ImageService,
		private albumService: AlbumService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

	public ngOnInit(): void {
		this.initialiseAlbum();
	}

	/**
	 * Initialises the album given the URL parameter
	 */
	public async initialiseAlbum() {
		const id: string | null = (await firstValueFrom<ParamMap>(this.route.paramMap)).get('id');
		if (id) {
			this.album = await firstValueFrom<Album>(this.albumService.getAlbumById(id));
			this.refreshImages();
		} else {
			this.router.navigateByUrl('/');
		}
	}

	/**
	 * Sets the currently selected image to pass correct details
	 * @param menu image menu
	 * @param event event emitted during menu open
	 * @param image image to set as currently selected image
	 */
	public toggleImageMenu(menu: Menu, event: Event, image: Image) {
		this.selectedImage = image;
		menu.toggle(event);
	}

	/**
	 * Handles pagination events for lazy loading
	 * @param event pagination event
	 */
	public async handlePageChange(event: DataViewPageEvent) {
		this.currentQuery.skip = event.first;
		this.currentQuery.take = event.rows;
		this.refreshImages();
	}

	/**
	 * Handles a change event in the input field to update search
	 * @param event event passed by input field
	 */
	public searchImage(event: Event) {
		this.currentQuery.search = (event.target as HTMLInputElement).value;
		this.refreshImages();
	}

	/**
	 * Handles a sort change event to refresh image results
	 * @param event
	 */
	public onSortChange(event: DropdownChangeEvent) {
		this.currentQuery.sort = event.value;
		this.refreshImages();
	}

	/**
	 * Opens the edit album dialog for current album
	 */
	public async editAlbum() {
		const dialogRef: DynamicDialogRef = this.dialogService.open(NewAlbumComponent, {
			header: 'Update Album',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
			data: this.album,
		});
		await firstValueFrom(dialogRef.onClose);
		this.refreshAlbum();
	}

	/**
	 * Opens the edit image dialog for currently selected image
	 */
	public async editImage() {
		const dialogRef: DynamicDialogRef = this.dialogService.open(NewImageComponent, {
			header: 'Update Image',
			width: '50vw',
			modal: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
			data: this.selectedImage,
		});
		await firstValueFrom(dialogRef.onClose);
		this.refreshImages();
	}

	/**
	 * Deletes the specified image after presenting confirm dialog
	 */
	public deleteImage(): void {
		this.confirmationService.confirm({
			header: 'Delete Image',
			message: `Are you sure you want to delete image ${this.selectedImage.name}?`,
			accept: async () => {
				await this.imageService.deleteImage(this.selectedImage);
				this.refreshImages();
				this.messageService.add({
					severity: 'warn',
					summary: 'Image Deleted',
					detail: `${this.selectedImage.name} has been deleted.`,
				});
			},
		});
	}

	/**
	 * Deletes the specified album after presenting confirm dialog then routes home
	 */
	public deleteAlbum(): void {
		this.confirmationService.confirm({
			header: 'Delete Album',
			message: `Are you sure you want to delete album ${this.album.name}?`,
			accept: async () => {
				await this.albumService.deleteAlbum(this.album);
				this.router.navigateByUrl('/');
			},
		});
	}

	/**
	 * Handles file uploads to the backend
	 * @param uploader file upload element
	 * @param $event event containing the files
	 */
	public async onUpload(uploader: FileUpload, $event: FileUploadHandlerEvent) {
		for (let file of $event.files as File[]) {
			const image: Image = {
				name: file.name,
				type: file.type.split('/')[1] || 'Unknown',
				size: file.size.toString(),
				album: this.album,
			};

			await this.imageService.createImage(image, await this.toBase64(file));
			this.messageService.add({
				severity: 'success',
				summary: 'Image Successfully Uploaded',
				detail: `${file.name} has been uploaded.`,
			});
			this.refreshImages();
		}
		uploader.clear();
	}

	// Converts image to base 64 string to send to server
	private toBase64(file: File): Promise<any> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});
	}

	// Refreshes the list of images
	private async refreshImages() {
		this.totalImageCount = Number(
			await firstValueFrom<string>(this.imageService.countImagesByAlbum(`${this.album.id}`, this.currentQuery))
		);

		this.images = await firstValueFrom<Image[]>(
			this.imageService.getImagesByAlbum(`${this.album.id}`, this.currentQuery)
		);
	}

	// Refreshes the current album
	private async refreshAlbum() {
		const id: string | null = (await firstValueFrom(this.route.paramMap)).get('id');

		if (id) {
			this.album = await firstValueFrom<Album>(this.albumService.getAlbumById(id));
		}
	}
}
