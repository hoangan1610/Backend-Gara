import db from "../models";
import { CartItemService, CartService } from "../services";

export default class CartController {
    constructor() {
    }

    addProduct = async (req, res) => {
        const transaction = await db.sequelize.transaction();
        try {
            const { user } = req;
            const { product, quantity, product_option } = req.body;

            let cart = await new CartService().getOne({
                where: { user_id: user.id },
                include: [{ model: db.cart_item, include: [{ model: db.product, include: [db.product_option] }, { model: db.product_option }] }],
                transaction
            });
            let cart_items = cart.cart_items;

            let found = false;

            for (
                let i = 0;
                i < cart_items.length;
                i++
            ) {
                if (
                    cart_items[i].product.id === product.id &&
                    cart_items[i].product_option.id === product_option.id
                ) {
                    cart_items[i].quantity += quantity;
                    await cart_items[i].save({ transaction })
                    found = true;
                    break;
                }
            }

            if (!found) {
                await new CartItemService().create({
                    cart_id: cart.id,
                    product_id: product.id,
                    product_option_id: product_option.id,
                    quantity: quantity
                }, { transaction });
            }
            await transaction.commit();

            cart = await new CartService().getOne({
                where: { user_id: user.id },
                include: [{ model: db.cart_item, include: [{ model: db.product, include: [db.product_option] }, { model: db.product_option }] }]
            });

            return res.status(200).json(cart);
        } catch (error) {
            console.error(error);
            await transaction.rollback();
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    getByUserInToken = async (req, res) => {
        try {
            const user = req.user;
            let cart = await new CartService().getByUserId(user.id);

            if (!cart) {
                cart = await new CartService().create({ user_id: user.id });
            }

            if (!cart.cart_items) {
                cart.cart_items = [];
            }

            return res.status(200).json(cart);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    updateCartItem = async (req, res) => {
        try {
            const { user } = req;
            const { quantity, product_option } = req.body;
            console.log(req.body)

            await new CartItemService().update({
                id: req.params.id,
                quantity: quantity,
                product_option_id: product_option.id
            });

            const cart = await new CartService().getOne({
                where: { user_id: user.id },
                include: [{ model: db.cart_item, include: [{ model: db.product, include: [db.product_option] }, { model: db.product_option }] }]
            });

            return res.status(200).json(cart);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    deleteCartItem = async (req, res) => {
        try {
            const { user } = req;

            await new CartItemService().delete({ where: { id: req.params.id } });

            const cart = await new CartService().getOne({
                where: { user_id: user.id },
                include: [{ model: db.cart_item, include: [{ model: db.product, include: [db.product_option] }, { model: db.product_option }] }]
            });

            return res.status(200).json(cart);
        }
        catch (error) {
            console.error(error);

            return res.status(500).json({ message: "Internal server error" });
        }
    }

    sync = async (req, res) => {
        try {
            const { user } = req;
            const cart = await new CartService().getByUserId(user.id);
            const { cart_items } = req.body;

            for (const item of cart_items) {
                let found = false;
                for (const cartItem of cart.cart_items) {
                    if (cartItem.product.id === item.product.id && cartItem.product_option.id === item.product_option.id) {
                        cartItem.quantity += item.quantity;
                        await cartItem.save();
                        found = true;
                    }
                }
                if (!found) {
                    await new CartItemService().create({
                        cart_id: cart.id,
                        product_id: item.product.id,
                        product_option_id: item.product_option.id,
                        quantity: item.quantity
                    });
                }
            }

            const updatedCart = await new CartService().getByUserId(user.id);

            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAll(req, res) {
        try {
            const data = await new CartService().getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const data = await new CartService().getOne({ where: { id: req.params.id } });
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
            const data = await new CartService().create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const data = await new CartService().update(req.params.id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req, res) {
        try {
            const { user } = req;
            let cart = await new CartService().getByUserId(user.id);
            if (!cart) {
                return res.status(404).json({ message: "Not found" });
            }
            if (cart.id !== parseInt(req.params.id)) {
                return res.status(402).json({ message: "Forbidden" });
            }

            await new CartService().delete({ where: { id: req.params.id } });
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
