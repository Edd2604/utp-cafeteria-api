export declare class CloudinaryService {
    private uploadFile;
    uploadFilesToCloudinary(files: Express.Multer.File[]): Promise<string[]>;
    uploadFileToCloudinary(file: Express.Multer.File): Promise<string>;
}
