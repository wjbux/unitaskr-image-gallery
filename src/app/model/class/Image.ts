import { Album } from './Album';
/**
 * Model class for an Image object
 */
export class Image {
	public id?: number;
	public name: string;
	public dateCreated: number;
	public s3PutObjectUrl: string;
	public type: string;
	public size: string;
	public description: string;
	public album?: Album;
}
