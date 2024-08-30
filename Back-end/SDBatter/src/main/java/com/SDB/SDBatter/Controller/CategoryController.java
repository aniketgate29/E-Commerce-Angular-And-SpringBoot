package com.SDB.SDBatter.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SDB.SDBatter.Entity.Area;
import com.SDB.SDBatter.Entity.Category;
import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Repo.AreaRepo;
import com.SDB.SDBatter.Repo.CategoryRepo;

@RestController
@RequestMapping("/SDS")

public class CategoryController {
      @Autowired
	private CategoryRepo  categoryRepo;
   
  	@PostMapping("/category")
  	public Category createCategory(@RequestBody Category cate) throws Exception {	
  		Category isExist=categoryRepo.findByName(cate.getName());
		if(isExist!= null) {
			throw new Exception ("User Is Exist With "+ cate.getName());
		}
    Category saveCategory=categoryRepo.save(cate);
    return saveCategory;
  	
  	}
  	
  	@DeleteMapping("/category/{id}")	
	public String deleteCategory(@PathVariable("id") long category_id ) {
		categoryRepo.deleteById(category_id);
		return "Category Deleted Successfully";
	}
  	
  	@GetMapping("/categories")
	public List<Category> getAllCategorys() {
		List<Category> category=categoryRepo.findAll();
		return category;
	}

}
