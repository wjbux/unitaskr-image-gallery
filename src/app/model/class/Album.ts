import { Image } from './Image';
/**
 * Model class for an Album object
 */
export class Album {
	public id: number;
	public name: string;
	public parentAlbum: Album;
	public subAlbums: Album[];
	public images: Image[];
}
