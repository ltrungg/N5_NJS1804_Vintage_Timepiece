import { Controller, Post, Get, Param, Req, Res, Body, NotFoundException, InternalServerErrorException, Put } from '@nestjs/common';
import { SellRequestService } from './sell-request.service';
import { CreateSellRequestDto } from './create-sell-request.dto';
import { Response } from 'express';

@Controller('sell-request')
export class SellRequestController {
  constructor(private readonly sellRequestService: SellRequestService) {}

  @Post('create')
  async createSellRequest(@Body() createSellRequestDto: CreateSellRequestDto, @Res() response: Response) {
    try {
      
      const sellRequest = await this.sellRequestService.createSellRequest(createSellRequestDto);
      
      return response.status(201).json(sellRequest);
    } catch (error) {
      console.error('Error creating sell request:', error);
      return response.status(500).json({ message: 'Failed to create sell request' });
    }
  }

  @Get('view')
  async getAllSellRequests(@Res() response: Response): Promise<void> {
    try {
      const sellRequests = await this.sellRequestService.getAllSellRequests();
      if (!sellRequests || sellRequests.length === 0) {
        throw new NotFoundException('Sell requests not found');
      }
      response.status(200).json({ sellRequests });
    } catch (error) {
      console.error('Error fetching sell requests:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async getSellRequestById(@Param('id') id: number, @Res() response: Response) {
    try {
      const sellRequest = await this.sellRequestService.getSellRequestById(id);
      if (!sellRequest) {
        throw new NotFoundException('Sell request not found');
      }
      response.status(200).json(sellRequest);
    } catch (error) {
      console.error('Error fetching sell request by id:', error);
      if (error instanceof NotFoundException) {
        response.status(404).send('Sell request not found');
      } else {
        response.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  @Put(':id')
  async updateSellRequest(@Param('id') id: number, @Body() updatedSellRequestDto: CreateSellRequestDto, @Res() response: Response) {
    try {
      const updatedSellRequest = await this.sellRequestService.updateSellRequest(id, updatedSellRequestDto);
      return response.status(200).json({ message: 'Sell request updated successfully', sellRequest: updatedSellRequest });
    } catch (error) {
      console.error('Error updating sell request:', error);
      return response.status(500).json({ message: 'Failed to update sell request' });
    }
  }
}
