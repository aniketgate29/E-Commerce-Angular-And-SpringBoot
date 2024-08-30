package com.SDB.SDBatter.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.SDB.SDBatter.Dto.Login;
import com.SDB.SDBatter.Dto.Token;
import com.SDB.SDBatter.Dto.mobilenumber;
import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Entity.otp;
import com.SDB.SDBatter.Entity.product;
import com.SDB.SDBatter.Repo.UserRepo;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/SDS")
public class UserController {
	@Autowired
	private UserRepo userRepo;
    
	 private Map<String, String> otpStorage = new HashMap<>();
	 
	@PostMapping("/users")
	public User CreateUser(@RequestBody  User user) throws Exception {
		User isExist=userRepo.findByMobile(user.getMobile());
		if(isExist!= null) {
			throw new Exception ("User Is Exist With "+ user.getMobile());
		}
		User saveduser=userRepo.save(user);
		return saveduser;
	}
	
	
	@DeleteMapping("/user/{id}")	
	public String deleteUser(@PathVariable("id") long user_id ) {
		userRepo.deleteById(user_id);
		return "User Deleted Successfully";
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		List<User> users=userRepo.findAll();
		return users;
	}
	 @GetMapping("/user/{mobile}")
	    public ResponseEntity<User> getUserByMobile(@PathVariable("mobile") Long mobile) {
	        User user = userRepo.findByMobile(mobile);
	        if (user != null) {
	            return ResponseEntity.ok(user);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	

	@PutMapping("/user/{id}")
    public ResponseEntity<User> updateProduct(@PathVariable("id") long user_id, @RequestBody User productDetails) {
        Optional<User> optionalProduct = userRepo.findById(user_id);

        if (optionalProduct.isPresent()) {
            User existingProduct = optionalProduct.get();
            existingProduct.setFirst_name(productDetails.getFirst_name());
            existingProduct.setLast_name(productDetails.getLast_name());
            existingProduct.setEmail(productDetails.getEmail());
            existingProduct.setWing_name(productDetails.getWing_name());
            existingProduct.setSociaty_name(productDetails.getSociaty_name());
            existingProduct.setFlat_no(productDetails.getFlat_no());
            existingProduct.setArea(productDetails.getArea());
            existingProduct.setMobile(productDetails.getMobile());

            User updatedUser = userRepo.save(existingProduct);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@PutMapping("/user/password")
	public ResponseEntity<String> updatePassword(@RequestBody Map<String, Object> request) {
	    long mobile = Long.parseLong(request.get("mobile").toString());
	    String newPassword = request.get("password").toString();

	    Optional<User> optionalUser = Optional.ofNullable(userRepo.findByMobile(mobile));
	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        if (newPassword == null || newPassword.isEmpty()) {
	            return ResponseEntity.badRequest().body("New password cannot be empty");
	        }
	        existingUser.setPassword(newPassword);
	        userRepo.save(existingUser);
	        return ResponseEntity.ok().body("Password updated successfully");
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	

	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request) {
        long mobile = Long.parseLong(request.get("mobile").toString());
        String password = request.get("password").toString();
        User user = userRepo.findByMobile(mobile);
        Token token = new Token();
        if (user != null) {
        	
        	 if (password.equals(user.getPassword())) {
                 token.setMessege("Login successful");
                 Login login =new Login();
                 login.setMobile(mobile+"");
                 login.setPassword(password);
                 login.setRole(user.getRole());                
                 token.setToken(login);
                 return ResponseEntity.ok().body(token);
            } else {
                token.setMessege( "Invalid password");

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(token);
            }
        } else {
            token.setMessege("User not found");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(token);
        }
    }
	
	 @PostMapping("/sendOtp")
	    public ResponseEntity<String> sendOtp(@RequestBody mobilenumber request) {
		 String otp = String.format("%04d", new Random().nextInt(10000));	
			String mobile=request.getMobile().toString();

		  otpStorage.put(mobile, otp);
		  
		 // Here, you can add the logic to send OTP via SMS or email
	        return ResponseEntity.ok("OTP sent successfully to " + request.getMobile());
	    }

	    // Verify OTP endpoint
	    @PostMapping("/verifyOtp")
	    public ResponseEntity<String> verifyOtp(@RequestBody otp request) {
	    	 String storedOtp = otpStorage.get(request.getMobile());
	  	        if (request.getOtp() != null && request.getOtp().equals(storedOtp)) {
	            return ResponseEntity.ok("OTP verified successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
	        }
	    }
	    

}
