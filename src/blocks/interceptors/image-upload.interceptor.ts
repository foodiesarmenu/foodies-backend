import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dlvndc08a',
    api_key: '636594518631992',
    api_secret: 'YzX6o3PXzWv2YJL4U8zNtC3AFuI'
});

@Injectable()
export class ImageUploadInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const file = request.file;
        console.log(file, 'file');

        return new Observable(observer => {
            cloudinary.uploader.upload_large(file.path, { resource_type: "image", folder: 'restaurant' }, (error, result) => {
                console.log(file);

                if (error) {
                    observer.error(error);
                } else {
                    request.body.image = result.url;
                    next.handle().subscribe({
                        next: (response) => observer.next(response),
                        error: (error) => observer.error(error),
                        complete: () => observer.complete(),
                    });
                }
            });
        });
    }
}
