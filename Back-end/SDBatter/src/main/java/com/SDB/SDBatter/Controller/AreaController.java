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
import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Repo.AreaRepo;

@RestController
@RequestMapping("/SDS")

public class AreaController {
	
	   @Autowired 
	     private AreaRepo areaRepo;
	@PostMapping("/area")
  	public Area createArea(@RequestBody Area area) throws Exception {	
  		Area isExist=areaRepo.findByName(area.getName());
		if(isExist!= null) {
			throw new Exception ("User Is Exist With "+ area.getName());
		}
  Area saveArea = areaRepo.save(area);
  return saveArea;
  	
  	}
  	
  	@DeleteMapping("/area/{id}")	
	public String deleteArea(@PathVariable("id") long area_id ) {
		areaRepo.deleteById(area_id);
		return "Area Deleted Successfully";
	}
  	
  	@GetMapping("/areas")
	public List<Area> getAllAreas() {
		List<Area> areas=areaRepo.findAll();
		return areas;
	}
}
