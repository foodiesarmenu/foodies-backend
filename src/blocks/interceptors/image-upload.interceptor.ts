import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v2 as cloudinary } from 'cloudinary';
import { imageMimeTypes } from 'src/common';


cloudinary.config({
    cloud_name: 'dlvndc08a',
    api_key: '636594518631992',
    api_secret: 'YzX6o3PXzWv2YJL4U8zNtC3AFuI'
});

@Injectable()
export class ImageUploadInterceptor implements NestInterceptor {
    constructor(private folder: string) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const file = request.file;
        console.log(file, 'file');

        if (!file) {
            throw new BadRequestException('Image is required');
        }

        if (!imageMimeTypes.includes(file.mimetype.split('/')[1])) {
            throw new BadRequestException('Invalid image type');
        }

        return new Observable(observer => {
            cloudinary.uploader.upload_large(file.path, { resource_type: "image", folder: this.folder }, (error, result) => {
                if (error) {
                    observer.error(error);
                } else {
                    request.body.image = result.url;
                    request.body.imagePublicId = result.public_id; // store the public ID of the uploaded image
                    next.handle().subscribe({
                        next: (response) => observer.next(response),
                        error: (error) => {
                            // delete the uploaded image
                            cloudinary.uploader.destroy(request.body.imagePublicId, (error, result) => {
                                console.log(result, 'image deleted');
                            });
                            observer.error(error);
                        },
                        complete: () => observer.complete(),
                    });
                }
            });
        });
    }
}