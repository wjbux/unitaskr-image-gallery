import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Image } from '../../model/class/Image';
import { ImageQueryOptions } from '../../model/class/ImageQueryOptions';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	constructor(private httpClient: HttpClient) {}

	/**
	 * Gets images for a given album
	 * @param id id of the album the images lie in
	 * @param queryOptions a query options object to add a string search for name, limit, or sort by date.
	 *      Defaults to limit of 50 and returns oldest first
	 * @returns list of images that satisfy the query
	 */
	public getImagesByAlbum(id: string, queryOptions?: ImageQueryOptions): Observable<Image[]> {
		const takeParam: string = queryOptions?.take ? `?take=${queryOptions?.take}` : '';
		const sortParam: string = queryOptions?.sort ? `&sort=${queryOptions?.sort}` : '';
		const searchParam: string = queryOptions?.search ? `&search=${queryOptions?.search}` : '';
		const skipParam: string = queryOptions?.skip ? `&skip=${queryOptions?.skip}` : '';
		return this.httpClient.get(
			`${environment.database.databaseURL}/albums/${id}/images${takeParam}${sortParam}${searchParam}${skipParam}`
		) as Observable<Image[]>;
	}

	/**
	 * Counts images for a given album
	 * @param id id of the album the images lie in
	 * @param queryOptions a query options object to add a string search for name, limit, or sort by date.
	 *      Defaults to limit of 50 and returns oldest first
	 * @returns list of images that satisfy the query
	 */
	public countImagesByAlbum(id: string, queryOptions?: ImageQueryOptions): Observable<string> {
		const searchParam: string = queryOptions?.search ? `?search=${queryOptions?.search}` : '';
		return this.httpClient.get(
			`${environment.database.databaseURL}/albums/${id}/count${searchParam}`
		) as Observable<string>;
	}

	/**
	 * Creates a new image in the database
	 * @param image image data to add to the database
	 * @param file file to save to s3 bucket
	 * @returns newly added image
	 */
	public async createImage(image: Image, file: any): Promise<Image> {
		return await firstValueFrom<Image>(
			this.httpClient.post(`${environment.database.databaseURL}/images`, {
				image: image,
				file: file,
			}) as Observable<Image>
		);
	}

	/**
	 * Edits the image provided
	 * @param image to edit
	 * @returns newly edited image
	 */
	public async editImage(image: Image): Promise<Image> {
		return await firstValueFrom<Image>(
			this.httpClient.put(`${environment.database.databaseURL}/images/${image.id}`, image) as Observable<Image>
		);
	}

	/**
	 * Deletes the image provided
	 * @param image image to delete
	 */
	public async deleteImage(image: Image): Promise<void> {
		await firstValueFrom(this.httpClient.delete(`${environment.database.databaseURL}/images/${image.id}`));
	}
}
