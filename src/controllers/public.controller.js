import { FileService, OrderService, ProductService, SettingService, UserService } from "../services";

export default class PublicController {

  getAnalytics = async (req, res) => {
    try {

      const orders = await new OrderService().getAll();
      const users = await new UserService().getAll();
      const products = await new ProductService().getAll();

      const analytics = [
        {
          value: users.length,
        },
        {
          value: products.length,
        },
        {
          value: orders.length,
        },
        {
          value: (orders.reduce((acc, order) => acc + parseInt(order.total_amount), 0)).toLocaleString() + " VND",
        },
      ]

      return res.status(200).json(analytics);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  }

  getPolicies = async (req, res) => {
    try {

      const policiesSettings = await new SettingService().getPolicies();

      return res.status(200).json({ policies: policiesSettings.value });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  updatePolicies = async (req, res) => {
    try {
      let policies = req.body.policies;
      let oldPolicies = await new SettingService().getPolicies();

      for (let old of oldPolicies.value) {
        if (!policies.find(p => p.image_url === old.image_url)) {
          await new FileService().deleteImage(old.image_url.split('/').reverse()[0]);
        }
      }

      await new SettingService().updatePolicies(policies);

      return res.status(200).json({ message: "Policies updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  getPromotions = async (req, res) => {
    try {
      const promotionsSettings = await new SettingService().getPromotions();

      return res.status(200).json({ promotions: promotionsSettings.value });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  updatePromotions = async (req, res) => {
    try {
      const promotions = req.body.promotions;
      const oldPromotions = await new SettingService().getPromotions();

      for (let old of oldPromotions.value) {
        if (!promotions.find(p => p.image_url === old.image_url)) {
          await new FileService().deleteImage(old.image_url.split('/').reverse()[0]);
        }
      }

      await new SettingService().updatePromotions(promotions);

      return res.status(200).json({ message: "Promotions updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}