import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Could be named "SkipAuth" or "AllowAnon"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
