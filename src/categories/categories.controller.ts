import { Controller, Get, Post, Body, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

}
