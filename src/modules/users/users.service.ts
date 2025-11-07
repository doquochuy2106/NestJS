import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from '@/helpers/util';
import apq from 'api-query-params'
import { query } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.UserModel.exists({ email: email })
    if (user) {
      return true
    }
    else {
      return false
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto

    //check email
    const isExits = await this.isEmailExist(email)
    if (isExits === true) {
      throw new BadRequestException(`Email đã tồn tại: ${email}. vui lòng nhập emial khác`)
    }
    //hash password
    const hashPassword = await hashPasswordHelper(password)

    const user = await this.UserModel.create({
      name,
      password: hashPassword,
      email,
      phone,
      address,
      image
    })

    return {
      _id: user._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = apq(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize
    if (!current) {
      current = 1
    }
    if (!pageSize) {
      pageSize = 10
    }

    const totalItems = (await this.UserModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * (pageSize)

    const results = await this.UserModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password")
      .sort(sort as any)

    return { results, totalPages }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne(
      { email: email }
    )
  }

  async update(updateUserDto: UpdateUserDto) {

    const updateUser = await this.UserModel.updateOne(
      { _id: updateUserDto._id }, { ...updateUserDto }
    )
    return updateUser
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      //delete
      return await this.UserModel.deleteOne(
        { _id: _id }
      )
    }
    else {
      throw new BadRequestException("_id không đúng định dạng")
    }
  }
}
