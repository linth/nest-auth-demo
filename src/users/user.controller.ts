import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UseInterceptors
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { User } from './user.entity';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    // private readonly commentService: CommentService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @CacheKey('')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtGuard)
  // @Get(':id/comments')
  // getUserComment(@Param('id') id: string) {
  //   return this.commentService.findUserComments(id);
  // }
}
