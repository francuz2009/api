import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) { }

  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto)
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }

}
