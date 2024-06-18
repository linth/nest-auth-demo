import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


// 檢查請求的 Authorization 標頭是否包含 jwt 令牌，並確保令牌格式正確（通常是 Bearer 令牌）, 驗證 jwt 的有效性, 提取用戶信息.
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}