import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';

@Injectable()
export class FileService {

    createFile(file: any, fileName: string) {
        try {
            const filePath = path.resolve(__dirname, '..', '..', '..', '..', 'frontend', 'public', 'images')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName + '.jpg'), file.image[0].buffer)
            return fileName
        } 
        catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(filename: string) {

    }
}