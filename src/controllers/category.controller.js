import { account_roles } from "../constants/constants";
import { CategoryService } from "../services";


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
export default class CategoryController {
    constructor() {
    }

    async getAll(req, res) {
        try {
            if (!canRead(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to read" });
            }
            const data = await new CategoryService().getAll();
            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const data = await new CategoryService().getOne({ where: { id: req.params.id } });
            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            if (!canCreate(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to create this category" });
            }
            const data = await new CategoryService().create(req.body);
            return res.status(201).json({ category: data, message: "Create successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const target_category = await new CategoryService().getOne({ where: { id: req.params.id } });
            if (!target_category) {
                return res.status(404).json({ message: "Not found" });
            }
            if (!canUpdate(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to edit this category" });
            }
            let data = await new CategoryService().update(req.body);
            return res.status(200).json({ category: data, message: "Update successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req, res) {
        try {
            await new CategoryService().delete({ where: { id: req.params.id } });
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}