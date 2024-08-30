package com.SDB.SDBatter.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Entity.product;
import com.SDB.SDBatter.Repo.ProductRepo;
import com.SDB.SDBatter.Repo.UserRepo;

@RestController
@RequestMapping("/SDS")
public class ProductController  {
	@Autowired
	private ProductRepo prodrepo;
	
	
	@PostMapping("/product")
	public product createProduct(@RequestBody product prod) throws Exception {
		product isExist=prodrepo.findByName(prod.getName());
		if(isExist!= null) {
			throw new Exception ("User Is Exist With "+ prod.getName());
		}
		product saveProduct=prodrepo.save(prod);
		return saveProduct;
	
	}
	 
	@DeleteMapping("/product/{id}")	
	public String deleteUser(@PathVariable("id") long id ) {
		prodrepo.deleteById(id);
		return "Product Deleted Successfully";
	}
	
	@GetMapping("/products")
	public List<product> getAllProducts() {
		List<product> Products=prodrepo.findAll();
		return Products;
	}
	@PutMapping("/product/{id}")
    public ResponseEntity<product> updateProduct(@PathVariable("id") long id, @RequestBody product productDetails) {
        Optional<product> optionalProduct = prodrepo.findById(id);

        if (optionalProduct.isPresent()) {
            product existingProduct = optionalProduct.get();
            existingProduct.setName(productDetails.getName());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setVerient(productDetails.getVerient());
            existingProduct.setQuantities(productDetails.getQuantities());
            existingProduct.setImage(productDetails.getImage());
            
            product updatedProduct = prodrepo.save(existingProduct);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
      
    
}
