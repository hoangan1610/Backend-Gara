import { account_roles } from "../constants/constants";
import db from "../models";
import { ProductFollowService, ProductOptionService, ProductService } from "../services";

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
export default class ProductController {

    createOption = async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const { product_id, name, stock, price } = req.body;

            const productOption = await new ProductOptionService().create({
                product_id,
                name,
                stock,
                price
            }, { transaction });

            let product = await new ProductService().getOne({
                where: { id: product_id }
            }, { transaction });

            product.stock += stock;
            await product.save({ transaction });

            transaction.commit();
            return res.status(201).json({ product_option: productOption });
        } catch (error) {
            console.error(error);
            transaction.rollback();
            return res.status(500).json({ message: error.message });
        }
    }

    updateOption = async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const { id, product_id, name, stock, price } = req.body;

            let oldProductOption = await new ProductOptionService().getOne({
                where: { id }
            }, { transaction });

            if (!oldProductOption) {
                return res.status(404).json({ message: "Product option not found" });
            }

            const stockDiff = stock - oldProductOption.stock;

            let productOption = await new ProductOptionService().update({
                id,
                product_id,
                name,
                stock,
                price
            }, { transaction });

            let product = await new ProductService().getOne({
                where: { id: product_id }
            }, { transaction });

            product.stock += stockDiff;
            await product.save({ transaction });

            await transaction.commit();
            productOption = await new ProductOptionService().getOne({
                where: { id }
            });
            return res.status(200).json({ product_option: productOption });
        } catch (error) {
            console.error(error);
            await transaction.rollback();
            return res.status(500).json({ message: error.message });
        }
    }

    deleteOption = async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const { id } = req.params;

            let productOption = await new ProductOptionService().getOne({
                where: { id: parseInt(id) }
            }, { transaction });

            if (!productOption) {
                return res.status(404).json({ message: "Product option not found" });
            }

            let product = await new ProductService().getOne({
                where: { id: productOption.product_id }
            }, { transaction });

            product.stock -= productOption.stock;
            await product.save({ transaction });

            await new ProductOptionService().delete(
                {
                    where: { id: req.params.id },
                    transaction
                }
            );

            transaction.commit();
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            transaction.rollback();
            return res.status(500).json({ message: error.message });
        }
    }

    getByPath = async (req, res) => {
        try {
            const { path } = req.params;

            const product = await new ProductService().getOne({
                where: { path },
                include: [db.product_option]
            });

            return res.status(200).json({ product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    search = async (req, res) => {
        try {
            const { searchTerm, category_id, category_path, page, limit } = req.query;

            const { rows, count } = await new ProductService().searchAndCountProducts({
                searchTerm,
                category_id,
                category_path,
                page,
                limit
            });

            return res.status(200).json({ result: { products: rows, total: count } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    getFollow = async (req, res) => {
        try {
            const user = req.user;

            const products = await new ProductFollowService().getAll({
                where: {
                    user_id: user.id
                },
                include: [{ model: db.product, include: [db.product_option] }]
            });
            return res.status(200).json({ products: products });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    follow = async (req, res) => {
        try {
            const { product } = req.body;
            const user = req.user;

            const productFollow = await new ProductFollowService().create({
                user_id: user.id,
                product_id: product.id
            });

            return res.status(200).json({ message: "Followed successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    unfollow = async (req, res) => {
        try {
            const { product } = req.body;
            const user = req.user;

            await new ProductFollowService().delete({
                where: {
                    user_id: user.id,
                    product_id: product.id
                }
            });

            return res.status(200).json({ message: "Unfollowed successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    syncFollow = async (req, res) => {
        try {
            const { following_items } = req.body;
            const user = req.user;

            for (let product_follow of following_items) {
                const productFollow = await new ProductFollowService().getOne({
                    where: {
                        user_id: user.id,
                        product_id: product_follow.product.id
                    }
                });

                if (!productFollow) {
                    await new ProductFollowService().create({
                        user_id: user.id,
                        product_id: product_follow.product.id
                    });
                }
            }

            return res.status(200).json({ message: "Sync follow completed" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }


    async getAll(req, res) {
        try {
            if (!canRead(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to read" });
            }
            const data = await new ProductService().getAll({
                include: [db.product_option]
            });
            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const data = await new ProductService().getOne({
                where: { id: req.params.id },
                include: [db.product_option]
            });
            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json({ product: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            if (!canCreate(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to create this product" });
            }
            const data = await new ProductService().create(req.body);

            let default_product_option = await new ProductOptionService().create({
                product_id: data.id,
                name: "Default",
                stock: 0,
                price: 0
            });

            return res.status(201).json({ product: data, message: "Create successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async query(req, res) {
        try {
            let query = req.query;
            let data = await new ProductService().query(query);

            return res.status(200).json({ products: data });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const target_product = await new ProductService().getOne({ where: { id: req.params.id } });
            if (!target_product) {
                return res.status(404).json({ message: "Not found" });
            }
            if (!canUpdate(req.user?.role || account_roles.NO_ROLE)) {
                return res.status(403).json({ message: "You don't have permission to edit this product" });
            }
            let data = await new ProductService().update(req.body);
            return res.status(200).json({ product: data, message: "Update successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req, res) {
        try {
            await new ProductService().delete({ where: { id: req.params.id } });
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}