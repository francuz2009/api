import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepositiry: typeof User,
    private roleService: RolesService) { }

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepositiry.create(dto)
      const role = await this.roleService.getRoleByValue("client")
      await user.$set('roles', [role.dataValues.id])
      user.roles = [role]
      return {
        status: HttpStatus.CREATED,
        user: user
      }
    }
    catch (e) {
      const errorCodeEmailAlreadyExists = "23505"
      if (e.parent.code === errorCodeEmailAlreadyExists) {
        return { error: 'Такой email уже используется', status: HttpStatus.NOT_MODIFIED }
      }
    }

  }


  async getAllUsers() {
    const users = await this.userRepositiry.findAll({ include: { all: true } })
    return users
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepositiry.findOne({
      where: {
        email
      },
      include: { all: true }
    })
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepositiry.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (user && role) {
      await user.$add('role', role.id)
      return dto
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepositiry.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
