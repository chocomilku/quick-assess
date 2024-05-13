import { deleteCategoryController } from "@controllers/category/deleteCategory.controller";
import { fetchCategoryController } from "@controllers/category/fetchCategory.controller";
import { updateCategoryController } from "@controllers/category/updateCategory.controller";
import { Router } from "express";

const router = Router();

router.get("/:id", fetchCategoryController);

router.put("/:id", updateCategoryController);

router.delete("/:id", deleteCategoryController);

export default router;
