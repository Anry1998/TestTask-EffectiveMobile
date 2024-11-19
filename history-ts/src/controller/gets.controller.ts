import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { History } from "../entity/history"
import {  DataSource } from 'typeorm';

export const getByShopId = async (req: Request, res: Response, next: NextFunction) => {
  const { shop_id } = req.query;
  const historyRepository = AppDataSource.getRepository(History)
  const result = await historyRepository.findOne({ where: { shop_id: Number(shop_id)}});
  res.send(result);
}

export const getByPlu = async (req: Request, res: Response, next: NextFunction) => {
  const { plu } = req.query;
  const historyRepository = AppDataSource.getRepository(History)
  const result = await historyRepository.findOne({ where: { plu: Number(plu)}});
  res.send(result);
}

export const getByAction = async (req: Request, res: Response, next: NextFunction) => {
  const { action } = req.query;
  const historyRepository = AppDataSource.getRepository(History)

  if(typeof(action) === 'string') {
    console.log('action: ', action) 
    console.log(`typeof(action) === 'string'`)
    const result = await historyRepository.find({ where: { action: action  }});
    res.send(result);
  }
  res.send(`Что-то пошло не так`);
}


