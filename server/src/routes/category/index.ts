import { deleteCategoryController } from "@controllers/category/deleteCategory.controller";
import { fetchCategoryController } from "@controllers/category/fetchCategory.controller";
import { updateCategoryController } from "@controllers/category/updateCategory.controller";
import { Router } from "express";
import { AuthMiddleware } from "@middleware/user/auth.middleware";

const router = Router();

router.get("/:id", fetchCategoryController);

router.put("/:id", AuthMiddleware, updateCategoryController);

router.delete("/:id", AuthMiddleware, deleteCategoryController);

export default router;
