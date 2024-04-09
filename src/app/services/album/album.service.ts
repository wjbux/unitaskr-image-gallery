import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Album } from '../../model/class/Album';

@Injectable({
	providedIn: 'root',
})
export class AlbumService {
	constructor(private httpClient: HttpClient) {}

	/**
	 * Retrieves all albums
	 * @returns list of album objects
	 */
	public getAlbums(): Observable<Album[]> {
		return this.httpClient.get(`${environment.database.databaseURL}/albums`) as Observable<Album[]>;
	}

	/**
	 * Returns an album given the ID
	 * @param id ID of the album to return
	 * @returns the album object with corresponding ID
	 */
	public getAlbumById(id: string): Observable<Album> {
		return this.httpClient.get(`${environment.database.databaseURL}/albums/${id}`) as Observable<Album>;
	}

	/**
	 * Creates a new album in the database
	 * @param album album to add to the database
	 * @returns newly added album
	 */
	public async createAlbum(album: Album): Promise<Album> {
		return await firstValueFrom<Album>(
			this.httpClient.post(`${environment.database.databaseURL}/albums`, album) as Observable<Album>
		);
	}

	/**
	 * Edits the album provided
	 * @param album to edit
	 * @returns newly edited album
	 */
	public async editAlbum(album: Album): Promise<Album> {
		return await firstValueFrom<Album>(
			this.httpClient.put(`${environment.database.databaseURL}/albums/${album.id}`, album) as Observable<Album>
		);
	}

	/**
	 * Deletes the album provided
	 * @param album album to delete
	 */
	public async deleteAlbum(album: Album): Promise<void> {
		await firstValueFrom(this.httpClient.delete(`${environment.database.databaseURL}/albums/${album.id}`));
	}
}
