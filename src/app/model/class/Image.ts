import { Album } from './Album';
/**
 * Model class for an Image object
 */
export class Image {
	public id?: number;
	public name?: string;
	public dateCreated?: Date;
	public dateUpdated?: Date;
	public s3PutObjectUrl?: string;
	public type?: string;
	public size?: string;
	public album?: Album;
}
