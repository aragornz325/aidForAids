const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const User = prisma.user;
const Product = prisma.product;
const Address = prisma.address;
const Purchase = prisma.purchase;
const Cart = prisma.cart;

module.exports = { prisma, User, Product, Address, Purchase, Cart };
