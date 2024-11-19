import { AppDataSource } from "../data-source"
import { History } from "../entity/history"

export class HistoryCreateController  {
  private historyRepository = AppDataSource.getRepository(History)

  async save(data: History) {
    const {action, shop_id, plu, name} = data
    const history = Object.assign(new History(), {
      action, 
      shop_id, 
      plu, 
      name,
    })
    return this.historyRepository.save(history)
  }


  // async getById(id: number) {
    
  //   const result = await this.historyRepository.findOne({
  //     where: { id }
  //   })
    
  //   return result
  // }

}



