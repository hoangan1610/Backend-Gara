
import { CostItemService, CostService, PaymentService } from "../services";
import db from "../models";
import { account_roles, cost_status, payment_method_codes } from "../constants/constants";

const role_author_number = {
  [account_roles.NO_ROLE]: 0,
  [account_roles.USER]: 1,
  [account_roles.EMPLOYEE]: 1,
  [account_roles.ADMIN]: 2,
  [account_roles.SUPER_ADMIN]: 3,
}
const canCreate = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];
const canRead = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.NO_ROLE];
const canUpdate = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];
const canDelete = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];

export default class CostController {
  constructor() { }

  async getAll(req, res) {
    try {
      if (!canRead(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to read" });
      }

      const data = await new CostService().getAll({
        include: [{
          model: db.product,
          as: "product",
        }, {
          model: db.user,
          as: "employee",
        },
        ]
      });

      return res.status(200).json({ costs: data });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getOne(req, res) {
    try {
      const data = await new CostService().getOne({ where: { id: req.params.id } });
      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ cost: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      if (!canCreate(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to create this cost" });
      }
      const data = await new CostService().create(req.body);
      return res.status(201).json({ cost: data, message: "Create successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const target_cost = await new CostService().getOne({ where: { id: req.params.id } });
      if (!target_cost) {
        return res.status(404).json({ message: "Not found" });
      }
      if (!canUpdate(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to edit this cost" });
      }
      let data = await new CostService().update(req.body);
      return res.status(200).json({ cost: data, message: "Update successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      if (!canDelete(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to delete this cost" });
      }
      await new CostService().delete({ where: { id: req.params.id } });
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}