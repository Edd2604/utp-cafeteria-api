import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

export function UseFilesInterceptor() {
  return applyDecorators(UseInterceptors(FilesInterceptor('files')))
}

export function UseFileInterceptor() {
  return applyDecorators(UseInterceptors(FileInterceptor('file')))
}
