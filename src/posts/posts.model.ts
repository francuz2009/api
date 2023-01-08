import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreattionsAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreattionsAttrs>{
  @ApiProperty({ example: '1', description: 'post Id ' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'заголовок поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Первый текст поста', description: 'Тест поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: 'лайк', description: 'лайк' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  likes: object;

  @ApiProperty({ example: 'dislikes', description: 'dislikes' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  dislikes: object;

  @ApiProperty({ example: 'фото', description: 'фото' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;


  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User
}