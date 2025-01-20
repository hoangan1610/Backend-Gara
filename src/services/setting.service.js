import db from '../models';

export default class SettingService {
  constructor() {
    this.SettingModel = db.setting;
  }

  async getPolicies() {
    return await this.SettingModel.findOne({ where: { key: 'policies' } });
  }

  async updatePolicies(data) {
    return await this.SettingModel.update({ value: data }, { where: { key: 'policies' } });
  }

  async getPromotions() {
    return await this.SettingModel.findOne({ where: { key: 'promotions' } });
  }

  async updatePromotions(data) {
    return await this.SettingModel.update({ value: data }, { where: { key: 'promotions' } });
  }
}